import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "@/features/auth/components/login-form";
import { searchParamsSchema } from "@/features/auth/schema/searchParams.schema";

export const Route = createFileRoute("/_auth/login")({
  component: LoginForm,
  validateSearch: searchParamsSchema,
});
