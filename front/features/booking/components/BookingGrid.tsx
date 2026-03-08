"use client";

import { BookingCard } from "./BookingCard";
import type { Booking } from "../types/booking.types";

type Variant = "user" | "coach" | "admin";

interface BookingsGridProps {
  bookings: Booking[];
  variant?: Variant;
  bookedScheduleIds: Set<string>;
  onReserve?: (
    booking: Booking,
  ) => Promise<{ success: boolean; message: string }>;
  onCancelSchedule?: (
    idClassSchedule: string,
  ) => Promise<{ success: boolean; message: string }>;
  onEditClass?: (booking: Booking) => void; // ✅ Admin
}

export default function BookingsGrid({
  bookings,
  variant,
  bookedScheduleIds,
  onReserve,
  onCancelSchedule,
  onEditClass,
}: BookingsGridProps) {
  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <p className="text-white/25 text-sm">
          No hay clases disponibles para esta fecha.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {bookings.map((booking) => (
        <BookingCard
          key={booking.id}
          booking={booking}
          variant={variant}
          alreadyBooked={bookedScheduleIds.has(booking.id_class_schedule)}
          onReserve={onReserve}
          onCancelSchedule={onCancelSchedule}
          onEditClass={onEditClass}
        />
      ))}
    </div>
  );
}
