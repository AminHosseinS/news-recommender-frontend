import React, { useState } from "react";
import ActionButtons from "./ActionButtons";
import Tag from "./Tag";
import {
  EllipsisHorizontalIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { TAGS_MAP } from "../../utils/tags";
import { useBookmarkNews } from "../../hooks/profile/useBookmarkNews";

export default function NewsCard({ news, onTrackAction }) {
  const [isLiked, setIsLiked] = useState(news.isLiked || false);
  const [isBookmarked, setIsBookmarked] = useState(news.isBookmarked || false);

  const { mutateAsync: toggleBookmarkAPI } = useBookmarkNews();

  const handleLike = async () => {
    const newState = !isLiked;

    setIsLiked(newState);

    if (onTrackAction) onTrackAction("like", newState);
  };

  const handleDoubleClick = async () => {
    if (!isLiked) {
      setIsLiked(true);
      if (onTrackAction) onTrackAction("like", true);
    }
  };

  const handleBookmark = async () => {
    const newState = !isBookmarked;

    setIsBookmarked(newState);
    if (onTrackAction) onTrackAction("bookmark", newState);

    try {
      await toggleBookmarkAPI(news.id);
    } catch (error) {
      setIsBookmarked(!newState);
      if (onTrackAction) onTrackAction("bookmark", !newState);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: news.title, url: news.link });

        if (onTrackAction) onTrackAction("share", true);
      } catch (err) {
        console.log("اشتراک‌گذاری لغو شد", err);
      }
    }
  };

  const handleLinkClick = () => {
    if (onTrackAction) onTrackAction("read_more", true);
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div
        className="w-full max-w-md bg-background rounded-2xl shadow-sm border border-border-subtle overflow-hidden select-none"
        onDoubleClick={handleDoubleClick}
      >
        {news.image_url && (
          <img
            src={news.image_url}
            alt={news.title}
            className="w-full h-48 object-cover cursor-pointer"
          />
        )}
        <div className="p-5 relative">
          <div className="flex justify-between items-start mb-2 relative">
            <h2 className="text-xl font-bold text-text-main leading-tight ml-4">
              {news.title}
            </h2>
          </div>

          <p className="text-sm text-text-muted leading-relaxed text-justify mb-4">
            {news.ai_summary}
          </p>

          <a
            href={news.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary font-medium hover:underline block mb-4"
            onClick={handleLinkClick}
          >
            مشاهده کامل خبر ...
          </a>

          {news.tags && news.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {news.tags.map((tag, index) => (
                <Tag key={index} text={TAGS_MAP[tag]} />
              ))}
            </div>
          )}

          <ActionButtons
            isLiked={isLiked}
            isBookmarked={isBookmarked}
            onLikeToggle={handleLike}
            onBookmarkToggle={handleBookmark}
            onShare={handleShare}
            url={news.link}
          />
        </div>
      </div>
    </div>
  );
}
