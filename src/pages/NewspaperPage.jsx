import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import NewsCard from "../components/NewsCard/NewsCard";

// تابع ساخت دیتای فیک داخل خود صفحه
const generateFakeNews = (page) => {
  const limit = 10;
  return Array.from({ length: limit }).map((_, index) => {
    const uniqueId = (page - 1) * limit + index + 1;
    return {
      id: uniqueId,
      // عنوان خبر به همراه شماره برای تست اسکرول بی‌نهایت
      title: `تقویم کامل سال ۱۴۰۵ هجری شمسی (خبر ${uniqueId})`,
      content: `عصر ایران تقویم جامع سال ۱۴۰۵ را منتشر کرد که شامل تمامی مناسبت‌های مذهبی، روزهای ملی و تعطیلات رسمی است. این ابزار آنلاین امکان مشاهده همزمان تاریخ‌های شمسی، میلادی و قمری را برای برنامه‌ریزی دقیق‌تر کاربران فراهم می‌کند.
      
این تقویم با هدف تسهیل برنامه‌ریزی کاری، سفر و رویدادهای خانوادگی طراحی شده و دسترسی به آن بدون نیاز به دانلود اپلیکیشن امکان‌پذیر است.`,
      url: "https://www.asriran.com/fa/news/1188955",
      image:
        "https://cdn.asriran.com/media/f920c369ZTp3ZWJwfGY6MjU5MTc1OC5qcGd8ZnVpOjI0NzU1NzF8bDpmYXx2OjE.webp",
      // تبدیل تگ انگلیسی به فارسی برای سازگاری با ظاهر سایت
      tags: ["جامعه", "تقویم", "۱۴۰۵"],
      isLiked: false,
      isBookmarked: false,
    };
  });
};

export default function NewspaperPage() {
  const [newsList, setNewsList] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    loadMoreNews(1);
  }, []);

  const loadMoreNews = (pageNumber) => {
    if (isFetchingRef.current) return;

    setIsLoading(true);
    isFetchingRef.current = true;

    // شبیه‌سازی تاخیر دریافت از بک‌اند
    setTimeout(() => {
      const newNews = generateFakeNews(pageNumber);
      setNewsList((prev) => [...prev, ...newNews]);
      setPage(pageNumber);
      setIsLoading(false);
      isFetchingRef.current = false;
    }, 800);
  };

  const handleSlideChange = (swiper) => {
    const activeIndex = swiper.activeIndex;
    const totalItems = newsList.length;

    // توافق بک‌اند: ارسال درخواست در ایندکس‌های ۵، ۱۵، ۲۵ و...
    // یعنی زمانی که فاصله تا اسلاید آخر دقیقاً ۵ مورد باشد
    if (totalItems - activeIndex === 5 && !isFetchingRef.current) {
      loadMoreNews(page + 1);
    }
  };

  return (
    <div
      dir="rtl"
      className="w-full h-full bg-background flex justify-center font-sans overflow-hidden"
    >
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

        {isLoading && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-background text-primary px-4 py-2 rounded-full shadow-md text-sm border border-border-subtle">
            در حال دریافت اخبار...
          </div>
        )}
      </Swiper>
    </div>
  );
}
