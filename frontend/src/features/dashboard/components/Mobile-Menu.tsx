import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ActivityIcon,
  ArrowRightLeft,
  Group,
  LayoutDashboard,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

export default function MobileMenu() {
  const navigate = useNavigate();

  const navigateToPath = (path: string) => {
    navigate({ to: path });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button size={"icon-lg"} variant={"outline"} />}
      >
        <Menu />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigateToPath("/dashboard")}>
            <LayoutDashboard />
            Dashboard
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => navigateToPath("/group")}>
            <Group />
            Groups
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => navigateToPath("/settlements")}>
            <ArrowRightLeft />
            Settlements
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => navigateToPath("/activity")}>
            <ActivityIcon />
            Activity
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
