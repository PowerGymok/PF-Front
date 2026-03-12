import { WeekDay } from "../types/week.types";

// Helper: obtiene la fecha local en formato YYYY-MM-DD sin depender de UTC
function getLocalDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function generateWeek(): WeekDay[] {
  const today = new Date();

  // ✅ Fix #2: la semana empieza HOY (no el domingo anterior)
  // Así el usuario nunca ve ni selecciona días pasados vacíos
  return Array.from({ length: 7 }).map((_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    return {
      // ✅ Fix #1: usar fecha local para el iso, no toISOString() (UTC)
      iso: getLocalDateString(date),
      month: date.toLocaleDateString("es-MX", { month: "short" }).toUpperCase(),
      dayNumber: date.getDate(),
      weekday: date
        .toLocaleDateString("es-MX", { weekday: "short" })
        .toUpperCase(),
    };
  });
}
