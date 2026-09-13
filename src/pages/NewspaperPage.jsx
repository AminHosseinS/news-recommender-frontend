import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import NewsCard from "../components/NewsCard/NewsCard";
import { useGetFeed } from "../hooks/feed/useGetFeed";

export default function NewspaperPage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useGetFeed();

  const newsList = data?.pages.flatMap((page) => page.data || []) ?? [];
  const totalItems = newsList.length;

  const PREFETCH_THRESHOLD = 5;

  const handleSlideChange = (swiper) => {
    const currentIndex = swiper.activeIndex;
    setActiveIndex(currentIndex);

    if (
      currentIndex >= totalItems - PREFETCH_THRESHOLD &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      console.log("nextone");

      fetchNextPage();
    }
  };

  const [activeIndex, setActiveIndex] = useState(0);

  if (isPending) return;
  return (
    <div className="w-full h-full bg-surface/25 flex justify-center font-sans overflow-hidden">
      <Swiper
        direction="vertical"
        className="w-full max-w-lg h-full"
        onSlideChange={handleSlideChange}
        spaceBetween={0}
      >
        {newsList.map((news) => (
          <SwiperSlide key={news.id}>
            <NewsCard news={news} />
          </SwiperSlide>
        ))}

        {isFetchingNextPage && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-background text-primary px-4 py-2 rounded-full shadow-md text-sm border border-border-subtle">
            در حال دریافت اخبار...
          </div>
        )}
      </Swiper>
    </div>
  );
}
