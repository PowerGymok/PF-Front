"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { Clock, Users, Dumbbell } from "lucide-react";

interface ClassHistory {
  id: string;
  title: string;
  description: string;
  duration: number;
  capacity: number;
  intensity: string;
}

export default function UserClassesPage() {
  const { dataUser } = useAuth();
  const [classes, setClasses] = useState<ClassHistory[]>([]);

  useEffect(() => {
  const fetchHistory = async () => {
    const res = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/class_schedule/history`,
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
  };

  if (dataUser) fetchHistory();
}, [dataUser]);

  return (
    <div className="p-8">

      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Historial de clases
      </h1>

      {classes.length === 0 && (
        <p className="text-gray-500">
          Aún no has reservado ninguna clase.
        </p>
      )}

      <div className="grid md:grid-cols-2 gap-6">

        {classes.map((clase) => (

          <div
            key={clase.id}
            className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {clase.title}
            </h3>

            <p className="text-gray-600 mb-4">
              {clase.description}
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600">

              <div className="flex items-center gap-2">
                <Clock size={16} />
                {clase.duration} min
              </div>

              <div className="flex items-center gap-2">
                <Users size={16} />
                {clase.capacity} personas
              </div>

              <div className="flex items-center gap-2">
                <Dumbbell size={16} />
                Intensidad: {clase.intensity}
              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}