import {
  expenseSchema,
  type CreateExpenseForm,
  type CreateExpensePayload,
} from "../schema/expense.schema";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { createExpense } from "../api/expense.api";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, SetStateAction } from "react";
import { MUTATION_KEYS } from "@/constants/mutationKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type useCreateExpenseProps = {
  groupId: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function useCreateExpense({
  groupId,
  setOpen,
}: useCreateExpenseProps) {
  const form = useForm<CreateExpenseForm, unknown, CreateExpensePayload>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      title: "",
      amount: "",
      category: "",
      group: String(groupId),
      payers: [
        {
          id: NaN,
          amount: "",
        },
      ],
      split: {
        type: "EQUALLY",
        participants: [],
        shares: [],
      },
    },
  });

  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: [MUTATION_KEYS.CREATE_EXPENSE_BILL],
    mutationFn: createExpense,
    onSuccess: () => {
      toast.success("Expense bill added successfully!");
      setOpen(false);
      form.reset();
      // invalidate expense
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GROUP_EXPENSES, groupId],
      });

      // invalidate balance
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GROUP_BALANCE, groupId],
      });

      // invalidate simplified settlement
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SIMPLIFIED_SETTLEMENT, groupId],
      });
    },
  });

  const onFormSubmit = (data: CreateExpensePayload) => {
    mutate(data);
  };

  return {
    ...form,
    isPending,
    isError,
    serverError: error,
    onFormSubmit,
  };
}
