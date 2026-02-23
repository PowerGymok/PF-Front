import { WeekDay } from "../types/week.types";

export function generateWeek(): WeekDay[] {
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - today.getDay());

  return Array.from({ length: 7 }).map((_, i) => {
    const date = new Date(start);
    date.setDate(start.getDate() + i);

    return {
      iso: date.toISOString().split("T")[0],
      month: date.toLocaleDateString("es-MX", { month: "short" }).toUpperCase(),
      dayNumber: date.getDate(),
      weekday: date
        .toLocaleDateString("es-MX", { weekday: "short" })
        .toUpperCase(),
    };
  });
}
