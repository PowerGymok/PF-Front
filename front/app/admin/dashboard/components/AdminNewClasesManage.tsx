"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { useEffect, useState } from "react";
import { getAllCoaches } from "@/services/user.services";
import { CoachInterface } from "@/interface/Coach";
import { Users, Clock, UserCircle, FileText, Dumbbell } from "lucide-react";
import { createClass } from "@/services/clases.services";

const AdminNewClasesManage = () => {
  const { dataUser, isLoading } = useAuth();

  const [coaches, setCoaches] = useState<CoachInterface[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(60);
  const [capacity, setCapacity] = useState(10);
  const [coachId, setCoachId] = useState("");

  const [intensity, setIntensity] = useState<"baja" | "media" | "alta">("media");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoading) return;
    if (!dataUser?.token) return;

    const fetchCoaches = async () => {
      try {
        const data = await getAllCoaches(dataUser.token, 100);
        setCoaches(data as CoachInterface[]);
      } catch (error: any) {
        console.error(error.message);
      }
    };

    fetchCoaches();
  }, [dataUser?.token, isLoading]);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!dataUser?.token) return;

  try {
    setLoading(true);

    await createClass(dataUser.token, {
      name: title,
      description,
      duration: `${duration} min`,
      capacity,
      intensity,
    });

    alert("Clase creada correctamente");

    setTitle("");
    setDescription("");
    setDuration(60);
    setCapacity(10);
    setCoachId("");
    setIntensity("media");

  } catch (error: any) {
    console.error(error.message);
    alert("Error creando la clase");
  } finally {
    setLoading(false);
  }
};

  if (isLoading) return <p>Cargando sesión...</p>;

  return (
    <div className="mt-10 bg-white p-8 rounded-2xl shadow-lg border border-gray-200 max-w-4xl">

      <div className="flex items-center gap-3 mb-8">
        <Dumbbell className="text-blue-600" size={28} />
        <h1 className="text-3xl font-bold text-gray-800">
          Crear Nueva Clase
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >

        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-2 text-sm text-gray-600 font-medium">
            <FileText size={16} />
            Nombre de la clase
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Ej: HIIT Avanzado"
            className="border border-gray-300 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition rounded-lg px-4 py-2 outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-2 text-sm text-gray-600 font-medium">
            <UserCircle size={16} />
            Coach asignado
          </label>

          <select
            value={coachId}
            onChange={(e) => setCoachId(e.target.value)}
            className="border border-gray-300 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition rounded-lg px-4 py-2 outline-none bg-white"
          >
            <option value="">Seleccionar coach</option>

            {coaches.map((coach) => (
              <option key={coach.id} value={coach.id}>
                {coach.name} ({coach.email})
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1 md:col-span-2">
          <label className="flex items-center gap-2 text-sm text-gray-600 font-medium">
            <FileText size={16} />
            Descripción
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe brevemente la clase..."
            className="border border-gray-300 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition rounded-lg px-4 py-2 outline-none min-h-[90px]"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-2 text-sm text-gray-600 font-medium">
            <Clock size={16} />
            Duración (min)
          </label>

          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="border border-gray-300 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition rounded-lg px-4 py-2 outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-2 text-sm text-gray-600 font-medium">
            <Users size={16} />
            Capacidad máxima
          </label>

          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
            className="border border-gray-300 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition rounded-lg px-4 py-2 outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600 font-medium">
            Intensidad
          </label>

          <select
            value={intensity}
            onChange={(e) =>
              setIntensity(e.target.value as "baja" | "media" | "alta")
            }
            className="border border-gray-300 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition rounded-lg px-4 py-2 outline-none bg-white"
          >
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>
        </div>

        <div className="md:col-span-2 mt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition shadow-md hover:shadow-lg"
          >
            {loading ? "Creando..." : "Crear Clase"}
          </button>
        </div>

      </form>

      <div className="mt-10 border-t pt-8">

        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Vista previa de la clase
        </h2>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">

          <h3 className="text-lg font-bold text-gray-800 mb-2">
            {title || "Nombre de la clase"}
          </h3>

          <p className="text-gray-600 mb-4">
            {description || "Descripción de la clase"}
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600">

            <div className="flex items-center gap-2">
              <Clock size={16} />
              {duration} min
            </div>

            <div className="flex items-center gap-2">
              <Users size={16} />
              {capacity} personas
            </div>

            <div className="flex items-center gap-2">
              <Dumbbell size={16} />
              Intensidad: {intensity}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminNewClasesManage;