import { toast } from "sonner";
import { deleteGroup } from "../api/group.api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import type { Dispatch, SetStateAction } from "react";
import { MUTATION_KEYS } from "@/constants/mutationKeys";
import type { APIErrorResponse } from "@/lib/types";

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  groupId: number;
};

export default function useDeleteGroup({ setOpen, groupId }: Props) {
  const navigate = useNavigate();
  const { isPending, mutate } = useMutation({
    mutationKey: [MUTATION_KEYS.DELETE_GROUP, groupId],
    mutationFn: deleteGroup,
    onSuccess: () => {
      toast.success("Group deleted successfully!");
      setOpen(false);
      navigate({ to: "/group" });
    },
    onError: (error: APIErrorResponse) => {
      setOpen(false);
      toast.error(error.errors["detail"]);
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
