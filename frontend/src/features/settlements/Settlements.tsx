import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import formatDate from "@/lib/formatDate";
import { Skeleton } from "@/components/ui/skeleton";
import { BanknoteArrowUp, Calendar } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getTwoLetterNameInitials } from "@/lib/getNameInitials";
import useGetSettlementStats from "./hooks/useGetSettlementStats";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Settlements() {
  const { data: settlements, isPending: isSettlementPending } =
    useGetSettlementStats();
  const baseUrl = import.meta.env.VITE_BASE_URL ?? "http://localhost:8000";

  if (!settlements) {
    return (
      <p className="text-xl font-semibold text-center text-muted-foreground">
        No any settlements.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3 h-full min-h-0">
      <div className="flex flex-row items-center gap-3 py-5 px-10">
        <BanknoteArrowUp />
        <p className="text-xl font-semibold text-primary dark:text-emerald-500">
          Settlements
        </p>
      </div>

      {settlements.length === 0 && (
        <p className="px-12 text-muted-foreground">No any settlements.</p>
      )}

      <ScrollArea className="flex-1 min-h-0">
        <div className="px-12 w-full flex flex-col gap-5 justify-center items-center">
          {isSettlementPending ? (
            <Skeleton className="w-full h-5" />
          ) : (
            settlements.map((settlement) => {
              return (
                <Item
                  className="max-w-md"
                  variant={"outline"}
                  key={settlement.id}
                >
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
        </div>
      </ScrollArea>
    </div>
  );
}
