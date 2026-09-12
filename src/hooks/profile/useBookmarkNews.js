import api from "../../utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const bookmarkNews = (news_id) => {
  return api.post(`profile/bookmarks/${news_id}`);
};

export const useBookmarkNews = () => {
  return useMutation({
    mutationFn: bookmarkNews,
  });
};
