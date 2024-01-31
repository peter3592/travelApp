import { useQuery } from "@tanstack/react-query";
import { getPlaceAPI } from "../apiPlaces";

export function usePlace(placeId) {
  const {
    data: place,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["place", placeId],
    queryFn: () => getPlaceAPI(placeId),
    enabled: false,
  });

  return { isLoading, refetch, error, place };
}
