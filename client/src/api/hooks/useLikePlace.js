import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePlaceAPI } from "../apiPlaces";
import { useDataContext, useUIContext } from "../../store/context";

export function useLikePlace() {
  const queryClient = useQueryClient();
  const { setModal } = useUIContext();
  const { setPlace } = useDataContext();

  const {
    isPending: isLiking,
    mutate: likePlace,
    error,
  } = useMutation({
    mutationFn: (id) => likePlaceAPI(id),
    onSuccess: (udpatedPlace) => {
      queryClient.invalidateQueries({ queryKey: ["topPlaces"] });
      queryClient.invalidateQueries({ queryKey: ["wallPosts"] });
      setPlace(udpatedPlace);
    },
    onError: () => {
      setModal({ type: "error", message: "Liking place error" });
      // await placeExists();
    },
  });

  return { isLiking, likePlace, error };
}
