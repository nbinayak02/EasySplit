import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { updateExpenseInfo } from "../api/expense.api";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, SetStateAction } from "react";
import { MUTATION_KEYS } from "@/constants/mutationKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateExpenseInfoSchema,
  type UpdateExpenseInfoSchema,
} from "../schema/updateExpense.schema";

type Props = {
  groupId: number;
  expenseId: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function useUpdateExpenseInfo({
  groupId,
  expenseId,
  setOpen,
}: Props) {
  const form = useForm({
    resolver: zodResolver(updateExpenseInfoSchema),
    defaultValues: {
      id: expenseId,
      title: "",
      category: "",
    },
  });

  console.log(form.formState.errors);
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: [MUTATION_KEYS.UPDATE_EXPENSE],
    mutationFn: updateExpenseInfo,
    onSuccess: () => {
      toast.success("Expense bill updated successfully!");
      setOpen(false);
      form.reset();
      // invalidate expense
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GROUP_EXPENSES, groupId],
      });
    },

    onError: (error) => {
      toast.error(error?.message ?? "Something went wrong!");
    },
  });

  const onFormSubmit = (data: UpdateExpenseInfoSchema) => {
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
