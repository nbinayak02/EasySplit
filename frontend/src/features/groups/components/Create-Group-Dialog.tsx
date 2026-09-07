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
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useCreateGroup from "../hooks/useCreateGroup";
import ImageInput from "@/components/form/Image-Input";
import SubmitButton from "@/components/form/Submit-Button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

export default function CreateNewGroupDialog() {
  const [open, setOpen] = useState(false);
  const {
    control,
    isError,
    isPending,
    serverError,
    handleSubmit,
    onFormSubmit,
  } = useCreateGroup({ setOpen });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>
        <PlusCircle />
        <span className="hidden md:block">Create New Group</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Group</DialogTitle>
          <DialogDescription>
            Enter group details and click create.
          </DialogDescription>
        </DialogHeader>
        <form className="mt-2 space-y-4" onSubmit={handleSubmit(onFormSubmit)}>
          {isError && <FieldError>{serverError?.message}</FieldError>}
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
            name="profile_image"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="imageInput">
                  Group Profile Image
                  <span className="text-rose-500">*</span>
                </FieldLabel>
                <ImageInput
                  aria-invalid={fieldState.invalid}
                  onFileSelect={field.onChange}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
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
              label="Create Group"
              labelWhenPending="Creating"
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
