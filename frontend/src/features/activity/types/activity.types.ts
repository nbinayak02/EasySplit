import type { Group } from "@/features/groups/types/group.types";
import type { Timestamp } from "@/shared.types";

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
};

export type Activity = Omit<Timestamp, "updated_at"> & {
  id: number;
  user: User;
  group: Omit<Group, "total_user"> | null;
  module: string;
  action: string;
  details: Record<string, string> | null;
};
