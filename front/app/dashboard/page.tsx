'use client'

import DashboardUsersPage from "@/app/dashboard/components/DashboardUsersComponent";
import DashboardAdminPage from "./components/DashboardAdminComponent";
import DashboardCoachPage from "./components/DashboardCoachComponent";
import { useAuth } from "@/app/contexts/AuthContext";
import { GymLogoComponent } from "@/components/GymLogoComponent";
import { useState, useEffect } from "react";

const Dashboard = () => {
    const { dataUser, isLoading } = useAuth();
    const [loader, setLoader] = useState(true);


    useEffect(() => {
        const timer = setTimeout(() => {
            setLoader(false);
        }, 2000);

        return () => clearTimeout(timer);
        }, []);

        if (loader || isLoading) {
            return (
                <div className="flex items-center justify-center h-screen flex-col gap-4">
                    <GymLogoComponent className="w-20 animate-spin text-blue-500" />
                </div>
                    );
                }


    const role = dataUser?.user?.role;

    if (role === "admin") {
        return (
            <div>
                <DashboardAdminPage />
            </div>

        )
    }

    if (role === "coach") {
        return (
            <div>
                <DashboardCoachPage />
            </div>
            
        )
    }

    if (role === "user") {
        return (
            <div>
                <DashboardUsersPage />
            </div>
        )
    }

    return(
        <div>
            <p className="text-gray-500 text-lg"><DashboardUsersPage /></p>
        </div>
    )
        // return (   
        // <div className="flex items-center justify-center h-screen">
        //     <p className="text-gray-500 text-lg">No tienes acceso a este dashboard.</p>
        // </div>
        // )
        
}

export default Dashboard;