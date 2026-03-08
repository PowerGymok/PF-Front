"use client";

import { useState, useCallback } from "react";
import type { Reservation } from "../types/reservation.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function useReservations(userId: string, authToken: string) {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  /* ── Separar activas vs historial por fecha de la clase ── */
  const today = new Date().toISOString().split("T")[0];

  const active = reservations.filter(
    (r) =>
      r.status === "Confirmed" &&
      r.class_schedule.date >= today &&
      r.class_schedule.isActive,
  );

  /** IDs de class_schedule que el usuario ya tiene reservados (activos y futuros) */
  const bookedScheduleIds = new Set<string>(
    active.map((r) => r.class_schedule.id),
  );

  const history = reservations.filter(
    (r) =>
      r.status === "Cancelled" ||
      r.class_schedule.date < today ||
      !r.class_schedule.isActive,
  );

  /* ── GET /reservation/:id_usuario ── */
  const fetchReservations = useCallback(async () => {
    if (!userId || !authToken) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/reservation/${userId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (!res.ok) throw new Error(`Error ${res.status} al cargar reservas`);
      const data = await res.json();
      setReservations(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [userId, authToken]);

  /* ── PUT /reservation/cancel/:id ── */
  const cancelReservation = async (
    reservationId: string,
  ): Promise<{ success: boolean; message: string }> => {
    setCancellingId(reservationId);
    try {
      const res = await fetch(
        `${API_URL}/reservation/cancel/${reservationId}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${authToken}` },
        },
      );
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const msg = Array.isArray(body?.message)
          ? body.message.join(", ")
          : (body?.message ?? `Error ${res.status} al cancelar`);
        return { success: false, message: msg };
      }
      // Actualizar lista local sin refetch
      setReservations((prev) =>
        prev.map((r) =>
          r.id === reservationId ? { ...r, status: "Cancelled" } : r,
        ),
      );
      return { success: true, message: "Reserva cancelada correctamente." };
    } catch {
      return {
        success: false,
        message: "Error de conexión. Intenta de nuevo.",
      };
    } finally {
      setCancellingId(null);
    }
  };

  return {
    reservations,
    active,
    history,
    bookedScheduleIds,
    isLoading,
    error,
    cancellingId,
    fetchReservations,
    cancelReservation,
  };
}
