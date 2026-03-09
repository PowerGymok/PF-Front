"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CompleteProfileAlert from "@/app/dashboard/components/CompleteProfileAlert";
import { PATHROUTES } from "@/utils/PathRoutes";
import AvatarUploader from "@/components/AvatarUploader";
import { getClassHistory } from "../../../services/clases.services";
import { GetCurrentUser } from "../../../services/user.services";
import { getAllReservations } from "@/services/clases.services";

const DashboardUsersPage = () => {
  const { isLoading, dataUser, logOut } = useAuth();
  const router = useRouter();

  const [futureClasses, setFutureClasses] = useState(0);
  const [completedClasses, setCompletedClasses] = useState(0);
  const [tokens, setTokens] = useState(0);

  useEffect(() => {
    if (isLoading) return;

    if (!dataUser) {
      router.push("/");
      return;
    }

    const fetchDashboardData = async () => {
      try {
        if (!dataUser?.token || !dataUser?.user?.id) return;

        const user = await GetCurrentUser(dataUser.token);

        setTokens(user?.tokenBalance ?? 0);

        const reservations = await getAllReservations(
          dataUser.token,
          dataUser.user.id,
        );

        const today = new Date();

        const futureReservations = reservations.filter((r: any) => {
          const classDate = r.class_schedule?.date;

          if (!classDate) return false;

          return new Date(classDate) >= today && r.status !== "Cancelled";
        });

        setFutureClasses(futureReservations.length);

        // 3️⃣ Obtener historial de clases completadas
        const history = await getClassHistory(dataUser.token);

        const completed = history.filter((c: any) => c.status === "Completed");

        setCompletedClasses(completed.length);
      } catch (error) {
        console.error("Error cargando dashboard", error);
      }
    };

    fetchDashboardData();
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

  const hasBookedClasses = futureClasses > 0;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {!isProfileComplete && <CompleteProfileAlert />}

      <div className="mb-10 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Dashboard de {dataUser?.user?.email.split("@")[0]}
          </h1>

          <h2 className="text-gray-700">Este es tu centro de entrenamiento</h2>
        </div>

        {dataUser && <AvatarUploader token={dataUser.token} />}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <h2 className="text-sm text-gray-500">Clases Agendadas</h2>

          <p className="text-3xl font-bold text-blue-600 mt-2">
            {futureClasses}
          </p>

          <Link
            href="/users/dashboard/reservation"
            className="text-blue-500 text-sm"
          >
            Ver clases
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <h2 className="text-sm text-gray-500">Clases Completadas</h2>

          <p className="text-3xl font-bold text-green-600 mt-2">
            {completedClasses}
          </p>

          <Link
            href="/users/dashboard/classes"
            className="text-green-500 text-sm"
          >
            Ver historial
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <h2 className="text-sm text-gray-500">Tokens Activos</h2>

          <p className="text-3xl font-bold text-purple-600 mt-2">{tokens}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Progreso de entrenamiento
          </h2>

          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Clases completadas</span>
              <span className="font-semibold text-green-600">
                {completedClasses}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Clases pendientes</span>
              <span className="font-semibold text-blue-600">
                {futureClasses}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Tokens disponibles</span>
              <span className="font-semibold text-purple-600">{tokens}</span>
            </div>
          </div>

          <div className="mt-5">
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-500"
                style={{
                  width: `${Math.min(
                    (completedClasses /
                      (completedClasses + futureClasses || 1)) *
                      100,
                    100,
                  )}%`,
                }}
              />
            </div>

            <p className="text-xs text-gray-500 mt-2">Progreso de tus clases</p>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            {completedClasses === 0
              ? "Empieza tu primera clase hoy "
              : "¡Excelente progreso! Sigue entrenando de parte de powerGym"}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Próximas clases
          </h2>

          {futureClasses > 0 ? (
            <p className="text-gray-600">
              Tienes <span className="font-semibold">{futureClasses}</span>{" "}
              clases programadas.
            </p>
          ) : (
            <p className="text-gray-500">No tienes clases programadas aún.</p>
          )}

          <Link
            href="/booking"
            className="inline-block mt-4 text-blue-500 text-sm font-medium hover:underline"
          >
            Agendar nueva clase
          </Link>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md mb-10">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Resumen Personal
        </h2>

        <p className="text-gray-500">
          Este mes has completado {completedClasses} clases
        </p>
      </div>

      <div className="mt-10 flex gap-4 flex-wrap">
        <Link
          href={"/workouts"}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition"
        >
          Agendar Nueva Clase
        </Link>

        {!hasBookedClasses ? (
          <Link
            href="/booking"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition"
          >
            Agenda tu primera clase
          </Link>
        ) : (
          <button
            onClick={() => router.push(PATHROUTES.USERS_CHAT)}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition cursor-pointer"
          >
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
