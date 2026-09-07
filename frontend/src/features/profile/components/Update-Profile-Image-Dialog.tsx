import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Image } from "lucide-react";
import { useState } from "react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Controller } from "react-hook-form";
import SubmitButton from "@/components/form/Submit-Button";
import useUpdateProfileImage from "../hooks/useUpdateProfileImage";
import ImageInput from "@/components/form/Image-Input";

export default function UpdateProfilePictureDialog() {
  const [open, setOpen] = useState(false);

  const {
    control,
    onUpdate,
    handleSubmit,
    isError,
    isPending,
    serverError,
  } = useUpdateProfileImage({ setOpen });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button>
            <Image />
            Change Profile Picture
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

          <Controller
            name="profile_image"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Profile Image
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
