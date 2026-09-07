import GroupItem from "./Group-Item";
import useGetGroups from "../hooks/useGetGroups";
import type { Group } from "../types/group.types";
import { useNavigate } from "@tanstack/react-router";

export default function GroupsItemList() {
  const { data } = useGetGroups();
  const navigate = useNavigate();

  if (!data || (data && data.length === 0)) {
    return (
      <div className="h-full min-h-60 w-full flex flex-row justify-center items-center">
        <div className="text-center text-muted-foreground">
          <p className="text-xl font-semibold">No groups found.</p>
          <p className="text-sm">Create a new one, or join to other groups.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.slice(0, 6).map((group: Group) => (
        <GroupItem
          key={group.id}
          group={group}
          onClick={() =>
            navigate({
              to: "/group/$publicGroupId",
              params: { publicGroupId: group.group_id },
            })
          }
        />
      ))}
    </div>
  );
}
