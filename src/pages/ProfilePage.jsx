import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Tags, Bookmark, LogOut } from "lucide-react";
import MenuItem from "../components/profile/MenuItem";
import ProfileHeader from "../components/profile/ProfileHeader";
import BaleSyncModal from "../components/profile/BaleSyncModal";
import { useGetInfo } from "../hooks/profile/useGetInfo";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [isBaleModalOpen, setIsBaleModalOpen] = useState(false);
  const { data, isPending, isError } = useGetInfo();

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
        if (!data?.is_connected_to_bale) {
          setIsBaleModalOpen(true);
        }
      },
      badge: data?.is_connected_to_bale ? "متصل" : null,
    },
  ];
  if (isPending) return;
  if (isError) toast.error("لطفا دوباره تلاش کنید.");

  return (
    <div className="h-full bg-surface/25 p-4 flex flex-col font-sans">
      <ProfileHeader phoneNumber={data?.phone_number} />

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
