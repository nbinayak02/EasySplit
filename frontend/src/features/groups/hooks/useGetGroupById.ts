import { QUERY_KEYS } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getGroupById } from "../api/group.api";

export default function useGetGroupById(groupId: number) {
  return useQuery({
    queryKey: [QUERY_KEYS.GROUP, groupId],
    queryFn: () => getGroupById(groupId),
    enabled: !!groupId,
  });
}
