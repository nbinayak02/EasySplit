import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "@/components/form/Submit-Button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import useGetGroupById from "../hooks/useGetGroupById";
import useUpdateGroup from "../hooks/useUpdateGroup";

type Props = {
  groupId: number;
};

export default function UpdateGroupDialog({ groupId }: Props) {
  const [open, setOpen] = useState(false);
  const { data } = useGetGroupById(groupId);

  const {
    control,
    isPending,
    handleSubmit,
    reset,
    onUpdate,
  } = useUpdateGroup({ setOpen, groupId });

  useEffect(() => {
    // reset form default value once data arrives
    if (data)
      reset({
        description: data.description,
        name: data.name,
        id: data.id,
      });
  }, [data, reset]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>
        <Edit2 />
        <span>Update Group</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Group</DialogTitle>
          <DialogDescription>
            Enter group details and click update.
          </DialogDescription>
        </DialogHeader>
        <form className="mt-2 space-y-4" onSubmit={handleSubmit(onUpdate)}>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Group Name
                  <span className="text-rose-500">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  value={field.value ?? ""}
                  aria-invalid={fieldState.invalid}
                  placeholder="Pokhara Trip"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />{" "}
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                <Textarea
                  {...field}
                  id={field.name}
                  value={field.value ?? ""}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <DialogFooter>
            <DialogClose render={<Button variant={"outline"} />}>
              Cancel
            </DialogClose>
            <SubmitButton
              isPending={isPending}
              label="Update"
              labelWhenPending="Updating"
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
