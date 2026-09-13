import { useQuery } from "@tanstack/react-query";
import api from "../../utils/axios";

export const search = (query) => {
  return api.get("feed/search", { params: { q: query, limit: 25 } });
};

export const useSearch = (query) => {
  return useQuery({
    queryKey: ["searchResult", query],
    queryFn: () => search(query),
    enabled: !!query,
  });
};
