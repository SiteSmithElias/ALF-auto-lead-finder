import {
    LayoutDashboard,
    Search,
    Users,
    Settings
} from "lucide-react";

import { NavLink } from "react-router-dom";
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

    return (
        <aside className="
            w-64
            min-h-screen
            border-r
            bg-white
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

        </aside>
    )
}