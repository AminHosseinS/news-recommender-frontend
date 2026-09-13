import React, { useState } from "react";
import NewsList from "../components/NewsList/NewsList";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useSearch } from "../hooks/feed/useSearch";
import { toPersianNumber } from "../utils/convertToPersianNumber";

export default function SearchResultPage() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [inputApi, setInputApi] = useState(searchParams.get("q") || "");
  const { data, isPending, isError } = useSearch(inputApi);

  const handleNewsClick = (id) => {
    console.log(`انتقال به خبر شماره: ${id}`);
  };

  const handleSearchSubmit = (e) => {
    if (
      e.key === "Enter" &&
      searchQuery.trim() !== "" &&
      searchQuery.length > 1
    ) {
      setInputApi(searchQuery);
    }
  };
  if (isPending) return;
  if (isError) toast.error("لطفا دوباره تلاش کنید.");

  return (
    <div className="w-full h-full bg-background">
      <div className="w-full sticky top-0 z-10 p-4 pt-6 bg-background">
        <div className="max-w-md mx-auto">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchSubmit}
              className="w-full bg-surface text-text-main border border-border-subtle rounded-3xl py-3 pr-12 pl-4 focus:outline-none focus:border-primary transition-colors text-sm"
            />
            <MagnifyingGlassIcon className="w-5 h-5 text-text-muted absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 pt-2 bg-surface">
        <p className="text-xs text-text-muted mb-4 px-2 font-medium">
          {toPersianNumber(data.length)} نتیجه برای «{searchQuery}»
        </p>

        <NewsList
          items={data}
          onItemClick={handleNewsClick}
          emptyMessage="هیچ خبری با این عبارت پیدا نشد."
        />
      </div>
    </div>
  );
}
