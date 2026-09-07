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
import { Image } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import SubmitButton from "@/components/form/Submit-Button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import ImageInput from "@/components/form/Image-Input";
import useUpdateGroupImage from "../hooks/useUpdateGroupImage";
import useGetGroupById from "../hooks/useGetGroupById";

type Props = {
  groupId: number;
};

export default function UpdateGroupProfilePictureDialog({ groupId }: Props) {
  const [open, setOpen] = useState(false);
  const { data } = useGetGroupById(groupId);

  const {
    control,
    isError,
    isPending,
    serverError,
    handleSubmit,
    onUpdate,
    reset,
  } = useUpdateGroupImage({ setOpen, groupId });

  useEffect(() => {
    // reset form default value once data arrives
    if (data)
      reset({
        id: data.id,
      });
  }, [data, reset]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>
        <Image />
        <span>Update Profile Picture</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Group Profile Picture</DialogTitle>
          <DialogDescription>
            Enter group details and click update.
          </DialogDescription>
        </DialogHeader>
        <form className="mt-2 space-y-4" onSubmit={handleSubmit(onUpdate)}>
          {isError && <FieldError>{serverError?.message}</FieldError>}
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
