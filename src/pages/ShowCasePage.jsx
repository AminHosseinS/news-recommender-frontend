import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { TAGS_DATA } from "../utils/tags";
import { useSearch } from "../hooks/feed/useSearch";
import { useNavigate } from "react-router-dom";

export default function ShowCasePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const userFavorites = [
    "artificial-intelligence",
    "world-football",
    "economy",
  ];

  const handleSearchSubmit = (e) => {
    if (
      e.key === "Enter" &&
      searchQuery.trim() !== "" &&
      searchQuery.length > 1
    ) {
      navigate(`/showcase/searchResult?q=${encodeURIComponent(searchQuery)}`);
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
    <div className="w-full min-h-full bg-background ">
      <div className="w-full bg-surface/25  max-w-2xl mx-auto p-4 flex flex-col items-center gap-8">
        <div className="text-center mt-8">
          <h1 className="text-2xl md:text-3xl font-bold text-text-main mb-2">
            دنبال چه خبری می‌گردید؟
          </h1>
          <p className="text-sm text-text-muted">
            عبارت مورد نظر خود را جستجو کنید یا از موضوعات زیر انتخاب کنید
          </p>
        </div>

        <div className="relative w-full max-w-xl">
          <input
            type="text"
            placeholder="جستجو در بین اخبار..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchSubmit}
            className="w-full bg-surface text-text-main border border-primary rounded-3xl py-4 pr-12 pl-4 text-base focus:outline-none focus:border-2 transition-colors placeholder:text-text-muted"
          />
          <MagnifyingGlassIcon className="w-6 h-6 text-primary absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

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
                             bg-surface/60 text-text-muted border-surface hover:bg-surface/50 hover:text-text-main"
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
