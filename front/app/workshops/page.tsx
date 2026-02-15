"use client";

import { useState } from "react";
import { workshopsMock } from "@/features/workshops/workshops.mock";
import { WorkshopCardComponent } from "@/components/WorkshopCardComponent";
import { Workshop } from "@/features/workshops/workshop.types";

export default function WorkshopsPage() {
  /* 
    ESTADO LOCAL TEMPORAL
    - Actualmente los workshops provienen de un mock estático.
    - En producción este estado será reemplazado por:
      * Fetch a /api/workshops
      * React Query / SWR
      * O Server Components con fetch en el servidor
    - El backend será la fuente de verdad.
  */
  const [workshops, setWorkshops] = useState<Workshop[]>(workshopsMock);

  /* 
    FILTROS EN MEMORIA
    - Estos estados son locales y temporales.
    - En producción se enviarán como query params al backend:
      * GET /api/workshops?search=value&intensity=MEDIO&time=09:00
  */
  const [search, setSearch] = useState("");
  const [intensityFilter, setIntensityFilter] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  /* 
    SIMULACIÓN DE AGENDAR
    - Actualmente reduce cupos en memoria.
    - En producción será un POST:
      * POST /api/workshops/:id/schedule
    - El backend validará disponibilidad real y manejará concurrencia.
  */
  const handleSchedule = (id: number) => {
    setWorkshops((prev) =>
      prev.map((w) =>
        w.id === id && w.spotsAvailable > 0
          ? { ...w, spotsAvailable: w.spotsAvailable - 1 }
          : w,
      ),
    );
  };

  /* 
    FILTRO EN MEMORIA
    - Actualmente filtra sobre el array local.
    - En producción este filtro desaparecerá del frontend:
      * El backend realizará el filtrado vía SQL.
      * El frontend solo enviará parámetros de búsqueda.
  */
  const filtered = workshops.filter((w) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      w.title.toLowerCase().includes(searchValue) ||
      w.description.toLowerCase().includes(searchValue) ||
      w.coach.toLowerCase().includes(searchValue) ||
      w.intensity.toLowerCase().includes(searchValue);

    const matchesIntensity =
      intensityFilter === "" || w.intensity === intensityFilter;

    const matchesTime = selectedTime === "" || w.time === selectedTime;

    return matchesSearch && matchesIntensity && matchesTime;
  });

  return (
    <div className="px-4 md:px-8 lg:px-12 py-10 space-y-10">
      <h1 className="text-3xl font-bold">Entrenamientos</h1>

      {/* 
        FILTROS HORIZONTALES
        - Distribuidos con flex para ocupar todo el ancho.
        - En producción:
          * El backend puede enviar arrays dinámicos de intensidades y horarios.
          * El frontend solo renderiza las opciones.
      */}
      <div className="flex gap-4 max-w-5xl w-full">
        {/* Buscador */}
        <input
          type="text"
          placeholder="Buscar entrenamiento o coach..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-4 rounded-xl bg-black border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition"
        />

        {/* Intensidad */}
        <select
          value={intensityFilter}
          onChange={(e) => setIntensityFilter(e.target.value)}
          className="flex-1 p-4 rounded-xl bg-black border border-white/20"
        >
          <option value="">Todas las intensidades</option>
          <option value="BAJO">Bajo</option>
          <option value="MEDIO">Medio</option>
          <option value="ALTO">Alto</option>
        </select>

        {/* Horario */}
        <select
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          className="flex-1 p-4 rounded-xl bg-black border border-white/20"
        >
          <option value="">Todas las horas</option>
          <option value="08:00">08:00 am</option>
          <option value="09:00">09:00 am</option>
          <option value="10:00">10:00 am</option>
          <option value="11:00">11:00 am</option>
          <option value="12:00">12:00 pm</option>
          <option value="13:00">13:00 pm</option>
          <option value="14:00">14:00 pm</option>
          <option value="15:00">15:00 pm</option>
          <option value="16:00">16:00 pm</option>
          <option value="17:00">17:00 pm</option>
          <option value="18:00">18:00 pm</option>
          <option value="19:00">19:00 pm</option>
        </select>
      </div>

      {/* GRID DE WORKSHOPS */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filtered.map((workshop) => (
          <WorkshopCardComponent
            key={workshop.id}
            workshop={workshop}
            onSchedule={handleSchedule}
          />
        ))}
      </div>

      {/* EMPTY STATE */}
      {filtered.length === 0 && (
        <p className="text-red-400">No se encontraron resultados</p>
      )}
    </div>
  );
}
