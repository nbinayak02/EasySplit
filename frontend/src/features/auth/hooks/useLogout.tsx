import { logout } from "../api/auth.api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export default function useLogout() {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationKey: ["Logout"],
    mutationFn: logout,
    onSuccess: () => {
      navigate({ to: "/login", replace: true });
    },
  });

  return {
    logout: mutate,
  };
}
