"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useBookings } from "../hooks/useBooking";
import { generateWeek } from "../utils/generateWeek";
import { useAuth } from "@/app/contexts/AuthContext";
import { useTokenStatus } from "@/features/token-packages/hooks/useTokenStatus";

import BookingsCalendar from "./BookingCalendar";
import BookingsFilters from "./BookingFilters";
import BookingsGrid from "./BookingGrid";
import CreateClassModal from "./CreateClassModal";
import ScheduleClassModal from "./ScheduleClassModal";

import type { Booking } from "../types/booking.types";

type Variant = "user" | "coach" | "admin";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function mapToBooking(item: any): Booking {
  const capacity = parseInt(item.class?.capacity ?? "0", 10);
  return {
    id: item.id,
    id_class_schedule: item.id,
    title: item.class?.name ?? "",
    description: item.class?.description ?? "",
    intensity: item.class?.intensity ?? "baja", // fallback alineado al backend
    capacity,
    spots_available: capacity,
    coach: item.coach?.name ?? "Por asignar",
    date: item.date,
    time: item.time?.slice(0, 5) ?? "",
    tokens_required: parseInt(item.token ?? "1", 10),
  };
}

export default function BookingClient() {
  const { dataUser, isLoading: isAuthLoading } = useAuth();
  const { status: tokenStatus, loading: isTokenLoading } = useTokenStatus();

  const [rawBookings, setRawBookings] = useState<Booking[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

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

  const role = dataUser?.user?.role;
  const userId = dataUser?.user?.id ?? "";
  const userTokens = tokenStatus?.tokenBalance ?? 0;
  const membershipActive = tokenStatus?.hasActiveMembership ?? false;
  const canUseTokens = tokenStatus?.canUseTokens ?? false;

  let variant: Variant | undefined;
  if (role === "user") variant = "user";
  else if (role === "Coach") variant = "coach";
  else if (role === "Admin") variant = "admin";

  const canManageClasses = variant === "coach" || variant === "admin";

  const onReserve = (booking: Booking) =>
    handleReserve(booking, userId, userTokens, membershipActive);

  const onCancelSchedule = (idClassSchedule: string) =>
    handleCancelSchedule(idClassSchedule);

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
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect
                  x="1"
                  y="2.5"
                  width="12"
                  height="10"
                  rx="1.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="M4 2.5V1M10 2.5V1M1 6h12"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  d="M7 8.5v2M6 9.5h2"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
              Programar clase
            </button>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 bg-white/8 border border-white/12 text-white/70 text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-white/12 hover:text-white active:scale-[.98] transition-all"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path
                  d="M6.5 1v11M1 6.5h11"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
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
              : "No tienes tokens disponibles. Compra un paquete para continuar."}
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
        onReserve={onReserve}
        onCancelSchedule={onCancelSchedule}
      />

      {canManageClasses && (
        <>
          <ScheduleClassModal
            isOpen={isScheduleModalOpen}
            onClose={() => setIsScheduleModalOpen(false)}
            onSuccess={fetchSchedule}
            authToken={dataUser?.token ?? ""}
          />
          <CreateClassModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onSuccess={() => {}}
            authToken={dataUser?.token ?? ""}
          />
        </>
      )}
    </div>
  );
}
