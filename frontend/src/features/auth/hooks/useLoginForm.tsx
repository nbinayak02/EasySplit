import { toast } from "sonner";
import { login } from "../api/auth.api";
import { useForm } from "react-hook-form";
import type { APIErrorResponse } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { MUTATION_KEYS } from "@/constants/mutationKeys";
import { LoginSchema, type LoginSchemaType } from "../schema/login.schema";

type LoginFormProps = {
  executeCallbackOnSuccess: () => void;
};

export default function useLoginForm({
  executeCallbackOnSuccess,
}: LoginFormProps) {
  const form = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const { mutate, isPending, isSuccess, error, isError } = useMutation({
    mutationKey: [MUTATION_KEYS.LOGIN],
    mutationFn: login,
    onSuccess: () => {
      toast.success("Login Successfull!");
      executeCallbackOnSuccess();
    },
    onError: (error) => {
      const errorCause = error.cause as APIErrorResponse;
      toast.error(errorCause.errors?.detail);
    },
  });

  const onSubmitForm = (data: LoginSchemaType) => {
    mutate(data);
  };

  return {
    ...form,
    onSubmitForm,
    isPending,
    isSuccess,
    serverError: error,
    isError,
  };
}
