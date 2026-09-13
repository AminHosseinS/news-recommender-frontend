import { useQuery } from "@tanstack/react-query";
import api from "../../utils/axios";

export const getInfo = () => {
  return api.get("profile/me");
};

export const useGetInfo = () => {
  return useQuery({
    queryKey: ["info"],
    queryFn: getInfo,
  });
};
