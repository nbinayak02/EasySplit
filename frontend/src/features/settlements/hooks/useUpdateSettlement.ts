import {
  updateSettlementSchema,
  type UpdateSettlementForm,
  type UpdateSettlementPayload,
} from "../schema/settlement.schema";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { QUERY_KEYS } from "@/constants/queryKeys";
import type { Dispatch, SetStateAction } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { MUTATION_KEYS } from "@/constants/mutationKeys";
import { updateSettlement } from "../api/settlement.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: number;
  groupId: number;
};

export default function useUpdateSettlement({ groupId, setOpen, id }: Props) {
  const form = useForm<UpdateSettlementForm, unknown, UpdateSettlementPayload>({
    resolver: zodResolver(updateSettlementSchema),
    defaultValues: {
      id: id,
      amount: "",
      paid_to: "",
      group: groupId,
      paid_by: NaN,
    },
  });

  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: [MUTATION_KEYS.UPDATE_SETTLEMENT, id],
    mutationFn: updateSettlement,
    onSuccess: () => {
      form.reset();
      toast.success("Settlement updated successfully.");
      setOpen(false);

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SETTLEMENT, "group", groupId],
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GROUP_BALANCE, groupId],
      });
    },
  });

  const onUpdate = (data: UpdateSettlementPayload) => {
    mutate(data);
  };

  return {
    ...form,
    onUpdate,
    isPending,
    isError,
    serverError: error,
  };
}
