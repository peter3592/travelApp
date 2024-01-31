import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signupUserAPI } from "../apiAuth";
import { useUIContext } from "../../store/context";

export function useSignup() {
  const { setModal } = useUIContext();
  const queryClient = useQueryClient();

  const {
    isPending: isSigningUp,
    mutate: signup,
    error,
  } = useMutation({
    mutationFn: ([username, password, passwordConfirm, photo]) =>
      signupUserAPI(username, password, passwordConfirm, photo),
    onSuccess: () => {
      setModal({ type: "success", message: "Account created" });
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: ["currentUser"],
        });
        setModal(null);
      }, 1500);
    },
    onError: (e) => {
      setModal({ type: "error", message: e.message });
    },
  });

  return {
    isSigningUp,
    signup,
    error,
  };
}
