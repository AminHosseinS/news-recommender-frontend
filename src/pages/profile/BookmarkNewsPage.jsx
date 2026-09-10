import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import NewsList from "../../components/NewsList/NewsList";

const MOCK_BOOKMARKS = [
  {
    id: 1188957,
    title:
      "نسل جدید هوش مصنوعی؛ چگونه ابزارهای جدید بازار کار را تغییر می‌دهند؟",
    summary:
      "با معرفی مدل‌های زبانی جدید، بسیاری از مشاغل با تحولات جدی روبه‌رو شده‌اند. این مقاله به بررسی تاثیرات هوش مصنوعی بر مشاغل برنامه‌نویسی، تولید محتوا و پشتیبانی مشتریان می‌پردازد.",
  },
  {
    id: 1188958,
    title: "زمان‌بندی جدید قطارهای سریع‌السیر تهران - مشهد اعلام شد",
    summary:
      "شرکت راه‌آهن جدول زمان‌بندی جدید قطارهای سریع‌السیر را برای نیمه دوم سال منتشر کرد. مسافران می‌توانند بلیت‌های خود را از طریق اپلیکیشن‌های مجاز خریداری کنند.",
  },
];

export default function BookmarkNewsPage() {
  const navigate = useNavigate();

  const handleNewsClick = (id) => {
    console.log(`انتقال به خبر بوکمارک شده شماره: ${id}`);
  };

  return (
    // حذف pb-20 (پدینگ پایین برای نویگیشن بار) چون این صفحه دیگر نویگیشن ندارد
    <div
      dir="rtl"
      className="w-full h-[100dvh] bg-background font-sans overflow-y-auto pb-6"
    >
      {/* هدر چسبان با دکمه بازگشت */}
      <div className="w-full sticky top-0 z-10 p-4 pt-6 bg-background border-b border-border-subtle">
        <div className="max-w-md mx-auto px-2 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-1.5 -mr-2 rounded-full text-text-muted hover:bg-surface hover:text-text-main transition-colors"
          >
            <ArrowRightIcon className="w-6 h-6" />
          </button>

          <h1 className="text-xl font-bold text-text-main">اخبار ذخیره شده</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 pt-6">
        <NewsList
          items={MOCK_BOOKMARKS}
          onItemClick={handleNewsClick}
          emptyMessage="شما هنوز هیچ خبری را ذخیره نکرده‌اید."
        />
      </div>
    </div>
  );
}
