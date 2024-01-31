import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPlaceAPI } from "../apiPlaces";
import { useUIContext } from "../../store/context";
import { useCurrentUser } from "./useCurrentUser";

export function useAddPlace() {
  const { setModal } = useUIContext();
  const { currentUser } = useCurrentUser();
  const queryClient = useQueryClient();

  const {
    isPending: isCreating,
    mutateAsync: addPlace,
    error,
  } = useMutation({
    mutationFn: async (data) => await addPlaceAPI(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userPlaces", currentUser.username],
      });
    },
    onError: (e) =>
      setModal({
        type: "error",
        message: e.message ? e.message : "Creating place error",
      }),
  });

  return { isCreating, addPlace, error };
}
