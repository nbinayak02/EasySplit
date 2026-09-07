import { GroupIcon } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import useGetGroups from "../hooks/useGetGroups";
import type { Group } from "../types/group.types";
import GroupCard from "../components/Group-Card";

export default function Groups() {
  const { data } = useGetGroups();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-3 px-10">
      <div className="flex flex-row items-center gap-3 py-5">
        <GroupIcon />
        <p className="text-xl font-semibold text-primary dark:text-emerald-500">
          Groups
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {data &&
          data.map((group: Group) => (
            <GroupCard
              group={group}
              key={group.id}
              onClick={() => {
                navigate({
                  to: "/group/$publicGroupId",
                  params: { publicGroupId: group.group_id },
                });
              }}
            />
          ))}
        {data && data.length === 0 && (
          <p className="px-12 text-muted-foreground">No any groups.</p>
        )}
      </div>
    </div>
  );
}
