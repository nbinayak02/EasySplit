import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { getExpenseInfo } from "../api/expense.api";

type Props = {
  expenseId?: number;
};

export default function useGetExpenseInfo({ expenseId }: Props) {
  return useQuery({
    queryKey: [QUERY_KEYS.EXPENSE_BILL, "expense", expenseId],
    queryFn: () => getExpenseInfo(expenseId),
    enabled: !!expenseId,
  });
}
