import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import clsx from "clsx";
import type { MouseEvent } from "react";
import type { Group } from "../types/group.types";
import InviteFriendDialog from "./Invite-Friend-Dialog";
import { getTwoLetterNameInitials } from "@/lib/getNameInitials";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

type GroupItemProps = {
  group: Group;
  showInviteBtn?: boolean;
  showPeopleCount?: boolean;
  onClick?: () => void;
  isActive?: boolean;
};

export default function GroupItem({
  group,
  onClick,
  showInviteBtn = true,
  showPeopleCount = true,
  isActive = false,
}: GroupItemProps) {
  const baseImageUrl = import.meta.env.VITE_BASE_URL ?? "http://localhost:8000";

  return (
    <Item
      variant="outline"
      key={group.id}
      onClick={() => onClick && onClick()}
      className={clsx("hover:bg-muted min-w-full", {
        "bg-muted": isActive,
      })}
    >
      <ItemMedia>
        <Avatar size="lg">
          <AvatarImage
            src={`${baseImageUrl}${group.profile_image}`}
            alt="Group Logo"
          />
          <AvatarFallback>
            {getTwoLetterNameInitials(group.name)}
          </AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{group.name}</ItemTitle>
        <ItemDescription>{group?.description}</ItemDescription>
        {showPeopleCount && (
          <p className="text-muted-foreground text-xs flex flex-row items-center gap-1">
            <User className="size-3"/> {group.total_user}
          </p>
        )}
      </ItemContent>
      {showInviteBtn && (
        <ItemActions onClick={(event: MouseEvent) => event.stopPropagation()}>
          <InviteFriendDialog groupId={group.group_id} />
        </ItemActions>
      )}
    </Item>
  );
}
