import React, { useState, useEffect, useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import NewsCard from "../components/NewsCard/NewsCard";
import { useGetFeed } from "../hooks/feed/useGetFeed";
import { useTrackView } from "../hooks/feed/useTrackView";

export default function NewspaperPage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useGetFeed();
  const { trackInteraction } = useTrackView();

  const rawNewsList = data?.pages.flatMap((page) => page.data || []) ?? [];
  const newsList = Array.from(
    new Map(rawNewsList.map((item) => [item.id, item])).values(),
  );
  const totalItems = newsList.length;

  const PREFETCH_THRESHOLD = 5;

  const enterTimeRef = useRef(Date.now());
  const currentActionsRef = useRef([]);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTrackAction = useCallback((actionType, isAdding = true) => {
    if (isAdding) {
      if (!currentActionsRef.current.includes(actionType)) {
        currentActionsRef.current.push(actionType);
      }
    } else {
      currentActionsRef.current = currentActionsRef.current.filter(
        (action) => action !== actionType,
      );
    }
  }, []);

  const handleSlideChange = (swiper) => {
    const previousIndex = swiper.previousIndex;
    const currentIndex = swiper.activeIndex;
    setActiveIndex(currentIndex);

    const durationSec = Math.round((Date.now() - enterTimeRef.current) / 1000);
    const prevNews = newsList[previousIndex];

    if (prevNews && durationSec > 0) {
      trackInteraction(
        prevNews.id,
        [...currentActionsRef.current],
        durationSec,
      );
    }

    enterTimeRef.current = Date.now();
    currentActionsRef.current = [];
    activeIndexRef.current = currentIndex;

    if (
      currentIndex >= totalItems - PREFETCH_THRESHOLD &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        const durationSec = Math.round(
          (Date.now() - enterTimeRef.current) / 1000,
        );
        const currentNews = newsList[activeIndexRef.current];

        if (currentNews && durationSec > 0) {
          trackInteraction(
            currentNews.id,
            [...currentActionsRef.current],
            durationSec,
            true,
          );
        }
      } else {
        enterTimeRef.current = Date.now();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      const durationSec = Math.round(
        (Date.now() - enterTimeRef.current) / 1000,
      );
      const currentNews = newsList[activeIndexRef.current];
      if (currentNews && durationSec > 0) {
        trackInteraction(
          currentNews.id,
          [...currentActionsRef.current],
          durationSec,
          true,
        );
      }
    };
  }, [newsList, trackInteraction]);

  if (isPending) return null;

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
            <NewsCard news={news} onTrackAction={handleTrackAction} />
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
