import api from "../../utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const getSingleNews = (news_id) => {
  return api.get(`feed/${news_id}`);
};

export const useGetSingleNews = (news_id) => {
  return useQuery({
    queryKey: ["singleNews", news_id],
    queryFn: () => getSingleNews(news_id),
  });
};
