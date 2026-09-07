export type Group = {
  id: number;
  name: string;
  group_id: string;
  description?: string;
  profile_image?: string;
  created_by: number;
  updated_by: number;
  created_at: Date;
  updated_at: Date;
  total_user: number;
};

export type GroupMembers = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
};

export type GroupMemberList = {
  user: GroupMembers;
  isAdmin: boolean;
  group: number;
};
