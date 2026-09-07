import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { getAllGroupsByUser } from "../api/group.api";

export default function useGetGroups() {
  return useQuery({
    queryKey: [QUERY_KEYS.GROUP],
    queryFn: getAllGroupsByUser,
  });
}
