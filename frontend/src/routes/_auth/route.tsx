import { createFileRoute } from "@tanstack/react-router";
import AuthLayout from "@/components/layouts/Auth-Layout";

export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
});
