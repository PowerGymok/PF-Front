import { useMemo, useState } from "react";
import { Booking } from "../types/booking.types";
import { filterBookings } from "../utils/filterBookings";

export function useBookings(initialBookings: Booking[]) {
  const [bookings, setBookings] = useState(initialBookings);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [intensityFilter, setIntensityFilter] = useState("");

  const refreshBookings = async () => {
    const res = await fetch("");
    const updated = await res.json();
    setBookings(updated);
  };

  const handleSchedule = async (id: string) => {
    await fetch(`/${id}`, { method: "PATCH" });
    await refreshBookings();
  };

  const filteredBookings = useMemo(() => {
    return filterBookings({
      bookings,
      selectedDate,
      search,
      intensityFilter,
    });
  }, [bookings, selectedDate, search, intensityFilter]);

  return {
    filteredBookings,
    selectedDate,
    setSelectedDate,
    search,
    setSearch,
    intensityFilter,
    setIntensityFilter,
    handleSchedule,
  };
}
