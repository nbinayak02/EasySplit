import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  CreateExpenseForm,
  CreateExpensePayload,
} from "../../schema/expense.schema";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, XCircle } from "lucide-react";
import {
  Controller,
  useFieldArray,
  useWatch,
  type Control,
} from "react-hook-form";
import type { GroupMemberList } from "@/features/groups/types/group.types";

type SelectPayersProps = {
  control: Control<CreateExpenseForm, unknown, CreateExpensePayload>;
  groupMembers: GroupMemberList[];
};

export default function SelectPayers({
  control,
  groupMembers,
}: SelectPayersProps) {
  const { fields, append, remove } = useFieldArray({
    name: "payers",
    control,
  });

  const groupMemberItems = groupMembers
    ? groupMembers.map((member) => ({
        value: member.user.id,
        label: member.user.first_name.concat(" ", member.user.last_name),
      }))
    : [];

  // get split type from rhf state
  const amount = useWatch({
    control,
    name: "amount",
    defaultValue: "0",
  });

  const inputAmount = useWatch({
    control,
    name: "payers",
    defaultValue: [],
  });

  const totalInputAmount = inputAmount.reduce(
    (total, current) => total + Number(current.amount),
    0,
  );

  return (
    <div className="bg-accent flex flex-col mt-2 py-4 px-2 rounded-xl gap-4">
      {fields.map((field, index) => (
        <FieldGroup key={field.id}>
          <div className="flex flex-row gap-2">
            <Controller
              name={`payers.${index}.id`}
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Select
                    onValueChange={field.onChange}
                    items={groupMemberItems}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a member" />
                    </SelectTrigger>
                    <SelectContent
                      className="w-full"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectGroup>
                        <SelectLabel>Group Members</SelectLabel>
                        {groupMemberItems.length > 0 ? (
                          groupMemberItems.map((member) => (
                            <SelectItem value={member.value} key={member.value}>
                              {member.label}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectLabel className="text-sm py-2 text-center">
                            No group members found!
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
            <Controller
              name={`payers.${index}.amount`}
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    placeholder="Amount"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Button
              size={"icon-lg"}
              variant={"destructive"}
              onClick={() => {
                if (fields.length > 1) {
                  remove(index);
                } else {
                  toast.error("At least one payer is required.");
                }
              }}
            >
              <XCircle />
            </Button>
          </div>
        </FieldGroup>
      ))}
      <div className="flex flex-row items-center justify-between">
        <p>Amount left: {Number(amount) - totalInputAmount}</p>
        <Button
          className="self-end"
          disabled={fields.length === groupMemberItems.length}
          onClick={() => {
            if (fields.length <= groupMemberItems.length)
              append({
                amount: "",
                id: NaN,
              });
          }}
        >
          <PlusCircle />
          Add Payer
        </Button>
      </div>
    </div>
  );
}
