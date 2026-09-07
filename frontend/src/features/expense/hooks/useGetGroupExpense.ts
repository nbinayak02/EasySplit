import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { getExpenseByGroupId } from "../api/expense.api";

type useGetGroupExpenseProps = {
  groupId?: number;
};

export default function useGetGroupExpense({
  groupId,
}: useGetGroupExpenseProps) {
  return useQuery({
    queryKey: [QUERY_KEYS.EXPENSE_BILL, groupId],
    queryFn: () => getExpenseByGroupId(groupId),
    enabled: !!groupId,
  });
}
