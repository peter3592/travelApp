import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCommentAPI } from "../apiPlaces";
import { useDataContext, useUIContext } from "../../store/context";
import { usePlace } from "./usePlace";

export function useDeleteComment() {
  const queryClient = useQueryClient();
  const { setModal } = useUIContext();
  const { place, setPlace } = useDataContext();

  const { refetch } = usePlace(place._id);

  const { mutate: deleteComment } = useMutation({
    mutationFn: (id) => deleteCommentAPI(id),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["wallPosts"] });
      const { data: refetchedPlace } = await refetch();
      setPlace(refetchedPlace);
      setModal({ type: "success", message: "Comment deleted" });
    },
    onError: () =>
      setModal({ type: "error", message: "Deleting comment error" }),
  });

  return { deleteComment };
}
