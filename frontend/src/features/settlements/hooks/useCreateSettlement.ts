import {
  type CreateSettlementForm,
  createSettlementSchema,
  type CreateSettlementPayload,
} from "../schema/settlement.schema";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { QUERY_KEYS } from "@/constants/queryKeys";
import type { APIErrorResponse } from "@/lib/types";
import type { Dispatch, SetStateAction } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { MUTATION_KEYS } from "@/constants/mutationKeys";
import { createSettlement } from "../api/settlement.api";
import useUserContext from "@/contexts/user/useUserContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  groupId: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function useCreateSettlement({ groupId, setOpen }: Props) {
  const { user } = useUserContext();

  const form = useForm<CreateSettlementForm, unknown, CreateSettlementPayload>({
    resolver: zodResolver(createSettlementSchema),
    defaultValues: {
      amount: "",
      group: groupId,
      paid_by: user.id,
      paid_to: "",
    },
  });

  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: [MUTATION_KEYS.CREATE_SETTLEMENT, groupId],
    mutationFn: createSettlement,
    onSuccess: () => {
      toast.success("Settled up successfully!");
      setOpen(false);
      // invalidate settlements
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SETTLEMENT, groupId],
      });

      // invalidate balances
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GROUP_BALANCE, groupId],
      });
    },

    onError: (error: APIErrorResponse) => {
      const nonFieldErrors = error.errors.non_field_errors;
      if (Array.isArray(nonFieldErrors)) toast.error(nonFieldErrors[0]);
    },
  });

  const onFormSubmit = (data: CreateSettlementPayload) => {
    mutate(data);
  };

  return {
    ...form,
    onFormSubmit,
    isPending,
    isError,
    serverError: error,
  };
}
