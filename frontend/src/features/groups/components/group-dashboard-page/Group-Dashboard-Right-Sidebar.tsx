import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import GroupMembersCollapsible from "./Group-Members-Collapsible";
import { ChevronsUpDown, Settings } from "lucide-react";
import useGetGroupByGroupId from "../../hooks/useGetGroupByGroupId";
import ExpenseCategoryCollapsible from "@/features/expense-category/components/Expense-Categories-Collapsible";
import GroupBalancesCollapsible from "./Group-Balance-Collapsible";
import DeleteGroupAlertBox from "../Delete-Group-Alert-Dialog";
import LeaveGroupAlertBox from "../Leave-Group-Alert-Dialog";
import UpdateGroupDialog from "../Update-Group-Dialog";
import UpdateGroupProfilePictureDialog from "../Update-Group-Profile-Image-Dialog";
import GroupSimplifiedSettlementCollapsible from "./Group-Simplified-Settlement-Collapsible";

type Props = {
  className?: string;
  publicGroupId: string;
};

export default function GroupDashboardRightSidebar({
  className,
  publicGroupId,
}: Props) {
  const { data } = useGetGroupByGroupId(publicGroupId);

  if (!data) {
    return <div className={cn(className, "py-3")}>Group not found</div>;
  }

  return (
    <div className={cn(className, "py-3 min-w-80")}>
      <div className="w-full h-full rounded-xl">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Group Info</CardTitle>
            <CardDescription>Details about group.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5 overflow-y-auto">
            {/* balances  */}
            <GroupBalancesCollapsible groupId={data.id} />

            {/* simplified settlements  */}
            <GroupSimplifiedSettlementCollapsible groupId={data.id} />

            {/* expense Categories  */}
            <ExpenseCategoryCollapsible groupId={data.id} />

            {/* group members */}
            <GroupMembersCollapsible
              groupId={data.id}
              publicGroupId={publicGroupId}
            />

            {/* group settings  */}
            <Collapsible className="bg-muted rounded-xl">
              <CollapsibleTrigger
                className="min-w-full"
                render={
                  <Button
                    variant={"ghost"}
                    className="w-full flex flex-row justify-between"
                  >
                    <div className="w-full flex flex-row gap-3 items-center">
                      <Settings />
                      Settings
                    </div>
                    <ChevronsUpDown />
                  </Button>
                }
              />
              <CollapsibleContent>
                <Separator />
                <div className="px-4 py-4 flex flex-col gap-3">
                  <UpdateGroupDialog groupId={data.id} />
                  <UpdateGroupProfilePictureDialog groupId={data.id} />
                  <LeaveGroupAlertBox groupId={data.id} />
                  <DeleteGroupAlertBox groupId={data.id} />
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
