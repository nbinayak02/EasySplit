import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Group } from "../types/group.types";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import InviteFriendDialog from "./Invite-Friend-Dialog";
import { User } from "lucide-react";

type GroupCardProps = {
  group: Group;
  onClick: () => void;
};

export default function GroupCard({ group, onClick }: GroupCardProps) {
  const baseImageUrl = import.meta.env.VITE_BASE_URL ?? "http://localhost:8000";

  return (
    <Card
      key={group.id}
      onClick={() => onClick()}
      className="hover:cursor-pointer"
    >
      <CardContent>
        <AspectRatio
          ratio={16 / 9}
          className="w-full max-w-sm rounded-lg bg-muted overflow-hidden"
        >
          <img
            src={`${baseImageUrl}${group.profile_image}`}
            className="w-full h-full object-cover"
          />
        </AspectRatio>
      </CardContent>
      <CardHeader>
        <CardTitle>{group.name}</CardTitle>
        <CardDescription>{group?.description}</CardDescription>
        <CardAction>
          <InviteFriendDialog groupId={group.group_id} />
        </CardAction>
        <CardDescription className="flex flex-row items-center gap-1">
          <User className="size-4" /> <span>{group.total_user}</span>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
