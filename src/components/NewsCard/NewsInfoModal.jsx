import React, { useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import NewsCard from "./NewsCard";
import { useGetSingleNews } from "../../hooks/feed/useGetSingleNews";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

const NewsInfoModal = ({ isOpen, onClose, children }) => {
  //   useEffect(() => {
  //     const handleKeyDown = (e) => {
  //       if (e.key === "Escape") {
  //         onClose();
  //       }
  //     };

  //     if (isOpen) {
  //       window.addEventListener("keydown", handleKeyDown);
  //     }

  //     return () => {
  //       window.removeEventListener("keydown", handleKeyDown);
  //     };
  //   }, [isOpen, onClose]);

  //   if (!isOpen) return null;
  const [searchParams] = useSearchParams();
  const { data, isPending, isError } = useGetSingleNews(
    searchParams.get("news_id") || "",
  );
  if (isPending) return;
  if (isError) toast.error("لطفا دوباره تلاش کنید.");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl transform transition-all overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 text-gray-500 bg-gray-100 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 z-10"
          aria-label="بستن"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        <div className="p-6 max-h-[85vh] overflow-y-auto">
          <NewsCard news={data} />
        </div>
      </div>
    </div>
  );
};

export default NewsInfoModal;
