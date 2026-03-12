"use client";

import { useEffect, useMemo, useState } from "react";
import WorkoutCard from "./WorkoutCard";
import { Workout, mapWorkout, WorkoutBackend } from "../types/workout.types";
import { useAuth } from "@/app/contexts/AuthContext";
import EditClassModal from "@/features/booking/components/EditClassModal";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Props {
  initialWorkouts: Workout[];
}

export default function WorkoutsClient({ initialWorkouts }: Props) {
  const [search, setSearch] = useState("");
  const [intensityFilter, setIntensityFilter] = useState("");
  const [workouts, setWorkouts] = useState<Workout[]>(initialWorkouts);
  const [showInactive, setShowInactive] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | undefined>();

  const { dataUser } = useAuth();
  const role = dataUser?.user?.role as string | undefined;
  const isAdminOrCoach = role === "Admin" || role === "Coach";

  useEffect(() => {
    if (!isAdminOrCoach || !dataUser?.token) return;

    fetch(`${API_URL}/clases/all`, {
      headers: { Authorization: `Bearer ${dataUser.token}` },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: WorkoutBackend[]) => {
        if (Array.isArray(data)) setWorkouts(data.map(mapWorkout));
      })
      .catch((err) =>
        console.error("[WorkoutsClient] Error fetching /clases/all:", err),
      );
  }, [isAdminOrCoach, dataUser?.token]);

  const inactiveCount = workouts.filter((w) => !w.isActive).length;

  const filteredWorkouts = useMemo(() => {
    const searchValue = search.toLowerCase().trim();
    return workouts.filter((w) => {
      if (!showInactive && !w.isActive) return false;
      const searchable =
        `${w.name} ${w.shortDescription} ${w.fullDescription} ${w.intensity}`.toLowerCase();
      const matchesSearch =
        searchValue === "" || searchable.includes(searchValue);
      const matchesIntensity =
        intensityFilter === "" || w.intensity === intensityFilter;
      return matchesSearch && matchesIntensity;
    });
  }, [workouts, search, intensityFilter, showInactive]);

  const handleDeleted = (id: string) => {
    setWorkouts((prev) => prev.filter((w) => w.id !== id));
  };

  const handleRestored = (id: string) => {
    setWorkouts((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isActive: true } : w)),
    );
  };

  const handleEditRequest = (workout: Workout) => {
    setEditingId(workout.id);
    setIsEditOpen(true);
  };

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
          <option value="baja">Bajo</option>
          <option value="media">Medio</option>
          <option value="alta">Alto</option>
        </select>

        <input
          type="text"
          placeholder="Buscar entrenamiento..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-4 rounded-xl bg-black border border-white/20 text-white focus:ring-2 focus:ring-white/30 transition"
        />

        {/* Toggle inactivas — solo admin/coach */}
        {isAdminOrCoach && inactiveCount > 0 && (
          <button
            onClick={() => setShowInactive((prev) => !prev)}
            className={`px-4 py-2 rounded-xl border text-sm font-semibold transition-all whitespace-nowrap ${
              showInactive
                ? "border-emerald-500 text-emerald-400 bg-emerald-500/10"
                : "border-white/20 text-white/50 hover:border-white/40 hover:text-white/80"
            }`}
          >
            {showInactive
              ? "Ocultar inactivas"
              : `Ver inactivas (${inactiveCount})`}
          </button>
        )}
      </div>

      {/* GRID */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredWorkouts.map((workout) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
            onDeleted={handleDeleted}
            onRestored={isAdminOrCoach ? handleRestored : undefined}
            onEditRequest={isAdminOrCoach ? handleEditRequest : undefined}
          />
        ))}

        {filteredWorkouts.length === 0 && (
          <p className="text-red-400 col-span-full">
            No hay entrenamientos disponibles
          </p>
        )}
      </div>

      {/* Modal editar clase — solo Admin/Coach */}
      {isAdminOrCoach && (
        <EditClassModal
          isOpen={isEditOpen}
          onClose={() => {
            setIsEditOpen(false);
            setEditingId(undefined);
          }}
          onSuccess={() => {
            setIsEditOpen(false);
            setEditingId(undefined);
            window.location.reload();
          }}
          authToken={dataUser?.token ?? ""}
          preselectedId={editingId}
        />
      )}
    </div>
  );
}
