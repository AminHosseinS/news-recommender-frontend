import React, { useState } from "react";
import NewsList from "../components/NewsList/NewsList";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const MOCK_RESULTS = [
  {
    id: 1188955,
    title:
      "تقویم کامل سال ۱۴۰۵ هجری شمسی (مناسبت‌ها، تعطیلات رسمی و روزهای ملی)",
    summary:
      "عصر ایران تقویم جامع سال ۱۴۰۵ را منتشر کرد که شامل تمامی مناسبت‌های مذهبی، روزهای ملی و تعطیلات رسمی است. این ابزار آنلاین امکان مشاهده همزمان تاریخ‌های شمسی، میلادی و قمری را برای برنامه‌ریزی دقیق‌تر کاربران فراهم می‌کند.",
  },
  {
    id: 1188956,
    title: "رشد بی‌سابقه شاخص بورس در معاملات امروز بازار سرمایه",
    summary:
      "شاخص کل بورس اوراق بهادار تهران در پایان معاملات امروز با رشد ۵۰ هزار واحدی به رکورد جدیدی دست یافت. کارشناسان دلیل این رشد را ورود نقدینگی جدید می‌دانند.",
  },
];

export default function SearchResultPage() {
  const [searchQuery, setSearchQuery] = useState("تقویم ۱۴۰۵");

  const handleNewsClick = (id) => {
    console.log(`انتقال به خبر شماره: ${id}`);
  };

  return (
    <div className="w-full h-full bg-background">
      <div className="w-full sticky top-0 z-10 p-4 pt-6 bg-background">
        <div className="max-w-md mx-auto">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface text-text-main border border-border-subtle rounded-3xl py-3 pr-12 pl-4 focus:outline-none focus:border-primary transition-colors text-sm"
            />
            <MagnifyingGlassIcon className="w-5 h-5 text-text-muted absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 pt-2 bg-surface">
        <p className="text-xs text-text-muted mb-4 px-2 font-medium">
          {MOCK_RESULTS.length} نتیجه برای «{searchQuery}»
        </p>

        <NewsList
          items={MOCK_RESULTS}
          onItemClick={handleNewsClick}
          emptyMessage="هیچ خبری با این عبارت پیدا نشد."
        />
      </div>
    </div>
  );
}
