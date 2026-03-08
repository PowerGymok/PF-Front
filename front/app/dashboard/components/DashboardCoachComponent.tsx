"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AvatarUploader from "@/components/AvatarUploader";

const DashboardCoachPage = () => {
  const { isLoading, dataUser, logOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!dataUser) {
      router.push("/");
    }
  }, [isLoading, dataUser, router]);

  const handleLogout = () => {
    logOut();
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">Cargando...</p>
      </div>
    );
  }

  if (!dataUser) return null;

  const isProfileComplete = dataUser?.user?.isProfileComplete;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {!isProfileComplete && (
        <div className="mb-6 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-lg">
          Completa tu perfil para aparecer en el listado de coaches.
        </div>
      )}

      {/* HEADER DASHBOARD */}
      <div className="mb-10 flex justify-between items-start">

        {/* TEXTO IZQUIERDA */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Dashboard Coach {dataUser?.user?.email.split("@")[0]}
          </h1>
          <h2 className="text-gray-700">
            Administra tus clases y sesiones activas
          </h2>
        </div>

        {/* AVATAR DERECHA */}
        {dataUser && <AvatarUploader token={dataUser.token} />}

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <h2 className="text-sm text-gray-500">Clases Programadas</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">6</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <h2 className="text-sm text-gray-500">Clases Impartidas</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">28</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <h2 className="text-sm text-gray-500">Alumnos Atendidos</h2>
          <p className="text-3xl font-bold text-purple-600 mt-2">14</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md mb-10">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Resumen del Mes
        </h2>
        <p className="text-gray-500">
          Este mes has generado 18 sesiones y mantienes una tasa de asistencia
          del 92%.
        </p>
      </div>

      <div className="mt-10 flex gap-4 flex-wrap">
        <Link
          href={"/coach/schedule"}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition"
        >
          Gestionar Disponibilidad
        </Link>

        <Link
          href={"/coach/classes"}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition"
        >
          Ver Mis Clases
        </Link>

        <Link
          href={"/coach/chat"}
          className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition"
        >
          Ir al Chat
        </Link>
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

export default DashboardCoachPage;