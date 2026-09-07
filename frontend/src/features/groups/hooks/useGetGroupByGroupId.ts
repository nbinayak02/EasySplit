import { QUERY_KEYS } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getGroupByGroupId } from "../api/group.api";

export default function useGetGroupByGroupId(groupId?: string) {
  
  return useQuery({
    queryKey: [QUERY_KEYS.GROUP, "publicId", groupId],
    queryFn: () => getGroupByGroupId(groupId),
    enabled: !!groupId,
  });
}
