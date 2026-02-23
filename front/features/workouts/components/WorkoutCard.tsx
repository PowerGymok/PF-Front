"use client";

import { useState } from "react";
import { Workout } from "../types/workout.types";
import {
  getIntensityStyles,
  intensityLabelMap,
} from "../styles/workout.styles";
import WorkoutModal from "./WorkoutModal";
import { Clock_Icon } from "@/components/icons/Clock_Icon";
import { Intensity_Icon } from "@/components/icons/Intensity_Icon";
import { Spots_Icon } from "@/components/icons/Spots_Icon";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  const [open, setOpen] = useState(false);

  const intensityStyles = getIntensityStyles(workout.intensity);

  return (
    <>
      <article
        onClick={() => setOpen(true)}
        className={`group cursor-pointer bg-[#111] border border-zinc-800 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${intensityStyles.borderHover}`}
      >
        {/* Imagen */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={workout.image}
            alt={workout.name}
            className="w-full h-full object-cover transition-transform duration-500 "
          />

          <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/80" />

          {/* Badge intensidad */}
          <span
            className={`absolute top-3 right-3 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full text-white ${intensityStyles.badge}`}
          >
            {intensityLabelMap[workout.intensity]}
          </span>
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col gap-4">
          {/* Meta */}
          <div className="flex justify-between items-center text-xs text-zinc-300">
            <div className="flex items-center gap-2">
              <Spots_Icon className={`w-4 ${intensityStyles.textHover}`} />
              <span>{workout.spots} Spots</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock_Icon className={`w-4 ${intensityStyles.textHover}`} />
              <span>{workout.duration} min</span>
            </div>

            <div className="flex items-center gap-2">
              <Intensity_Icon className={`w-4 ${intensityStyles.textHover}`} />
              <span>{workout.intensity}</span>
            </div>
          </div>

          {/* Info */}
          <div>
            <h3
              className={`text-2xl font-bold text-white tracking-wide transition-colors duration-300 ${intensityStyles.textHover}`}
            >
              {workout.name}
            </h3>

            <p className="text-sm text-zinc-400 mt-1 line-clamp-2">
              {workout.shortDescription}
            </p>
          </div>

          {/* Button */}
          <button
            className={`cursor-pointer mt-2 py-2 text-sm font-semibold rounded-lg border transition-all duration-200 ${intensityStyles.button}`}
          >
            Ver más →
          </button>
        </div>
      </article>

      {open && (
        <WorkoutModal workout={workout} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
