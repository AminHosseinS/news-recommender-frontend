import api from "../../utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const deleteBookmarkNews = (news_id) => {
  return api.delete(`profile/bookmarks/${news_id}`);
};

export const useDeleteBookmarkNews = () => {
  return useMutation({
    mutationFn: deleteBookmarkNews,
  });
};
