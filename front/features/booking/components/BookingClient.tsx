"use client";

import { useMemo } from "react";
import { useBookings } from "../hooks/useBooking";
import { generateWeek } from "../utils/generateWeek";
import { useAuth } from "@/app/contexts/AuthContext";

import BookingsCalendar from "./BookingCalendar";
import BookingsFilters from "./BookingFilters";
import BookingsGrid from "./BookingGrid";

import { Booking } from "../types/booking.types";

interface Props {
  initialBookings: Booking[];
}

//  definimos el tipo literal aquí
type Variant = "user" | "coach" | "admin";

export default function BookingClient({ initialBookings }: Props) {
  const { dataUser, isLoading } = useAuth();

  const {
    filteredBookings,
    selectedDate,
    setSelectedDate,
    search,
    setSearch,
    intensityFilter,
    setIntensityFilter,
    handleSchedule,
  } = useBookings(initialBookings);

  const weekDays = useMemo(() => generateWeek(), []);

  if (isLoading) return null;

  //  validación estricta para que TS entienda el tipo (POSTERIORMENTE CAMBIAR EN UserSession)
  const role = dataUser?.user?.role;

  let variant: Variant | undefined;

  if (role === "user") variant = "user";
  else if (role === "coach") variant = "coach";
  else if (role === "admin") variant = "admin";

  return (
    <div className="px-4 md:px-8 lg:px-12 py-10 space-y-10">
      <h1 className="text-3xl font-bold">Entrenamientos</h1>

      <BookingsCalendar
        weekDays={weekDays}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <BookingsFilters
        search={search}
        setSearch={setSearch}
        intensityFilter={intensityFilter}
        setIntensityFilter={setIntensityFilter}
      />

      <BookingsGrid
        bookings={filteredBookings}
        onSchedule={handleSchedule}
        variant={variant}
      />
    </div>
  );
}
