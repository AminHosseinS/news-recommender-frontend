import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import NewsList from "../../components/NewsList/NewsList";
import { useGetBookmarksNews } from "../../hooks/profile/useGetBookmarkNews";

export default function BookmarkNewsPage() {
  const navigate = useNavigate();
  const { data, isPending, isError } = useGetBookmarksNews();
  const [bookmarkNews, setBookmarkNews] = useState([]);

  useEffect(() => {
    if (data) {
      setBookmarkNews(data?.data);
    }
  }, [isPending, isError]);
  if (isPending) return;

  return (
    <div className="w-full h-full bg-background">
      <div className="w-full sticky top-0 z-10 p-4 pt-6 bg-background border-b-2 border-border-subtle">
        <div className="max-w-md mx-auto px-2 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-1.5 -mr-2 rounded-full text-primary hover:bg-surface hover:text-text-main transition-colors"
          >
            <ArrowRightIcon className="w-6 h-6" />
          </button>

          <h1 className="text-xl font-bold text-text-main">اخبار ذخیره شده</h1>
        </div>
      </div>

      <div className="max-w-md bg-surface/80 min-h-full mx-auto p-4 pt-6">
        <NewsList
          items={bookmarkNews}
          emptyMessage="شما هنوز هیچ خبری را ذخیره نکرده‌اید."
        />
      </div>
    </div>
  );
}
