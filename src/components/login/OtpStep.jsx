import React, { useRef, useState, useEffect } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function OtpStep({
  otp,
  setOtp,
  phoneNumber,
  onBack,
  onSubmit,
  onResend,
}) {
  const inputRefs = useRef([]);
  const [timeLeft, setTimeLeft] = useState(120);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  const handleResendClick = () => {
    setTimeLeft(120);
    onResend();
  };

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (!/^[0-9]*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 4) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, 5);

    if (!/^[0-9]+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, i) => {
      newOtp[i] = char;
      if (inputRefs.current[i]) inputRefs.current[i].value = char;
    });
    setOtp(newOtp);

    const lastIndex = Math.min(pastedData.length, 4);
    inputRefs.current[lastIndex]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length === 5) {
      onSubmit(otpCode);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-full flex flex-col animate-fade-in p-4"
    >
      <div className="w-full pt-2 pb-4 flex items-center shrink-0">
        <button
          type="button"
          onClick={onBack}
          className="p-2 -mr-2 rounded-full text-text-muted hover:bg-surface hover:text-text-main transition-colors"
        >
          <ArrowRightIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center pt-8">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-text-main mb-3">کد تایید</h1>
          <p className="text-sm text-text-muted leading-relaxed">
            کد ۵ رقمی به شماره{" "}
            <span className="text-text-main font-medium mx-1" dir="ltr">
              {phoneNumber}
            </span>{" "}
            ارسال شد.
          </p>
        </div>

        <div
          dir="ltr"
          className="flex justify-center gap-2.5 sm:gap-3 w-full max-w-sm mb-8"
        >
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              autoComplete={index === 0 ? "one-time-code" : "off"}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className="w-12 h-14 sm:w-14 sm:h-16 bg-surface text-text-main border border-border-subtle rounded-2xl text-center text-2xl font-bold focus:outline-none focus:border-primary transition-colors"
            />
          ))}
        </div>

        <div className="text-sm font-medium mt-2">
          {timeLeft > 0 ? (
            <span className="text-text-muted flex items-center gap-2">
              ارسال مجدد کد تا
              <span className="text-primary text-base font-bold">
                {formatTime(timeLeft)}
              </span>
              دیگر
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResendClick}
              className="text-primary hover:underline transition-colors"
            >
              ارسال مجدد کد
            </button>
          )}
        </div>
      </div>

      <div className="w-full max-w-sm mx-auto mt-auto pb-6 pt-4 shrink-0">
        <button
          type="submit"
          disabled={otp.join("").length < 5}
          className="w-full py-4 bg-primary text-white text-base font-bold rounded-2xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          تایید و ورود
        </button>
      </div>
    </form>
  );
}
