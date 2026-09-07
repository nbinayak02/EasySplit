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
import { Loader2, LogOut } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import useRemoveGroupMember from "../hooks/useRemoveGroupMember";

type Props = {
  groupId: number;
  userId: number;
};

export default function RemoveGroupMemberAlertBox({ groupId, userId }: Props) {
  const [open, setOpen] = useState(false);

  const { isPending, onDelete } = useRemoveGroupMember({
    groupId,
    setOpen,
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger render={<Button variant={"destructive"} />}>
        <LogOut />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove them from
            the group.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant={"destructive"}
            onClick={() => onDelete(groupId, userId)}
            disabled={isPending}
          >
            {isPending ? (
              <div className="flex flex-row gap-3 items-center">
                <Loader2 className="animate-spin" />
                <span>Removing</span>
              </div>
            ) : (
              <span>Yes, Remove User</span>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
