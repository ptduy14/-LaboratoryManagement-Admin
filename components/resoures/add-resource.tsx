import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeFilledIcon } from "../icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../icons/EyeSlashFilledIcon";
import { toast } from "react-toastify";
import axios from "axios";
import { UnitEnum, UnitEnumNames } from "@/enums/unit";
import { ResourceStatus, ResourceStatusName } from "@/enums/resource-status";
import { CategoryService } from "@/services/categoryService";
import useSWR from "swr";
import {
  AddResourceCommonSchema,
  AddResourceChemicalSchema,
  AddResourceSchemaUnionType,
} from "./schema/addResourceSchema";
import { AddResourceCommonForm } from "../forms/resource-forms/add-resource-common-form";
import { Category } from "../category/category-table/data";
import { z } from "zod";
import { ResourceService } from "@/services/resourceService";

export const AddResource = ({ mutate } : { mutate: any}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [schema, setSchema] = useState<z.ZodType<AddResourceSchemaUnionType>>(AddResourceCommonSchema);

  const methods = useForm<AddResourceSchemaUnionType>({
    resolver: zodResolver(schema),
  });

  const categoryId: number = methods.watch("categoryId", 1);

  const { data: categories } = useSWR("/categories", async (url) => {
    const { data } = await CategoryService.getAll(url);
    return data;
  });

  // need to improment later
  useEffect(() => {
    let newSchema = getAddResourceSchema(categoryId);
    setSchema(newSchema);
    methods.reset(undefined, { keepValues: true }); // Reset form with new schema
  }, [categoryId, categories]);

  const getAddResourceSchema = (categoryId: number) => {
    let category = categories?.data.find((category: Category) => {
      return category.id === categoryId;
    })

    switch (category?.name) {
      case "Hóa chất":
        return AddResourceChemicalSchema;
      default:
        return AddResourceCommonSchema;
    }
  };

  const onSubmit: SubmitHandler<AddResourceSchemaUnionType> = async (data) => {
    try {
      const {data: newResource} = await ResourceService.create(data);
      console.log(newResource)
      mutate()
      methods.reset()
      toast.success('Thêm tài nguyên thành công')
      onClose()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.message)
        toast.error('Đã có lỗi vui lòng liên hệ admin')
      }
    }
    console.log(data);
  };

  const handleCloseModal = () => {
    methods.clearErrors()
    onClose();
  };

  return (
    <div>
      <>
        <Button onPress={onOpen} color="primary">
          Thêm tài nguyên
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
          size="3xl"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Thêm tài nguyên
                </ModalHeader>
                <ModalBody>
                  <form className="flex justify-between scrollbar scrollbar-thin overflow-y-auto">
                    <div className="w-full max-h-80">
                      <FormProvider {...methods}>
                        <AddResourceCommonForm categories={categories?.data} />
                      </FormProvider>
                    </div>
                  </form>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="flat"
                    onClick={handleCloseModal}
                  >
                    Đóng
                  </Button>
                  <Button
                    color="primary"
                    onClick={methods.handleSubmit(onSubmit)}
                  >
                    Thêm tài nguyên
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};
