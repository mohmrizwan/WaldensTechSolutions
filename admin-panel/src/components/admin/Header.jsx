import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import SearchBar from "./header/SearchBar";
import NotificationsMenu from "./header/NotificationsMenu";
import ProfileMenu from "./header/ProfileMenu";
import { getCurrentAdmin } from "../../api/adminApi";

export default function Header({
  onMenuClick,
  notifications = [],
  searchValue = "",
  onSearchChange = () => {},
}) {
  const [openMenu, setOpenMenu] = useState(null); // 'notifications' | 'profile' | null
  const [admin, setAdmin] = useState(null);
  const toggleMenu = (menu) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const data = await getCurrentAdmin();
        console.log(data);
        setAdmin(data.admin);
      } catch (error) {
        console.error("Failed to fetch admin:", error);
      }
    };

    fetchAdmin();
  }, []);
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-white/5 bg-surface-900/80 px-4 backdrop-blur-xl sm:px-6">
      <button
        onClick={onMenuClick}
        className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-gray-100 lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      <SearchBar value={searchValue} onChange={onSearchChange} />

      <div className="ml-auto flex items-center gap-2">
        <NotificationsMenu
          notifications={notifications}
          isOpen={openMenu === "notifications"}
          onToggle={() => toggleMenu("notifications")}
          onClose={() => setOpenMenu(null)}
        />
        <ProfileMenu
          isOpen={openMenu === "profile"}
          onToggle={() => toggleMenu("profile")}
          onClose={() => setOpenMenu(null)}
        />
      </div>
    </header>
  );
}
