"use client";

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { useBookings } from "../hooks/useBooking";
import { generateWeek } from "../utils/generateWeek";
import { useAuth } from "@/app/contexts/AuthContext";
import { useTokenStatus } from "@/features/token-packages/hooks/useTokenStatus";
import { useReservations } from "@/features/reservations/hooks/useReservations";

import BookingsCalendar from "./BookingCalendar";
import BookingsFilters from "./BookingFilters";
import BookingsGrid from "./BookingGrid";
import CreateClassModal from "./CreateClassModal";
import ScheduleClassModal from "./ScheduleClassModal";
import EditClassModal from "./EditClassModal";
import type { ClassToEdit } from "../hooks/useEditClass";

import type { Booking } from "../types/booking.types";

type Variant = "user" | "coach" | "admin";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function normalizeIntensity(raw: string): "baja" | "media" | "alta" {
  const map: Record<string, "baja" | "media" | "alta"> = {
    BAJO: "baja",
    bajo: "baja",
    baja: "baja",
    MEDIO: "media",
    medio: "media",
    media: "media",
    ALTO: "alta",
    alto: "alta",
    alta: "alta",
  };
  return map[raw] ?? "baja";
}

// ── MAPEADOR CORREGIDO ──
function mapToBooking(item: any): Booking {
  const capacity = parseInt(item.class?.capacity ?? "0", 10);
  // spaces_available viene del backend como el número de lugares que QUEDAN
  const spaces_available =
    item.spaces_available != null
      ? parseInt(item.spaces_available, 10)
      : capacity;

  return {
    id: item.id,
    id_class_schedule: item.id,
    classId: item.class?.id ?? "", // Requerido para editar la clase base
    title: item.class?.name ?? "",
    description: item.class?.description ?? "",
    intensity: normalizeIntensity(item.class?.intensity ?? "baja"),
    capacity,
    spaces_available, // Se mantiene el nombre para que la resta en el hijo funcione
    duration: parseInt(item.class?.duration ?? "60", 10), // Requerido para el modal de edición
    image: item.class?.imgUrl ?? null,
    coach: item.coach?.name ?? "Por asignar",
    date: item.date,
    time: item.time?.slice(0, 5) ?? "",
    tokens_required: parseInt(item.token ?? "1", 10),
  };
}

