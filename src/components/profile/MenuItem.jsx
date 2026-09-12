import React from "react";
import { ChevronLeft } from "lucide-react";

export default function MenuItem({
  title,
  icon,
  onClick,
  isDestructive = false,
  hasBorder = true,
  badge,
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center bg-background justify-between p-4 transition-colors hover:bg-surface/50 active:bg-surface ${
        hasBorder ? "border-b border-border-subtle" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`p-2.5 rounded-2xl bg-surface ${isDestructive ? "text-red-500" : "text-primary"}`}
        >
          {icon}
        </div>
        <span
          className={`text-sm font-medium font-sans ${isDestructive ? "text-red-500" : "text-text-main"}`}
        >
          {title}
        </span>
      </div>

      {/* کانتینر جدید برای قرار گرفتن تگ و فلش کنار هم */}
      <div className="flex items-center gap-2">
        {badge && (
          <span className="px-2.5 py-1 bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold rounded-lg">
            {badge}
          </span>
        )}
        <ChevronLeft
          size={20}
          className={isDestructive ? "text-red-500/50" : "text-text-muted"}
        />
      </div>
    </button>
  );
}
