import { useState } from "react";
import { useParams } from "@tanstack/react-router";
import GroupDashboardLeftSidebar from "../components/group-dashboard-page/Group-Dashboard-Left-Sidebar";
import GroupDashboardMidSection from "../components/group-dashboard-page/Group-Dashboard-Mid-Section";
import GroupDashboardRightSidebar from "../components/group-dashboard-page/Group-Dashboard-Right-Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function GroupDashboardPage() {
  const { publicGroupId } = useParams({
    from: "/_dashboard/group/$publicGroupId",
  });
  const [showRightSidebar, setShowRightSidebar] = useState(true);
  return (
    <>
      <div className="hidden xl:flex w-full h-full min-h-0 gap-3 px-3">
        <GroupDashboardLeftSidebar
          className="h-full w-full max-w-80"
          groupId={publicGroupId}
        />

        <GroupDashboardMidSection
          className="h-full flex-1"
          publicGroupId={publicGroupId}
          setShowRightSidebar={setShowRightSidebar}
        />

        <GroupDashboardRightSidebar
          className={`h-full w-full max-w-60 ${!showRightSidebar && "hidden"}`}
          publicGroupId={publicGroupId}
        />
      </div>

      <Tabs defaultValue="expenses" className=" px-3 mt-3 flex xl:hidden h-full flex-col">
        <TabsList className="mx-5 grid grid-cols-3">
          <TabsTrigger value="groups">Groups</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="info">Info</TabsTrigger>
        </TabsList>

        <TabsContent value="groups" className="px-5 flex-1 min-h-0">
          <GroupDashboardLeftSidebar
            className="h-full"
            groupId={publicGroupId}
          />
        </TabsContent>

        <TabsContent value="expenses" className="px-5 flex-1 min-h-0">
          <GroupDashboardMidSection
            className="h-full"
            publicGroupId={publicGroupId}
            setShowRightSidebar={setShowRightSidebar}
          />
        </TabsContent>

        <TabsContent value="info" className="px-5 flex-1 min-h-0">
          <GroupDashboardRightSidebar
            className="h-full"
            publicGroupId={publicGroupId}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}
