import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeMapLanguageAPI } from "../apiSettings";
import { useUIContext } from "../../store/context";
import { useCurrentUser } from "./useCurrentUser";

export function useChangeMapLanguage() {
  const { setModal } = useUIContext();
  const queryClient = useQueryClient();
  const { currentUser } = useCurrentUser();

  const { mutate: changeMapLanguage } = useMutation({
    mutationFn: (newLanguage) => changeMapLanguageAPI(currentUser, newLanguage),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["currentUser"] }),
    onError: () =>
      setModal({ type: "error", message: "Error changing map language" }),
  });

  return { changeMapLanguage };
}