export default function BookingClient() {
  const { dataUser, isLoading: isAuthLoading } = useAuth();
  const {
    status: tokenStatus,
    loading: isTokenLoading,
    refetch: refetchTokenStatus,
  } = useTokenStatus();

  const [rawBookings, setRawBookings] = useState<Booking[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<ClassToEdit | null>(null);

  const fetchSchedule = useCallback(async () => {
    if (!dataUser?.token) return;
    try {
      setIsFetching(true);
      const res = await fetch(`${API_URL}/class_schedule/history`, {
        headers: { Authorization: `Bearer ${dataUser.token}` },
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      const mapped = Array.isArray(data)
        ? data.filter((i: any) => i.isActive).map(mapToBooking)
        : [];
      setRawBookings(mapped);
    } catch (err: any) {
      console.error("[BookingClient] Error fetching schedule:", err);
      setFetchError(err.message);
    } finally {
      setIsFetching(false);
    }
  }, [dataUser?.token]);

  useEffect(() => {
    if (!isAuthLoading && dataUser?.token) fetchSchedule();
  }, [isAuthLoading, dataUser, fetchSchedule]);

  const {
    filteredBookings,
    selectedDate,
    setSelectedDate,
    search,
    setSearch,
    intensityFilter,
    setIntensityFilter,
    handleReserve,
    handleCancelSchedule,
  } = useBookings(rawBookings);

  const weekDays = useMemo(() => generateWeek(), []);

  const role = dataUser?.user?.role;
  const userId = dataUser?.user?.id ?? "";
  const userTokens = tokenStatus?.tokenBalance ?? 0;
  const membershipActive = tokenStatus?.hasActiveMembership ?? false;
  const canUseTokens = tokenStatus?.canUseTokens ?? false;

  const { bookedScheduleIds, fetchReservations } = useReservations(
    userId,
    dataUser?.token ?? "",
  );

  useEffect(() => {
    if (userId && dataUser?.token) fetchReservations();
  }, [userId, dataUser?.token, fetchReservations]);

  const isReserving = useRef(false);

  if (isAuthLoading || isTokenLoading || isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="w-8 h-8 rounded-full border-2 border-t-white border-white/20 animate-spin" />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="px-4 md:px-8 lg:px-12 py-10">
        <p className="text-red-400">
          ⚠️ Error al cargar las clases: {fetchError}
        </p>
      </div>
    );
  }

  let variant: Variant | undefined;
  if (role === "user") variant = "user";
  else if (role === "Coach") variant = "coach";
  else if (role === "Admin") variant = "admin";

  const canManageClasses = variant === "coach" || variant === "admin";

  const onReserve = async (booking: Booking) => {
    if (isReserving.current)
      return { success: false, message: "Procesando..." };
    isReserving.current = true;
    try {
      const result = await handleReserve(
        booking,
        userId,
        userTokens,
        membershipActive,
      );
      if (result.success) {
        // Update optimista: La barra subirá porque bajamos los "disponibles"
        setRawBookings((prev) =>
          prev.map((b) =>
            b.id_class_schedule === booking.id_class_schedule
              ? { ...b, spaces_available: Math.max(0, b.spaces_available - 1) }
              : b,
          ),
        );
        fetchReservations();
        refetchTokenStatus();
      }
      return result;
    } finally {
      isReserving.current = false;
    }
  };

  const onCancelSchedule = (idClassSchedule: string) =>
    handleCancelSchedule(idClassSchedule);

  const onEditClass = (booking: Booking) => {
    setEditingClass({
      id: booking.classId ?? "",
      name: booking.title,
      duration: String(booking.duration ?? "60"),
      capacity: booking.capacity,
      intensity: booking.intensity,
      description: booking.description,
      imgUrl: booking.image ?? null,
    });
  };

  return (
    <div className="px-4 md:px-8 lg:px-12 py-10 space-y-10">
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-3xl font-bold">Entrenamientos</h1>

        {canManageClasses && (
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setIsScheduleModalOpen(true)}
              className="flex items-center gap-2 bg-white text-black text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-white/90 active:scale-[.98] transition-all"
            >
              Programar clase
            </button>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 bg-white/8 border border-white/12 text-white/70 text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-white/12 hover:text-white active:scale-[.98] transition-all"
            >
              Nueva al catálogo
            </button>
          </div>
        )}
      </div>

      {variant === "user" && !canUseTokens && (
        <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 px-4 py-3 flex gap-3 items-start max-w-2xl">
          <span className="text-amber-400 mt-0.5 flex-shrink-0">⚠</span>
          <p className="text-amber-200/60 text-sm leading-relaxed">
            {!membershipActive
              ? "Necesitas una membresía activa para reservar clases."
              : "No tienes tokens disponibles."}
          </p>
        </div>
      )}

      <BookingsCalendar
        weekDays={weekDays}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <BookingsFilters
        search={search}
        setSearch={setSearch}
        intensityFilter={intensityFilter}
        setIntensityFilter={setIntensityFilter}
      />

      <BookingsGrid
        bookings={filteredBookings}
        variant={variant}
        bookedScheduleIds={bookedScheduleIds}
        onReserve={onReserve}
        onCancelSchedule={onCancelSchedule}
        onEditClass={variant === "admin" ? onEditClass : undefined}
      />

      <ScheduleClassModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onSuccess={fetchSchedule}
        authToken={dataUser?.token ?? ""}
        userRole={role ?? ""}
      />

      <CreateClassModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={fetchSchedule}
        authToken={dataUser?.token ?? ""}
      />

      <EditClassModal
        isOpen={editingClass !== null}
        onClose={() => setEditingClass(null)}
        onSuccess={() => {
          setEditingClass(null);
          fetchSchedule();
        }}
        authToken={dataUser?.token ?? ""}
        classData={editingClass}
      />
    </div>
  );
}
