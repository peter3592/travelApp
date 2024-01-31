import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUserAPI } from "../apiAuth";
import { useUIContext } from "../../store/context";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const { setModal } = useUIContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout } = useMutation({
    mutationFn: logoutUserAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["currentUser"],
      });
      navigate(0);
    },
    onError: () =>
      setModal({
        type: "error",
        message: "Error by logging out. Try it later",
      }),
  });

  return { logout };
}
