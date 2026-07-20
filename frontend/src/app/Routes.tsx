import {
    createBrowserRouter
} from "react-router-dom";


import Layout from "../layouts/Layout";
import Dashboard from "../features/dashboard/Dashboard";
import Discovery from "../features/discovery/Discovery";
import Leads from "../features/leads/Leads";
import LeadDetail from "../features/leads/LeadDetail";
import Settings from "../features/settings/Settings";


export const router = createBrowserRouter([

    {
        element:<Layout />,

        children:[

            {
                path:"/dashboard",
                element:<Dashboard/>
            },

            {
                path:"/discovery",
                element:<Discovery/>
            },

            {
                path:"/leads",
                element:<Leads/>
            },

            {
                path:"/leads/:id",
                element:<LeadDetail/>
            },

            {
                path:"/settings",
                element:<Settings/>
            }

        ]
    }

]);