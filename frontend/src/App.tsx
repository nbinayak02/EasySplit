import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import useUserContext from "./contexts/user/useUserContext";
// query instance
const queryClient = new QueryClient();

// router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
    userContext: undefined!,
  },
  defaultPreload: false,
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
});

// router type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}


// TypeScript only:
declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import("@tanstack/query-core").QueryClient;
  }
}

// window.__TANSTACK_QUERY_CLIENT__ = queryClient;

function App() {
  const userContext = useUserContext();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={{ userContext }} />
    </QueryClientProvider>
  );
}

export default App;
