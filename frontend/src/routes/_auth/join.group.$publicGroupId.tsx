import { createFileRoute } from "@tanstack/react-router";
import InviteFriendByGroupLink from "@/features/groups/components/Invite-Friend-GroupLink";

export const Route = createFileRoute("/_auth/join/group/$publicGroupId")({
  component: InviteFriendByGroupLink,
});
