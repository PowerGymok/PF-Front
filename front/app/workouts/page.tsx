import WorkoutsClient from "@/features/workouts/components/workoutClient";
import { workoutsMock } from "@/features/workouts/data/workout.data";

export default function WorkoutsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] px-6 py-12 flex flex-col items-center gap-12">
      <h1 className="font-['Bebas_Neue'] text-5xl text-white tracking-wider">
        Nuestros Diferentes Entrenamientos
      </h1>

      <WorkoutsClient initialWorkouts={workoutsMock} />
    </main>
  );
}
