import React, { useState } from "react";
import NewsListItem from "./NewsListItem";
import NewsInfoModal from "../NewsCard/NewsInfoModal";
import { useSearchParams } from "react-router-dom";

export default function NewsList({
  items,
  emptyMessage = "هیچ موردی یافت نشد.",
}) {
  if (!items || items.length === 0) {
    return (
      <div className="w-full text-center text-text-muted text-sm py-10 bg-background border border-border-subtle rounded-2xl">
        {emptyMessage}
      </div>
    );
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const onItemClick = (id) => {
    searchParams.set("news_id", id);
    setSearchParams(searchParams);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {items.map((item) => (
        <NewsListItem
          key={item.id}
          id={item.id}
          title={item.title}
          summary={item.ai_summary}
          onClick={() => onItemClick(item.id)}
        />
      ))}
      {isModalOpen && (
        <NewsInfoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
