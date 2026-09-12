import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneStep from "../components/login/PhoneStep";
import OtpStep from "../components/login/OtpStep";

export default function LoginPage() {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const navigate = useNavigate();

  const handlePhoneSubmit = () => {
    console.log("ارسال درخواست کد تایید برای:", phoneNumber);
    setStep(2);
  };

  const handleOtpSubmit = (otpCode) => {
    console.log("بررسی کد تایید:", otpCode);
    navigate("/");
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
    <div
      dir="rtl"
      className="w-full max-w-md mx-auto h-full bg-background font-sans"
    >
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
