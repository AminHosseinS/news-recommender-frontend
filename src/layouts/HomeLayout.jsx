import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
  NewspaperIcon as NewspaperOutline,
  RectangleGroupIcon as ShowcaseOutline,
  UserIcon as UserOutline,
} from "@heroicons/react/24/outline";
import {
  NewspaperIcon as NewspaperSolid,
  RectangleGroupIcon as ShowcaseSolid,
  UserIcon as UserSolid,
} from "@heroicons/react/24/solid";

// استخراج دیتای منوها برای جلوگیری از تکرار کد (DRY)
const NAV_ITEMS = [
  {
    path: "/showcase",
    label: "ویترین",
    OutlineIcon: ShowcaseOutline,
    SolidIcon: ShowcaseSolid,
  },
  {
    path: "/",
    label: "روزنامه",
    OutlineIcon: NewspaperOutline,
    SolidIcon: NewspaperSolid,
  },
  {
    path: "/profile",
    label: "پروفایل",
    OutlineIcon: UserOutline,
    SolidIcon: UserSolid,
  },
];

export default function HomeLayout() {
  return (
    <div
      className="flex flex-col h-screen w-full bg-background text-text-main"
      dir="rtl"
    >
      {/* بخش محتوای اصلی */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      {/* نویگیشن‌بار پایین */}
      <nav className="sticky bottom-0 z-50 w-full bg-surface/85 backdrop-blur-lg border-t border-border-subtle pb-safe">
        <div className="flex justify-around items-center px-2 py-1.5">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative flex flex-col items-center justify-center w-16 h-14 gap-1 rounded-2xl transition-all duration-300 active:scale-90 ${
                  isActive
                    ? "text-primary"
                    : "text-text-muted hover:text-text-main"
                }`
              }
            >
              {({ isActive }) => {
                const Icon = isActive ? item.SolidIcon : item.OutlineIcon;
                return (
                  <>
                    {/* حرکت نرم آیکون به سمت بالا در حالت فعال */}
                    <div
                      className={`transition-transform duration-300 ${
                        isActive ? "-translate-y-0.5" : "translate-y-0"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <span
                      className={`text-[10px] font-medium transition-all duration-300 ${
                        isActive ? "opacity-100" : "opacity-80"
                      }`}
                    >
                      {item.label}
                    </span>
                  </>
                );
              }}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
