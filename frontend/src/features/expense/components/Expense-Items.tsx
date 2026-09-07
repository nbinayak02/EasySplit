import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import formatDate from "@/lib/formatDate";
import { FieldError } from "@/components/ui/field";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Calendar, SplitSquareHorizontal, User } from "lucide-react";
import useGetGroupMembers from "@/features/groups/hooks/useGetGroupMembers";
import useGetGroupExpenses from "@/features/groups/hooks/useGetGroupExpenses";
import DeleteExpenseAlertBox from "./Delete-Expense-Alert-Dialog";
import UpdateExpenseInfo from "./Update-Expense-Info-Dialog";

type Props = {
  groupId: number;
};

export default function ExpenseItems({ groupId }: Props) {
  const { data, isPending, isError, error } = useGetGroupExpenses({ groupId });
  const { data: groupMembers, isError: isGroupMemberError } =
    useGetGroupMembers({ groupId });

  if (isError || isGroupMemberError) {
    return <div>{error && <FieldError>{error.message}</FieldError>}</div>;
  }

  const getGroupMemberName = (memberId: number) => {
    const member = groupMembers?.find((member) => member.user.id === memberId);
    const name = member?.user.first_name;
    return name;
  };

  return (
    <div className="flex flex-col-reverse gap-6 px-3 py-22 ">
      {isPending && <Skeleton className="w-full h-3" />}
      {data && data.length === 0 && <p>No expense found.</p>}
      {data &&
        groupMembers &&
        data.map((expense) => {
          return (
            <Collapsible
              key={expense.id}
              className={
                "border border-muted bg-gray-100/30 dark:bg-gray-100/1 rounded-xl hover:bg-muted dark:hover:bg-gray-100/10 transition-colors"
              }
            >
              <CollapsibleTrigger className={"min-w-full"}>
                <div
                  className={
                    "rounded-xl flex flex-col gap-3 justify-center px-5 py-3 "
                  }
                >
                  {/* top row  */}
                  <div className="flex flex-row justify-between">
                    <div>{expense.title}</div>
                    {/* amount  */}
                    <p className="text-emerald-600 dark:text-emerald-500 font-semibold text-lg">
                      Rs. {expense.amount}
                    </p>
                  </div>

                  {/* bottom row  */}
                  <div className="flex flex-row justify-evenly items-center flex-1 text-muted-foreground flex-wrap">
                    {/* date  */}
                    <div className="text-sm flex flex-row items-center gap-3">
                      <Calendar className="size-4" />
                      {formatDate(new Date(expense.created_at))}
                    </div>

                    {/* creator */}
                    <div className="text-sm flex flex-row items-center gap-2">
                      <User className="size-4" />{" "}
                      {getGroupMemberName(expense.created_by) ?? "n/a"}
                    </div>

                    {/* split type  */}
                    <div className="text-sm flex flex-row items-center gap-2">
                      <SplitSquareHorizontal className="size-4" />{" "}
                      {expense.split_type}
                    </div>

                    {/* splitted with  */}
                    <div className="text-xs flex flex-col justify-center items-center">
                      Splitted with
                      <div className="text-sm">
                        {expense.split_participants.length} people.
                      </div>
                    </div>
                    {/* paid by  */}
                    <div className="text-xs flex flex-col justify-center items-center">
                      Paid by
                      <div className="text-sm">
                        {expense.initial_payment.length} people.
                      </div>
                    </div>
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className={"px-5 py-3"}>
                <Separator />
                <div className="grid grid-cols-2">
                  <div>
                    <p className="py-3 text-sm text-muted-foreground font-semibold">
                      Splitted With
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                      {expense.split_participants.map((participant) => (
                        <>
                          <p>{getGroupMemberName(participant.user)}</p>
                          <p>Rs. {participant.amount}</p>
                        </>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="py-3 text-sm text-muted-foreground font-semibold">
                      Paid By
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                      {expense.initial_payment.map((payer) => (
                        <>
                          <p>{getGroupMemberName(payer.paid_by)}</p>
                          <p>Rs. {payer.amount}</p>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="py-3 flex flex-row gap-3">
                  <DeleteExpenseAlertBox
                    groupId={groupId}
                    expenseId={expense.id}
                  />
                  <UpdateExpenseInfo groupId={groupId} expenseId={expense.id} />
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        })}
    </div>
  );
}
