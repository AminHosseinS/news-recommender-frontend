import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Tags, Bookmark, LogOut } from "lucide-react";
import MenuItem from "../components/profile/MenuItem";
import ProfileHeader from "../components/profile/ProfileHeader";
import BaleSyncModal from "../components/profile/BaleSyncModal";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [isBaleModalOpen, setIsBaleModalOpen] = useState(false);

  // برای تست می‌تونی این رو false کنی تا مودال باز بشه
  const [isBaleConnected, setIsBaleConnected] = useState(false);

  const menuItems = [
    {
      id: "favorites",
      title: "موضوعات مورد علاقه",
      icon: <Tags size={22} />,
      action: () => navigate("/profile/favoriteTags"),
    },
    {
      id: "saved",
      title: "اخبار ذخیره شده",
      icon: <Bookmark size={22} />,
      action: () => navigate("/profile/bookmarks"),
    },
    {
      id: "bale-sync",
      title: "اتصال به پیامرسان بله",
      icon: <MessageCircle size={22} />,
      action: () => {
        // فقط زمانی مودال باز میشه که کاربر متصل نباشه
        if (!isBaleConnected) {
          setIsBaleModalOpen(true);
        }
      },
      badge: isBaleConnected ? "متصل" : null,
    },
  ];

  return (
    <div
      dir="rtl"
      className="h-[100dvh] bg-background p-4 flex flex-col font-sans"
    >
      <ProfileHeader phoneNumber="+98 912 345 6789" />

      <div className="bg-surface rounded-2xl overflow-hidden mb-6 border border-border-subtle mt-6">
        {menuItems.map((item, index) => (
          <MenuItem
            key={item.id}
            title={item.title}
            icon={item.icon}
            onClick={item.action}
            hasBorder={index !== menuItems.length - 1}
            badge={item.badge}
          />
        ))}
      </div>

      <div className="bg-surface rounded-2xl overflow-hidden border border-red-500/20">
        <MenuItem
          title="خروج از حساب"
          icon={<LogOut size={22} />}
          onClick={() => console.log("Logout Flow")}
          isDestructive={true}
          hasBorder={false}
        />
      </div>

      <BaleSyncModal
        isOpen={isBaleModalOpen}
        onClose={() => setIsBaleModalOpen(false)}
      />
    </div>
  );
}
