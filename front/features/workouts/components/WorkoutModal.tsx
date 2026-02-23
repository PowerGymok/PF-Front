"use client";

import { useEffect } from "react";
import { Workout } from "../types/workout.types";
import { getIntensityStyles } from "../styles/workout.styles";
import WorkoutMeta from "./WorkoutMeta";
import { useRouter } from "next/navigation";

interface WorkoutModalProps {
  workout: Workout;
  onClose: () => void;
}

export default function WorkoutModal({ workout, onClose }: WorkoutModalProps) {
  const router = useRouter();
  const intensityStyles = getIntensityStyles(workout.intensity);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#111] rounded-2xl border ${intensityStyles.border} shadow-2xl animate-scaleIn`}
      >
        {/* Hero */}
        <div className="relative h-56 overflow-hidden rounded-t-2xl">
          <img
            src={workout.image}
            alt={workout.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/20 to-black/80" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white w-9 h-9 rounded-full flex items-center justify-center transition"
          >
            ✕
          </button>

          <div className="absolute bottom-5 left-6">
            <h2 className="text-3xl font-bold text-white mt-3">
              {workout.name}
            </h2>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-6 text-zinc-300">
          {/* Meta */}
          <div className="bg-zinc-900 rounded-xl p-4">
            <WorkoutMeta workout={workout} variant="modal" />
          </div>

          {/* Description */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">
              Sobre el entrenamiento
            </h4>
            <p className="text-sm leading-relaxed text-zinc-400">
              {workout.fullDescription}
            </p>
          </div>

          {/* Benefits */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">
              ¿Qué vas a lograr?
            </h4>

            <ul className="flex flex-col gap-2">
              {workout.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <span
                    className={`w-2 h-2 rounded-full ${intensityStyles.bg}`}
                  />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-sm text-zinc-400">
            {workout.requirements}
          </div>

          {/* CTA */}
          <button
            onClick={() => router.push("/booking")}
            className={`mt-2 py-3 text-sm font-semibold rounded-lg border transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-95 ${intensityStyles.button}`}
          >
            Agendar Lugar →
          </button>
        </div>
      </div>
    </div>
  );
}
