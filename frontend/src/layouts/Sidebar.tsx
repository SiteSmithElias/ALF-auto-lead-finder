import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Moon,
  Search,
  Settings,
  Sun,
  Users,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { getProfile } from "../api/profile";
import { useTheme } from "../context/ThemeContext";
import type { Profile } from "../types/profile";
import Logo from "./Logo";
import { getMediaUrl } from "../utils/media";

const links = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Discovery",
    path: "/discovery",
    icon: Search,
  },
  {
    name: "Lead Database",
    path: "/leads",
    icon: Users,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const { theme, toggleTheme } = useTheme();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch {
        setProfile(null);
      }
    };

    const handleProfileUpdated = () => {
      void loadProfile();
    };

    void loadProfile();
    window.addEventListener("profile-updated", handleProfileUpdated);

    return () => {
      window.removeEventListener("profile-updated", handleProfileUpdated);
    };
  }, []);

  const profileName = profile?.name?.trim() || "ALF User";
  const profileSubtitle = profile?.company_name?.trim() || "Profile";
  const avatarUrl = getMediaUrl(profile?.avatar_url);
  const initials = profileName
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <aside className="sticky top-0 flex h-screen w-64 flex-col border-r border-[var(--border)] bg-[var(--surface)]">
      <div className="p-4">
        <Logo />
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "hover-surface text-[var(--text)]"
                }`
              }
            >
              <Icon size={20} />

              <span>
                {link.name}
              </span>
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto space-y-2 border-t border-[var(--border)] p-3">
        <button
          onClick={toggleTheme}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 hover-surface"
        >
          {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}

          <span>
            {theme === "light" ? "Light Mode" : "Dark Mode"}
          </span>
        </button>

        <NavLink
          to="/settings"
          className="flex w-full items-center gap-3 rounded-lg p-3 transition hover-surface"
        >
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[var(--primary)] text-white">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Profile avatar"
                className="h-full w-full object-cover"
              />
            ) : (
              initials
            )}
          </div>

          <div className="min-w-0">
            <p className="truncate font-medium">
              {profileName}
            </p>

            <p className="truncate text-sm text-[var(--muted)]">
              {profileSubtitle}
            </p>
          </div>
        </NavLink>
      </div>
    </aside>
  );
}
