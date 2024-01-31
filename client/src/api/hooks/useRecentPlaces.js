import { useQuery } from "@tanstack/react-query";
import { getRecentPlacesAPI } from "../apiPlaces";
import { useDataContext } from "../../store/context";
import { AUTO_REFRESH_INTERVAL } from "../../utils/constants";

export function useRecentPlaces() {
  const { autoRefresh, place } = useDataContext();

  const {
    data: recentPlaces,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["recentPlaces"],
    queryFn: getRecentPlacesAPI,
    refetchInterval: autoRefresh && AUTO_REFRESH_INTERVAL,
    enabled: !place,
  });

  return { isLoading, error, recentPlaces };
}
