"use client";

import { useEffect, useState } from "react";
import { Booking } from "@/features/booking/types/booking.types";
import { Spots_Icon } from "@/components/icons/Spots_Icon";
import { Coach_Icon } from "@/components/icons/Coach_Icon";
import { Intensity_Icon } from "@/components/icons/Intensity_Icon";
import { Clock_Icon } from "@/components/icons/Clock_Icon";
import { Calendar_Icon } from "@/components/icons/Calendar_Icon";

interface Props {
  booking: Booking;
  variant?: "user" | "coach" | "admin";
  alreadyBooked?: boolean;
  onReserve?: (
    booking: Booking,
  ) => Promise<{ success: boolean; message: string }>;
  onCancelSchedule?: (
    idClassSchedule: string,
  ) => Promise<{ success: boolean; message: string }>;
  onRestore?: (
    idClass: string,
  ) => Promise<{ success: boolean; message: string }>;
  onEditClass?: (booking: Booking) => void;
}

export function BookingCard({
  booking,
  variant,
  alreadyBooked = false,
  onReserve,
  onCancelSchedule,
  onRestore,
}: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ ok: boolean; msg: string } | null>(
    null,
  );
  const [confirmCancel, setConfirmCancel] = useState(false);

  const showFeedback = (ok: boolean, msg: string) => {
    setFeedback({ ok, msg });
    setTimeout(() => setFeedback(null), 4000);
  };

  /* ── Ocupación ── */
  // const percent =
  //   booking.capacity === 0
  //     ? 0
  //     : Math.round(
  //         ((booking.capacity - booking.spots_available) / booking.capacity) *
  //           100,
  //       );

  const available = booking.spaces_available ?? 0;
  const occupiedSpots = booking.capacity - available;

  // Porcentaje de ocupación real
  const percent =
    booking.capacity > 0
      ? Math.min(100, Math.max(0, (occupiedSpots / booking.capacity) * 100))
      : 0;

  const spotsColor =
    percent < 50
      ? { text: "text-green-400", bg: "bg-green-400" }
      : percent < 80
        ? { text: "text-yellow-400", bg: "bg-yellow-400" }
        : { text: "text-rose-500", bg: "bg-rose-600" };

  /* ── Estilos por intensidad — alineados al backend ── */
  const intensityStyles =
    booking.intensity === "alta"
      ? {
          border: "group-hover:border-rose-600",
          text: "group-hover:text-rose-600",
        }
      : booking.intensity === "media"
        ? {
            border: "group-hover:border-yellow-400",
            text: "group-hover:text-yellow-400",
          }
        : {
            border: "group-hover:border-green-400",
            text: "group-hover:text-green-400",
          };

  const intensityLabel =
    booking.intensity === "alta"
      ? "Alta"
      : booking.intensity === "media"
        ? "Media"
        : "Baja";

  /* ── Handlers ── */
  const handleReserveClick = async () => {
    if (!onReserve || loading) return;
    setLoading(true);
    const result = await onReserve(booking);
    showFeedback(result.success, result.message);
    setLoading(false);
  };

  const handleCancelClick = async () => {
    if (!onCancelSchedule || loading) return;
    if (!confirmCancel) {
      setConfirmCancel(true);
      setTimeout(() => setConfirmCancel(false), 5000);
      return;
    }
    setLoading(true);
    setConfirmCancel(false);
    const result = await onCancelSchedule(booking.id_class_schedule);
    showFeedback(result.success, result.message);
    setLoading(false);
  };

  const handleRestoreClick = async () => {
    if (!onRestore || loading) return;
    setLoading(true);
    const result = await onRestore(booking.classId);
    showFeedback(result.success, result.message);
    setLoading(false);
  };

  /* ── Acciones por rol ── */
  const renderActions = () => {
    switch (variant) {
      case "user":
        return (
          <button
            onClick={handleReserveClick}
            disabled={alreadyBooked || available === 0 || loading}
            className="w-full py-4 rounded-full border border-white font-semibold tracking-wide transition-all duration-300 hover:bg-white hover:text-black disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="animate-pulse">Reservando…</span>
            ) : alreadyBooked ? (
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2.5 7l3.5 3.5 5.5-6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                YA RESERVADO
              </span>
            ) : available === 0 ? (
              "AGOTADO"
            ) : (
              <>
                AGENDAR
                {booking.tokens_required > 0 && (
                  <span className="text-xs opacity-60">
                    ({booking.tokens_required} token
                    {booking.tokens_required !== 1 ? "s" : ""})
                  </span>
                )}
              </>
            )}
          </button>
        );

      case "coach":
        return (
          <button
            onClick={handleCancelClick}
            disabled={loading}
            className={`w-full py-3 rounded-full border transition font-semibold tracking-wide
              ${
                confirmCancel
                  ? "border-rose-400 bg-rose-400 text-black animate-pulse"
                  : "border-red-500 text-red-500 hover:bg-red-500 hover:text-black"
              } disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            {loading
              ? "Cancelando…"
              : confirmCancel
                ? "¿CONFIRMAR CANCELACIÓN?"
                : "CANCELAR CLASE"}
          </button>
        );

      case "admin":
        return booking.isActive === false ? (
          <button
            onClick={handleRestoreClick}
            disabled={loading}
            className="w-full py-3 rounded-full border border-emerald-500 text-emerald-400 font-semibold tracking-wide hover:bg-emerald-500 hover:text-black transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Reactivando…" : "REACTIVAR"}
          </button>
        ) : (
          <button
            onClick={handleCancelClick}
            disabled={loading}
            className={`w-full py-3 rounded-full border transition font-semibold tracking-wide
              ${
                confirmCancel
                  ? "border-rose-400 bg-rose-400 text-black animate-pulse"
                  : "border-red-500 text-red-500 hover:bg-red-500 hover:text-black"
              } disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            {loading
              ? "Eliminando…"
              : confirmCancel
                ? "¿CONFIRMAR ELIMINACIÓN?"
                : "ELIMINAR"}
          </button>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`
      group relative flex flex-col justify-between
      border border-white/30 ${intensityStyles.border}
      rounded-3xl bg-black text-white
      transition-all duration-300 hover:scale-105 overflow-hidden
    `}
    >
      <div className="flex flex-col justify-between p-8 flex-1">
        <div className="space-y-6">
          <h3
            className={`text-3xl font-extrabold tracking-wide transition-colors duration-300 ${intensityStyles.text}`}
          >
            {booking.title}
          </h3>

          <div className="grid grid-cols-2 gap-y-2 text-sm tracking-wide">
            <div
              className={`flex items-center gap-2 transition-colors duration-300 ${intensityStyles.text}`}
            >
              <Intensity_Icon className="w-5 h-5 text-white transition-colors duration-300 group-hover:text-inherit" />
              <span>Intensidad {intensityLabel}</span>
            </div>

            <div
              className={`flex flex-col items-end gap-1 transition-colors duration-300 ${intensityStyles.text}`}
            >
              <div className="flex items-center gap-2">
                <Clock_Icon className="w-5 h-5 text-white transition-colors duration-300 group-hover:text-inherit" />
                <span>{booking.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar_Icon className="w-5 h-5 text-white transition-colors duration-300 group-hover:text-inherit" />
                <span>{booking.date}</span>
              </div>
            </div>

            <div
              className={`flex items-center gap-2 transition-colors duration-300 ${intensityStyles.text}`}
            >
              <Coach_Icon className="w-5 h-5 text-white transition-colors duration-300 group-hover:text-inherit" />
              <span>{booking.coach}</span>
            </div>

            <div className="flex items-center gap-2 justify-end">
              <Spots_Icon
                className={`w-5 h-5 transition-colors duration-300 ${spotsColor.text}`}
              />
              <span className={spotsColor.text}>
                {available === 0
                  ? "Sin lugares"
                  : `${occupiedSpots}/${booking.capacity} ocupados`}
              </span>
            </div>
          </div>

          {/* Barra de estado según cupos absolutos */}
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className={`h-2 ${spotsColor.bg} transition-all duration-500`}
              style={{ width: `${percent}%` }}
            />
          </div>

          <div className="overflow-hidden max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-500">
            <p className="text-sm leading-relaxed opacity-80">
              {booking.description}
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3">
          {mounted && renderActions()}
          {feedback && (
            <p
              className={`text-sm text-center px-2 py-2 rounded-xl transition-all ${
                feedback.ok
                  ? "text-green-400 bg-green-400/10"
                  : "text-red-400 bg-red-400/10"
              }`}
            >
              {feedback.msg}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
