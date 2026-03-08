import ReservationsList from "@/features/reservations/components/ReservationsList";

export default function MisReservasPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] px-6 py-12 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Mis Reservas</h1>
      <ReservationsList />
    </main>
  );
}
