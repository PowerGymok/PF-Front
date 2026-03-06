"use client";

import { Booking } from "../types/booking.types";
import { BookingCard } from "./BookingCard";

interface Props {
  bookings: Booking[];
  variant?: "user" | "coach" | "admin";
  onReserve?: (
    booking: Booking,
  ) => Promise<{ success: boolean; message: string }>;
  onCancelSchedule?: (
    idClassSchedule: string,
  ) => Promise<{ success: boolean; message: string }>;
}

export default function BookingGrid({
  bookings,
  variant,
  onReserve,
  onCancelSchedule,
}: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {bookings.map((booking) => (
        <BookingCard
          key={booking.id}
          booking={booking}
          variant={variant}
          onReserve={onReserve}
          onCancelSchedule={onCancelSchedule}
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
