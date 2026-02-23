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

  return bookings
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

      const matchesIntensity =
        intensityFilter === "" || w.intensity === intensityFilter;

      return matchesSearch && matchesIntensity;
    })
    .sort((a, b) => a.time.localeCompare(b.time));
}
