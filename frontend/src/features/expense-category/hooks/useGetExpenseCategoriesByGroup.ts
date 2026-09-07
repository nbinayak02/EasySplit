import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { getExpenseCategoryByGroupId } from "../api/expenseCategory.api";

type Props = {
  groupId?: number;
};

export default function useGetExpenseCategoriesByGroup({ groupId }: Props) {
  return useQuery({
    queryKey: [QUERY_KEYS.EXPENSE_CATEGORY,"group", groupId],
    queryFn: () => getExpenseCategoryByGroupId(groupId),
    enabled: !!groupId,
  });
}
