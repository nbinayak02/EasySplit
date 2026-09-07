import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit2 } from "lucide-react";
import { useEffect, useState } from "react";
import useUpdateProfile from "../hooks/useUpdateProfile";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/form/Submit-Button";
import useGetUserProfile from "../hooks/useGetUserProfile";

export default function UpdateProfileDialog() {
  const [open, setOpen] = useState(false);
  const { data } = useGetUserProfile();

  const {
    control,
    onUpdate,
    handleSubmit,
    isError,
    isPending,
    serverError,
    reset,
  } = useUpdateProfile({ setOpen });

  useEffect(() => {
    // reset form default value once data arrives
    if (data)
      reset({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
      });
  }, [data, reset]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button>
            <Edit2 />
            Update
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
          <DialogDescription>Enter details and click update.</DialogDescription>
        </DialogHeader>
        <form
          className={"flex flex-col gap-6"}

          onSubmit={handleSubmit(onUpdate)}
        >
          {isError && <FieldError>{serverError?.message}</FieldError>}
          <FieldGroup className="flex flex-row justify-between">
            <Controller
              name="first_name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    First Name
                    <span className="text-rose-500">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    value={field.value ?? ""}
                    aria-invalid={fieldState.invalid}
                    placeholder="John"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="last_name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Last Name
                    <span className="text-rose-500">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Doe"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Email
                  <span className="text-rose-500">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  value={field.value ?? ""}
                  aria-invalid={fieldState.invalid}
                  placeholder="john@email.com"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Field>
            <SubmitButton
              isPending={isPending}
              label="Update"
              labelWhenPending="Updating"
            />
          </Field>
        </form>
      </DialogContent>
    </Dialog>
  );
}
