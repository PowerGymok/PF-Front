import BookingClient from "@/features/booking/components/BookingClient";
import { mockBookings } from "@/mocks/bookings.mock";
import type { Booking } from "@/features/booking/types/booking.types";

const USE_MOCK = true;

export default async function BookingPage() {
  if (USE_MOCK) {
    return <BookingClient initialBookings={mockBookings} />;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/bookings`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Error al obtener reservas");
  }

  const bookings = (await res.json()) as Booking[];

  return <BookingClient initialBookings={bookings} />;
}
