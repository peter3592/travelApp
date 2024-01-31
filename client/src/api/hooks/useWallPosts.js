import { useQuery } from "@tanstack/react-query";
import { getWallPostsAPI } from "../apiPlaces";
import { useDataContext } from "../../store/context";
import { AUTO_REFRESH_INTERVAL, POSTS_PER_PAGE } from "../../utils/constants";

export function useWallPosts(page) {
  const { autoRefresh, place } = useDataContext();

  const {
    data: wallPosts,
    error,
    refetch,
  } = useQuery({
    queryKey: ["wallPosts"],
    queryFn: () => getWallPostsAPI(page, POSTS_PER_PAGE),
    refetchInterval: autoRefresh && AUTO_REFRESH_INTERVAL,
    enabled: !place,
  });

  return { error, wallPosts, refetch };
}
