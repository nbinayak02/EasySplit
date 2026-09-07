import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useState } from "react";
import { Edit, EllipsisVertical, Trash2 } from "lucide-react";
import UpdateExpenseCategory from "./Update-Expense-Category-Dialog";
import DeleteCategoryAlertBox from "./Delete-Expense-Category-Alert";

type CategoryActionsProps = {
  categoryId: number;
};

export default function CategoryActions({ categoryId }: CategoryActionsProps) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="px-2">
          <EllipsisVertical className="group-hover:text-white size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={(event) => {
                event.preventDefault();
                setUpdateOpen(true);
              }}
            >
              <Edit /> Update
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              onClick={(event) => {
                event.preventDefault();
                setDeleteOpen(true);
              }}
            >
              <Trash2 /> Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteCategoryAlertBox
        open={deleteOpen}
        setOpen={setDeleteOpen}
        categoryId={categoryId}
      />

      <UpdateExpenseCategory
        open={updateOpen}
        setOpen={setUpdateOpen}
        categoryId={categoryId}
      />
    </>
  );
}
