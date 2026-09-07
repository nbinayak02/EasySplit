import {
  Activity,
  ArrowRightLeft,
  Group,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "../ui/button";
import { ModeToggle } from "../shared/Mode-Toogle";
import { Link, Outlet, useLocation } from "@tanstack/react-router";
import MobileMenu from "@/features/dashboard/components/Mobile-Menu";
import ProfileHoverCard from "@/features/dashboard/components/Profile-Hover-Card";

export default function DashboardLayout() {
  const location = useLocation();
  const isPathActive = (pathname: string): boolean => {
    const isActive = location.pathname.startsWith(pathname);
    return isActive;
  };
  return (
    <div className="w-full h-screen flex flex-col overflow-auto xl:overflow-hidden">
      <nav className="py-3 flex flex-row justify-between items-center px-10 shadow-sm border-b">
        <Link to="/" className="flex items-center gap-2 font-medium text-xl">
          <div className="flex size-10 items-center justify-center text-primary-foreground">
            <img src="/favicon/favicon.svg" alt="logo" />
          </div>
          <div className="hidden sm:block">
            <p>EasySplit</p>
            <p className="text-sm text-muted-foreground">
              Spend. Split. Settle.
            </p>
          </div>
        </Link>

        <div className="hidden md:flex flex-row gap-8">
          <Link to="/dashboard">
            <Button variant={isPathActive("/dashboard") ? "default" : "ghost"}>
              <LayoutDashboard />
              Dashboard
            </Button>
          </Link>
          <Link to="/group">
            <Button variant={isPathActive("/group") ? "default" : "ghost"}>
              <Group />
              Groups
            </Button>
          </Link>
          <Link to="/settlements">
            <Button
              variant={isPathActive("/settlements") ? "default" : "ghost"}
            >
              <ArrowRightLeft />
              Settlements
            </Button>
          </Link>
          <Link to="/activity">
            <Button variant={isPathActive("/activity") ? "default" : "ghost"}>
              <Activity />
              Activity
            </Button>
          </Link>
        </div>

        <div className="flex flex-row gap-8">
          <div className="block md:hidden">
            <MobileMenu />
          </div>
          <ModeToggle />

          <ProfileHoverCard />
        </div>
      </nav>

      <div className="flex-1 min-h-0">
        <Outlet />
      </div>
    </div>
  );
}
