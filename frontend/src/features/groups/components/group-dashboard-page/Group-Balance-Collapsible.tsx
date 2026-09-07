import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ChevronsUpDown, Wallet } from "lucide-react";
import useGetGroupBalances from "../../hooks/useGetGroupBalances";

type Props = {
  groupId: number;
};

export default function GroupBalancesCollapsible({ groupId }: Props) {
  const { data, isPending, isError, error } = useGetGroupBalances({ groupId });

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
                <Wallet />
                Balance
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
              <Wallet />
              Balance
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
        ) : (
          <div className="px-4 py-4 flex flex-col gap-3">
            {data &&
              data.map((balance) => {
                const isBalanceNegative = balance.balance < 0;
                return (
                  <div
                    key={balance.id}
                    className={`grid grid-cols-2 font-medium ${isBalanceNegative ? "text-destructive" : "text-emerald-600 dark:text-emerald-500"}`}
                  >
                    <div className="flex flex-row gap-1 items-center">
                      <p>{balance.user.first_name}</p>
                      <p>{isBalanceNegative ? "pays" : "receives"}</p>
                    </div>
                    <p>Rs. {Math.abs(balance.balance)}</p>
                  </div>
                );
              })}
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
