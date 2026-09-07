import Groups from "@/features/groups/pages/Groups";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/group/")({
  component: Groups,
});
