import WorkoutsClient from "@/features/workouts/components/WorkoutClient";
import WorkoutsToolbar from "@/features/workouts/components/WorkoutsToolbar";
import {
  mapWorkout,
  type WorkoutBackend,
} from "@/features/workouts/types/workout.types";
import { workoutsMock } from "@/features/workouts/data/workout.data";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getWorkouts() {
  try {
    const res = await fetch(`${API_URL}/clases`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error(`Error ${res.status}`);

    const data: WorkoutBackend[] = await res.json();

    return Array.isArray(data)
      ? data.filter((c) => c.isActive !== false).map(mapWorkout)
      : [];
  } catch (err) {
    console.error("[WorkoutsPage] Error fetching clases:", err);
    return workoutsMock;
  }
}

export default async function WorkoutsPage() {
  const workouts = await getWorkouts();

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-6 py-12 flex flex-col items-center gap-12">
      {/* Header: título + toolbar admin/coach */}
      <div className="w-full max-w-6xl flex items-center justify-between gap-4">
        <h1 className="font-['Bebas_Neue'] text-5xl text-white tracking-wider">
          Nuestros Diferentes Entrenamientos
        </h1>
        <WorkoutsToolbar />
      </div>

      <WorkoutsClient initialWorkouts={workouts} />
    </main>
  );
}
