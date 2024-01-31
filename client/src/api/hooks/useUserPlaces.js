import { useQuery } from "@tanstack/react-query";
import { getUserPlacesAPI } from "../apiPlaces";

export function useUserPlaces(username) {
  const {
    data: userPlaces,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userPlaces", username],
    queryFn: () => getUserPlacesAPI(username),
  });

  return { isLoading, error, userPlaces };
}
