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
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import clsx from "clsx";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SelectPayers from "./expense-form/Select-Payers";
import useCreateExpense from "../hooks/useCreateExpense";
import SubmitButton from "@/components/form/Submit-Button";
import SplitBillComponent from "./expense-form/Split-Component";
import { ChevronRight, PlusCircle, Receipt, UsersRound } from "lucide-react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import useGetGroupMembers from "@/features/groups/hooks/useGetGroupMembers";
import useGetExpenseCategoriesByGroup from "@/features/expense-category/hooks/useGetExpenseCategoriesByGroup";
import { ScrollArea } from "@/components/ui/scroll-area";

type CreateExpenseBillProps = {
  groupId: number;
};

export default function CreateExpenseBill({ groupId }: CreateExpenseBillProps) {
  const [open, setOpen] = useState(false);
  const [bottomType, setBottomType] = useState<null | "payer" | "split">(null);

  const {
    control,
    setValue,
    isError,
    isPending,
    serverError,
    onFormSubmit,
    handleSubmit,
    formState: { errors },
  } = useCreateExpense({ groupId, setOpen });

  // payers error
  const hasPayersError = errors.payers?.length && errors.payers.length > 0;

  // split error
  const hasSplitError = errors.split ? true : false;

  const { data: categories } = useGetExpenseCategoriesByGroup({ groupId });

  const categoryItems = categories
    ? categories.map((category) => ({
        value: String(category.id),
        label: category.name,
      }))
    : [];

  const { data: groupMembers } = useGetGroupMembers({ groupId });

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger
        render={
          <Button>
            <PlusCircle />
            Add Bill
          </Button>
        }
      />
      <DialogContent className={"min-w-md"}>
        <DialogHeader>
          <DialogTitle>Add Expense Bill</DialogTitle>
          <DialogDescription>Enter details and click save.</DialogDescription>
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
                  name="amount"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Amount
                        <span className="text-rose-500">*</span>
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        value={field.value}
                        aria-invalid={fieldState.invalid}
                        placeholder="e.g. 200.50"
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

                <div className="space-y-2">
                  <FieldLabel
                    className={clsx({
                      "text-destructive": hasPayersError,
                    })}
                  >
                    Payers
                    <span className="text-rose-500">*</span>
                  </FieldLabel>

                  <Item
                    variant={"outline"}
                    className={clsx("hover:bg-muted cursor-pointer", {
                      "border-destructive": hasPayersError,
                    })}
                    onClick={() => setBottomType("payer")}
                  >
                    <ItemMedia>
                      <UsersRound
                        className={clsx("size-4", {
                          "text-destructive": hasPayersError,
                        })}
                      />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle
                        className={clsx({
                          "text-destructive": hasPayersError,
                        })}
                      >
                        Add Payers
                      </ItemTitle>
                    </ItemContent>
                    <ItemActions>
                      <ChevronRight className="size-4" />
                    </ItemActions>
                  </Item>
                  {hasPayersError && (
                    <FieldError>
                      Please resolve payers errors to proceed further.
                    </FieldError>
                  )}
                </div>

                {/* payer bottom side  */}
                {bottomType === "payer" && (
                  <SelectPayers
                    control={control}
                    groupMembers={groupMembers ?? []}
                  />
                )}

                <div className="space-y-2">
                  <FieldLabel
                    className={clsx({
                      "text-destructive": hasSplitError,
                    })}
                  >
                    Split
                    <span className="text-rose-500">*</span>
                  </FieldLabel>

                  <Item
                    variant={"outline"}
                    className={clsx("hover:bg-muted cursor-pointer", {
                      "border-destructive": hasSplitError,
                    })}
                    onClick={() => setBottomType("split")}
                  >
                    <ItemMedia>
                      <Receipt
                        className={clsx("size-4", {
                          "text-destructive": hasSplitError,
                        })}
                      />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle
                        className={clsx({
                          "text-destructive": hasSplitError,
                        })}
                      >
                        Split Bill
                      </ItemTitle>
                      <ItemDescription className="text-xs">
                        If not splitted, Amount is splitted equally with all
                        members.
                      </ItemDescription>
                    </ItemContent>
                    <ItemActions>
                      <ChevronRight className="size-4" />
                    </ItemActions>
                  </Item>
                  {hasSplitError && (
                    <FieldError>
                      Please resolve split errors to proceed further.
                    </FieldError>
                  )}
                </div>

                {bottomType === "split" && (
                  <SplitBillComponent
                    control={control}
                    groupMembers={groupMembers ?? []}
                    setValue={setValue}
                    errors={errors}
                  />
                )}
              </div>
            </ScrollArea>
          </div>

          <DialogFooter>
            <DialogClose render={<Button variant={"outline"}>Close</Button>} />
            <SubmitButton
              isPending={isPending}
              label="Save Bill"
              labelWhenPending="Saving"
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
