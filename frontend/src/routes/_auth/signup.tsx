import { createFileRoute } from "@tanstack/react-router";
import { SignupForm } from "@/features/auth/components/signup-form";
import { searchParamsSchema } from "@/features/auth/schema/searchParams.schema";

export const Route = createFileRoute("/_auth/signup")({
  component: SignupForm,
  validateSearch: searchParamsSchema,
});
