import api from "../../utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const updateFavoriteTags = (data) => {
  return api.put("profile/favorite-tags", data);
};

export const useUpdateFavoriteTags = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateFavoriteTags,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorite-tags"] });
    },
  });
};
