import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePlaceAPI } from "../apiPlaces";
import { useUIContext } from "../../store/context";

export function useDeletePlace() {
  const queryClient = useQueryClient();
  const { setModal } = useUIContext();

  const {
    isPending: isDeleting,
    mutate: deletePlace,
    error,
  } = useMutation({
    mutationFn: (id) => deletePlaceAPI(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userPlaces"] });
      queryClient.invalidateQueries({ queryKey: ["recentPlaces"] });
      setModal({ type: "success", message: "Place deleted" });
    },
  });

  return { isDeleting, deletePlace, error };
}
