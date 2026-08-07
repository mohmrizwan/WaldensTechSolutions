import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Layers,
  FolderKanban,
  Users,
  Mail,
  Settings,
  X,
  Sparkles,
  LogOut,
} from "lucide-react";
import { NAV_ITEMS, ROUTES, API_BASE_URL } from "../../utils/constants";
import axios from "axios";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { getCurrentAdmin } from "../../api/adminApi";
import logo from "../../../../frontend/src/assets/images/navbar-logo.png";

const ICON_MAP = {
  LayoutDashboard,
  Layers,
  FolderKanban,
  Users,
  Mail,
  Settings,
  Sparkles,
};
export default function Sidebar({ isOpen, onClose }) {
  const [admin, setAdmin] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const data = await getCurrentAdmin();
        console.log(data)
        setAdmin(data.admin);
      } catch (error) {
        console.error("Failed to fetch admin:", error);
      }
    };

    fetchAdmin();
  }, []);
  const logout = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/admin/logout`,
        {},
        {
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        await Swal.fire({
          title: "Logout",
          text: response.data?.message || "Logout successful",
          icon: "success",
        });

        navigate(ROUTES.LOGIN, { replace: true });
      }
    } catch (error) {
      console.error("Logout Error:", error);

      const status = error.response?.status;
      const message = error.response?.data?.message || "Something went wrong";

      if (status === 500) {
        Swal.fire({
          title: "Server Error",
          text: "Something went wrong on the server.",
          icon: "error",
        });
      } else if (!error.response) {
        Swal.fire({
          title: "Connection Error",
          text: "Unable to connect to the server.",
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Logout Failed",
          text: message,
          icon: "error",
        });
      }
    }
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-white/5 bg-surface-100/80 backdrop-blur-xl transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Brand */}
      <div className="flex h-16 items-center justify-between px-5">
        <div className="flex items-center gap-2">
          
          <span className="text-lg font-semibold tracking-tight text-gray-100">
           <img src={logo} alt="Walden  Logo" />
          </span>
        </div>
        <button
          onClick={onClose}
          className="rounded-md p-1.5 text-gray-400 hover:bg-white/5 hover:text-gray-100 lg:hidden"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {NAV_ITEMS.map(({ label, path, icon }) => {
          const Icon = ICON_MAP[icon];
          return (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-accent/15 text-accent-light shadow-glass-sm"
                    : "text-gray-400 hover:bg-white/5 hover:text-gray-100"
                }`
              }
            >
              {Icon && (
                <Icon
                  size={18}
                  className="shrink-0 transition-transform duration-200 group-hover:scale-110"
                />
              )}
              <span>{label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* User footer */}
      <div className="border-t border-white/5 p-3">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-300 text-sm font-medium text-gray-100">
            {(admin?.name || "A").charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-100">
              {admin?.name || "Admin"}
            </p>
            <p className="truncate text-xs text-gray-500">
              {admin?.email || "admin@example.com"}
            </p>
          </div>
          <button
            onClick={logout}
            className="shrink-0 rounded-md p-1.5 text-gray-400 hover:bg-white/5 hover:text-red-400"
            aria-label="Log out"
            title="Log out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
