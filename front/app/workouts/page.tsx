import WorkoutsClient from "@/features/workouts/components/workoutClient";
import {
  mapWorkout,
  type WorkoutBackend,
} from "@/features/workouts/types/workout.types";
import { workoutsMock } from "@/features/workouts/data/workout.data";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getWorkouts() {
  try {
    const res = await fetch(`${API_URL}/clases`, {
      // Revalida cada 60 segundos — el catálogo cambia poco
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error(`Error ${res.status}`);

    const data: WorkoutBackend[] = await res.json();

    // Solo clases activas, mapeadas al tipo Workout del frontend
    return Array.isArray(data)
      ? data.filter((c) => c.isActive !== false).map(mapWorkout)
      : [];
  } catch (err) {
    console.error("[WorkoutsPage] Error fetching clases:", err);
    // Fallback a mocks si el backend no responde
    return workoutsMock;
  }
}

export default async function WorkoutsPage() {
  const workouts = await getWorkouts();

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-6 py-12 flex flex-col items-center gap-12">
      <h1 className="font-['Bebas_Neue'] text-5xl text-white tracking-wider">
        Nuestros Diferentes Entrenamientos
      </h1>

      <WorkoutsClient initialWorkouts={workouts} />
    </main>
  );
}
