import { Routes, Route } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import NewspaperPage from "./pages/NewspaperPage";
import ShowCasePage from "./pages/ShowCasePage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";
import SearchResultPage from "./pages/SearchResultPage";
import BookmarkNewsPage from "./pages/profile/BookmarkNewsPage";
import FavoriteTagsPage from "./pages/profile/FavoriteTagsPage";

export default function App() {
  const initTheme = useThemeStore((state) => state.initTheme);

  useEffect(() => initTheme(), [initTheme]);

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-md h-screen overflow-hidden">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile/bookmarks" element={<BookmarkNewsPage />} />
          <Route path="/profile/favoriteTags" element={<FavoriteTagsPage />} />
          <Route element={<HomeLayout />}>
            <Route path="/" element={<NewspaperPage />} />
            <Route path="/showcase" element={<ShowCasePage />} />
            <Route
              path="/showcase/searchResult"
              element={<SearchResultPage />}
            />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}
