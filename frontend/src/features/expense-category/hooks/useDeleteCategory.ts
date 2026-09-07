import { MUTATION_KEYS } from "@/constants/mutationKeys";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { deleteCategory } from "../api/expenseCategory.api";

type useDeleteCategoryProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function useDeleteCategory({ setOpen }: useDeleteCategoryProps) {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationKey: [MUTATION_KEYS.DELETE_CATEGORY],
    mutationFn: deleteCategory,
    onSuccess: () => {
      toast.success("Category deleted successfully!");
      setOpen(false);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.EXPENSE_CATEGORY],
      });
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const onDelete = (categoryId: number) => {
    mutate(categoryId);
  };

  return {
    isPending,
    onDelete,
  };
}
