import { QUERY_KEYS } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getGroupBalance } from "../api/balance.api";

type Props = {
  groupId?: number;
};


export default function useGetGroupBalances({ groupId }: Props) {
  return useQuery({
    queryKey: [QUERY_KEYS.GROUP_BALANCE, groupId],
    queryFn: () => getGroupBalance(groupId),
  });
}
