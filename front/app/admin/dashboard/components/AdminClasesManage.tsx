"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { Clock, Users, Dumbbell, Calendar } from "lucide-react";
import { AdminClass } from "@/interface/AdminClassInterface";
import { getClassHistory } from "@/services/clases.services";


export default function AdminClassesManage() {
  const { dataUser } = useAuth();
  const [classes, setClasses] = useState<AdminClass[]>([]);

  const fetchClasses = async () => {
  if (!dataUser?.token) return;

  try {
    const data = await getClassHistory(dataUser.token);
    setClasses(data);
  } catch (error) {
    console.error("Error cargando clases", error);
  }
};

  const cancelClass = async (id: string) => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/class_schedule/cancel/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${dataUser?.token}`,
          },
        }
      );

      fetchClasses();
    } catch (error) {
      console.error("Error cancelando clase", error);
    }
  };

  useEffect(() => {
    if (dataUser) fetchClasses();
  }, [dataUser]);

  return (
    <div className="p-8">

      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-white">
        Gestión de clases
      </h1>

      {classes.length === 0 && (
        <p className="text-gray-500">
          No hay clases programadas.
        </p>
      )}

      <div className="grid md:grid-cols-2 gap-6">

        {classes.map((clase) => (

          <div
            key={clase.id}
            className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm"
          >

            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {clase.class.name}
            </h3>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">

              <div className="flex items-center gap-2">
                <Calendar size={16} />
                {clase.date}
              </div>

              <div className="flex items-center gap-2">
                <Clock size={16} />
                {clase.time}
              </div>

              <div className="flex items-center gap-2">
                <Users size={16} />
                {clase.spaces_available}/{clase.class.capacity}
              </div>

              <div className="flex items-center gap-2">
                <Dumbbell size={16} />
                Coach: {clase.coach?.name}
              </div>

            </div>

            <div className="flex items-center justify-between">

              <span
                className={`text-sm font-medium ${
                  clase.isActive ? "text-green-600" : "text-red-500"
                }`}
              >
                {clase.isActive ? "Activa" : "Cancelada"}
              </span>

              {clase.isActive && (
                <button
                  onClick={() => cancelClass(clase.id)}
                  className="bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                >
                  Cancelar clase
                </button>
              )}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}