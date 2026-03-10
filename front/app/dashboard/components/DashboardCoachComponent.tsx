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
      <div className="min-h-screen bg-black flex items-center justify-center text-gray-400">
        Cargando...
      </div>
    );
  }

  if (!dataUser) return null;

  const isProfileComplete = dataUser?.user?.isProfileComplete;

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-20 py-20 max-w-7xl mx-auto">
      {!isProfileComplete && (
        <div className="mb-10 bg-neutral-900 border border-yellow-500/40 text-yellow-400 px-6 py-4 rounded-xl">
          Completa tu perfil para aparecer en el listado de coaches.
        </div>
      )}

      {/* HEADER */}

      <div className="mb-16 flex justify-between items-start">
        <div>
          <h1 className="text-4xl md:text-5xl font-light tracking-wide">
            Dashboard Coach
          </h1>

          <p className="text-gray-500 mt-3">
            Bienvenido, {dataUser?.user?.email}
          </p>
        </div>

        {dataUser && <AvatarUploader token={dataUser.token} />}
      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-xl">
          <h2 className="text-sm text-gray-500 mb-2">Clases Programadas</h2>

          <p className="text-3xl font-light">
            <Link
              href="/coach/dashboard/classes"
              className="relative transition-all duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:text-gray-300"
            >
              Ver clases
            </Link>
          </p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-xl">
          <h2 className="text-sm text-gray-500 mb-2">Clases Impartidas</h2>

          <p className="text-3xl font-light">28</p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-xl">
          <h2 className="text-sm text-gray-500 mb-2">Alumnos Atendidos</h2>

          <p className="text-3xl font-light">14</p>
        </div>
      </div>

      {/* RESUMEN */}

      <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-xl mb-20">
        <h2 className="text-lg font-light tracking-wide mb-4">
          Resumen del Mes
        </h2>

        <p className="text-gray-500">
          Este mes has generado 18 sesiones y mantienes una tasa de asistencia
          del 92%.
        </p>
      </div>

      {/* ACTIONS */}

      <div className="flex gap-6 flex-wrap">
        <Link
          href={"/coach/schedule"}
          className="text-white relative transition-all duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:text-gray-300"
        >
          Gestionar Disponibilidad
        </Link>

        <Link
          href={"/coach/classes"}
          className="text-white relative transition-all duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:text-gray-300"
        >
          Ver Mis Clases
        </Link>

        <Link
          href={"/coach/chat"}
          className="text-white relative transition-all duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:text-gray-300"
        >
          Ir al Chat
        </Link>
      </div>

      {/* LOGOUT */}

      <div className="mt-24">
        <button
          onClick={handleLogout}
          className="cursor-pointer text-white relative transition-all duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:text-gray-300"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default DashboardCoachPage;
