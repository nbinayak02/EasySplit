import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import formatDate from "@/lib/formatDate";
import { FieldError } from "@/components/ui/field";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "lucide-react";
import DeleteSettlementAlertBox from "./Delete-Settlement-Alert";
import useGetGroupSettlements from "../hooks/useGetGroupSettlements";

type Props = {
  groupId?: number;
};

export default function SettlementItems({ groupId }: Props) {
  const { data, isPending, isError, error } = useGetGroupSettlements({
    groupId,
  });

  if (isError) {
    return <div>{error && <FieldError>{error.message}</FieldError>}</div>;
  }

  return (
    <div className="flex flex-col-reverse gap-6 px-3 py-22 ">
      {isPending && <Skeleton className="w-full h-3" />}
      {data && data.length === 0 && <p>No settlements found!</p>}
      {data &&
        data.map((settlement) => {
          return (
            <Item variant={"outline"} key={settlement.id}>
              <ItemContent>
                <ItemTitle className="text-lg">
                  <span>
                    {settlement.paid_by.first_name.concat(
                      " ",
                      settlement.paid_by.last_name,
                    )}
                  </span>
                  <span>paid</span>
                  <span className="text-emerald-600 dark:text-emerald-500 font-bold">
                    Rs. {settlement.amount}
                  </span>
                  <span>to</span>
                  <span>
                    {settlement.paid_to.first_name.concat(
                      " ",
                      settlement.paid_to.last_name,
                    )}
                  </span>
                </ItemTitle>
                <ItemDescription className="flex flex-row justify-between items-center pr-10">
                  <div className="flex flex-row gap-3 items-center">
                    <Calendar className="size-4" />{" "}
                    {formatDate(new Date(settlement.created_at))}
                  </div>
                  <div className="text-xs">
                    Last updated on{" "}
                    {formatDate(new Date(settlement.updated_at))}
                  </div>
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                {/* <UpdateSettlementDialog
                  id={settlement.id}
                  groupId={settlement.group}
                /> */}
                <DeleteSettlementAlertBox
                  groupId={settlement.group}
                  settlementId={settlement.id}
                />
              </ItemActions>
            </Item>
          );
        })}
    </div>
  );
}
