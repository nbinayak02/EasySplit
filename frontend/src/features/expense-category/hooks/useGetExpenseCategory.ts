import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { getIndividualExpenseCategory } from "../api/expenseCategory.api";

type Props = {
  categoryId?: number;
};

export default function useGetExpenseCategory({ categoryId }: Props) {
  return useQuery({
    queryKey: [QUERY_KEYS.EXPENSE_CATEGORY, categoryId],
    queryFn: () => getIndividualExpenseCategory(categoryId),
    enabled: !!categoryId,
  });
}
