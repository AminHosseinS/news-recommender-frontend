import React from "react";
import { User, Sun, Moon } from "lucide-react";
import { useThemeStore } from "../../store/useThemeStore";

export default function ProfileHeader({ phoneNumber }) {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div className="relative flex flex-col items-center justify-center pt-10 pb-8">
      <button
        onClick={toggleTheme}
        className="absolute top-4 left-4 p-2.5 rounded-full bg-surface text-text-muted hover:text-text-main transition-colors"
      >
        {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
      </button>

      <div className="w-24 h-24 bg-surface border-2 border-border-subtle rounded-full flex items-center justify-center mb-4">
        <User size={40} className="text-primary" strokeWidth={1.5} />
      </div>
      <h1 className="text-xl font-bold mb-1 text-text-main font-sans">
        حساب کاربری
      </h1>
      <p className="text-text-muted text-sm font-sans" dir="ltr">
        {phoneNumber}
      </p>
    </div>
  );
}
