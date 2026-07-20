import { LayoutDashboard, Moon, Search, Settings, Sun, Users } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import Logo from "./Logo";

const links = [
    {
        name: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard
    },
    {
        name: "Discovery",
        path: "/discovery",
        icon: Search
    },
    {
        name: "Lead Database",
        path: "/leads",
        icon: Users
    },
    {
        name: "Settings",
        path: "/settings",
        icon: Settings
    }
];

export default function Sidebar() {
    const { theme, toggleTheme } = useTheme();

    return (
        <aside className="relative flex flex-col w-64 min-h-screen border-r border-[var(--border)] bg-[var(--surface)]">
            <Logo />

            <nav className="flex-1 px-3 space-y-2">
                {links.map((link) => {
                    const Icon = link.icon;

                    return (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                                    isActive
                                        ? "bg-blue-100 text-blue-600"
                                        : "hover:bg-gray-100"
                                }`
                            }
                        >
                            <Icon size={20} />
                            <span>{link.name}</span>
                        </NavLink>
                    );
                })}
            </nav>

            <div className="px-3 pb-3">
                <button
                    onClick={toggleTheme}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-3 hover:bg-gray-100"
                >
                    {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
                    <span>{theme === "light" ? "Light Mode" : "Dark Mode"}</span>
                </button>
            </div>

            <div className="border-t border-[var(--border)] p-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                        A
                    </div>

                    <div>
                        <p className="font-medium">ALF User</p>
                        <p className="text-sm opacity-60">Profile</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}