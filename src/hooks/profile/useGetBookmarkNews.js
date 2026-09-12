import api from "../../utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const getBookmarksNews = () => {
  return api.get("profile/bookmarks", { params: { skip: 0, limit: 50 } });
};

export const useGetBookmarksNews = () => {
  return useQuery({
    queryKey: ["bookmarks"],
    queryFn: getBookmarksNews,
  });
};
