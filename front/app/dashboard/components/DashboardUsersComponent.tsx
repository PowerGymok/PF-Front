"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CompleteProfileAlert from "@/app/dashboard/components/CompleteProfileAlert";
import { PATHROUTES } from "@/utils/PathRoutes";
import { CoachPublic } from "@/services/mockCoaches";
import ClassesPage from "@/app/users/dashboard/classes/page";
const DashboardUsersPage = () => {
  const { isLoading, dataUser, logOut } = useAuth();
  const router = useRouter();
  const [coaches, setCoaches] = useState<CoachPublic[]>([]);

  console.log("DATAUSER", dataUser);

  useEffect(() => {
    if (!dataUser && !isLoading) {
      router.push("/");
    }
  }, [isLoading, dataUser, router]);

  const handleLogout = () => {
    logOut();
    router.push("/");
  };

  //marcado provisional hasta que se pruebe con coaches 
  // const handleChat = (coachId: string) => {
  //     if (typeof window !== "undefined") {
  //       router.push(`${PATHROUTES.USERS_CHAT}?coachId=${coachId}`);
  //     } else {
  //       console.error("No se puede redirigir en el servidor");
  //     }
  //   };

  const isProfileComplete = dataUser?.user?.isProfileComplete;

  const hasBookedClasses = false

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {!isProfileComplete && <CompleteProfileAlert />}

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard de {dataUser?.user?.email.split("@")[0]}
        </h1>
        <h2 className="text-gray-700">Este es dashboard de Usuarios</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <h2 className="text-sm text-gray-500">Clases Agendadas</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2"></p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <h2 className="text-sm text-gray-500">Clases Completadas</h2>
          <p className="text-3xl font-bold text-green-600 mt-2"><Link href="/users/dashboard/classes">Ver clases</Link></p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <h2 className="text-sm text-gray-500">Tokens Acitvos</h2>
          <p className="text-3xl font-bold text-purple-600 mt-2">15</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Resumen Personal
        </h2>
        <p className="text-gray-500">Este mes has asistido a 15 clases</p>
      </div>

      <div className="mt-10 flex gap-4 flex-wrap">
        <Link
          href={"/workouts"}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition"
        >
          Agendar Nueva Clase
        </Link>

        {!hasBookedClasses ? (
          <Link href="/booking" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition" >
            Agenda tu primera clase
          </Link>
        ) : (
          <button onClick={() => router.push(PATHROUTES.USERS_CHAT)} className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition cursor-pointer" >
            Chat con tu coach
          </button>
        )}
      </div>

      <div className="mt-10">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition cursor-pointer"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default DashboardUsersPage;
