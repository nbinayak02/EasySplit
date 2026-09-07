import { QUERY_KEYS } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getGroupExpenses } from "../api/group.api";

type Props = {
  groupId?: number;
};

export default function useGetGroupExpenses({ groupId }: Props) {
  return useQuery({
    queryKey: [QUERY_KEYS.GROUP_EXPENSES, groupId],
    queryFn: () => getGroupExpenses(groupId),
  });
}
