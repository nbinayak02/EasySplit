import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MUTATION_KEYS } from "@/constants/mutationKeys";
import { toast } from "sonner";
import type { Dispatch, SetStateAction } from "react";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { UpdateGroupSchema } from "../schema/group.schema";
import { updateGroup } from "../api/group.api";
import type { APIErrorResponse } from "@/lib/types";

type Props = {
  groupId: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function useUpdateGroup({ setOpen, groupId }: Props) {
  const form = useForm({
    resolver: zodResolver(UpdateGroupSchema),
    defaultValues: {
      description: "",
      name: "",
    },
  });

  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: [MUTATION_KEYS.UPDATE_GROUP, groupId],
    mutationFn: updateGroup,
    onSuccess: (data) => {
      toast.success("Group updated successfully.");
      setOpen(false);
      form.reset();

      // invalidate by group id
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GROUP, groupId],
      });

      // also invalidate by public group id
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GROUP, "publicId", data.group_id],
      });
    },

    onError: (error: APIErrorResponse) => {
      const responseError = error.errors;

      if (responseError["detail"]) toast.error(responseError["detail"]);
    },
  });

  const onUpdate = (data: UpdateGroupSchema) => {
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
