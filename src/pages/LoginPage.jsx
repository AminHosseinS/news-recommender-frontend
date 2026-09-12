import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneStep from "../components/login/PhoneStep";
import OtpStep from "../components/login/OtpStep";
import { useSendOTP } from "../hooks/authentication/useSendOTP";
import { useLogin } from "../hooks/authentication/useLogin";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const navigate = useNavigate();
  const {
    mutateAsync: sendOtp,
    isPending: isPendingOtp,
    isError: isErrorOtp,
  } = useSendOTP();
  const {
    mutateAsync: login,
    isPending: isPendingLogin,
    isError: isErrorLogin,
  } = useLogin();

  const handlePhoneSubmit = async () => {
    try {
      const res = await sendOtp({
        phone_number: phoneNumber,
      });
      setStep(2);
    } catch (err) {
      toast.error("لطفا مجدد تلاش کنید.");
    }
  };

  const handleOtpSubmit = async (otpCode) => {
    try {
      const res = await login({
        username: phoneNumber,
        password: otpCode,
      });
      toast.success("خوش آمدید.");
      navigate("/");
    } catch (err) {
      toast.error("لطفا مجدد تلاش کنید.");
      console.log(err);
    }
  };

  const handleResendOtp = () => {
    console.log("کد جدید برای شماره ارسال شد:", phoneNumber);
    setOtp(["", "", "", "", ""]);
  };

  const handleBack = () => {
    setStep(1);
    setOtp(["", "", "", "", ""]);
  };

  return (
    <div className="w-full max-w-md mx-auto h-full bg-background font-sans">
      {step === 1 ? (
        <PhoneStep
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          onNext={handlePhoneSubmit}
        />
      ) : (
        <OtpStep
          phoneNumber={phoneNumber}
          otp={otp}
          setOtp={setOtp}
          onBack={handleBack}
          onSubmit={handleOtpSubmit}
          onResend={handleResendOtp}
        />
      )}
    </div>
  );
}
