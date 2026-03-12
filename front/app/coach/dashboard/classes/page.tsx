import CreateScheduleComponent from "../components/CreateScheduleComponent";

export default function CoachClassesPage() {
  return (
    <div className="p-8">

      <h1 className="text-2xl font-bold mb-6">
        Mis clases
      </h1>

      <CreateScheduleComponent />

    </div>
  );
}