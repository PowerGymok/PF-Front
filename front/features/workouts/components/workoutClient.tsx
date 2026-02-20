"use client";

import { useMemo, useState } from "react";
import WorkoutCard from "./WorkoutCard";
import { Workout } from "../types/workout.types";

interface Props {
  initialWorkouts: Workout[];
}

export default function WorkoutsClient({ initialWorkouts }: Props) {
  const [search, setSearch] = useState("");
  const [intensityFilter, setIntensityFilter] = useState("");

  const filteredWorkouts = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return initialWorkouts.filter((w) => {
      const searchable = `
        ${w.name}
        ${w.shortDescription}
        ${w.fullDescription}
        ${w.intensity}
      `.toLowerCase();

      const matchesSearch =
        searchValue === "" || searchable.includes(searchValue);

      const matchesIntensity =
        intensityFilter === "" || w.intensity === intensityFilter;

      return matchesSearch && matchesIntensity;
    });
  }, [initialWorkouts, search, intensityFilter]);

  return (
    <div className="w-full max-w-6xl space-y-10">
      {/* FILTROS */}
      <div className="flex flex-col md:flex-row gap-4">
        <select
          value={intensityFilter}
          onChange={(e) => setIntensityFilter(e.target.value)}
          className="p-4 rounded-xl bg-black border border-white/20 text-white"
        >
          <option value="">Todas las intensidades</option>
          <option value="BAJO">Bajo</option>
          <option value="MEDIO">Medio</option>
          <option value="ALTO">Alto</option>
        </select>

        <input
          type="text"
          placeholder="Buscar entrenamiento..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-4 rounded-xl bg-black border border-white/20 text-white focus:ring-2 focus:ring-white/30 transition"
        />
      </div>

      {/* GRID */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredWorkouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}

        {filteredWorkouts.length === 0 && (
          <p className="text-red-400 col-span-full">
            No hay entrenamientos disponibles
          </p>
        )}
      </div>
    </div>
  );
}
