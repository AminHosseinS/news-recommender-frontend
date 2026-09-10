import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

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

export default function ShowCasePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const userFavorites = [
    "artificial-intelligence",
    "world-football",
    "economy",
  ];

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      console.log(`جستجوی اخبار با عبارت: ${searchQuery}`);
      // navigate(`/search?q=${searchQuery}`)
    }
  };

  const handleCategoryClick = (slug) => {
    console.log(`هدایت به صفحه دسته‌بندی: ${slug}`);
  };

  const favoriteTags = TAGS_DATA.filter((tag) =>
    userFavorites.includes(tag.slug),
  );

  const normalTags = TAGS_DATA.filter(
    (tag) => !userFavorites.includes(tag.slug),
  );

  return (
    // با استفاده از flex و justify-center محتوا را در وسط صفحه قرار می‌دهیم
    <div className="w-full min-h-full bg-background font-sans flex flex-col justify-center pb-20">
      <div className="w-full max-w-2xl mx-auto p-4 flex flex-col items-center gap-8">
        {/* پیام خوش‌آمدگویی شبیه به چت‌بات‌ها */}
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-text-main mb-2">
            دنبال چه خبری می‌گردید؟
          </h1>
          <p className="text-sm text-text-muted">
            عبارت مورد نظر خود را جستجو کنید یا از موضوعات زیر انتخاب کنید
          </p>
        </div>

        {/* باکس جستجو - بدون سایه و با طراحی کپسولی */}
        <div className="relative w-full max-w-xl">
          <input
            type="text"
            placeholder="جستجو در بین اخبار..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchSubmit}
            className="w-full bg-surface text-text-main border border-border-subtle rounded-3xl py-4 pr-12 pl-4 text-base focus:outline-none focus:border-primary transition-colors placeholder:text-text-muted"
          />
          <MagnifyingGlassIcon className="w-6 h-6 text-text-muted absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* لیست موضوعات در قالب پیشنهادها (Suggestions) */}
        <div className="w-full max-w-xl flex flex-col gap-5 mt-2 opacity-85">
          {favoriteTags.length > 0 && (
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-bold text-text-muted px-2">
                پیشنهادهای شما
              </h3>
              <div className="flex flex-wrap gap-2 ">
                {favoriteTags.map((tag) => (
                  <button
                    key={tag.slug}
                    onClick={() => handleCategoryClick(tag.slug)}
                    className="px-4 py-2 text-sm font-medium rounded-2xl border transition-all duration-200 
                             bg-primary/5 text-primary border-primary/20 hover:bg-primary/10"
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {normalTags.length > 0 && (
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-bold text-text-muted px-2 mt-2">
                سایر موضوعات
              </h3>
              <div className="flex flex-wrap gap-2 ">
                {normalTags.map((tag) => (
                  <button
                    key={tag.slug}
                    onClick={() => handleCategoryClick(tag.slug)}
                    className="px-4 py-2 text-sm font-medium rounded-2xl border transition-all duration-200 
                             bg-transparent text-text-muted border-border-subtle hover:bg-surface hover:text-text-main"
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
