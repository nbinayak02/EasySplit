import type {
  CreateExpenseForm,
  CreateExpensePayload,
} from "../../schema/expense.schema";
import {
  Controller,
  type Control,
  type ControllerRenderProps,
  type FieldErrors,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import type { GroupMemberList } from "@/features/groups/types/group.types";

type SplitUnequallyProps = {
  control: Control<CreateExpenseForm, unknown, CreateExpensePayload>;
  groupMembers: GroupMemberList[];
  type: "PERCENTAGE" | "AMOUNT";
  errors: FieldErrors<CreateExpenseForm>;
};

export default function SplitUnequally({
  control,
  groupMembers,
  type,
  errors,
}: SplitUnequallyProps) {
  // transform members
  const groupMemberItems = groupMembers
    ? groupMembers.map((member) => ({
        value: member.user.id,
        label: member.user.first_name.concat(" ", member.user.last_name),
      }))
    : [];

  // handleCheckedChange
  const handleCheckedChange = (
    isChecked: boolean,
    field: ControllerRenderProps<CreateExpenseForm, "split.shares">,
    id: number,
  ) => {
    if (isChecked) {
      field.onChange([...field.value, { id, amount: "" }]);
    } else {
      const filteredData = field.value.filter(
        (existingId) => existingId.id !== id,
      );
      field.onChange(filteredData);
    }
  };

  // handle amount changed
  const handleAmountChanged = (
    field: ControllerRenderProps<CreateExpenseForm, "split.shares">,
    amount: string,
    id: number,
  ) => {
    const memberShareIndex = field.value.findIndex((share) => share.id === id);

    if (memberShareIndex !== -1) {
      const shareCopy = [...field.value];
      shareCopy[memberShareIndex] = { id, amount };
      field.onChange(shareCopy);
    }
  };

  return (
    <Controller
      control={control}
      name="split.shares"
      render={({ field, fieldState }) => (
        <FieldGroup>
          {groupMemberItems.map((member, index) => {
            // find the share of member
            const memberShare = field.value.find(
              (share) => share.id === member.value,
            );

            // convert to boolean for checked
            const isMemberSelected = memberShare ? true : false;

            return (
              <div
                key={member.value}
                className="flex flex-row justify-between items-center"
                data-invalid={fieldState.invalid}
              >
                <Checkbox
                  checked={isMemberSelected}
                  onCheckedChange={(isChecked) =>
                    handleCheckedChange(isChecked, field, member.value)
                  }
                  id={`checkbox-${member.value}`}
                />

                <FieldLabel
                  htmlFor={`checkbox-${member.value}`}
                  className="font-bold max-w-40 line-clamp-1"
                >
                  {member.label}
                </FieldLabel>

                <p>ows</p>
                <div className="flex flex-col items-center">
                  <div className="flex flex-row gap-3 items-center">
                    {type === "AMOUNT" && <p>Rs. </p>}
                    <Input
                      type="text"
                      disabled={!isMemberSelected}
                      placeholder={`Enter ${type.toLowerCase()}`}
                      value={memberShare?.amount ?? ""}
                      className="max-w-25"
                      onChange={(event) =>
                        handleAmountChanged(
                          field,
                          event.target.value,
                          member.value,
                        )
                      }
                    />
                    {type === "PERCENTAGE" && <p>%</p>}
                  </div>
                  {errors.split?.shares?.length && (
                    <FieldError>
                      {errors.split.shares[index]?.amount?.message}
                    </FieldError>
                  )}
                </div>
              </div>
            );
          })}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </FieldGroup>
      )}
    />
  );
}
