import React from "react";

export default function NewsListItem({ id, title, summary, onClick }) {
  return (
    <div
      onClick={() => onClick(id)}
      className="w-full bg-background border border-border-subtle rounded-2xl p-5 flex flex-col gap-3 cursor-pointer hover:bg-surface/50 transition-colors"
    >
      <h3 className="text-lg font-bold text-text-main leading-tight">
        {title}
      </h3>

      <p className="text-sm text-text-muted leading-relaxed text-justify line-clamp-2">
        {summary}
      </p>

      <div className="flex items-center justify-between mt-1 pt-3 border-t border-border-subtle/50">
        <span className="text-xs text-primary font-medium">
          مشاهده کامل خبر
        </span>
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4 text-primary"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </div>
    </div>
  );
}
