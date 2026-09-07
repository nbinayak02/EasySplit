import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { getSettlementStats } from "../api/settlement.api";
import useUserContext from "@/contexts/user/useUserContext";

export default function useGetSettlementStats() {
  const { user } = useUserContext();
  return useQuery({
    queryKey: [QUERY_KEYS.USER_SETTLEMENT_STATS, user.id],
    queryFn: () => getSettlementStats(user.id),
  });
}
