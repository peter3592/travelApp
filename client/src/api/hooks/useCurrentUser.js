import { useQuery } from "@tanstack/react-query";
import { getCheckUserAPI } from "../apiUsers";

export function useCurrentUser() {
  const {
    data: currentUser,
    isLoading,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCheckUserAPI,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return { isLoading, isSuccess, error, currentUser };
}
