import { QUERY_KEYS } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../api/profile.api";

export default function useGetUserProfile() {
  return useQuery({
    queryKey: [QUERY_KEYS.USER],
    queryFn: getUserProfile,
  });
}
