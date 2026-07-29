import { Outlet } from "react-router-dom";

import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";

import "./MainLayout.css";

function MainLayout() {

    return (

        <div className="layout">

            <Navbar />

            <div className="layout-body">

                <Sidebar />

                <main className="layout-content">

                    <Outlet />

                </main>

            </div>

        </div>

    );

}

export default MainLayout;