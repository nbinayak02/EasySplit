import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import useDeleteCategory from "../hooks/useDeleteCategory";

type CategoryDeleteAlertBoxProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  categoryId: number;
};

export default function DeleteCategoryAlertBox({
  open,
  setOpen,
  categoryId,
}: CategoryDeleteAlertBoxProps) {
  const { isPending, onDelete } = useDeleteCategory({
    setOpen,
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            category.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant={"destructive"}
            onClick={() => onDelete(categoryId)}
            disabled={isPending}
          >
            {isPending ? (
              <div className="flex flex-row gap-3 items-center">
                <Loader2 className="animate-spin" />
                <span>Deleting</span>
              </div>
            ) : (
              <span>Yes, Delete</span>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
