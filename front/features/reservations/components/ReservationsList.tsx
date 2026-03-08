"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { useReservations } from "../hooks/useReservations";
import type { Reservation } from "../types/reservation.types";

/* ─────────────────────────────────────────
   HELPERS
───────────────────────────────────────── */

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
}

function formatTime(timeStr: string) {
  return timeStr.slice(0, 5); // "12:00:00" → "12:00"
}

function getUserIdFromToken(token: string): string {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.sub;
  } catch {
    return "";
  }
}

/* ─────────────────────────────────────────
   RESERVATION CARD
───────────────────────────────────────── */

function ReservationCard({
  reservation,
  onCancel,
  isCancelling,
  isPast,
}: {
  reservation: Reservation;
  onCancel?: (id: string) => void;
  isCancelling: boolean;
  isPast: boolean;
}) {
  const [confirmCancel, setConfirmCancel] = useState(false);
  const cs = reservation.class_schedule;
  const isCancelled = reservation.status === "Cancelled";

  const handleCancelClick = () => {
    if (!confirmCancel) {
      setConfirmCancel(true);
      setTimeout(() => setConfirmCancel(false), 4000);
      return;
    }
    onCancel?.(reservation.id);
    setConfirmCancel(false);
  };

  return (
    <div
      className={`
      rounded-2xl border p-5 flex flex-col gap-4 transition-all
      ${
        isCancelled || isPast
          ? "bg-white/2 border-white/6 opacity-60"
          : "bg-white/4 border-white/10"
      }
    `}
    >
      {/* Info principal */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {/* Badge status */}
            <span
              className={`
              text-[11px] font-semibold px-2 py-0.5 rounded-full
              ${
                isCancelled
                  ? "bg-red-500/10 text-red-400 border border-red-500/20"
                  : isPast
                    ? "bg-white/8 text-white/40 border border-white/10"
                    : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              }
            `}
            >
              {isCancelled ? "Cancelada" : isPast ? "Completada" : "Confirmada"}
            </span>
          </div>

          {/* Fecha y hora de la clase */}
          <div className="flex items-center gap-4 text-sm text-white/70 mt-2">
            <span className="flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <rect
                  x="1"
                  y="2"
                  width="11"
                  height="10"
                  rx="1.5"
                  stroke="currentColor"
                  strokeOpacity=".5"
                  strokeWidth="1.2"
                />
                <path
                  d="M4 2V1M9 2V1M1 5.5h11"
                  stroke="currentColor"
                  strokeOpacity=".5"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
              {formatDate(cs.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <circle
                  cx="6.5"
                  cy="6.5"
                  r="5.5"
                  stroke="currentColor"
                  strokeOpacity=".5"
                  strokeWidth="1.2"
                />
                <path
                  d="M6.5 3.5v3l2 1.5"
                  stroke="currentColor"
                  strokeOpacity=".5"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
              {formatTime(cs.time)}
            </span>
            <span className="flex items-center gap-1.5 text-white/40">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <circle
                  cx="6.5"
                  cy="6.5"
                  r="5.5"
                  stroke="currentColor"
                  strokeOpacity=".4"
                  strokeWidth="1.2"
                />
                <path
                  d="M6.5 4v2.5h2"
                  stroke="currentColor"
                  strokeOpacity=".4"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
              {cs.token} token{parseInt(cs.token) !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Fecha de reserva */}
          <p className="text-white/25 text-xs">
            Reservado el {formatDate(reservation.date)}
          </p>
        </div>
      </div>

      {/* Botón cancelar — solo activas */}
      {!isCancelled && !isPast && onCancel && (
        <button
          onClick={handleCancelClick}
          disabled={isCancelling}
          className={`
            w-full py-2.5 rounded-xl border text-sm font-medium transition-all
            ${
              confirmCancel
                ? "border-rose-400 bg-rose-400/10 text-rose-400 animate-pulse"
                : "border-white/10 text-white/50 hover:border-red-500/40 hover:text-red-400 hover:bg-red-500/5"
            }
            disabled:opacity-40 disabled:cursor-not-allowed
          `}
        >
          {isCancelling
            ? "Cancelando..."
            : confirmCancel
              ? "¿Confirmar cancelación?"
              : "Cancelar reserva"}
        </button>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */

export default function ReservationsList() {
  const { dataUser, isLoading: isAuthLoading } = useAuth();

  const userId = dataUser?.token ? getUserIdFromToken(dataUser.token) : "";
  const authToken = dataUser?.token ?? "";

  const {
    active,
    history,
    isLoading,
    error,
    cancellingId,
    fetchReservations,
    cancelReservation,
  } = useReservations(userId, authToken);

  useEffect(() => {
    if (!isAuthLoading && userId) fetchReservations();
  }, [isAuthLoading, userId]);

  if (isAuthLoading || isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="w-7 h-7 rounded-full border-2 border-t-white border-white/20 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl bg-red-500/8 border border-red-500/20 px-4 py-3 flex gap-2 items-start">
        <span className="text-red-400 text-sm mt-0.5">⚠</span>
        <p className="text-red-400/90 text-sm">{error}</p>
      </div>
    );
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-8">
      {/* ── Reservas activas ── */}
      <section className="space-y-4">
        <SectionHeader
          title="Reservas activas"
          count={active.length}
          accent="emerald"
        />

        {active.length === 0 ? (
          <EmptyState message="No tienes reservas activas." />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {active.map((r) => (
              <ReservationCard
                key={r.id}
                reservation={r}
                onCancel={cancelReservation}
                isCancelling={cancellingId === r.id}
                isPast={false}
              />
            ))}
          </div>
        )}
      </section>

      {/* ── Historial ── */}
      <section className="space-y-4">
        <SectionHeader
          title="Historial"
          count={history.length}
          accent="white"
        />

        {history.length === 0 ? (
          <EmptyState message="No hay historial de reservas." />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {history.map((r) => (
              <ReservationCard
                key={r.id}
                reservation={r}
                isCancelling={cancellingId === r.id}
                isPast={r.class_schedule.date < today}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

/* ── Subcomponents ── */

function SectionHeader({
  title,
  count,
  accent,
}: {
  title: string;
  count: number;
  accent: "emerald" | "white";
}) {
  return (
    <div className="flex items-center gap-3">
      <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest whitespace-nowrap">
        {title}
      </h2>
      <span
        className={`
        text-xs font-semibold px-2 py-0.5 rounded-full
        ${
          accent === "emerald"
            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
            : "bg-white/8 text-white/40 border border-white/10"
        }
      `}
      >
        {count}
      </span>
      <div className="flex-1 h-px bg-white/8" />
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return <p className="text-white/25 text-sm py-4 text-center">{message}</p>;
}
