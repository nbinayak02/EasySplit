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
import { useState } from "react";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useJoinGroup from "../hooks/useJoinGroup";
import SubmitButton from "@/components/form/Submit-Button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { UserPlus } from "lucide-react";

export default function JoinGroupDialog() {
  const [open, setOpen] = useState(false);
  const { control, isPending, handleSubmit, onFormSubmit } = useJoinGroup({
    updateStateOnSuccess: setOpen,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant={"secondary"} />}>
        <UserPlus />
        <span className="hidden md:block">Join Group</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join Group</DialogTitle>
          <DialogDescription>Enter group id and click join.</DialogDescription>
        </DialogHeader>
        <form className="mt-2 space-y-4" onSubmit={handleSubmit(onFormSubmit)}>
          <Controller
            name="group_id"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Group ID
                  <span className="text-rose-500">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  value={field.value ?? ""}
                  aria-invalid={fieldState.invalid}
                  placeholder="Group ID"
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
              label="Join Group"
              labelWhenPending="Joining"
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
