"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { getAllReservations } from "@/services/clases.services";
import { Reservation } from "../../../../interface/ReservationInterface";

export default function ClassesReservationComponent() {
  const { dataUser } = useAuth();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        if (!dataUser?.token || !dataUser?.user?.id) return;

        const data = await getAllReservations(dataUser.token, dataUser.user.id);

        console.log("RESERVATIONS:", data);

        setReservations(data);
      } catch (error) {
        console.error("Error trayendo reservaciones:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [dataUser]);

  if (loading) {
    return <p>Cargando reservaciones...</p>;
  }

  if (!reservations.length) {
    return <p>No tienes clases reservadas aún.</p>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Mis clases reservadas</h1>

      {reservations.map((reservation) => (
        <div
          key={reservation.id}
          className="rounded-xl border p-4 shadow-sm bg-white"
        >
          <h2 className="text-lg font-semibold">
            {reservation.class_schedule?.class?.title || "Clase sin título"}
          </h2>

          <p className="text-sm text-gray-600">
            {reservation.class_schedule?.class?.description ||
              "Sin descripción"}
          </p>

          <p className="mt-2 text-sm">
            <span className="font-medium">Fecha:</span>{" "}
            {reservation.class_schedule?.date || "Sin fecha"}
          </p>

          <p className="text-sm">
            <span className="font-medium">Horario:</span>{" "}
            {reservation.class_schedule?.start_time || "--"} -{" "}
            {reservation.class_schedule?.end_time || "--"}
          </p>
        </div>
      ))}
    </div>
  );
}
