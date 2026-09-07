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
import {  useState } from "react";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/form/Submit-Button";
import useChangePassword from "../hooks/useChangePassword";

export default function UpdatePasswordDialog() {
  const [open, setOpen] = useState(false);

  const { control, onChangePassword, handleSubmit, isPending } =
    useChangePassword({ setOpen });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button>
            <Edit2 />
            Change Password
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>Enter details and click change.</DialogDescription>
        </DialogHeader>
        <form
          className={"flex flex-col gap-6"}

          onSubmit={handleSubmit(onChangePassword)}
        >
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  New Password
                  <span className="text-rose-500">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  type="password"
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
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Confirm Password
                  <span className="text-rose-500">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  type="password"
                  value={field.value ?? ""}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
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
              label="Change"
              labelWhenPending="Changing"
            />
          </Field>
        </form>
      </DialogContent>
    </Dialog>
  );
}
