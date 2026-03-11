"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTokenStatus } from "@/features/token-packages/hooks/useTokenStatus";
import RenewalModal from "@/features/payments/components/RenewalModal";
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
  const [isRenewalOpen, setIsRenewalOpen] = useState(false);
  const { status: membershipStatus, refetch: refetchMembership } =
    useTokenStatus();

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

  if (isLoading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-gray-400">
        Cargando...
      </div>
    );

  if (!dataUser) return null;

  const isProfileComplete = dataUser?.user?.isProfileComplete;

  const hasBookedClasses = futureClasses > 0;

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-20 py-20 max-w-7xl mx-auto">
      {!isProfileComplete && <CompleteProfileAlert />}

      <div className="mb-16 flex justify-between items-start">
        <div>
          <h1 className="text-4xl md:text-5xl font-light tracking-wide">
            Dashboard
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
          <h2 className="text-sm text-gray-500 mb-2">Clases Agendadas</h2>

          <p className="text-3xl font-light">{futureClasses}</p>

          <Link
            href="/users/dashboard/reservation"
            className="text-sm text-gray-400 mt-4 inline-block relative transition-all duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:text-gray-300"
          >
            Ver clases
          </Link>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-xl">
          <h2 className="text-sm text-gray-500 mb-2">Clases Completadas</h2>

          <p className="text-3xl font-light">{completedClasses}</p>

          <Link
            href="/users/dashboard/classes"
            className="text-sm text-gray-400 mt-4 inline-block relative transition-all duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:text-gray-300"
          >
            Ver historial
          </Link>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-xl">
          <h2 className="text-sm text-gray-500 mb-2">Tokens Activos</h2>

          <p className="text-3xl font-light">{tokens}</p>

          <Link
            href="/users/dashboard/tokens"
            className="text-sm text-gray-400 mt-4 inline-block relative transition-all duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:text-gray-300"
          >
            Ver detalle de tokens
          </Link>
        </div>
      </div>

      {/* MEMBRESÍA */}
      {membershipStatus && !membershipStatus.hasActiveMembership && (
        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-xl mb-10">
          <h2 className="text-sm text-gray-500 mb-1">Membresía</h2>
          <p className="text-white/50 text-sm mt-1">
            No tienes una membresía activa.
          </p>
          <Link
            href="/memberships"
            className="text-sm text-gray-400 mt-4 inline-block relative transition-all duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:text-gray-300"
          >
            Ver planes
          </Link>
        </div>
      )}
      {membershipStatus?.hasActiveMembership &&
        membershipStatus.activeMembership && (
          <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-xl mb-10">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-sm text-gray-500 mb-1">Membresía activa</h2>
                <p className="text-xl font-light text-white">
                  {membershipStatus.activeMembership.name}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Vence:{" "}
                  {new Date(
                    membershipStatus.activeMembership.endDate,
                  ).toLocaleDateString("es-MX", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <div className="flex gap-3 mt-3 flex-wrap">
                  {membershipStatus.activeMembership.includesCoachChat && (
                    <span className="text-xs text-emerald-400 border border-emerald-400/20 bg-emerald-400/5 px-2.5 py-1 rounded-full">
                      Chat con coach
                    </span>
                  )}
                  {membershipStatus.activeMembership.includesSpecialClasses && (
                    <span className="text-xs text-blue-400 border border-blue-400/20 bg-blue-400/5 px-2.5 py-1 rounded-full">
                      Clases especiales
                    </span>
                  )}
                  {membershipStatus.activeMembership.discountPercentage > 0 && (
                    <span className="text-xs text-amber-400 border border-amber-400/20 bg-amber-400/5 px-2.5 py-1 rounded-full">
                      {membershipStatus.activeMembership.discountPercentage}%
                      descuento
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => setIsRenewalOpen(true)}
                className="text-sm font-semibold border border-white/20 text-white/70 px-5 py-2.5 rounded-xl hover:border-white hover:text-white active:scale-[.98] transition-all flex-shrink-0"
              >
                Renovar membresía
              </button>
            </div>
          </div>
        )}

      {/* PROGRESO */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-xl">
          <h2 className="text-lg font-light tracking-wide mb-6">
            Progreso de entrenamiento
          </h2>

          <div className="space-y-3 text-sm text-gray-400">
            <div className="flex justify-between">
              <span>Clases completadas</span>
              <span>{completedClasses}</span>
            </div>

            <div className="flex justify-between">
              <span>Clases pendientes</span>
              <span>{futureClasses}</span>
            </div>

            <div className="flex justify-between">
              <span>Tokens disponibles</span>
              <span>{tokens}</span>
            </div>
          </div>

          <div className="mt-6">
            <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-500"
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

          <p className="text-sm text-gray-500 mt-6">
            {completedClasses === 0
              ? "Empieza tu primera clase hoy"
              : "Excelente progreso. Sigue entrenando."}
          </p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-xl">
          <h2 className="text-lg font-light tracking-wide mb-4">
            Próximas clases
          </h2>

          {futureClasses > 0 ? (
            <p className="text-gray-400">
              Tienes <span className="text-white">{futureClasses}</span> clases
              programadas.
            </p>
          ) : (
            <p className="text-gray-500">No tienes clases programadas aún.</p>
          )}

          <Link
            href="/booking"
            className="text-sm text-gray-400 mt-4 inline-block relative transition-all duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:text-gray-300"
          >
            Agendar nueva clase
          </Link>
        </div>
      </div>

      {/* CTA */}

      <div className="flex gap-6 flex-wrap">
        <Link
          href={"/workouts"}
          className="text-white relative transition-all duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:text-gray-300"
        >
          Mis Reservas
        </Link>

        {!hasBookedClasses ? (
          <Link
            href="/booking"
            className="text-white relative transition-all duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:text-gray-300"
          >
            Agenda tu primera clase
          </Link>
        ) : (
          <button
            onClick={() => router.push(PATHROUTES.USERS_CHAT)}
            className="cursor-pointer text-white relative transition-all duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:text-gray-300"
          >
            Chat con tu coach
          </button>
        )}
      </div>

      {/* Modal renovación */}
      {membershipStatus?.activeMembership && dataUser && (
        <RenewalModal
          isOpen={isRenewalOpen}
          onClose={() => setIsRenewalOpen(false)}
          onSuccess={() => {
            refetchMembership();
          }}
          userId={dataUser.user.id}
          membershipId={membershipStatus.activeMembership.name}
          membershipName={membershipStatus.activeMembership.name}
          authToken={dataUser.token}
        />
      )}

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

export default DashboardUsersPage;
