import { toast } from "sonner";
import { leaveGroup } from "../api/group.api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import type { Dispatch, SetStateAction } from "react";
import { MUTATION_KEYS } from "@/constants/mutationKeys";

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  groupId: number;
};

export default function useLeaveGroup({ setOpen, groupId }: Props) {
  const navigate = useNavigate();
  const { isPending, mutate } = useMutation({
    mutationKey: [MUTATION_KEYS.LEAVE_GROUP, groupId],
    mutationFn: leaveGroup,
    onSuccess: () => {
      toast.success("Group left successfully!");
      setOpen(false);
      navigate({ to: "/group" });
    },
    onError: (error) => {
      toast.error(error?.message ?? "Something went wrong!");
    },
  });

  const onDelete = (groupId: number) => {
    mutate(groupId);
  };

  return {
    isPending,
    onDelete,
  };
}
