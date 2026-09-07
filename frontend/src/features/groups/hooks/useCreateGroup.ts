import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { createGroup } from "../api/group.api";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { GroupSchema } from "../schema/group.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, SetStateAction } from "react";
import { MUTATION_KEYS } from "@/constants/mutationKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type useCreateGroupProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function useCreateGroup({ setOpen }: useCreateGroupProps) {
  const form = useForm({
    resolver: zodResolver(GroupSchema),
  });

  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: [MUTATION_KEYS.CREATE_GROUP],
    mutationFn: createGroup,
    onSuccess: () => {
      form.reset();
      setOpen(false);
      toast.success("Group created successfully!");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GROUP],
      });
    },
  });

  const onFormSubmit = (data: GroupSchema) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description ?? "");
    formData.append("profile_image", data.profile_image);

    mutate(formData);
  };

  return {
    ...form,
    isError,
    isPending,
    onFormSubmit,
    serverError: error,
  };
}
