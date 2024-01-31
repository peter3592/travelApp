import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeMapTypeAPI } from "../apiSettings";
import { useUIContext } from "../../store/context";
import { useCurrentUser } from "./useCurrentUser";

export function useChangeMapType() {
  const { setModal } = useUIContext();
  const queryClient = useQueryClient();
  const { currentUser } = useCurrentUser();

  const { mutate: changeMapType } = useMutation({
    mutationFn: (newMapType) => changeMapTypeAPI(currentUser, newMapType),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["currentUser"] }),
    onError: () =>
      setModal({ type: "error", message: "Error changing map type" }),
  });

  return { changeMapType };
}
