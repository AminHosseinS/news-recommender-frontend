import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import api from "../../utils/axios";

const LIMIT = 10;

export const getFeed = ({ pageParam }) => {
  return api.get("feed/web", {
    params: { offset: pageParam, limit: LIMIT, refresh: pageParam === 0 },
  });
};

export const useGetFeed = (params) => {
  return useInfiniteQuery({
    queryKey: ["feed"],
    queryFn: getFeed,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.data.length < LIMIT) {
        return undefined;
      }
      return lastPageParam + LIMIT;
    },
  });
};
