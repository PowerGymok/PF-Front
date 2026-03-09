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

        if (!Array.isArray(data)) {
          console.warn("Respuesta inesperada:", data);
          setReservations([]);
          return;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const futureReservations = data.filter((reservation: Reservation) => {
          const classDate = reservation.class_schedule?.date;
          if (!classDate) return false;

          return new Date(classDate) >= today;
        });

        setReservations(futureReservations);
      } catch (error) {
        console.error("Error trayendo reservaciones:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [dataUser]);

  if (loading) {
    return (
      <p className="text-gray-500 text-center">Cargando reservaciones...</p>
    );
  }

  if (!reservations.length) {
    return (
      <p className="text-gray-500 text-center">
        No tienes clases reservadas aún.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-white">
        Mis clases reservadas
      </h1>

      {reservations.map((reservation) => (
        <div
          key={reservation.id}
          className="rounded-xl border p-5 shadow-sm bg-white hover:shadow-md transition"
        >
          <h2 className="text-lg font-semibold text-gray-800">
            Clase reservada
          </h2>

          <p className="text-sm text-gray-500">
            Sesión programada en el gimnasio
          </p>

          <div className="mt-3 space-y-1 text-sm text-gray-700">
            <p>
              <span className="font-medium">Fecha:</span>{" "}
              {reservation.class_schedule?.date ?? "Sin fecha"}
            </p>

            <p>
              <span className="font-medium">Hora:</span>{" "}
              {reservation.class_schedule?.time ?? "--"}
            </p>

            <p>
              <span className="font-medium">Costo:</span>{" "}
              {reservation.class_schedule?.token ?? "0"} token
            </p>

            <p>
              <span className="font-medium">Estado:</span>{" "}
              {reservation.status ?? "Desconocido"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
