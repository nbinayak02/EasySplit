import { createRootRouteWithContext } from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import type { UserContextType } from "@/contexts/user/user.context";
import RootLayout from "@/components/layouts/Root-Layout";

export interface RouteContexts {
  queryClient: QueryClient;
  userContext: UserContextType;
}

export const Route = createRootRouteWithContext<RouteContexts>()({
  component: RootLayout,
});
