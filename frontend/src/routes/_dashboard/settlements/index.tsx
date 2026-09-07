import Settlements from "@/features/settlements/Settlements";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/settlements/")({
  component: Settlements,
});
