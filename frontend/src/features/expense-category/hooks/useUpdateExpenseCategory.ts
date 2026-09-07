import {
  updateExpenseCategorySchema,
  type UpdateExpenseCategory,
} from "../schema/expense-category.schema";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { QUERY_KEYS } from "@/constants/queryKeys";
import type { Dispatch, SetStateAction } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { MUTATION_KEYS } from "@/constants/mutationKeys";
import { updateCategory } from "../api/expenseCategory.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  categoryId: number;
};

export default function useUpdateExpenseCategory({
  setOpen,
  categoryId,
}: Props) {
  const form = useForm({
    resolver: zodResolver(updateExpenseCategorySchema),
    defaultValues: {
      id: categoryId,
      name: "",
    },
  });

  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: [MUTATION_KEYS.UPDATE_CATEGORY],
    mutationFn: updateCategory,
    onSuccess: () => {
      toast.success("Category updated successfully.");
      setOpen(false);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.EXPENSE_CATEGORY],
      });
    },
  });

  const onUpdate = (data: UpdateExpenseCategory) => {
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
