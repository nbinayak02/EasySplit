import { createFileRoute, redirect } from "@tanstack/react-router";
import GroupDashboardPage from "@/features/groups/pages/Group-Dashboard";
import { isUserJoined } from "@/features/groups/api/group.api";

export const Route = createFileRoute("/_dashboard/group/$publicGroupId")({
  component: GroupDashboardPage,
  beforeLoad: async ({ params }) => {

    const isUserJoinedToGroup = await isUserJoined(params.publicGroupId);

    if (!isUserJoinedToGroup) {
      throw redirect({
        to: "/group/access-denied",
      });
    }
  },
});
