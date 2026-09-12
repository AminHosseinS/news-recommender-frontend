import { useMutation } from "@tanstack/react-query";
import api from "../../utils/axios";

export const sendOtp = (data) => {
  api.post("auth/send-otp", data);
};

export const useSendOTP = () => {
  return useMutation({
    mutationFn: sendOtp,
  });
};
