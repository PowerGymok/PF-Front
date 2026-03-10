import BookingClient from "@/features/booking/components/BookingClient";

// El fetch se hace en el cliente desde BookingClient
// porque el endpoint requiere el token JWT del usuario
export default function BookingPage() {
  return <BookingClient />;
}
