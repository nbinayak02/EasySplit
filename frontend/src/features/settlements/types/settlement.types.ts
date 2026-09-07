import type { Creator, Timestamp } from "@/shared.types";
import type { CreateSettlementPayload } from "../schema/settlement.schema";
import type { Group } from "@/features/groups/types/group.types";

export type Settlement = Creator &
  Timestamp &
  CreateSettlementPayload & {
    id: number;
  };

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
};

export type SettlementDetail = Timestamp & {
  id: number;
  paid_by: User;
  paid_to: User;
  group: number;
  amount: number;
};

export type SettlementStats = Omit<SettlementDetail, "group"> & {
  group: Omit<Group, "total_user">;
};

export type SimplifiedSettlement = {
  from: number;
  to: number;
  amount: number;
};
