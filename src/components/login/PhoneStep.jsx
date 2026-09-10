import React from "react";

export default function PhoneStep({ phoneNumber, setPhoneNumber, onNext }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.length >= 10) {
      onNext();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-full flex flex-col animate-fade-in p-4"
    >
      {/* بخش بالایی: لوگو و اینپوت */}
      <div className="flex-1 flex flex-col items-center pt-16">
        {/* لوگو فرضی */}
        <div className="w-16 h-16 bg-primary/10 rounded-3xl mb-8 flex items-center justify-center">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 text-primary"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-text-main mb-3">
            ورود یا ثبت‌نام
          </h1>
          <p className="text-sm text-text-muted">
            برای ادامه، لطفاً شماره موبایل خود را وارد کنید
          </p>
        </div>

        <div className="w-full max-w-sm flex flex-col gap-2">
          <label className="text-sm font-medium text-text-main px-1">
            شماره موبایل
          </label>
          <input
            dir="ltr"
            type="tel"
            placeholder="09123456789"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full bg-surface text-text-main border border-border-subtle rounded-2xl py-4 px-4 text-center text-lg tracking-widest focus:outline-none focus:border-primary transition-colors placeholder:text-text-muted/50"
            autoFocus
          />
        </div>
      </div>

      {/* بخش پایینی: دکمه که به لطف flex-1 و mt-auto می‌چسبد به کف صفحه */}
      <div className="w-full max-w-sm mx-auto mt-auto pb-6 pt-4">
        <button
          type="submit"
          disabled={phoneNumber.length < 10}
          className="w-full py-4 bg-primary text-white text-base font-bold rounded-2xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          دریافت کد تایید
        </button>
      </div>
    </form>
  );
}
