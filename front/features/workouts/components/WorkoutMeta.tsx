"use client";

import { Workout } from "../types/workout.types";
import { getIntensityStyles } from "../styles/workout.styles";
import { Spots_Icon } from "@/components/icons/Spots_Icon";
import { Clock_Icon } from "@/components/icons/Clock_Icon";
import { Intensity_Icon } from "@/components/icons/Intensity_Icon";

interface WorkoutMetaProps {
  workout: Workout;
  variant?: "card" | "modal";
}

export default function WorkoutMeta({
  workout,
  variant = "card",
}: WorkoutMetaProps) {
  const intensityStyles = getIntensityStyles(workout.intensity);

  const iconColor =
    variant === "card" ? intensityStyles.textHover : intensityStyles.text;

  return (
    <div className="flex justify-between items-center text-xs text-zinc-300">
      <div className="flex items-center gap-2">
        <Spots_Icon className={`w-5 ${iconColor}`} />
        <span className="text-white font-semibold">{workout.spots}</span> Spots
      </div>

      <div className="flex items-center gap-2">
        <Clock_Icon className={`w-5 ${iconColor}`} />
        <span className="text-white font-semibold">{workout.duration}</span> min
      </div>

      <div className="flex items-center gap-2">
        <Intensity_Icon className={`w-5 ${iconColor}`} />
        <span className="text-white font-semibold">{workout.intensity}</span>
      </div>
    </div>
  );
}
