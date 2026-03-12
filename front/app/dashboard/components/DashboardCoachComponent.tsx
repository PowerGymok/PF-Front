"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AvatarUploader from "@/components/AvatarUploader";
import { getCoachReservations } from "@/services/clases.services";

interface CoachReservation {
  id: string;
  status?: string;
  date?: string;
  user?: {
    id: string;
    name?: string;
    email?: string;
  };
  class_schedule?: {
    id: string;
    date: string;
    time: string;
    spaces_available?: number;
    class?: {
      id: string;
      name: string;
      description?: string;
      duration?: number;
      capacity?: number;
      intensity?: string;
      image?: string;
    };
    coach?: {
      id: string;
      name?: string;
      email?: string;
    };
  };
}

interface CoachClassHistory {
  id: string;
  date: string;
  time: string;
  spaces_available: number;
  total_reservations: number;
  class: {
    id: string;
    name: string;
    description: string;
    duration: number;
    capacity: number;
    intensity: string;
    image?: string;
  };
  coach: {
    id: string;
    name: string;
    email: string;
  };
}

export default function DashboardCoachPage() {
  const { isLoading, dataUser, logOut } = useAuth();
  const router = useRouter();

  const [classes, setClasses] = useState<CoachClassHistory[]>([]);
  const [loadingClasses, setLoadingClasses] = useState(true);

  useEffect(() => {
    if (!dataUser?.token || !dataUser?.user?.id) return;

    const fetchDashboard = async () => {
      try {
        const reservations: CoachReservation[] = await getCoachReservations(
          dataUser.token,
          dataUser.user.id,
        );
        console.log("Reservaciones obtenidas:", reservations);

        const grouped = new Map<string, CoachClassHistory>();

        for (const reservation of reservations ?? []) {
          const schedule = reservation.class_schedule;
          const classInfo = schedule?.class;

          if (!schedule || !classInfo) continue;

          const scheduleId = schedule.id;

          if (!grouped.has(scheduleId)) {
            grouped.set(scheduleId, {
              id: scheduleId,
              date: schedule.date,
              time: schedule.time,
              spaces_available: schedule.spaces_available ?? 0,
              total_reservations: 0,
              class: {
                id: classInfo.id,
                name: classInfo.name ?? "Clase",
                description: classInfo.description ?? "",
                duration: classInfo.duration ?? 0,
                capacity: classInfo.capacity ?? 0,
                intensity: classInfo.intensity ?? "",
                image: classInfo.image,
              },
              coach: {
                id: dataUser.user.id,
                name: dataUser.user.name ?? "Coach",
                email: dataUser.user.email ?? "",
              },
            });
          }

          if (reservation.status !== "Cancelled") {
            grouped.get(scheduleId)!.total_reservations += 1;
          }
        }

        const mappedClasses = Array.from(grouped.values()).sort((a, b) => {
          const dateA = new Date(`${a.date}T${a.time}`).getTime();
          const dateB = new Date(`${b.date}T${b.time}`).getTime();
          return dateA - dateB;
        });

        setClasses(mappedClasses);
      } catch (error) {
        console.error("Error cargando dashboard coach", error);
        setClasses([]);
      } finally {
        setLoadingClasses(false);
      }
    };

    fetchDashboard();
  }, [
    dataUser?.token,
    dataUser?.user?.id,
    dataUser?.user?.email,
    dataUser?.user?.name,
  ]);

  const getClassDateTime = (c: CoachClassHistory) =>
    new Date(`${c.date}T${c.time}`);

  const upcomingClasses = useMemo(() => {
    return classes.filter((c) => getClassDateTime(c) > new Date());
  }, [classes]);

  const pastClasses = useMemo(() => {
    return classes.filter((c) => getClassDateTime(c) < new Date());
  }, [classes]);

  const nextClass = useMemo(() => {
    if (!upcomingClasses.length) return null;

    return [...upcomingClasses].sort(
      (a, b) => getClassDateTime(a).getTime() - getClassDateTime(b).getTime(),
    )[0];
  }, [upcomingClasses]);

  const totalStudents = useMemo(() => {
    return classes.reduce(
      (acc, current) => acc + current.total_reservations,
      0,
    );
  }, [classes]);

  const handleLogout = () => {
    logOut();
    router.push("/");
  };

  if (isLoading || loadingClasses) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-gray-400">
        Cargando dashboard...
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

      <div className="mb-16 flex justify-between items-start">
        <div>
          <h1 className="text-4xl md:text-5xl font-light tracking-wide">
            Dashboard Coach
          </h1>

          <p className="text-gray-500 mt-3">
            Bienvenido, {dataUser?.user?.email}
          </p>
        </div>

        <AvatarUploader token={dataUser.token} />
      </div>

      {nextClass && (
        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-xl mb-16 flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500 mb-1">Próxima clase</p>

            <h3 className="text-2xl font-light">{nextClass.class.name}</h3>

            <p className="text-sm text-gray-400 mt-1">
              {new Date(nextClass.date).toLocaleDateString("es-MX")} —{" "}
              {nextClass.time}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-500">Reservas</p>

            <p className="text-lg">
              {nextClass.total_reservations}/{nextClass.class.capacity}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-xl">
          <h2 className="text-sm text-gray-500 mb-2">Próximas clases</h2>
          <p className="text-3xl font-light">{upcomingClasses.length}</p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-xl">
          <h2 className="text-sm text-gray-500 mb-2">Clases impartidas</h2>
          <p className="text-3xl font-light">{pastClasses.length}</p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-xl">
          <h2 className="text-sm text-gray-500 mb-2">Alumnos totales</h2>
          <p className="text-3xl font-light">{totalStudents}</p>
        </div>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 p-10 rounded-xl mb-20">
        <h2 className="text-xl font-light mb-8">Historial reciente</h2>

        <div className="space-y-6">
          {classes.length > 0 ? (
            classes.slice(0, 6).map((clase) => (
              <div
                key={clase.id}
                className="flex justify-between items-center border-b border-neutral-800 pb-4"
              >
                <div>
                  <p className="font-medium">{clase.class.name}</p>

                  <p className="text-xs text-gray-500">
                    {new Date(clase.date).toLocaleDateString("es-MX")} —{" "}
                    {clase.time}
                  </p>
                </div>

                <div className="text-sm text-gray-400">
                  {clase.total_reservations}/{clase.class.capacity} alumnos
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">
              Aún no hay reservaciones asociadas a tus clases.
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-6 flex-wrap text-sm">
        <Link
          href="/booking"
          className="text-white relative transition-all duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:text-gray-300"
        >
          Ver mis clases
        </Link>

        <Link
          href="/coach/chat"
          className="text-white relative transition-all duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:text-gray-300"
        >
          Mensajes con alumnos
        </Link>
      </div>

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
}
