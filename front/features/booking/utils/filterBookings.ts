import { Booking } from "../types/booking.types";

interface FilterParams {
  bookings: Booking[];
  selectedDate: string | null;
  search: string;
  intensityFilter: string;
}

export function filterBookings({
  bookings,
  selectedDate,
  search,
  intensityFilter,
}: FilterParams): Booking[] {
  const searchValue = search.toLowerCase().trim();
  const today = new Date().toISOString().split("T")[0];

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

      // intensityFilter ahora es "baja" | "media" | "alta" | ""
      const matchesIntensity =
        intensityFilter === "" || w.intensity === intensityFilter;

      return matchesSearch && matchesIntensity;
    })
    .sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date);
      return dateCompare !== 0 ? dateCompare : a.time.localeCompare(b.time);
    });
}
