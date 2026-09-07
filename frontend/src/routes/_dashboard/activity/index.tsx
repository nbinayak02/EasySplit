import Activity from "@/features/activity/Activity";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/activity/")({
  component: Activity,
});
