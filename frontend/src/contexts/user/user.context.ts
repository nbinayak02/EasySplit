import { createContext, type Dispatch, type SetStateAction } from "react";

export type UserContextState = {
  id: number;
  name: string;
};

export type UserContextType = {
  user: UserContextState;
  setUser: Dispatch<SetStateAction<UserContextState>>;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);
