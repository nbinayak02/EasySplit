import { toast } from "sonner";
import { signup } from "../api/auth.api";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { MUTATION_KEYS } from "@/constants/mutationKeys";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { SignupSchema, type SignupFormSchema } from "../schema/signup.schema";
import type { APIErrorResponse } from "@/lib/types";

export default function useSignupForm() {
  const { returnTo } = useSearch({ from: "/_auth/signup" });
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(SignupSchema),
  });

  const { mutate, isSuccess, isPending, error, isError } = useMutation({
    mutationKey: [MUTATION_KEYS.SIGNUP],
    mutationFn: signup,
    onSuccess: () => {
      toast.success("Signup successfull!");
      navigate({ to: "/login", search: { returnTo } });
    },
    onError: (error: APIErrorResponse) => {
      const errors = error?.errors?.email;
      if (Array.isArray(errors)) {
        toast.error(errors[0]);
        return;
      }
      toast.error("Something went wrong!");
    },
  });

  const onSubmitForm = (data: SignupFormSchema) => {
    mutate(data);
  };

  return {
    ...form,
    onSubmitForm,
    isSuccess,
    isPending,
    isError,
    serverError: error,
  };
}
