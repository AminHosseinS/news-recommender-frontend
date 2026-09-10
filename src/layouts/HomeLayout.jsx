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

export default function HomeLayout() {
  return (
    <div className="flex flex-col h-full w-full bg-background text-text-main dir-rtl">
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      <nav className="bg-surface border-t border-border-subtle flex justify-around p-3 pb-safe z-10">
        <NavLink
          to="/showcase"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 transition-colors ${
              isActive ? "text-primary" : "text-text-muted"
            }`
          }
        >
          {({ isActive }) => {
            const Icon = isActive ? ShowcaseSolid : ShowcaseOutline;
            return (
              <>
                <Icon className="w-6 h-6" />
                <span className="text-xs font-medium">ویترین</span>
              </>
            );
          }}
        </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 transition-colors ${
              isActive ? "text-primary" : "text-text-muted"
            }`
          }
        >
          {({ isActive }) => {
            const Icon = isActive ? NewspaperSolid : NewspaperOutline;
            return (
              <>
                <Icon className="w-6 h-6" />
                <span className="text-xs font-medium">روزنامه</span>
              </>
            );
          }}
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 transition-colors ${
              isActive ? "text-primary" : "text-text-muted"
            }`
          }
        >
          {({ isActive }) => {
            const Icon = isActive ? UserSolid : UserOutline;
            return (
              <>
                <Icon className="w-6 h-6" />
                <span className="text-xs font-medium">پروفایل</span>
              </>
            );
          }}
        </NavLink>
      </nav>
    </div>
  );
}
