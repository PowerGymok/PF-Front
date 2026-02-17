"use client";

import { useMemo, useState } from "react";
import { workshopsMock } from "@/features/workshops/workshops.mock";
import { WorkshopCardComponent } from "@/components/WorkshopCardComponent";
import { Workshop } from "@/features/workshops/workshop.types";

/**
 * WorkshopsPage
 *
 * Página principal de listado de entrenamientos.
 *
 * Arquitectura actual:
 * - Estado local con datos mockeados.
 * - Filtros ejecutados en memoria con useMemo.
 *
 * Escalabilidad futura:
 * - Reemplazar workshopsMock por fetch desde backend.
 * - Convertir filtros en query params (?date=&intensity=&search=).
 * - handleSchedule → request POST al backend.
 */
export default function WorkshopsPage() {
  /* ======================================================
     ESTADO PRINCIPAL (Mock temporal)
     ====================================================== */

  /**
   * Contiene el listado completo de workshops.
   *
   * FUTURO:
   * - Este estado se poblará mediante fetch a API.
   * - Ej: GET /api/workshops?date=&intensity=&search=
   */
  const [workshops, setWorkshops] = useState<Workshop[]>(workshopsMock);

  /* ======================================================
     ESTADO DE FILTROS
     ====================================================== */

  /**
   * Fecha seleccionada en calendario.
   * null = sin filtro de fecha.
   */
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  /**
   * Filtro de búsqueda general.
   */
  const [search, setSearch] = useState("");

  /**
   * Filtro de intensidad.
   */
  const [intensityFilter, setIntensityFilter] = useState("");

  /* ======================================================
     SIMULACIÓN DE AGENDAR
     ====================================================== */

  /**
   * Simula reducción de cupos disponibles.
   *
   * FUTURO:
   * - Reemplazar por:
   *   await fetch("/api/bookings", { method: "POST" })
   * - Luego refrescar listado o usar optimistic update.
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

  /* ======================================================
     FILTRADO EN MEMORIA
     ====================================================== */

  /**
   * Derivación computada del estado.
   *
   * Optimización:
   * - useMemo evita recalcular en cada render.
   *
   * FUTURO:
   * - Este bloque desaparecerá cuando backend maneje filtros.
   */
  const filteredWorkshops = useMemo(() => {
    return (
      workshops
        // Filtro por fecha
        .filter((w) => (selectedDate ? w.date === selectedDate : true))
        // Filtro combinado
        .filter((w) => {
          const searchValue = search.toLowerCase();

          const matchesSearch =
            w.title.toLowerCase().includes(searchValue) ||
            w.description.toLowerCase().includes(searchValue) ||
            w.coach.toLowerCase().includes(searchValue) ||
            w.intensity.toLowerCase().includes(searchValue);

          const matchesIntensity =
            intensityFilter === "" || w.intensity === intensityFilter;

          return matchesSearch && matchesIntensity;
        })
        // Orden por hora ascendente
        .sort((a, b) => a.time.localeCompare(b.time))
    );
  }, [workshops, selectedDate, search, intensityFilter]);

  /* ======================================================
     GENERADOR DE SEMANA DINÁMICA
     ====================================================== */

  /**
   * Genera los 7 días de la semana actual.
   *
   * FUTURO:
   * - Puede convertirse en componente independiente.
   * - Soportar navegación semana anterior/siguiente.
   */
  const today = new Date();

  const getWeekDays = () => {
    const start = new Date(today);
    start.setDate(today.getDate() - today.getDay());

    return Array.from({ length: 7 }).map((_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);

      return {
        iso: date.toISOString().split("T")[0],
        month: date
          .toLocaleDateString("es-MX", {
            month: "short",
          })
          .toUpperCase(),
        dayNumber: date.getDate(),
        weekday: date
          .toLocaleDateString("es-MX", {
            weekday: "short",
          })
          .toUpperCase(),
      };
    });
  };

  const weekDays = getWeekDays();

  return (
    <div className="px-4 md:px-8 lg:px-12 py-10 space-y-10">
      {/* ======================================================
          HEADER
      ====================================================== */}
      <h1 className="text-3xl font-bold">Entrenamientos</h1>

      {/* ======================================================
          CALENDARIO DISTRIBUIDO (7 COLUMNAS IGUALES)
      ====================================================== */}

      <div className="grid grid-cols-7 gap-3 border-b border-white/10 pb-4">
        {weekDays.map((day) => {
          const isActive = selectedDate === day.iso;

          return (
            <button
              key={day.iso}
              onClick={() => setSelectedDate(isActive ? null : day.iso)}
              className={`
                flex flex-col items-center justify-center
                py-4 rounded-2xl transition border text-sm
                ${
                  isActive
                    ? "bg-white text-black border-white"
                    : "bg-black text-white border-white/20 hover:border-white/40"
                }
              `}
            >
              <span className="opacity-70 text-xs">
                {day.month} {day.dayNumber}
              </span>
              <span className="font-semibold">{day.weekday}</span>
            </button>
          );
        })}
      </div>

      {/* ======================================================
          FILTROS
      ====================================================== */}

      <div className="flex flex-col gap-4 max-w-5xl">
        {/* Intensidad */}
        <select
          value={intensityFilter}
          onChange={(e) => setIntensityFilter(e.target.value)}
          className="
            w-full md:w-56
            p-4 rounded-xl
            bg-black border border-white/20
          "
        >
          <option value="">Todas las intensidades</option>
          <option value="BAJO">Bajo</option>
          <option value="MEDIO">Medio</option>
          <option value="ALTO">Alto</option>
        </select>

        {/* Buscador general */}
        <input
          type="text"
          placeholder="Buscar entrenamiento o coach..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            p-4 rounded-xl
            bg-black border border-white/20
            focus:outline-none
            focus:ring-2 focus:ring-white/30
            transition
          "
        />
      </div>

      {/* ======================================================
          GRID RESPONSIVE DE CARDS
      ====================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredWorkshops.map((workshop) => (
          <WorkshopCardComponent
            key={workshop.id}
            workshop={workshop}
            onSchedule={handleSchedule}
          />
        ))}

        {filteredWorkshops.length === 0 && (
          <p className="text-red-400 col-span-full">
            No hay entrenamientos disponibles
          </p>
        )}
      </div>
    </div>
  );
}
