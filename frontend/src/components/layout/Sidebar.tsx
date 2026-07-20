import {LayoutDashboard, Search, Users, Settings} from "lucide-react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";


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

    const {theme, toggleTheme} = useTheme();

    return (
        <aside className="
            w-64
            min-h-screen
            border-r border-[var(--border)]
            bg-[var(--surface)]
        ">

            <Logo />


            <nav className="px-3 space-y-2">

                {links.map((link)=>{

                    const Icon = link.icon;

                    return (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({isActive}) =>
                                `
                                flex
                                items-center
                                gap-3
                                px-4
                                py-3
                                rounded-lg
                                transition

                                ${
                                    isActive
                                    ?
                                    "bg-blue-100 text-blue-600"
                                    :
                                    "hover:bg-gray-100"
                                }
                                `
                            }
                        >

                            <Icon size={20}/>

                            <span>
                                {link.name}
                            </span>


                        </NavLink>
                    )

                })}

            </nav>

            <button
                onClick={toggleTheme}
                className="
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    rounded-lg
                    hover:bg-gray-100
                    dark:hover:bg-gray-800
                "
            >

            {
            theme === "light"
            ?
            <Sun size={20}/>
            :
            <Moon size={20}/>
            }

            <span>
                Theme
            </span>

            </button>

        </aside>
    )
}