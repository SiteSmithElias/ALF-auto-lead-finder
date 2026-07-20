import {
    createBrowserRouter
} from "react-router-dom";


import Layout from "../components/layout/Layout";


import Dashboard from "../pages/Dashboard";
import Discovery from "../pages/Discovery";
import Leads from "../pages/Leads";
import LeadDetail from "../pages/LeadDetail";
import Settings from "../pages/Settings";


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