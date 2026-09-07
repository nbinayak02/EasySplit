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
import useLeaveGroup from "../hooks/useLeaveGroup";

type Props = {
  groupId: number;
};

export default function LeaveGroupAlertBox({ groupId }: Props) {
  const [open, setOpen] = useState(false);

  const { isPending, onDelete } = useLeaveGroup({
    groupId,
    setOpen,
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger render={<Button variant={"destructive"} />}>
        <LogOut /> Leave Group
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove you from
            the group.
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
                <span>Leaving</span>
              </div>
            ) : (
              <span>Yes, Leave</span>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
