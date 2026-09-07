import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserRoundPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CopyButton from "@/components/shared/Copy-Button";

type InviteFriendDialogProps = {
  groupId: string;
  label?: string;
};

export default function InviteFriendDialog({
  groupId,
  label,
}: InviteFriendDialogProps) {
  const baseUrl = import.meta.env.VITE_FRONTEND_URL ?? "http://localhost:5173";
  return (
    <Dialog>
      <DialogTrigger render={<Button />}>
        <UserRoundPlus /> {label}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Friends</DialogTitle>
          <DialogDescription>Share group with friends.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <p>Group ID</p>
          <div className="flex flex-col sm:flex-row items-center justify-evenly border rounded-xl py-1">
            <p className="truncate">{groupId}</p>
            <CopyButton textToCopy={groupId} />
          </div>
        </div>

        <div className="grid gap-3">
          <p>Invite Link</p>
          <div className="flex flex-col sm:flex-row items-center justify-evenly border rounded-xl py-1">
            <p className="max-w-70 sm:w-full truncate">
              {baseUrl}/join/group/{groupId}
            </p>
            <CopyButton textToCopy={`${baseUrl}/join/group/${groupId}`} />
          </div>
        </div>

        <DialogFooter>
          <DialogClose render={<Button variant={"outline"} />}>
            Close
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
