import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import useLogout from "@/features/auth/hooks/useLogout";
import { useNavigate } from "@tanstack/react-router";
import useGetUserProfile from "@/features/profile/hooks/useGetUserProfile";
import { getTwoLetterNameInitials } from "@/lib/getNameInitials";

export default function ProfileHoverCard() {
  const { data } = useGetUserProfile();
  const { logout } = useLogout();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL ?? "http://localhost:8000";

  return (
    <HoverCard>
      <HoverCardTrigger>
        <Avatar>
          <AvatarImage src={baseUrl.concat(data?.profile_image)} />
          <AvatarFallback>
            {getTwoLetterNameInitials(
              data?.first_name.concat(" ", data.last_name) ?? "Easy Split",
            )}
          </AvatarFallback>
          <AvatarBadge>
            <ChevronDown />
          </AvatarBadge>
        </Avatar>
      </HoverCardTrigger>
      <HoverCardContent className="w-fit flex flex-col gap-3">
        <Button
          variant={"secondary"}
          onClick={() => navigate({ to: "/profile" })}
        >
          Profile
        </Button>
        <Button variant={"secondary"} onClick={() => logout()}>
          Logout
        </Button>
      </HoverCardContent>
    </HoverCard>
  );
}
