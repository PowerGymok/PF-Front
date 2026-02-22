'use client'

import { useAuth } from "@/app/contexts/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const DashboardAdminPage = () => {
    const {isLoading, dataUser, logOut} = useAuth()
    const router = useRouter()

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

    return (
        <div className="min-h-screen bg-gray-100 p-8">
  
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-gray-800">
                Dashboard de Admin
                </h1>
                <p className="text-gray-500 mt-2"> Bienvenido, {dataUser?.user?.email}</p>
            </div>

 
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
    
    
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                    <h2 className="text-sm text-gray-500">Coaches Activos</h2>
                    <p className="text-3xl font-bold text-blue-600 mt-2">Ejemplo de 8</p>
                </div>

    
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                    <h2 className="text-sm text-gray-500">Usuarios Registrados</h2>
                    <p className="text-3xl font-bold text-green-600 mt-2">Ejemplo de 100</p>
                </div>

    
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                    <h2 className="text-sm text-gray-500">Clases este mes</h2>
                    <p className="text-3xl font-bold text-purple-600 mt-2">Ejemplo de 36</p>
                </div>
            </div>

 
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-lg font-semibold mb-4 text-gray-700">
                Resumen del mes
                </h2>
                <p className="text-gray-500">
                Este mes se han registrado 15 nuevos usuarios y se han impartido
                36 clases con los 8 coach que tenemos activos
                </p>
            </div>

  
            <div className="mt-10">
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition">
                Cerrar sesión
                </button>
            </div>
        </div>
    )
}

export default DashboardAdminPage;