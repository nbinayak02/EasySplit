import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  changePasswordSchema,
  type ChangePasswordSchema,
} from "../schema/user.schema";
import { useMutation } from "@tanstack/react-query";
import { MUTATION_KEYS } from "@/constants/mutationKeys";
import { updatePassword } from "../api/profile.api";
import { toast } from "sonner";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function useChangePassword({ setOpen }: Props) {
  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      confirmPassword: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: [MUTATION_KEYS.UPDATE_PASSWORD],
    mutationFn: updatePassword,
    onSuccess: () => {
      toast.success("Password changed successfully.");
      setOpen(false);
    },
  });

  const onChangePassword = (data: ChangePasswordSchema) => {
    mutate(data);
  };

  return {
    ...form,
    onChangePassword,
    isPending,
  };
}
