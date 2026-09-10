import React, { useState } from "react";
import { X, Copy, Check } from "lucide-react";

export default function BaleSyncModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  const syncLink = "https://ble.ir/NewsBot?start=auth_123456789";

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(syncLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    // مقدار z-index به 9999 تغییر کرد تا روی همه چیز قرار بگیرد
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="w-full max-w-sm bg-background border border-border-subtle rounded-3xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-bold text-text-main">
            اتصال به ربات بله
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-text-muted hover:bg-surface transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* اضافه شدن روش دوم (استارت عادی و دریافت شماره) به متن راهنما */}
        <div className="text-sm text-text-muted leading-relaxed text-justify mb-6">
          برای اتصال حساب کاربری خود، لینک اختصاصی زیر را کپی کرده و در{" "}
          <strong>«فضای شخصی»</strong> خود در پیام‌رسان بله ارسال کنید و روی آن
          ضربه بزنید. همچنین می‌توانید مستقیماً وارد ربات شده و با استارت عادی و
          ارسال شماره موبایل خود، اکانتتان را به‌صورت خودکار همگام‌سازی کنید تا
          از هر دو روش امکان اتصال وجود داشته باشد.
        </div>

        <div className="flex items-center gap-2 bg-surface border border-border-subtle p-2 rounded-2xl mb-6">
          <input
            type="text"
            readOnly
            value={syncLink}
            dir="ltr"
            className="flex-1 bg-transparent border-none outline-none text-sm text-text-main px-2 truncate"
          />
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-2 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors text-sm font-medium shrink-0"
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? "کپی شد" : "کپی لینک"}
          </button>
        </div>

        {/* دکمه با استایل آبی (Primary) */}
        <button
          onClick={onClose}
          className="w-full py-3.5 bg-primary text-white text-base font-bold rounded-2xl hover:bg-primary/90 transition-colors shadow-sm"
        >
          متوجه شدم
        </button>
      </div>
    </div>
  );
}
