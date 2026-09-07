import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ArrowLeftRight, ChevronsUpDown } from "lucide-react";
import useGetSimplifiedSettlement from "@/features/settlements/hooks/useGetSimplifiedSettlement";
import useGetGroupMembers from "../../hooks/useGetGroupMembers";

type Props = {
  groupId: number;
};

export default function GroupSimplifiedSettlementCollapsible({
  groupId,
}: Props) {
  const { data, isPending, isError, error } = useGetSimplifiedSettlement({
    groupId,
  });

  const { data: groupMembers } = useGetGroupMembers({ groupId });

  const getGroupMemberName = (id: number) => {
    if (!groupMembers) return "";
    const member = groupMembers.find((member) => member.user.id === id);
    return member?.user.first_name;
  };

  if (isError) {
    return (
      <Collapsible className="bg-muted rounded-xl" defaultOpen={true}>
        <CollapsibleTrigger
          className="min-w-full"
          render={
            <Button
              variant={"ghost"}
              className="w-full flex flex-row justify-between"
            >
              <div className="w-full flex flex-row items-center gap-3">
                <ArrowLeftRight />
                Simplified Settlements
              </div>
              <ChevronsUpDown />
            </Button>
          }
        />
        <CollapsibleContent>
          <FieldError>{error.message}</FieldError>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <Collapsible className="bg-muted rounded-xl" defaultOpen={true}>
      <CollapsibleTrigger
        className="min-w-full"
        render={
          <Button
            variant={"ghost"}
            className="w-full flex flex-row justify-between"
          >
            <div className="w-full flex flex-row items-center gap-3">
              <ArrowLeftRight />
              Simplified Settlements
            </div>
            <ChevronsUpDown />
          </Button>
        }
      />
      <CollapsibleContent>
        <Separator />
        {isPending ? (
          <div className="p-4 flex flex-col gap3">
            <Skeleton className="w-full h-3" />
            <Skeleton className="w-full h-3" />
            <Skeleton className="w-full h-3" />
          </div>
        ) : data.length === 0 ? (
          <p className="p-4 text-secondary-foreground">
            Looks like group is already settled up.
          </p>
        ) : (
          <div className="px-4 py-4 flex flex-col gap-3">
            {data.map((settlementOrder, index) => {
              return (
                <div key={index} className={`flex flex-row justify-between`}>
                  <div className="flex flex-row gap-1 items-center">
                    <span>{getGroupMemberName(settlementOrder.from)}</span>
                    <span>to</span>
                    <span>{getGroupMemberName(settlementOrder.to)}</span>
                  </div>
                  <p>Rs. {settlementOrder.amount}</p>
                </div>
              );
            })}
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
