import { useForm } from "react-hook-form";
import { type UpdateUserForm, updateUserSchema } from "../schema/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MUTATION_KEYS } from "@/constants/mutationKeys";
import { updateUserProfile } from "../api/profile.api";
import { toast } from "sonner";
import type { Dispatch, SetStateAction } from "react";
import { QUERY_KEYS } from "@/constants/queryKeys";

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function useUpdateProfile({ setOpen }: Props) {
  const form = useForm({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
    },
  });

  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: [MUTATION_KEYS.UPDATE_USER],
    mutationFn: updateUserProfile,
    onSuccess: () => {
      toast.success("Profile updated successfully.");
      setOpen(false);
      form.reset();
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GROUP_MEMBERS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USER],
      });
    },
  });

  const onUpdate = (data: UpdateUserForm) => {
    mutate(data);
  };

  return {
    ...form,
    isPending,
    isError,
    serverError: error,
    onUpdate,
  };
}
