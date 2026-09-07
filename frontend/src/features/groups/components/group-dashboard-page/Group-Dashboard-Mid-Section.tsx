import { cn } from "@/lib/utils";
import { BanknoteArrowDown, BanknoteArrowUp, InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, type Dispatch, type SetStateAction } from "react";
import { getTwoLetterNameInitials } from "@/lib/getNameInitials";
import useGetGroupByGroupId from "../../hooks/useGetGroupByGroupId";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CreateExpenseBill from "@/features/expense/components/Create-Expense-Dialog";
import ExpenseItems from "@/features/expense/components/Expense-Items";
import CreateSettlementDialog from "@/features/settlements/components/Create-Settlement-Dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import SettlementItems from "@/features/settlements/components/Settlement-Items";

type Props = {
  className?: string;
  publicGroupId: string;
  setShowRightSidebar: Dispatch<SetStateAction<boolean>>;
};

export default function GroupDashboardMidSection({
  className,
  publicGroupId,
  setShowRightSidebar,
}: Props) {
  const [contentType, setContentType] = useState<"expenses" | "settlements">(
    "expenses",
  );
  const { data, isPending } = useGetGroupByGroupId(publicGroupId);
  const baseImageUrl = import.meta.env.VITE_BASE_URL ?? "http://localhost:8000";

  if (isPending) {
    return (
      <div className={cn(className, "py-3")}>
        <div className="w-full h-full bg-accent rounded-xl flex flex-col animate-pulse"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={cn(className, "py-3")}>
        <div className="w-full h-full bg-accent rounded-xl flex flex-col justify-center">
          Invalid group id
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        className,
        " rounded-xl  min-h-0 overflow-hidden pb-5 pt-3",
      )}
    >
      <div className="relative w-full h-full min-h-0 rounded-t-xl flex flex-col overflow-hidden">
        {/* header  */}
        <div className=" absolute z-10 w-full bg-muted/20 backdrop-blur-sm border-b-2 px-5 py-3 rounded-t-xl flex flex-row justify-between items-center gap-3">
          {/* logo and info  */}
          <div className="flex flex-row gap-3 items-center">
            <Avatar size="lg">
              <AvatarImage
                src={`${baseImageUrl}${data?.profile_image}`}
                alt="Group Logo"
              />
              <AvatarFallback>
                {getTwoLetterNameInitials(data.name)}
              </AvatarFallback>
            </Avatar>

            <div>
              <h2 className="text-xl font-bold">{data.name}</h2>
              <h3 className="text-sm text-muted-foreground">
                {data.description}
              </h3>
            </div>
          </div>

          <div className="flex flex-row justify-center items-center gap-3">
            <CreateExpenseBill groupId={data.id} />
            <CreateSettlementDialog groupId={data.id} />
            <Button
              size={"icon-lg"}
              variant={"outline"}
              onClick={() => setShowRightSidebar((prev) => !prev)}
            >
              <InfoIcon />
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1 h-full min-h-0 px-3">
          {contentType === "expenses" ? (
            <ExpenseItems groupId={data.id} />
          ) : (
            <SettlementItems groupId={data.id} />
          )}
        </ScrollArea>

        <div className="absolute bottom-0 z-10 w-full border-t bg-muted/20 py-2 rounded-b-xl backdrop-blur-sm flex flex-row justify-center gap-3">
          <Button
            variant={`${contentType === "expenses" ? "default" : "outline"}`}
            onClick={() => setContentType("expenses")}
          >
            <BanknoteArrowDown />
            Expenses
          </Button>
          <Button
            variant={`${contentType === "settlements" ? "default" : "outline"}`}
            onClick={() => setContentType("settlements")}
          >
            <BanknoteArrowUp />
            Settlements
          </Button>
        </div>
      </div>
    </div>
  );
}
