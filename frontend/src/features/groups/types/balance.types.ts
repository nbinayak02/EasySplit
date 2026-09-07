type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
};

export type Balance = {
  id: number;
  user: User;
  group: number;
  balance: number;
};
