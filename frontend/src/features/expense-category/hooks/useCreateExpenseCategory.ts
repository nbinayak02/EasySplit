import {
  expenseCategorySchema,
  type CreateExpenseCategory,
} from "../schema/expense-category.schema";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, SetStateAction } from "react";
import { MUTATION_KEYS } from "@/constants/mutationKeys";
import { createExpenseCategory } from "../api/expenseCategory.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type useCreateExpenseCategoryProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  groupId: number;
};

export default function useCreateExpenseCategory({
  setOpen,
  groupId,
}: useCreateExpenseCategoryProps) {
  const form = useForm({
    resolver: zodResolver(expenseCategorySchema),
    defaultValues: {
      name: "",
      group: String(groupId),
    },
  });

  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: [MUTATION_KEYS.CREATE_EXPENSE_CATEGORY],
    mutationFn: createExpenseCategory,
    onSuccess: () => {
      setOpen(false);
      form.reset();
      toast.success("Category created successfully!");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.EXPENSE_CATEGORY],
      });
    },
  });

  const onSubmitForm = (data: CreateExpenseCategory) => {
    mutate(data);
  };

  return {
    ...form,
    onSubmitForm,
    isPending,
    isError,
    serverError: error,
  };
}
