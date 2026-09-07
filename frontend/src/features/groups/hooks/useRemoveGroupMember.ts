import { toast } from "sonner";
import { removeMember } from "../api/group.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import { MUTATION_KEYS } from "@/constants/mutationKeys";
import { QUERY_KEYS } from "@/constants/queryKeys";

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  groupId: number;
};

export default function useRemoveGroupMember({ setOpen, groupId }: Props) {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationKey: [MUTATION_KEYS.REMOVE_GROUP_MEMBER],
    mutationFn: removeMember,
    onSuccess: () => {
      toast.success("Removed user successfully!");
      setOpen(false);

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GROUP_MEMBERS, groupId],
      });
    },
    onError: (error) => {
      toast.error(error?.message ?? "Something went wrong!");
    },
  });

  const onDelete = (groupId: number, userId: number) => {
    const data = {
      groupId,
      userId,
    };
    mutate(data);
  };

  return {
    isPending,
    onDelete,
  };
}
