import { Outlet } from "@tanstack/react-router";
import { Toaster } from "sonner";

export default function RootLayout() {
  return (
    <div>
      <Outlet />
      <Toaster position="top-center" richColors/>
    </div>
  );
}
