import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { getSimplifiedSettlementTransactions } from "../api/settlement.api";

type Props = {
  groupId?: number;
};

export default function useGetSimplifiedSettlement({ groupId }: Props) {
  const { data, ...options } = useQuery({
    queryKey: [QUERY_KEYS.SIMPLIFIED_SETTLEMENT, groupId],
    queryFn: () => getSimplifiedSettlementTransactions(groupId),
    enabled: !!groupId,
  });

  return {
    data: data ?? [],
    ...options,
  };
}
