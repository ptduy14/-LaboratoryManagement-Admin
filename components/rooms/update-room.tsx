import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Tooltip } from "@nextui-org/react";
import { EditIcon } from "../icons/table/edit-icon";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { mutate } from "swr";
import { toast } from "react-toastify";
import { UpdateRoomSchema, UpdateRoomSchemaType } from "./schema/updateRoomSchema";
import { Room } from "./room-table/data";
import { UpdateRoomForm } from "../forms/room-forms/update-room-form";
import { RoomService } from "@/services/roomService";
import { translateErrorMessage } from "@/utils/translateErrorMessage";

export const UpdateRoom = ({ room }: { room: Room }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const methods = useForm<UpdateRoomSchemaType>({
    resolver: zodResolver(UpdateRoomSchema)
  });

  useEffect(() => {
    if (!room) return
    methods.reset({...room, roomId: room.id})
  }, [room])

  const onSubmit: SubmitHandler<UpdateRoomSchemaType> = async (data) => {
    setIsLoading(true)
    try {
      await RoomService.update(room.id, data);
      mutate((key) => Array.isArray(key) && key[0] === "/rooms");
      toast.success("Cập nhật phòng thành công");
      onClose(); 
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(translateErrorMessage(error.response?.data.message))
      }
    } finally {
      setIsLoading(false)
    }
  };

  const handleCloseModal = () => {
    methods.clearErrors;
    onClose();
  };

  return (
    <>
      <div>
        <Tooltip content="Cập nhật phòng" color="secondary">
          <button onClick={onOpen}>
            <EditIcon size={20} fill="#979797" />
          </button>
        </Tooltip>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Cập nhật phòng</ModalHeader>
              <ModalBody>
                <form className="flex justify-between scrollbar scrollbar-thin overflow-y-auto">
                  <div className="w-full max-h-80">
                    <FormProvider {...methods}>
                      <UpdateRoomForm />
                    </FormProvider>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={handleCloseModal}>
                  Đóng
                </Button>
                <Button color="primary" variant="flat" onClick={methods.handleSubmit(onSubmit)} isLoading={isLoading}>
                  Cập nhật
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
