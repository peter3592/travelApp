import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUserAPI } from "../apiAuth";
import { useUIContext } from "../../store/context";

export function useLogin() {
  const { setModal } = useUIContext();
  const queryClient = useQueryClient();

  const {
    isPending: isLogging,
    mutate: login,
    error,
  } = useMutation({
    mutationFn: ([username, password]) => loginUserAPI(username, password),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["currentUser"],
      });
      setModal(null);
    },
    onError: (e) =>
      setModal({
        type: "error",
        message: e.message,
      }),
  });

  return {
    isLogging,
    login,
    error,
  };
}
