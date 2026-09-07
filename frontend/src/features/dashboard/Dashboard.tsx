import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import SettlementCard from "./components/Settlements-Card";
import useUserContext from "@/contexts/user/useUserContext";
import useUserBalanceStats from "./hooks/useUserBalanceStats";
import GroupsItemList from "../groups/components/Groups-Items-List";
import JoinGroupDialog from "../groups/components/Join-Group-Dialog";
import CreateNewGroupDialog from "../groups/components/Create-Group-Dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Dashboard() {
  const {
    user: { name },
  } = useUserContext();
  const { data, isPending } = useUserBalanceStats();

  return (
    <div className="flex flex-col gap-3">
      {/* welcome  */}
      <div className=" flex flex-row items-center py-5 px-10">
        <div className="flex flex-row items-center gap-3">
          <Avatar>
            <AvatarImage src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-xl font-semibold text-primary dark:text-emerald-500">
            Welcome {name}!
          </p>
        </div>
      </div>

      {/* stats  */}
      <div className="flex flex-row flex-wrap gap-3 justify-around items-center">
        <Card className="w-full mx-10  sm:max-w-sm sm:mx-0">
          <CardHeader>
            <CardTitle>Others Owe You</CardTitle>
            <CardDescription>
              You will receive this amount from others.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-center py-3 text-emerald-600">
            {data && isPending ? (
              <Skeleton className="w-5 h-5" />
            ) : (
              `Rs. ${data?.total_positive ?? 0}`
            )}
          </CardContent>
        </Card>
        <Card className="w-full mx-10 sm:max-w-sm sm:mx-0">
          <CardHeader>
            <CardTitle>You Owe Others</CardTitle>
            <CardDescription>
              You have to pay this amount to others.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-center py-3 text-rose-600">
            {data && isPending ? (
              <Skeleton className="w-5 h-5" />
            ) : (
              `Rs. ${Math.abs(data?.total_negative ?? 0)}`
            )}
          </CardContent>
        </Card>
        <Card className="w-full mx-10 sm:max-w-sm sm:mx-0">
          <CardHeader>
            <CardTitle>Total Groups</CardTitle>
            <CardDescription>You have joined in.</CardDescription>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-center py-3 text-purple-600">
            {data && isPending ? (
              <Skeleton className="w-5 h-5" />
            ) : (
              `${data?.total_groups ?? 0}`
            )}
          </CardContent>
        </Card>
      </div>

      {/* groups and transactions */}
      <div className="flex flex-col xl:flex-row justify-around items-start gap-10 px-12 py-6">
        {/* groups  */}
        <Card className="w-full xl:flex-1">
          <CardHeader>
            <CardTitle>Groups</CardTitle>
            <CardAction className="flex flex-row gap-5 items-center">
              <CreateNewGroupDialog />
              <JoinGroupDialog />
            </CardAction>
          </CardHeader>
          <CardContent className="min-h-60">
            <GroupsItemList />
          </CardContent>
        </Card>
        {/* transactions  */}
        <SettlementCard />
      </div>
    </div>
  );
}
