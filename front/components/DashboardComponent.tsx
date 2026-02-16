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
    }, [isLoading, dataUser, router])

    const handleLogout = () => {
        logOut();
        router.push("/");
    }

    return(
        <div className="flex items-center justify-center h-screen gap-4 flex-col">
            <div className="text-center bg-gray-800 p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold">
                Dashboard
            </h1>
            <p className="mt-4 text-gray-400">

                Bienvenido al dashboard,{dataUser?.user?.email} 
            </p>
                


            </div>
            <div>
                <button className="mt-10 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"onClick={handleLogout}>Logout</button>
            </div>
            
        </div>
    )
}
export default DashboardPage;