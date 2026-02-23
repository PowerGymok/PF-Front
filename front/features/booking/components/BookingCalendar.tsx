"use client";

import { WeekDay } from "../types/week.types";

interface Props {
  weekDays: WeekDay[];
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
}

export default function BookingCalendar({
  weekDays,
  selectedDate,
  setSelectedDate,
}: Props) {
  return (
    <div className="grid grid-cols-7 gap-3 border-b border-white/10 pb-4">
      {weekDays.map((day) => {
        const isActive = selectedDate === day.iso;

        return (
          <button
            key={day.iso}
            onClick={() => setSelectedDate(isActive ? null : day.iso)}
            className={`
              flex flex-col items-center justify-center
              py-4 rounded-2xl transition border text-sm
              ${
                isActive
                  ? "bg-white text-black border-white"
                  : "bg-black text-white border-white/20 hover:border-white/40"
              }
            `}
          >
            <span className="opacity-70 text-xs">
              {day.month} {day.dayNumber}
            </span>
            <span className="font-semibold">{day.weekday}</span>
          </button>
        );
      })}
    </div>
  );
}
