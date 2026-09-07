/* eslint-disable react-hooks/exhaustive-deps */
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import SubmitButton from "@/components/form/Submit-Button";
import useGetExpenseCategory from "../hooks/useGetExpenseCategory";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import useUpdateExpenseCategory from "../hooks/useUpdateExpenseCategory";
import { useEffect, type Dispatch, type SetStateAction } from "react";

type Props = {
  categoryId: number;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function UpdateExpenseCategory({
  open,
  setOpen,
  categoryId,
}: Props) {
  const {
    data: category,
    isPending,
    isError,
    error,
  } = useGetExpenseCategory({
    categoryId,
  });

  const {
    onUpdate,
    handleSubmit,
    control,
    isError: isUpdateError,
    isPending: isUpdatePending,
    serverError,
    reset,
  } = useUpdateExpenseCategory({
    setOpen,
    categoryId,
  });

  useEffect(() => {
    // reset form default value once data arrives
    if (category) reset({ id: category.id, name: category.name });
  }, [category]);

  if (isError) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Error</DialogTitle>
          </DialogHeader>
          <FieldError>{error.message}</FieldError>
          <DialogFooter>
            <DialogClose render={<Button />}>Close</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>
          <DialogDescription>Enter details and click update.</DialogDescription>
        </DialogHeader>
        {isPending ? (
          <Skeleton className="w-full h-30 mt-2" />
        ) : (
          <form className="mt-2 space-y-4" onSubmit={handleSubmit(onUpdate)}>
            {isUpdateError && <FieldError>{serverError?.message}</FieldError>}

            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Category Name
                    <span className="text-rose-500">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Food"
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
                isPending={isUpdatePending}
                label="Update"
                labelWhenPending="Updating"
              />
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
