import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MUTATION_KEYS } from "@/constants/mutationKeys";
import { toast } from "sonner";
import type { Dispatch, SetStateAction } from "react";
import { QUERY_KEYS } from "@/constants/queryKeys";
import {
  UpdateGroupProfilePictureSchema,
  type UpdateGroupProfileSchema,
} from "../schema/group.schema";
import { updateGroupProfilePicture } from "../api/group.api";

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  groupId: number;
};

export default function useUpdateGroupImage({ setOpen, groupId }: Props) {
  const form = useForm({
    resolver: zodResolver(UpdateGroupProfilePictureSchema),
  });

  const querClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: [MUTATION_KEYS.UPDATE_GROUP_PROFILE_PICTURE, groupId],
    mutationFn: updateGroupProfilePicture,
    onSuccess: (data) => {
      toast.success("Profile updated successfully.");
      setOpen(false);
      form.reset();

      // invalidate by group id
      querClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GROUP, groupId],
      });

      // also invalidate by public group id
      querClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GROUP, "publicId", data.group_id]
      })
    },
  });

  const onUpdate = (data: UpdateGroupProfileSchema) => {
    const formData = new FormData();
    formData.append("id", String(data.id));
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
