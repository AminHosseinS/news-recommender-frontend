import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRightIcon,
  XMarkIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

const TAGS_DATA = [
  { name: "ورزشی", slug: "sports" },
  { name: "فوتبال ایران", slug: "iranian-football" },
  { name: "فوتبال جهان", slug: "world-football" },
  { name: "اقتصادی", slug: "economy" },
  { name: "طلا و ارز", slug: "gold-and-currency" },
  { name: "بورس", slug: "stock-market" },
  { name: "خودرو", slug: "automotive" },
  { name: "مسکن و راه", slug: "housing-and-roads" },
  { name: "سیاسی", slug: "politics" },
  { name: "دولت", slug: "government" },
  { name: "مجلس", slug: "parliament" },
  { name: "انتخابات", slug: "elections" },
  { name: "بین‌الملل", slug: "international" },
  { name: "خاورمیانه", slug: "middle-east" },
  { name: "اروپا و آمریکا", slug: "europe-and-america" },
  { name: "اجتماعی", slug: "society" },
  { name: "حوادث", slug: "incidents" },
  { name: "محیط زیست", slug: "environment" },
  { name: "دادگاه و قضا", slug: "courts-and-judiciary" },
  { name: "علم و فناوری", slug: "science-and-technology" },
  { name: "اینترنت", slug: "internet" },
  { name: "هوش مصنوعی", slug: "artificial-intelligence" },
  { name: "سلامت و پزشکی", slug: "health-and-medicine" },
  { name: "دانشگاه و آموزش", slug: "university-and-education" },
  { name: "فرهنگ و هنر", slug: "culture-and-art" },
  { name: "سینما و تلویزیون", slug: "cinema-and-television" },
  { name: "موسیقی", slug: "music" },
  { name: "کتاب و ادبیات", slug: "books-and-literature" },
  { name: "گردشگری", slug: "tourism" },
];

export default function FavoriteTagsPage() {
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState([
    "artificial-intelligence",
    "world-football",
    "economy",
  ]);

  const isLimitReached = favorites.length >= 5;

  const toggleFavorite = (slug) => {
    if (favorites.includes(slug)) {
      setFavorites(favorites.filter((item) => item !== slug));
    } else {
      if (favorites.length < 5) {
        setFavorites([...favorites, slug]);
      }
    }
  };

  const handleUpdate = () => {
    console.log("لیست علاقه‌مندی‌های جدید ذخیره شد:", favorites);
    navigate(-1);
  };

  const favoriteTags = TAGS_DATA.filter((tag) => favorites.includes(tag.slug));
  const normalTags = TAGS_DATA.filter((tag) => !favorites.includes(tag.slug));

  return (
    // کانتینر اصلی flex-col و محدود شده به اندازه موبایل (max-w-md)
    <div
      dir="rtl"
      className="w-full max-w-md mx-auto h-[100dvh] bg-background font-sans flex flex-col"
    >
      {/* هدر - با ویژگی shrink-0 که ثابت بماند */}
      <div className="w-full p-4 pt-6 border-b border-border-subtle shrink-0 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-1.5 -mr-2 rounded-full text-text-muted hover:bg-surface hover:text-text-main transition-colors"
        >
          <ArrowRightIcon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-text-main">موضوعات مورد علاقه</h1>
      </div>

      {/* محتوای بدنه - با ویژگی flex-1 فضای خالی را پر می‌کند و اسکرول می‌خورد */}
      <div className="w-full flex-1 overflow-y-auto p-4">
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4 px-1">
            <h2 className="text-sm font-bold text-text-main">
              موضوعات انتخابی شما
            </h2>
            <span
              className={`text-xs font-medium ${isLimitReached ? "text-red-500" : "text-text-muted"}`}
            >
              {favorites.length} از ۵
            </span>
          </div>

          {favoriteTags.length > 0 ? (
            <div className="flex flex-wrap gap-2.5">
              {favoriteTags.map((tag) => (
                <button
                  key={tag.slug}
                  onClick={() => toggleFavorite(tag.slug)}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-2xl transition-all duration-200 
                           bg-primary/10 text-primary border border-primary/20 hover:bg-red-50 hover:text-red-500 hover:border-red-200 dark:hover:bg-red-900/20"
                >
                  {tag.name}
                  <XMarkIcon className="w-4 h-4 opacity-80" />
                </button>
              ))}
            </div>
          ) : (
            <div className="text-sm text-text-muted bg-surface p-4 rounded-2xl border border-border-subtle text-center">
              هنوز موضوعی را انتخاب نکرده‌اید.
            </div>
          )}
        </div>

        <div>
          <h2 className="text-sm font-bold text-text-main mb-2 px-1">
            سایر موضوعات
          </h2>
          {isLimitReached && (
            <p className="text-xs text-red-500 mb-4 px-1">
              شما به سقف انتخاب (۵ موضوع) رسیده‌اید. برای انتخاب موضوع جدید،
              ابتدا یکی را حذف کنید.
            </p>
          )}

          <div className="flex flex-wrap gap-2.5">
            {normalTags.map((tag) => (
              <button
                key={tag.slug}
                onClick={() => toggleFavorite(tag.slug)}
                disabled={isLimitReached}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-2xl transition-all duration-200 
                  ${
                    isLimitReached
                      ? "bg-surface/50 text-text-muted/50 border border-border-subtle/50 cursor-not-allowed opacity-60"
                      : "bg-surface text-text-muted border border-border-subtle hover:bg-surface/80 hover:text-text-main"
                  }`}
              >
                <PlusIcon className="w-4 h-4 opacity-70" />
                {tag.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* دکمه بدون div اضافه - با حاشیه‌های متناسب کاملاً در جای درست می‌نشیند */}
      <button
        onClick={handleUpdate}
        className="mx-4 mb-6 mt-2 shrink-0 py-3.5 bg-primary text-white text-base font-bold rounded-2xl hover:bg-primary/90 transition-colors shadow-sm"
      >
        به‌روزرسانی موضوعات
      </button>
    </div>
  );
}
