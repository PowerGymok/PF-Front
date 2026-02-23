"use client";

import { Booking } from "../types/booking.types";
import { BookingCard } from "./BookingCard";

interface Props {
  bookings: Booking[];
  variant?: "user" | "coach" | "admin";
  onSchedule?: (id: string) => void;
}

export default function BookingGrid({ bookings, variant, onSchedule }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {bookings.map((booking) => (
        <BookingCard
          key={booking.id}
          booking={booking}
          variant={variant}
          onSchedule={onSchedule}
        />
      ))}

      {bookings.length === 0 && (
        <p className="text-red-400 col-span-full">
          No hay entrenamientos disponibles
        </p>
      )}
    </div>
  );
}
