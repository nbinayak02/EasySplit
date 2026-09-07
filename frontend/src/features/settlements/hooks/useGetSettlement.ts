import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { getSettlement } from "../api/settlement.api";

type Props = {
  id?: number;
};

export default function useGetSettlement({ id }: Props) {
  return useQuery({
    queryKey: [QUERY_KEYS.SETTLEMENT, id],
    queryFn: () => getSettlement(id),
    enabled: !!id,
  });
}
