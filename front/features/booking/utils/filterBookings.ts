import { Booking } from "../types/booking.types";

interface FilterParams {
  bookings: Booking[];
  selectedDate: string | null;
  search: string;
  intensityFilter: string;
}

// Helper: obtiene la fecha local en formato YYYY-MM-DD sin depender de UTC
function getLocalDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function filterBookings({
  bookings,
  selectedDate,
  search,
  intensityFilter,
}: FilterParams): Booking[] {
  const searchValue = search.toLowerCase().trim();

  // ✅ Fix #1: usar fecha local (no UTC) para evitar desfase de zona horaria
  const today = getLocalDateString(new Date());

  return bookings
    .filter((w) => w.date >= today)
    .filter((w) => (selectedDate ? w.date === selectedDate : true))
    .filter((w) => {
      const searchableString = `
        ${w.title}
        ${w.description}
        ${w.coach}
        ${w.intensity}
        ${w.time}
      `.toLowerCase();

      const matchesSearch =
        searchValue === "" || searchableString.includes(searchValue);

      // intensityFilter es "baja" | "media" | "alta" | ""
      const matchesIntensity =
        intensityFilter === "" || w.intensity === intensityFilter;

      return matchesSearch && matchesIntensity;
    })
    .sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date);
      return dateCompare !== 0 ? dateCompare : a.time.localeCompare(b.time);
    });
}
