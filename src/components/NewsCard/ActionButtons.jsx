import React from "react";
import {
  HeartIcon as HeartOutline,
  BookmarkIcon as BookmarkOutline,
  ShareIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartSolid,
  BookmarkIcon as BookmarkSolid,
} from "@heroicons/react/24/solid";

export default function ActionButtons({
  isLiked,
  isBookmarked,
  onLikeToggle,
  onBookmarkToggle,
  url,
}) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "خبر جدید", url });
      } catch (err) {
        console.log("اشتراک‌گذاری لغو شد", err);
      }
    }
  };

  return (
    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border-subtle">
      <button
        onClick={onLikeToggle}
        className={`flex items-center justify-center p-2 rounded-full transition-colors ${
          isLiked
            ? "text-red-500 bg-red-50 dark:bg-red-900/20"
            : "text-text-muted hover:bg-surface"
        }`}
      >
        {isLiked ? (
          <HeartSolid className="w-6 h-6" />
        ) : (
          <HeartOutline className="w-6 h-6" />
        )}
      </button>

      <button
        onClick={onBookmarkToggle}
        className={`flex items-center justify-center p-2 rounded-full transition-colors ${
          isBookmarked
            ? "text-primary bg-primary/10"
            : "text-text-muted hover:bg-surface"
        }`}
      >
        {isBookmarked ? (
          <BookmarkSolid className="w-6 h-6" />
        ) : (
          <BookmarkOutline className="w-6 h-6" />
        )}
      </button>

      <button
        onClick={handleShare}
        className="flex items-center justify-center p-2 rounded-full text-text-muted hover:bg-surface transition-colors mr-auto"
      >
        <ShareIcon className="w-6 h-6" />
      </button>
    </div>
  );
}
