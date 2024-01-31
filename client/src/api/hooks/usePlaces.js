import { useQuery } from "@tanstack/react-query";
import { getPlacesAPI } from "../apiPlaces";

export function usePlaces() {
  const {
    data: places,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["places"],
    queryFn: getPlacesAPI,
  });

  return { isLoading, error, places };
}
