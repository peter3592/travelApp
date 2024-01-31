import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDataContext, useUIContext } from "../../store/context";
import { commentPlaceAPI } from "../apiPlaces";

export function useCommentPlace() {
  const queryClient = useQueryClient();
  const { setPlace } = useDataContext();
  const { setModal } = useUIContext();

  const { mutate: commentPlace } = useMutation({
    mutationFn: ([placeId, comment]) => commentPlaceAPI(placeId, comment),
    onSuccess: (udpatedPlace) => {
      queryClient.invalidateQueries({ queryKey: ["wallPosts"] });
      setPlace(udpatedPlace);
    },
    onError: () =>
      setModal({
        type: "error",
        message: "Creating comment error",
      }),
  });

  return { commentPlace };
}
