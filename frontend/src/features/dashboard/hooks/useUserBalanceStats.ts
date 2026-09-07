import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { getUserBalanceStats } from "../api/dashboard.api";
import useUserContext from "@/contexts/user/useUserContext";

export default function useUserBalanceStats() {
  const { user } = useUserContext();

  return useQuery({
    queryKey: [QUERY_KEYS.USER_BALANCE_STATS, user.id],
    queryFn: () => getUserBalanceStats(user.id),
  });
}
