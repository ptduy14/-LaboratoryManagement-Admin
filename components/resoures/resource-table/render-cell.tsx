import { User, Tooltip, Chip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "@/components/icons/table/delete-icon";
import { EyeIcon } from "@/components/icons/table/eye-icon";
import { EditIcon } from "@/components/icons/table/edit-icon";
import { ResourceType } from "./data";
import { StatusResourceName } from "@/enums/status-resource";
import { UnitEnumNames } from "@/enums/unit";

interface Props {
  resouce: ResourceType;
  columnKey: string | React.Key;
}

export const RenderCell = ({ resouce, columnKey }: Props) => {
  // @ts-ignore
  const cellValue = resouce[columnKey];
  switch (columnKey) {
    case "origin":
      return cellValue !== "" ? (
        cellValue
      ) : (
        <Chip size="sm" variant="flat" color={"warning"}>
          <span className="capitalize text-xs">null</span>
        </Chip>
      );
    case "category":
      return cellValue.name;

    case "unit":
      return UnitEnumNames[cellValue];
    case "status":
      return (
        <Chip
          size="sm"
          variant="flat"
          color={
            cellValue === 0 || cellValue === 1
              ? "success"
              : cellValue === 2
              ? "warning"
              : "danger"
          }
        >
          <span className="capitalize text-xs">
            {StatusResourceName[cellValue]}
          </span>
        </Chip>
      );
    case "actions":
      return (
        <div className="flex items-center gap-4 ">
          <div>
            <Tooltip content="Details">
              <button onClick={() => console.log("View user", resouce.id)}>
                <EyeIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          <div>
            <Tooltip content="Edit user" color="secondary">
              <button onClick={() => console.log("Edit user", resouce.id)}>
                <EditIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          <div>
            <Tooltip
              content="Delete user"
              color="danger"
              onClick={() => console.log("Delete user", resouce.id)}
            >
              <button>
                <DeleteIcon size={20} fill="#FF0080" />
              </button>
            </Tooltip>
          </div>
        </div>
      );
    default:
      return cellValue;
  }
};
