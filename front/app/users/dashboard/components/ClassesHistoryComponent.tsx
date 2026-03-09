"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { Clock, Users, Dumbbell } from "lucide-react";

interface ClassHistory {
  id: string;
  date: string;
  status: string;
  class_schedule: {
    start_time: string;
    end_time: string;
    class: {
      title: string;
      description: string;
      duration: number;
      capacity: number;
      intensity: string;
    };
  };
}

export default function UserClassesPage() {
  const { dataUser } = useAuth();
  const [classes, setClasses] = useState<ClassHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        if (!dataUser?.token) return;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/class_schedule/history`,
          {
            headers: {
              Authorization: `Bearer ${dataUser.token}`,
            },
          },
        );

        if (!res.ok) {
          throw new Error("Error obteniendo historial");
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          setClasses([]);
          return;
        }

        const completedClasses = data.filter(
          (c: ClassHistory) => c.status === "Completed",
        );

        setClasses(completedClasses);
      } catch (error) {
        console.error("Error cargando historial:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [dataUser]);

  if (loading) {
    return <p>Cargando historial...</p>;
  }

  if (classes.length === 0) {
    return (
      <p className="text-gray-500">Aún no has completado ninguna clase.</p>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Historial de clases
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {classes.map((clase) => (
          <div
            key={clase.id}
            className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {clase.class_schedule?.class?.title}
            </h3>

            <p className="text-gray-600 mb-4">
              {clase.class_schedule?.class?.description}
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock size={16} />
                {clase.class_schedule?.class?.duration} min
              </div>

              <div className="flex items-center gap-2">
                <Users size={16} />
                {clase.class_schedule?.class?.capacity} personas
              </div>

              <div className="flex items-center gap-2">
                <Dumbbell size={16} />
                Intensidad: {clase.class_schedule?.class?.intensity}
              </div>
            </div>

            <p className="mt-3 text-sm text-gray-500">Fecha: {clase.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
