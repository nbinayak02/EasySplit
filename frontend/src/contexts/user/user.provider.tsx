import { useState, type ReactNode } from "react";
import { type UserContextState, UserContext } from "./user.context";

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<UserContextState>({
    id: NaN,
    name: "",
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
