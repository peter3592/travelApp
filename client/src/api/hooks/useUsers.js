import { useQuery } from "@tanstack/react-query";
import { getUsersAPI } from "../apiUsers";

export function useUsers() {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsersAPI,
  });

  return { isLoading, error, users };
}
