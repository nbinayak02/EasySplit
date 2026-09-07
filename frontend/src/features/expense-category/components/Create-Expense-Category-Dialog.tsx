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
import { PlusCircle } from "lucide-react";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SubmitButton from "@/components/form/Submit-Button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import useCreateExpenseCategory from "../hooks/useCreateExpenseCategory";

type CreateExpenseCategoryProps = {
  groupId: number;
};

export default function CreateExpenseCategory({
  groupId,
}: CreateExpenseCategoryProps) {
  const [open, setOpen] = useState(false);
  const {
    handleSubmit,
    onSubmitForm,
    control,
    isError,
    serverError,
    isPending,
  } = useCreateExpenseCategory({ setOpen, groupId });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className="self-end"
        render={
          <Button>
            <PlusCircle />
            Add Category
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>Enter details and click add category.</DialogDescription>
        </DialogHeader>
        <form className="mt-2 space-y-4" onSubmit={handleSubmit(onSubmitForm)}>
          {isError && <FieldError>{serverError?.message}</FieldError>}

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
                  value={field.value ?? ""}
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
              isPending={isPending}
              label="Add Category"
              labelWhenPending="Adding"
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
