import { toast } from "sonner";
import { MUTATION_KEYS } from "@/constants/mutationKeys";
import { useMutation } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import { deleteUserProfile } from "../api/profile.api";
import { useNavigate } from "@tanstack/react-router";

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function useDeleteUserProfile({ setOpen }: Props) {
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: [MUTATION_KEYS.DELETE_USER],
    mutationFn: deleteUserProfile,
    onSuccess: () => {
      toast.success("User deleted successfully!");
      setOpen(false);
      navigate({ to: "/login", replace: true });
    },
    onError: (error) => {
      toast.error(error?.message ?? "Something went wrong!");
    },
  });

  const onDelete = () => {
    mutate();
  };

  return {
    isPending,
    onDelete,
  };
}
