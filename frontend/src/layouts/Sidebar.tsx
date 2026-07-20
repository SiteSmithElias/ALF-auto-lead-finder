import {
  LayoutDashboard,
  Moon,
  Search,
  Settings,
  Sun,
  Users,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import Logo from "./Logo";

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

  return (
    <aside className="flex w-64 flex-col border-r border-[var(--border)] bg-[var(--surface)]">
      <div className="p-4">
        <Logo />
      </div>

      <nav className="flex-1 space-y-1 px-3">
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

      <div className="space-y-2 border-t border-[var(--border)] p-3">
        <button
          onClick={toggleTheme}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 hover-surface"
        >
          {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}

          <span>
            {theme === "light" ? "Light Mode" : "Dark Mode"}
          </span>
        </button>

        <div className="flex items-center gap-3 rounded-lg p-3 hover-surface">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)] text-white">
            A
          </div>

          <div>
            <p className="font-medium">
              ALF User
            </p>

            <p className="text-sm text-[var(--muted)]">
              Profile
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}