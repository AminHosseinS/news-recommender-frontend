import api from "../../utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const getFavoriteTags = () => {
  return api.get("profile/favorite-tags");
};

export const useGetFavoriteTags = () => {
  return useQuery({
    queryKey: "favorite-tags",
    queryFn: getFavoriteTags,
  });
};
