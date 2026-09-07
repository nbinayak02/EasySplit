/* eslint-disable react-hooks/exhaustive-deps */
import type {
  CreateExpenseForm,
  CreateExpensePayload,
} from "../../schema/expense.schema";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Controller,
  useWatch,
  type Control,
  type ControllerRenderProps,
  type UseFormSetValue,
} from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import type { GroupMemberList } from "@/features/groups/types/group.types";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";

type SplitEquallyProps = {
  control: Control<CreateExpenseForm, unknown, CreateExpensePayload>;
  groupMembers: GroupMemberList[];
  setValue: UseFormSetValue<CreateExpenseForm>;
};

export default function SplitEqually({
  control,
  groupMembers,
  setValue,
}: SplitEquallyProps) {
  // get amount to calculate each person share
  const amount = useWatch({
    control,
    name: "amount",
    defaultValue: "0",
  });

  // format group members
  const groupMemberItems = groupMembers
    ? groupMembers.map((member) => ({
        value: member.user.id,
        label: member.user.first_name.concat(" ", member.user.last_name),
      }))
    : [];

  // default all member are selected
  useEffect(() => {
    const allMemberIds = groupMemberItems.map((member) => member.value);
    setValue("split.participants", allMemberIds);
  }, [groupMemberItems]);

  const handleCheckedChange = (
    isChecked: boolean,
    field: ControllerRenderProps<CreateExpenseForm, "split.participants">,
    id: number,
  ) => {
    if (isChecked) {
      field.onChange([...field.value, id]);
    } else {
      const filteredData = field.value.filter(
        (existingId) => existingId !== id,
      );
      field.onChange(filteredData);
    }
  };

  const calculateAmountOwed = (totalMembers: number) => {
    if (totalMembers === 0) return 0.0;
    const amountOwed = Number(amount) / totalMembers;
    if (isNaN(amountOwed)) return 0.0;
    return amountOwed.toFixed(2);
  };

  const handleSelectAllCheckedChange = (
    isChecked: boolean,
    field: ControllerRenderProps<CreateExpenseForm, "split.participants">,
  ) => {
    if (isChecked) {
      // add all members to participants array
      const allMemberIds = groupMemberItems.map((member) => member.value);
      field.onChange(allMemberIds);
    } else {
      // remove all members from paricipants array
      field.onChange([]);
    }
  };

  return (
    <Controller
      control={control}
      name="split.participants"
      render={({ field, fieldState }) => {
        return (
          <FieldGroup>
            <Field orientation={"horizontal"}>
              <Checkbox
                defaultChecked={true}
                onCheckedChange={(isChecked) =>
                  handleSelectAllCheckedChange(isChecked, field)
                }
                id="select-all"
              />
              <FieldContent>
                <FieldLabel htmlFor="select-all">Select all members</FieldLabel>
              </FieldContent>
            </Field>

            <Separator />

            {groupMemberItems.map((member) => {
              const isChecked = field.value.includes(member.value);

              return (
                <Field
                  orientation={"horizontal"}
                  key={member.value}
                  data-invalid={fieldState.invalid}
                >
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={(isChecked) =>
                      handleCheckedChange(isChecked, field, member.value)
                    }
                    id={`checkbox-${member.value}`}
                  />
                  <FieldContent>
                    <FieldLabel
                      htmlFor={`checkbox-${member.value}`}
                      className="w-full flex flex-row gap-2 justify-between"
                    >
                      <p className="font-bold max-w-40 line-clamp-1">
                        {member.label}
                      </p>
                      <p>ows</p>
                      <p className="font-bold dark:text-emerald-400">
                        Rs.{" "}
                        {field.value.includes(member.value)
                          ? calculateAmountOwed(field.value.length)
                          : "0.00"}
                      </p>
                    </FieldLabel>
                  </FieldContent>
                </Field>
              );
            })}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </FieldGroup>
        );
      }}
    />
  );
}
