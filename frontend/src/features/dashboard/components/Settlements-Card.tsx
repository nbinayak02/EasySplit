import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Calendar } from "lucide-react";
import formatDate from "@/lib/formatDate";
import { Skeleton } from "@/components/ui/skeleton";
import { getTwoLetterNameInitials } from "@/lib/getNameInitials";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useGetSettlementStats from "@/features/settlements/hooks/useGetSettlementStats";

export default function SettlementCard() {
  const { data: settlements, isPending: isSettlementPending } =
    useGetSettlementStats();
  const baseUrl = import.meta.env.VITE_BASE_URL ?? "http://localhost:8000";

  if (!settlements) {
    return (
      <Card className="w-full min-w-full xl:max-w-80">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="min-h-60 flex flex-row justify-center items-center">
          <p className="text-xl font-semibold text-center text-muted-foreground">
            No any Transactions.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full xl:max-w-80">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        {/* <CardAction>
              <Button variant={"secondary"}>
                <ListFilterIcon /> Filter
              </Button>
            </CardAction> */}
      </CardHeader>
      <CardContent className="min-h-60 flex flex-col">
        {isSettlementPending ? (
          <Skeleton className="w-full h-5" />
        ) : settlements.length === 0 ? (
          <p className="text-xl font-semibold text-center text-muted-foreground">
            No any Transactions.
          </p>
        ) : (
          settlements.slice(-3).map((settlement) => {
            return (
              <Item variant={"outline"} key={settlement.id}>
                <ItemMedia>
                  <Avatar>
                    <AvatarImage
                      src={baseUrl.concat(settlement.group.profile_image)}
                    />
                    <AvatarFallback>
                      {getTwoLetterNameInitials(settlement.group.name)}
                    </AvatarFallback>
                  </Avatar>
                </ItemMedia>
                <ItemContent>
                  <ItemTitle className="flex flex-row items-center">
                    <span>{settlement.paid_by.first_name}</span>
                    <span>to</span>
                    <span>{settlement.paid_to.first_name}</span>
                  </ItemTitle>
                  <ItemDescription className="flex flex-row items-center gap-1 text-sm">
                    <Calendar className="size-3" />{" "}
                    {formatDate(new Date(settlement.created_at))}
                  </ItemDescription>
                </ItemContent>
                <ItemActions className="text-emerald-600 dark:text-emerald-500 font-semibold">
                  Rs. {settlement.amount}
                </ItemActions>
              </Item>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
