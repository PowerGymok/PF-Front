"use client";

import { useState } from "react";
import { workshopsMock } from "@/features/workshops/workshops.mock";
import { WorkshopCardComponent } from "@/components/WorkshopCardComponent";
import { Workshop } from "@/features/workshops/workshop.types";

export default function WorkshopsPage() {
  /*
    ESTADO LOCAL TEMPORAL

    Actualmente los workshops provienen de un mock estático.
    En producción este estado será reemplazado por:

    - Fetch a /api/workshops
    - React Query / SWR
    - O Server Components con fetch en el servidor

    El backend será la fuente de verdad.
  */
  const [workshops, setWorkshops] = useState<Workshop[]>(workshopsMock);

  /*
    Estado de búsqueda local.

    En producción:
    Este valor se enviará como query param al backend:
    GET /api/workshops?search=value
  */
  const [search, setSearch] = useState("");

  /*
    Filtro de intensidad.

    En producción:
    También será enviado como query param:
    GET /api/workshops?intensity=BAJO
  */
  const [intensityFilter] = useState("");

  /*
    SIMULACIÓN DE AGENDAR

    Actualmente:
    - Reduce cupos en memoria.
    - No hay persistencia real.
    - No hay validación concurrente.

    En producción:
    - Se convertirá en un POST:
      POST /api/workshops/:id/schedule
    - El backend validará que spotsAvailable > 0
    - Se ejecutará en una transacción SQL segura.
    - El frontend actualizará estado con la respuesta del servidor.
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

    Actualmente:
    - Se ejecuta completamente en el cliente.
    - Filtra sobre el array local.

    En producción:
    - Este filtro desaparecerá del frontend.
    - El backend realizará el filtrado vía SQL.
    - El frontend solo enviará parámetros de búsqueda.
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

    return matchesSearch && matchesIntensity;
  });

  return (
    <div className="px-4 md:px-8 lg:px-12 py-10 space-y-10">
      <h1 className="text-3xl font-bold">Entrenamientos</h1>

      {/*
        INPUT DE BÚSQUEDA

        Futuro comportamiento:
        - Disparará refetch automático al backend.
        - Puede implementarse debounce.
        - Puede sincronizarse con query params del URL.
      */}
      <div className="flex gap-4 max-w-2xl">
        <input
          type="text"
          placeholder="Buscar entrenamiento o coach..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            flex-1 
            p-4 
            rounded-xl 
            bg-black 
            border border-white/20 
            focus:outline-none 
            focus:ring-2 
            focus:ring-white/30 
            transition
          "
        />
      </div>

      {/*
        GRID DE WORKSHOPS

        En producción:
        - filtered será reemplazado por data proveniente del servidor.
        - Se manejarán estados:
          - loading
          - error
          - empty state
      */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filtered.map((workshop) => (
          <WorkshopCardComponent
            key={workshop.id}
            workshop={workshop}
            onSchedule={handleSchedule}
          />
        ))}
      </div>

      {/*
        EMPTY STATE

        En backend real:
        Este estado dependerá de la respuesta del servidor.
      */}
      {filtered.length === 0 && (
        <p className="text-red-400">No se encontraron resultados</p>
      )}
    </div>
  );
}
