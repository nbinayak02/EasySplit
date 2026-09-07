import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { joinGroup } from "../api/group.api";
import { QUERY_KEYS } from "@/constants/queryKeys";
import type { APIErrorResponse } from "@/lib/types";
import type { Dispatch, SetStateAction } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { MUTATION_KEYS } from "@/constants/mutationKeys";
import { JoinGroupSchema } from "../schema/group.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type useCreateGroupProps = {
  updateStateOnSuccess?: Dispatch<SetStateAction<boolean>>;
  executeCallbackOnSuccess?: () => void;
  beforeMutation?: () => Promise<void>;
};

export default function useJoinGroup({
  beforeMutation,
  executeCallbackOnSuccess,
  updateStateOnSuccess,
}: useCreateGroupProps) {
  const form = useForm({
    resolver: zodResolver(JoinGroupSchema),
  });

  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: [MUTATION_KEYS.JOIN_GROUP],
    mutationFn: joinGroup,
    onSuccess: () => {
      if (updateStateOnSuccess) updateStateOnSuccess(false);
      if (executeCallbackOnSuccess) executeCallbackOnSuccess();
      toast.success("Group joined successfully!");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GROUP],
      });
    },

    onError: (error: APIErrorResponse) => {
      const responseError = error.errors;

      if (responseError["detail"]) toast.error(responseError["detail"]);
      if (Array.isArray(responseError["non_field_errors"]))
        toast.error(responseError["non_field_errors"][0]);
    },
  });

  const onFormSubmit = async (data: JoinGroupSchema) => {
    if (beforeMutation) beforeMutation();
    mutate(data);
  };

  return {
    ...form,
    isError,
    isPending,
    onFormSubmit,
    serverError: error,
  };
}
