import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUIContext } from "../../store/context";
import { deleteUserAPI } from "../apiUsers";

export function useDeleteUser() {
  const queryClient = useQueryClient();
  const { setModal } = useUIContext();

  const {
    isPending: isDeleting,
    mutate: deleteUser,
    error,
  } = useMutation({
    mutationFn: ([username, password]) => deleteUserAPI(username, password),
    onSuccess: () => {
      queryClient.clear();
      setModal({ type: "success", message: "Account deleted" });
    },
    onError: (e) => setModal({ type: "error", message: e.message }),
  });

  return { isDeleting, deleteUser, error };
}
