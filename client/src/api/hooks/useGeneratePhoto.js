import { useQuery } from "@tanstack/react-query";
import { getGeneratedPhotoAPI } from "../apiUsers";

export function useGeneratePhoto() {
  const {
    data: photo,
    isLoading,
    isFetching,
    isSuccess,
    error,
    refetch,
  } = useQuery({
    queryKey: ["generatedPhoto"],
    queryFn: getGeneratedPhotoAPI,
  });

  return { isSuccess, isLoading, isFetching, error, photo, refetch };
}
