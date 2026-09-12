import { useMutation } from "@tanstack/react-query";
import api from "../../utils/axios";

export const login = (data) => {
  return api.post("auth/login", data, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data?.access_token) {
        localStorage.setItem("access_token", data.access_token);
      }
    },
  });
};
