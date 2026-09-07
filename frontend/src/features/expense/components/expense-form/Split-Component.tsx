import type {
  CreateExpenseForm,
  CreateExpensePayload,
} from "../../schema/expense.schema";

import SplitEqually from "./Split-Equally";
import SplitUnequally from "./Split-Unequally";
import type { GroupMemberList } from "@/features/groups/types/group.types";
import {
  useWatch,
  type Control,
  type FieldErrors,
  type UseFormSetValue,
} from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type SplitBillComponentProps = {
  control: Control<CreateExpenseForm, unknown, CreateExpensePayload>;
  groupMembers: GroupMemberList[];
  setValue: UseFormSetValue<CreateExpenseForm>;
  errors: FieldErrors<CreateExpenseForm>;
};

export default function SplitBillComponent({
  control,
  groupMembers,
  setValue,
  errors,
}: SplitBillComponentProps) {
  // get split type from rhf state
  const splitType = useWatch({
    control,
    name: "split.type",
    defaultValue: "EQUALLY",
  });

  return (
    <div className="space-y-4">
      <Tabs
        value={splitType}
        onValueChange={(value) => setValue("split.type", value)}
      >
        <TabsList>
          <TabsTrigger value="EQUALLY">Equally</TabsTrigger>
          <TabsTrigger value="AMOUNT">By Amount</TabsTrigger>
          <TabsTrigger value="PERCENTAGE">By Percentage</TabsTrigger>
        </TabsList>
        <TabsContent
          value="EQUALLY"
          className="bg-muted px-4 py-2 rounded-xl border space-y-4"
        >
          <SplitEqually control={control} groupMembers={groupMembers} setValue={setValue}/>
        </TabsContent>
        <TabsContent
          value="AMOUNT"
          className="bg-muted px-4 py-2 rounded-xl border space-y-4"
        >
          <SplitUnequally
            control={control}
            groupMembers={groupMembers}
            type="AMOUNT"
            errors={errors}
          />
        </TabsContent>
        <TabsContent
          value="PERCENTAGE"
          className="bg-muted px-4 py-2 rounded-xl border space-y-4"
        >
          <SplitUnequally
            control={control}
            groupMembers={groupMembers}
            type="PERCENTAGE"
            errors={errors}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
