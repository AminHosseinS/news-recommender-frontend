import React, { useState } from "react";
import ActionButtons from "./ActionButtons";
import Tag from "./Tag";
import {
  EllipsisHorizontalIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

export default function NewsCard({ news }) {
  const [isLiked, setIsLiked] = useState(news.isLiked);
  const [isBookmarked, setIsBookmarked] = useState(news.isBookmarked);
  const [showMenu, setShowMenu] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const handleDoubleClick = () => {
    if (!isLiked) setIsLiked(true);
  };

  const handleHideNews = () => {
    setIsHidden(true);
    setShowMenu(false);
  };

  if (isHidden) {
    return (
      <div className="w-full h-full flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-background rounded-2xl shadow-sm border border-border-subtle p-6 flex flex-col items-center justify-center gap-3">
          <EyeSlashIcon className="w-8 h-8 text-text-muted" />
          <p className="text-sm text-text-muted text-center">
            این خبر پنهان شد و دیگر به شما پیشنهاد نمی‌شود.
          </p>
          <button
            onClick={() => setIsHidden(false)}
            className="text-primary text-xs font-medium hover:underline mt-2"
          >
            بازگردانی
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div
        className="w-full max-w-md bg-background rounded-2xl shadow-sm border border-border-subtle overflow-hidden select-none"
        onDoubleClick={handleDoubleClick}
      >
        {news.image && (
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-48 object-cover cursor-pointer"
          />
        )}
        <div className="p-5 relative">
          <div className="flex justify-between items-start mb-2 relative">
            <h2 className="text-xl font-bold text-text-main leading-tight ml-4">
              {news.title}
            </h2>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className="text-text-muted hover:bg-surface p-1.5 rounded-full transition-colors shrink-0"
            >
              <EllipsisHorizontalIcon className="w-6 h-6" />
            </button>

            {showMenu && (
              <div className="absolute left-0 top-8 bg-background border border-border-subtle shadow-md rounded-xl w-48 z-10 py-2">
                <button
                  onClick={handleHideNews}
                  className="w-full text-right px-4 py-2 text-sm text-text-main hover:bg-surface transition-colors"
                >
                  پنهان کردن خبر
                </button>
                <button
                  onClick={handleHideNews}
                  className="w-full text-right px-4 py-2 text-sm text-text-main hover:bg-surface transition-colors"
                >
                  علاقه‌ای به این موضوع ندارم
                </button>
                <button
                  onClick={() => setShowMenu(false)}
                  className="w-full text-right px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                >
                  گزارش محتوا
                </button>
              </div>
            )}
          </div>

          <p className="text-sm text-text-muted leading-relaxed text-justify mb-4">
            {news.content}
          </p>

          <a
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary font-medium hover:underline block mb-4"
          >
            مشاهده کامل خبر ...
          </a>

          {news.tags && news.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {news.tags.map((tag, index) => (
                <Tag key={index} text={tag} />
              ))}
            </div>
          )}

          <ActionButtons
            isLiked={isLiked}
            isBookmarked={isBookmarked}
            onLikeToggle={() => setIsLiked(!isLiked)}
            onBookmarkToggle={() => setIsBookmarked(!isBookmarked)}
            url={news.url}
          />
        </div>
      </div>
    </div>
  );
}
