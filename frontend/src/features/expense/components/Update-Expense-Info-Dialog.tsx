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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SubmitButton from "@/components/form/Submit-Button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import useGetExpenseCategoriesByGroup from "@/features/expense-category/hooks/useGetExpenseCategoriesByGroup";
import { ScrollArea } from "@/components/ui/scroll-area";
import useUpdateExpenseInfo from "../hooks/useUpdateExpenseInfo";
import useGetExpenseInfo from "../hooks/useGetExpenseInfo";
import { Edit } from "lucide-react";

type Props = {
  groupId: number;
  expenseId: number;
};

export default function UpdateExpenseInfo({ groupId, expenseId }: Props) {
  const [open, setOpen] = useState(false);

  const {
    control,
    isError,
    isPending,
    serverError,
    onFormSubmit,
    handleSubmit,
    reset,
  } = useUpdateExpenseInfo({ groupId, setOpen, expenseId });

  const { data: categories } = useGetExpenseCategoriesByGroup({ groupId });

  const categoryItems = categories
    ? categories.map((category) => ({
        value: String(category.id),
        label: category.name,
      }))
    : [];

  const { data: expenseInfo } = useGetExpenseInfo({ expenseId });

  useEffect(() => {
    if (expenseInfo) {
      reset({
        category: String(expenseInfo.category),
        id: expenseInfo.id,
        title: expenseInfo.title,
      });
    }
  }, [expenseInfo]);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger
        render={
          <Button>
            <Edit />
            Update Bill Info
          </Button>
        }
      />
      <DialogContent className={"min-w-md"}>
        <DialogHeader>
          <DialogTitle>Update Expense Bill</DialogTitle>
          <DialogDescription>Enter details and click update.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className={clsx("grid gap-5 pb-4")}>
            <ScrollArea className={"max-h-100"}>
              <div className="space-y-8 pr-4">
                {isError && <FieldError>{serverError?.message}</FieldError>}

                <Controller
                  name="title"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Title
                        <span className="text-rose-500">*</span>
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        value={field.value}
                        aria-invalid={fieldState.invalid}
                        placeholder="Expense Title"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="category"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Category</FieldLabel>
                      <Select
                        items={categoryItems}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent aria-invalid={fieldState.invalid}>
                          <SelectGroup>
                            <SelectLabel>Expense Categories</SelectLabel>
                            {categoryItems.length > 0 ? (
                              categoryItems.map((category) => (
                                <SelectItem
                                  value={category.value}
                                  key={category.value}
                                >
                                  {category.label}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectLabel className="text-sm text-center py-2">
                                No categories found!
                              </SelectLabel>
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
            </ScrollArea>
          </div>

          <DialogFooter>
            <DialogClose render={<Button variant={"outline"}>Close</Button>} />
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
