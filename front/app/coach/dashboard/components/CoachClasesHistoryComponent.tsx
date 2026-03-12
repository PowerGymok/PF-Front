"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { Clock, Users, Dumbbell, Calendar } from "lucide-react";

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

export default function CoachClassesHistoryComponent() {
  const { dataUser } = useAuth();

  const [classes, setClasses] = useState<CoachClassHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/class_schedule/coach/history`,
          {
            headers: {
              Authorization: `Bearer ${dataUser?.token}`,
            },
          }
        );

        const data = await res.json();

        if (Array.isArray(data)) {
          setClasses(data);
        }
      } catch (error) {
        console.error("Error cargando clases del coach", error);
      } finally {
        setLoading(false);
      }
    };

    if (dataUser) fetchClasses();
  }, [dataUser]);

  if (loading) {
    return (
      <div className="text-center text-gray-500 mt-10">
        Cargando clases...
      </div>
    );
  }

  if (!classes.length) {
    return (
      <div className="text-center text-gray-500 mt-10">
        Aún no tienes clases asignadas.
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">

      {classes.map((clase) => (
        <div
          key={clase.id}
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
        >

          <h3 className="text-lg font-bold text-gray-800 mb-2">
            {clase.class.name}
          </h3>

          <p className="text-gray-600 mb-4">
            {clase.class.description}
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">

            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {new Date(clase.date).toLocaleDateString()}
            </div>

            <div className="flex items-center gap-2">
              <Clock size={16} />
              {clase.time}
            </div>

            <div className="flex items-center gap-2">
              <Dumbbell size={16} />
              Intensidad: {clase.class.intensity}
            </div>

            <div className="flex items-center gap-2">
              <Users size={16} />
              {clase.total_reservations}/{clase.class.capacity}
            </div>

          </div>

          <div className="text-sm text-gray-500">
            Espacios disponibles:{" "}
            <span className="font-semibold">
              {clase.spaces_available}
            </span>
          </div>

        </div>
      ))}

    </div>
  );
}