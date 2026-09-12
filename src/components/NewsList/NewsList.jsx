import React from "react";
import NewsListItem from "./NewsListItem";

export default function NewsList({
  items,
  onItemClick,
  emptyMessage = "هیچ موردی یافت نشد.",
}) {
  if (!items || items.length === 0) {
    return (
      <div className="w-full text-center text-text-muted text-sm py-10 bg-background border border-border-subtle rounded-2xl">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4">
      {items.map((item) => (
        <NewsListItem
          key={item.id}
          id={item.id}
          title={item.title}
          summary={item.ai_summary}
          onClick={onItemClick}
        />
      ))}
    </div>
  );
}
