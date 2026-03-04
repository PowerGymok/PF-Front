"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Booking } from "@/features/booking/types/booking.types";
import { Spots_Icon } from "@/components/icons/Spots_Icon";
import { Coach_Icon } from "@/components/icons/Coach_Icon";
import { Intensity_Icon } from "@/components/icons/Intensity_Icon";
import { Clock_Icon } from "@/components/icons/Clock_Icon";
import { Calendar_Icon } from "@/components/icons/Calendar_Icon";

interface Props {
  booking: Booking;
  variant?: "user" | "coach" | "admin";
  onSchedule?: (id: string) => void;
}

export function BookingCard({ booking, variant, onSchedule }: Props) {
  /* ===============================
     EVITAR HYDRATION MISMATCH
  =============================== */

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  /* ===============================
     CÁLCULO DE OCUPACIÓN
  =============================== */

  const percent =
    booking.capacity === 0
      ? 0
      : Math.round(
          ((booking.capacity - booking.spots_available) / booking.capacity) *
            100,
        );

  /* ===============================
     ESTILOS POR INTENSIDAD
  =============================== */

  const intensityStyles =
    booking.intensity === "ALTO"
      ? {
          border: "group-hover:border-rose-600",
          text: "group-hover:text-rose-600",
        }
      : booking.intensity === "MEDIO"
        ? {
            border: "group-hover:border-yellow-400",
            text: "group-hover:text-yellow-400",
          }
        : {
            border: "group-hover:border-green-400",
            text: "group-hover:text-green-400",
          };

  /* ===============================
     COLOR DE BARRA SEGÚN OCUPACIÓN
  =============================== */

  const progressColor =
    percent < 40
      ? "bg-green-400"
      : percent < 80
        ? "bg-yellow-400"
        : "bg-rose-600";

  const progressTextColor =
    percent < 40
      ? "text-green-400"
      : percent < 80
        ? "text-yellow-400"
        : "text-rose-600";

  /* ===============================
     RENDER ACCIONES SEGÚN ROL
  =============================== */

  const renderActions = () => {
    switch (variant) {
      case "user":
        return (
          <button
            onClick={() => onSchedule?.(booking.id)}
            disabled={booking.spots_available === 0}
            className="w-full py-4 rounded-full border border-white font-semibold tracking-wide transition-all duration-300 hover:bg-white hover:text-black disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {booking.spots_available === 0 ? "AGOTADO" : "AGENDAR"}
          </button>
        );

      case "coach":
        return (
          <div className="flex flex-col gap-3">
            <button className="w-full py-3 rounded-full border border-white transition hover:bg-white hover:text-black">
              VER INSCRITOS
            </button>

            <button className="w-full py-3 rounded-full border border-red-500 text-red-500 transition hover:bg-red-500 hover:text-black">
              CANCELAR CLASE
            </button>
          </div>
        );

      case "admin":
        return (
          <div className="flex flex-col gap-3">
            <button className="w-full py-3 rounded-full border border-yellow-400 text-yellow-400 transition hover:bg-yellow-400 hover:text-black">
              EDITAR
            </button>

            <button className="w-full py-3 rounded-full border border-red-500 text-red-500 transition hover:bg-red-500 hover:text-black">
              ELIMINAR
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  /* ===============================
     COMPONENTE
  =============================== */

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
              <span>Intensidad {booking.intensity}</span>
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
                className={`w-5 h-5 transition-colors duration-300 ${progressTextColor}`}
              />
              <span className={progressTextColor}>
                {booking.capacity - booking.spots_available}/{booking.capacity}{" "}
                ocupados
              </span>
            </div>
          </div>

          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className={`h-2 ${progressColor} transition-all duration-500`}
              style={{ width: `${percent}%` }}
            />
          </div>

          <div className="overflow-hidden max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-500">
            <p className="text-sm leading-relaxed opacity-80">
              {booking.description}
            </p>
          </div>
        </div>

        {/* ===============================
           ACCIONES (solo después de montar)
        =============================== */}

        <div className="mt-10 flex flex-col gap-3">
          {mounted && renderActions()}

          {!variant && mounted && (
            <Link
              href={`/register?bookingId=${booking.id}`}
              className="w-full py-4 text-center rounded-full border border-white font-semibold tracking-wide transition-all duration-300 hover:bg-white hover:text-black"
            >
              REGISTRARSE
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
