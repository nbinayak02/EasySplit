import { QUERY_KEYS } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getGroupMembers } from "../api/group.api";

type useGetGroupMembersProps = {
  groupId?: number;
};
export default function useGetGroupMembers({
  groupId,
}: useGetGroupMembersProps) {
  return useQuery({
    queryKey: [QUERY_KEYS.GROUP_MEMBERS, groupId],
    queryFn: () => getGroupMembers(groupId),
  });
}
