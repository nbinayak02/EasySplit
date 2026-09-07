import { toast } from "sonner";
import { QUERY_KEYS } from "@/constants/queryKeys";
import type { Dispatch, SetStateAction } from "react";
import { deleteSettlement } from "../api/settlement.api";
import { MUTATION_KEYS } from "@/constants/mutationKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  groupId: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function useDeleteSettlement({ setOpen, groupId }: Props) {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationKey: [MUTATION_KEYS.DELETE_SETTLEMENT, groupId],
    mutationFn: deleteSettlement,
    onSuccess: () => {
      toast.success("Settlement deleted successfully!");

      setOpen(false);

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SETTLEMENT, groupId],
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GROUP_BALANCE, groupId],
      });
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const onDelete = (settlementId: number) => {
    mutate(settlementId);
  };

  return {
    isPending,
    onDelete,
  };
}
