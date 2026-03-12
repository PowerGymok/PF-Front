import { useMemo, useState } from "react";
import { Booking } from "../types/booking.types";
import { filterBookings } from "../utils/filterBookings";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

function getToken(): string | null {
  try {
    const session = localStorage.getItem("userSession");
    if (!session) return null;
    const parsed = JSON.parse(session);
    return parsed?.token ?? null;
  } catch {
    return null;
  }
}

function getUserIdFromSession(): string | null {
  try {
    const session = localStorage.getItem("userSession");
    if (!session) return null;
    const parsed = JSON.parse(session);
    return parsed?.user?.id ?? null;
  } catch {
    return null;
  }
}

function authHeaders(): HeadersInit {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export function useBookings(bookings: Booking[]) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [intensityFilter, setIntensityFilter] = useState("");

  /* ===============================
     USUARIO: RESERVAR CLASE
  =============================== */

  const handleReserve = async (
    booking: Booking,
    userId: string,
    userTokens: number,
    membershipActive: boolean,
  ): Promise<{ success: boolean; message: string }> => {
    // Validaciones preventivas en el cliente
    if (!membershipActive)
      return { success: false, message: "Membresía inactiva." };
    if (userTokens < booking.tokens_required)
      return { success: false, message: "Tokens insuficientes." };
    if (booking.spaces_available === 0)
      return { success: false, message: "Sin cupos disponibles." };

    try {
      // ÚNICA PETICIÓN: El backend ahora es atómico (reserva + pago + cupos)
      const reserveRes = await fetch(
        `${API_URL}/reservation/reserve?id_user=${userId}&id_class_schedule=${booking.id_class_schedule}`,
        { method: "POST", headers: authHeaders() },
      );

      const body = await reserveRes.json().catch(() => ({}));

      if (!reserveRes.ok) {
        const msg = Array.isArray(body?.message)
          ? body.message.join(", ")
          : (body?.message ?? "Error al reservar.");
        return { success: false, message: msg };
      }

      return {
        success: true,
        message: "¡Clase reservada con éxito! Se han descontado tus tokens.",
      };
    } catch {
      return { success: false, message: "Error de conexión con el servidor." };
    }
  };

  /* ===============================
     COACH / ADMIN: CANCELAR CLASE
  =============================== */

  const handleCancelSchedule = async (
    idClassSchedule: string,
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await fetch(
        `${API_URL}/class_schedule/cancel/${idClassSchedule}`,
        { method: "PUT", headers: authHeaders() },
      );
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        return {
          success: false,
          message: body?.message ?? "Error al cancelar la clase.",
        };
      }
      return { success: true, message: "Clase cancelada correctamente." };
    } catch {
      return {
        success: false,
        message: "Error de conexión. Intenta de nuevo.",
      };
    }
  };

  /* ===============================
     FILTRADO
  =============================== */

  const filteredBookings = useMemo(() => {
    return filterBookings({ bookings, selectedDate, search, intensityFilter });
  }, [bookings, selectedDate, search, intensityFilter]);

  return {
    filteredBookings,
    selectedDate,
    setSelectedDate,
    search,
    setSearch,
    intensityFilter,
    setIntensityFilter,
    handleReserve,
    handleCancelSchedule,
  };
}
