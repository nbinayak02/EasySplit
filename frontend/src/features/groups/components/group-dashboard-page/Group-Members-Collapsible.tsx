import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@base-ui/react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronsUpDown, UsersRound } from "lucide-react";
import useGetGroupMembers from "../../hooks/useGetGroupMembers";
import type { GroupMemberList } from "../../types/group.types";
import InviteFriendDialog from "../Invite-Friend-Dialog";
import RemoveGroupMemberAlertBox from "../Remove-Group-Member-Alert-Dialog";

type GroupMembersCollapsibleProps = {
  groupId: number;
  publicGroupId: string;
};

export default function GroupMembersCollapsible({
  groupId,
  publicGroupId,
}: GroupMembersCollapsibleProps) {
  const { data } = useGetGroupMembers({ groupId });
  if (!data) {
    return <p>No data</p>;
  }

  return (
    <Collapsible className="bg-muted rounded-xl">
      <CollapsibleTrigger
        className="min-w-full"
        render={
          <Button
            variant={"ghost"}
            className="w-full flex flex-row justify-between"
          >
            <div className="w-full flex flex-row items-center gap-3">
              <UsersRound />
              Group Members
            </div>
            <ChevronsUpDown />
          </Button>
        }
      />
      <CollapsibleContent>
        <Separator />
        <div className="px-4 py-4 flex flex-col gap-3">
          <div className="flex flex-row gap-3 justify-end">
            <InviteFriendDialog groupId={publicGroupId} label="Invite" />
          </div>

          <ScrollArea className="max-h-50 w-full">
            {data.map((member: GroupMemberList, index: number) => (
              <div
                className="py-2 hover:bg-primary hover:text-white rounded-xl flex flex-row justify-between"
                key={member.user.id}
              >
                <span className="px-2">
                  {index + 1}. {member.user.first_name}
                </span>
                <RemoveGroupMemberAlertBox
                  groupId={groupId}
                  userId={member.user.id}
                />
              </div>
            ))}
          </ScrollArea>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
