import { QUERY_KEYS } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getGroupSettlements } from "../api/settlement.api";

type Props = {
  groupId?: number;
};

export default function useGetGroupSettlements({ groupId }: Props) {
  return useQuery({
    queryKey: [QUERY_KEYS.SETTLEMENT, groupId],
    queryFn: () => getGroupSettlements(groupId),
  });
}
