import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import GroupItem from "./Group-Item";
import { Input } from "@/components/ui/input";
import useJoinGroup from "../hooks/useJoinGroup";
import { Skeleton } from "@/components/ui/skeleton";
import SubmitButton from "@/components/form/Submit-Button";
import { getUser } from "@/features/auth/api/auth.api";
import useGetGroupByGroupId from "../hooks/useGetGroupByGroupId";
import { useLocation, useNavigate, useParams } from "@tanstack/react-router";

export default function InviteFriendByGroupLink() {
  const navigate = useNavigate();
  const location = useLocation();

  const { publicGroupId: groupId } = useParams({
    from: "/_auth/join/group/$publicGroupId",
  });
  const { data, isPending } = useGetGroupByGroupId(groupId);

  const {
    handleSubmit,
    onFormSubmit,
    register,
    isPending: isAccepting,
  } = useJoinGroup({
    executeCallbackOnSuccess: () => navigate({ to: "/dashboard" }),
    beforeMutation: () => beforeMutationCallback(),
  });

  const beforeMutationCallback = async () => {
    const user = await getUser();

    if (user.isAuthenticated === false) {
      toast.error("Please login to continue!");
      navigate({ to: "/login", search: { returnTo: location.href } });
      return;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Join Group</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        {isPending ? (
          <div className="space-y-5">
            <Skeleton className="w-full h-3 rounded-xl" />
            <Skeleton className="w-full h-5 rounded-xl" />
          </div>
        ) : (
          <CardContent className="text-center">
            {data ? (
              <div className="space-y-5">
                <p className="text-xl font-semibold text-primary">
                  You are invited to join a group.
                </p>
                <GroupItem group={data} />
                <Input
                  {...register("group_id")}
                  type="hidden"
                  defaultValue={data.group_id}
                />
              </div>
            ) : (
              <p className="text-destructive">
                Unfortunately, that is a invalid group invitation link.
              </p>
            )}
          </CardContent>
        )}

        {data && (
          <CardFooter className="justify-end">
            <SubmitButton
              isPending={isAccepting}
              label="Accept Invitation"
              labelWhenPending="Accepting"
            />
          </CardFooter>
        )}
      </form>
    </Card>
  );
}
