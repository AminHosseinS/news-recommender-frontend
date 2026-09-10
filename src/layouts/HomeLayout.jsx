import { Outlet, NavLink } from "react-router-dom";
import { Newspaper, Search, User } from "lucide-react"; // آیکون‌ها

export default function HomeLayout() {
  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-900 dir-rtl">
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      <nav className="bg-white border-t border-gray-200 flex justify-around p-3 pb-safe">
        <NavLink
          to="/showcase"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${isActive ? "text-blue-600" : "text-gray-500"}`
          }
        >
          <Search size={24} />
          <span className="text-xs font-medium">ویترین</span>
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${isActive ? "text-blue-600" : "text-gray-500"}`
          }
        >
          <Newspaper size={24} />
          <span className="text-xs font-medium">روزنامه</span>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${isActive ? "text-blue-600" : "text-gray-500"}`
          }
        >
          <User size={24} />
          <span className="text-xs font-medium">پروفایل</span>
        </NavLink>
      </nav>
    </div>
  );
}
