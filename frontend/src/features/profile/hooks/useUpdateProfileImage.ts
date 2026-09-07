import { useForm } from "react-hook-form";
import {
  updateProfilePictureSchema,
  type UpdateUserProfileForm,
} from "../schema/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MUTATION_KEYS } from "@/constants/mutationKeys";
import { updateProfilePicture } from "../api/profile.api";
import { toast } from "sonner";
import type { Dispatch, SetStateAction } from "react";
import { QUERY_KEYS } from "@/constants/queryKeys";

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function useUpdateProfileImage({ setOpen }: Props) {
  const form = useForm({
    resolver: zodResolver(updateProfilePictureSchema),
  });

  const querClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: [MUTATION_KEYS.UPDATE_USER_PROFILE_PICTURE],
    mutationFn: updateProfilePicture,
    onSuccess: () => {
      toast.success("Profile updated successfully.");
      setOpen(false);
      form.reset();
      querClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USER],
      });
    },
  });

  const onUpdate = (data: UpdateUserProfileForm) => {
    const formData = new FormData();

    formData.append("profile_image", data.profile_image);

    mutate(formData);
  };

  return {
    ...form,
    isPending,
    isError,
    serverError: error,
    onUpdate,
  };
}
