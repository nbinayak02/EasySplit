import { toast } from "sonner";
import { getUser } from "@/features/auth/api/auth.api";
import { createFileRoute, redirect } from "@tanstack/react-router";
import DashboardLayout from "@/components/layouts/Dashboard-Layout";

export const Route = createFileRoute("/_dashboard")({
  component: DashboardLayout,
  beforeLoad: async ({ context }) => {
    const user = await getUser();

    if (user.isAuthenticated === false) {
      toast.error("Please login to continue!");
      throw redirect({
        to: "/login",
        replace: true,
      });
    }

    context.userContext.setUser({
      id: user.id,
      name: user.name,
    });
  },
});
