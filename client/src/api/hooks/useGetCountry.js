import { useMutation } from "@tanstack/react-query";
import { getCountryAPI } from "../apiPlaces";
import { useUIContext } from "../../store/context";

export function useGetCountry() {
  const { setModal } = useUIContext();

  const {
    mutate: getCountry,
    error,
    data,
  } = useMutation({
    mutationFn: ([latitude, longitude]) => getCountryAPI(latitude, longitude),
    onError: () =>
      setModal({
        type: "info",
        message: "Could not recognize country",
      }),
  });

  return { getCountry, error, data };
}
