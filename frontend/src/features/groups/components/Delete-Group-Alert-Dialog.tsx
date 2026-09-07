import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import useDeleteGroup from "../hooks/useDeleteGroup";

type Props = {
  groupId: number;
};

export default function DeleteGroupAlertBox({ groupId }: Props) {
  const [open, setOpen] = useState(false);

  const { isPending, onDelete } = useDeleteGroup({
    groupId,
    setOpen,
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger render={<Button variant={"destructive"} />}>
        <Trash2 /> Delete Group
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            group.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant={"destructive"}
            onClick={() => onDelete(groupId)}
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
