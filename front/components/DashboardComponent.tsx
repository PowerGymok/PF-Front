'use client'

import { useAuth } from "@/app/contexts/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
    const {isLoading, dataUser, logOut} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!dataUser && !isLoading) {
            setTimeout(() => {
                router.push("/");
            })
        }
    }, [dataUser])

    const handleLogout = () => {
        logOut();
        router.push("/");
    }

    return(
        <div>
            <h1>
                Dashboard
            </h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}
export default DashboardPage;