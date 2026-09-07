import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import useGetGroups from "../../hooks/useGetGroups";
import type { Group } from "../../types/group.types";
import { useNavigate, useParams } from "@tanstack/react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getTwoLetterNameInitials } from "@/lib/getNameInitials";
import clsx from "clsx";

type Props = {
  className?: string;
  groupId: string;
};

export default function GroupDashboardLeftSidebar({ className }: Props) {
  const { data, isPending } = useGetGroups();
  const { publicGroupId: activeGroupId } = useParams({
    from: "/_dashboard/group/$publicGroupId",
  });
  const navigate = useNavigate();
  const baseImageUrl = import.meta.env.VITE_BASE_URL ?? "http://localhost:8000";
  return (
    <div
      className={cn(
        className,
        "px-3 py-5 flex flex-col gap-3 border-r-2 flex-1 min-h-0",
      )}
    >
      <h2 className="text-xl font-semibold">Groups</h2>

      {isPending ? (
        <Skeleton className="w-full h-20" />
      ) : (
        <Command>
          <CommandInput placeholder="Search Groups" />
          <CommandList className="max-h-none">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {data ? (
                data.map((data: Group) => (
                  <CommandItem
                    key={data.id}
                    className="hover:bg-transparent data-selected:bg-transparent"
                  >
                    <Item
                      variant="outline"
                      key={data.id}
                      onClick={() =>
                        navigate({
                          to: "/group/$publicGroupId",
                          params: { publicGroupId: data.group_id },
                        })
                      }
                      className={clsx("hover:bg-muted min-w-full", {
                        "bg-muted": data.group_id === activeGroupId,
                      })}
                    >
                      <ItemMedia>
                        <Avatar size="lg">
                          <AvatarImage
                            src={`${baseImageUrl}${data.profile_image}`}
                            alt="Group Logo"
                          />
                          <AvatarFallback>
                            {getTwoLetterNameInitials(data.name)}
                          </AvatarFallback>
                        </Avatar>
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle>{data.name}</ItemTitle>
                      </ItemContent>
                    </Item>
                  </CommandItem>
                ))
              ) : (
                <p>No groups found.</p>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      )}
    </div>
  );
}
