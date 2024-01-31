import { useQuery } from "@tanstack/react-query";
import { getUserAPI } from "../apiUsers";

export function useUser(username) {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", username],
    queryFn: () => getUserAPI(username),
  });

  return { isLoading, error, user };
}
