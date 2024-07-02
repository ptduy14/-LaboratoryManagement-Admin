import { Input } from "@nextui-org/react";
import { CategoryStatus, CategoryStatusNames } from "@/enums/category-status";
import { useFormContext } from "react-hook-form";
import { RegistrationDetail } from "@/components/registrations/registration-table/data";
import { ResourceStatus, ResourceStatusName } from "@/enums/resource-status";
import { ResourcesTransfered } from "@/components/room-resources/room-resources-table/data";

export const ConfirmReturnRegistrationForm = ({
  registrationDetail,
  registrationResources,
}: {
  registrationDetail: RegistrationDetail;
  registrationResources: ResourcesTransfered[];
}) => {
  const {
    register,
    formState: { errors },
    getValues,
    watch,
  } = useFormContext();

  console.log(registrationResources);

  return (
    <>
      {registrationResources.map((registrationResource, index) => {
        return (
          <div key={index} className="border-b border-gray-500">
            <div className="p-4 bg-[#3F3F46] rounded mb-4">
              <span className="font-bold">Tên tài nguyên: </span> {registrationResource.item.name}
            </div>
            <div className="p-4 bg-[#3F3F46] rounded mb-4">
              <span className="font-bold">Số lượng mượn: </span>{" "}
              {registrationDetail.items[index].quantity}
            </div>
            <div className="mb-4">
              <label
                htmlFor="status"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Trạng thái hoàn trả
              </label>
              <select
                defaultValue={getValues(`items.${index}.itemStatus`)}
                id="status"
                className="mb-7 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register(`items.${index}.itemStatus`, { valueAsNumber: true })}>
                <option value={ResourceStatus.NORMAL_OPERATION}>
                  {ResourceStatusName[ResourceStatus.NORMAL_OPERATION]}
                </option>
                <option value={ResourceStatus.STILL_IN_GOOD_USE}>
                  {ResourceStatusName[ResourceStatus.STILL_IN_GOOD_USE]}
                </option>
                <option value={ResourceStatus.AWAITING_REPAIR}>
                  {ResourceStatusName[ResourceStatus.AWAITING_REPAIR]}
                </option>
                <option value={ResourceStatus.MALFUNCTIONING}>
                  {ResourceStatusName[ResourceStatus.MALFUNCTIONING]}
                </option>
              </select>
            </div>
            {registrationResource.item.volume !== null && <Input className="mb-7" label="Tổng dung tích còn lại" variant="bordered" {...register(`items.${index}.remaining_volume`)}/>}
            <Input className="mb-7" label="Ghi chú" variant="bordered" {...register(`items.${index}.remark`)}/>
          </div>
        );
      })}
    </>
    // <>
    //   <div className="p-4 bg-[#3F3F46] rounded mb-4">
    //     <span className="font-bold">Số lượng mượn: </span>{" "}
    //     {registrationDetail.items[0].quantity}
    //   </div>
    //   <div className="p-4 mb-7 bg-[#3F3F46] rounded mb-4">
    //     <span className="font-bold">Đã trả:</span>{" "}
    //     {registrationDetail.items[0].quantityReturned}
    //   </div>
    //   <div className="mb-7">
    //     <label
    //       htmlFor="status"
    //       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    //       Tài nguyên trả
    //     </label>
    //     <select
    //       id="status"
    //       className="mb-7 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //       defaultValue={registrationDetail.items[0].item.id}
    //       {...register("itemRegistrationId", { valueAsNumber: true })}>
    //       {registrationDetail.items.map((resourceRegistrationDetail) => {
    //         return (
    //           <option
    //             key={resourceRegistrationDetail.item.id}
    //             value={resourceRegistrationDetail.item.id}>
    //             {resourceRegistrationDetail.item.name}
    //           </option>
    //         );
    //       })}
    //     </select>
    //   </div>
    //   <Input
    //     className="mb-7"
    //     label="Số lượng trả"
    //     variant="bordered"
    //     errorMessage={errors.quantity?.message?.toString()}
    //     isInvalid={errors.quantity?.message ? true : false}
    //     {...register("quantity", { valueAsNumber: true })}
    //   />
    //   <div className="mb-7">
    //     <label
    //       htmlFor="status"
    //       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    //       Trạng thái hoàn trả
    //     </label>
    //     <select
    //       defaultValue={ResourceStatus.NORMAL_OPERATION}
    //       id="status"
    //       className="mb-7 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //       {...register("itemStatus", { valueAsNumber: true })}
    //       >
    //       <option value={ResourceStatus.NORMAL_OPERATION}>
    //         {ResourceStatusName[ResourceStatus.NORMAL_OPERATION]}
    //       </option>
    //       <option value={ResourceStatus.STILL_IN_GOOD_USE}>
    //         {ResourceStatusName[ResourceStatus.STILL_IN_GOOD_USE]}
    //       </option>
    //       <option value={ResourceStatus.AWAITING_REPAIR}>
    //         {ResourceStatusName[ResourceStatus.AWAITING_REPAIR]}
    //       </option>
    //       <option value={ResourceStatus.MALFUNCTIONING}>
    //         {ResourceStatusName[ResourceStatus.MALFUNCTIONING]}
    //       </option>
    //     </select>
    //   </div>
    //   <Input className="mb-7" label="Mô tả" variant="bordered" />
    // </>
  );
};
