import { QUERY_KEYS } from "@/constants/queryKeys";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getActivitiesByUser } from "../api/activity.api";

export default function useGetUserActivities() {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.USER_ACTIVITY],
    queryFn: ({ pageParam }) => getActivitiesByUser(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.meta.next,
    getPreviousPageParam: (firstPage) => firstPage.meta.previous,
  });
}
