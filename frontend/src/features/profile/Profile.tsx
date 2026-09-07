import { User2 } from "lucide-react";
import useGetUserProfile from "./hooks/useGetUserProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getTwoLetterNameInitials } from "@/lib/getNameInitials";
import { Skeleton } from "@/components/ui/skeleton";
import UpdateProfileDialog from "./components/Update-Profile-Dialog";
import DeleteUserProfileAlertBox from "./components/Delete-Profile-Alert";
import UpdateProfilePictureDialog from "./components/Update-Profile-Image-Dialog";
import UpdatePasswordDialog from "./components/Change-Password-Dialog";

export default function ProfilePage() {
  const { data, isPending } = useGetUserProfile();
  const baseUrl = import.meta.env.VITE_BASE_URL ?? "http://localhost:8000";

  if (!data) {
    return (
      <p className="text-xl font-semibold text-center text-muted-foreground">
        User not found.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3 h-full min-h-0">
      <div className="flex flex-row items-center gap-3 py-5 px-10">
        <User2 />
        <p className="text-xl font-semibold text-primary dark:text-emerald-500">
          Profile
        </p>
      </div>

      {isPending ? (
        <Skeleton className="w-50 h-5" />
      ) : (
        <div className="px-12 w-full flex flex-col gap-5 justify-center items-center">
          <div className="flex flex-row gap-3 items-center">
            <Avatar size="lg">
              <AvatarImage src={baseUrl.concat(data.profile_image)} />
              <AvatarFallback>
                {getTwoLetterNameInitials(
                  data.first_name.concat(" ", data.last_name),
                )}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-lg font-semibold">{`${data.first_name} ${data.last_name}`}</span>
              <span className="text-sm text-muted-foreground">
                {data.email}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <UpdateProfileDialog />
            <UpdateProfilePictureDialog />
            <UpdatePasswordDialog />
            <DeleteUserProfileAlertBox />
          </div>
        </div>
      )}
    </div>
  );
}
