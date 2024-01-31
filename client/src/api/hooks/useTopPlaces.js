import { useQuery } from "@tanstack/react-query";
import { getTopPlacesAPI } from "../apiPlaces";
import { useDataContext } from "../../store/context";
import { AUTO_REFRESH_INTERVAL } from "../../utils/constants";

export function useTopPlaces() {
  const { autoRefresh, place } = useDataContext();

  const {
    data: topPlaces,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["topPlaces"],
    queryFn: getTopPlacesAPI,
    refetchInterval: autoRefresh && AUTO_REFRESH_INTERVAL,
    enabled: !place,
  });

  return { isLoading, error, topPlaces };
}
