import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import formatDate from "@/lib/formatDate";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ActivityIcon, Calendar } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getActivityValue } from "@/lib/getActivityValue";
import { getActivityString } from "@/lib/getActivityString";
import useGetUserActivities from "./hooks/useGetUserActivities";
import { getTwoLetterNameInitials } from "@/lib/getNameInitials";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Activity() {
  const baseUrl = import.meta.env.VITE_BASE_URL ?? "http://localhost:8000";

  const { data, isPending, fetchNextPage, hasNextPage } =
    useGetUserActivities();

  if (!data) {
    return (
      <div className="min-h-60 flex flex-row justify-center items-center">
        <p className="text-xl font-semibold text-center text-muted-foreground">
          No any activity.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 h-full min-h-0">
      <div className="flex flex-row items-center gap-3 py-5 px-10">
        <ActivityIcon />
        <p className="text-xl font-semibold text-primary dark:text-emerald-500">
          Activity
        </p>
      </div>

      <ScrollArea className="flex-1 min-h-0">
        <div className="px-12 w-full flex flex-col gap-5 justify-center items-center">
          {isPending ? (
            <Skeleton className="w-full h-5" />
          ) : (
            data.pages.map((page) =>
              page.data.map((activity) => {
                return (
                  <Item
                    className="max-w-lg"
                    variant={"outline"}
                    key={activity.id}
                  >
                    <ItemMedia>
                      <Avatar>
                        <AvatarImage
                          src={baseUrl.concat(activity.group?.profile_image)}
                        />
                        <AvatarFallback>
                          {activity.group
                            ? getTwoLetterNameInitials(activity.group.name)
                            : "ES"}
                        </AvatarFallback>
                      </Avatar>
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle className="flex flex-row items-center">
                        {getActivityValue(activity)}
                      </ItemTitle>
                      <ItemDescription className="flex flex-row items-center gap-1 text-sm">
                        <Calendar className="size-3" />{" "}
                        {formatDate(new Date(activity.created_at))}
                      </ItemDescription>
                    </ItemContent>
                    <ItemActions className="text-emerald-600 dark:text-emerald-500 font-semibold">
                      {getActivityString(
                        activity.module,
                        activity.action,
                        activity.user.first_name,
                      )}
                    </ItemActions>
                  </Item>
                );
              }),
            )
          )}
        </div>

        {data.pages[0].data.length === 0 ? (
          <p className="px-12 text-muted-foreground">No any activity.</p>
        ) : (
          <div className="w-full flex flex-row justify-center py-10 gap-5">
            <Button disabled={!hasNextPage} onClick={() => fetchNextPage()}>
              Load More
            </Button>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
