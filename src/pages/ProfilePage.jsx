import React from "react";
import { MessageCircle, Tags, Bookmark, LogOut, Sun, Moon } from "lucide-react";
import MenuItem from "../components/profile/MenuItem";
import ProfileHeader from "../components/profile/ProfileHeader";

export default function ProfilePage() {
  const menuItems = [
    {
      id: "bale-sync",
      title: "اتصال به پیامرسان بله",
      icon: <MessageCircle size={22} />,
      action: () => console.log("Navigate to Bale connection"),
    },
    {
      id: "favorites",
      title: "موضوعات مورد علاقه",
      icon: <Tags size={22} />,
      action: () => console.log("Navigate to Favorites"),
    },
    {
      id: "saved",
      title: "اخبار ذخیره شده",
      icon: <Bookmark size={22} />,
      action: () => console.log("Navigate to Saved News"),
    },
  ];

  return (
    <div className="h-full bg-background p-4 pb-24">
      <ProfileHeader phoneNumber="+98 912 345 6789" />

      <div className="bg-surface rounded-2xl overflow-hidden mb-6 border border-border-subtle">
        {menuItems.map((item, index) => (
          <MenuItem
            key={item.id}
            title={item.title}
            icon={item.icon}
            onClick={item.action}
            hasBorder={index !== menuItems.length - 1}
          />
        ))}
      </div>

      <div className="bg-surface rounded-2xl overflow-hidden border border-red-500/10">
        <MenuItem
          title="خروج از حساب"
          icon={<LogOut size={22} />}
          onClick={() => console.log("Logout Flow")}
          isDestructive={true}
          hasBorder={false}
        />
      </div>
    </div>
  );
}
