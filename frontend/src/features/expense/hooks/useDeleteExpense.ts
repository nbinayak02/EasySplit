import { MUTATION_KEYS } from "@/constants/mutationKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import { deleteExpense } from "../api/expense.api";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/constants/queryKeys";

type Props = {
  groupId: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function useDeleteExpense({ setOpen, groupId }: Props) {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationKey: [MUTATION_KEYS.DELETE_EXPENSE],
    mutationFn: deleteExpense,
    onSuccess: () => {
      toast.success("Expense deleted successfully!");
      setOpen(false);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GROUP_BALANCE, groupId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GROUP_EXPENSES, groupId],
      });
    },
    onError: (error) => {
      toast.error(error?.message ?? "Something went wrong!");
      setOpen(false)
    },
  });

  const onDelete = (expenseId: number) => {
    mutate(expenseId);
  };

  return {
    isPending,
    onDelete,
  };
}
