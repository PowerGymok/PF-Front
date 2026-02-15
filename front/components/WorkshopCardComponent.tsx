"use client";

import Image from "next/image";
import { Workshop } from "@/features/workshops/workshop.types";
import { SpotsIcon } from "./icons/SpotsIcon";
import { CoachIcon } from "./icons/CoachIcon";
import { IntensityIcon } from "./icons/IntensityIcon";
import { ClockIcon } from "./icons/ClockIcon";

interface Props {
  workshop: Workshop;
  onSchedule?: (id: number) => void;
}

export function WorkshopCardComponent({ workshop, onSchedule }: Props) {
  /*
    CÁLCULO DE OCUPACIÓN (INVERSO)
    - Antes: porcentaje de cupos disponibles.
    - Ahora: porcentaje de cupos ocupados.
    - En producción:
      * capacity y spotsAvailable vendrán del backend.
      * Este cálculo puede mantenerse en frontend como dato derivado.
  */
  const percent =
    workshop.capacity === 0
      ? 0
      : Math.round(
          ((workshop.capacity - workshop.spotsAvailable) / workshop.capacity) *
            100,
        );

  /*
    ESTILOS POR INTENSIDAD
    - Basado en string literal del workshop.
    - En producción: intensity debería ser un ENUM real en base de datos.
  */
  const intensityStyles =
    workshop.intensity === "ALTO"
      ? {
          border: "group-hover:border-rose-600",
          text: "group-hover:text-rose-600",
        }
      : workshop.intensity === "MEDIO"
        ? {
            border: "group-hover:border-yellow-400",
            text: "group-hover:text-yellow-400",
          }
        : {
            border: "group-hover:border-green-400",
            text: "group-hover:text-green-400",
          };

  /*
    COLOR DE BARRA SEGÚN OCUPACIÓN
    - Ahora refleja nivel de ocupación (lugares tomados).
    - En producción: validación real de cupos NO debe depender de este cálculo.
  */
  const progressColor =
    percent < 40
      ? "bg-green-400"
      : percent < 80
        ? "bg-yellow-400"
        : "bg-rose-600";

  const progressTextColor =
    percent < 40
      ? "text-green-400"
      : percent < 80
        ? "text-yellow-400"
        : "text-rose-600";

  return (
    <div
      className={`
        group relative flex flex-col justify-between
        border border-white/30 ${intensityStyles.border}
        rounded-3xl bg-black text-white
        transition-all duration-300 hover:scale-105 overflow-hidden
      `}
    >
      {/* Imagen */}
      <div className="relative h-72 w-full overflow-hidden">
        <Image
          src={workshop.image}
          alt={workshop.title}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Contenido */}
      <div className="flex flex-col justify-between p-8 flex-1">
        <div className="space-y-6">
          {/* Título */}
          <h3
            className={`text-3xl font-extrabold tracking-wide transition-colors duration-300 ${intensityStyles.text}`}
          >
            {workshop.title}
          </h3>

          {/* Info en dos filas, dos columnas */}
          <div className="grid grid-cols-2 gap-y-2 text-sm tracking-wide">
            {/* Intensidad */}
            <div
              className={`flex items-center gap-2 transition-colors duration-300 ${intensityStyles.text}`}
            >
              <IntensityIcon className="w-5 h-5 text-white transition-colors duration-300 group-hover:text-inherit" />
              <span>Intensidad {workshop.intensity}</span>
            </div>

            {/* Horario */}
            <div
              className={`flex items-center gap-2 justify-end transition-colors duration-300 ${intensityStyles.text}`}
            >
              <ClockIcon className="w-5 h-5 text-white transition-colors duration-300 group-hover:text-inherit" />
              <span>{workshop.time}</span>
            </div>

            {/* Coach */}
            <div
              className={`flex items-center gap-2 transition-colors duration-300 ${intensityStyles.text}`}
            >
              <CoachIcon className="w-5 h-5 text-white transition-colors duration-300 group-hover:text-inherit" />
              <span>{workshop.coach}</span>
            </div>

            {/* Spots */}
            <div className="flex items-center gap-2 justify-end">
              <SpotsIcon
                className={`w-5 h-5 transition-colors duration-300 ${progressTextColor}`}
              />
              <span className={progressTextColor}>
                {workshop.capacity - workshop.spotsAvailable}/
                {workshop.capacity} ocupados
              </span>
            </div>
          </div>

          {/* Barra de ocupación */}
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className={`h-2 ${progressColor} transition-all duration-500`}
              style={{ width: `${percent}%` }}
            />
          </div>

          {/* Descripción */}
          <div className="overflow-hidden max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-500">
            <p className="text-sm leading-relaxed opacity-80">
              {workshop.description}
            </p>
          </div>
        </div>

        {/* Botón agendar */}
        <div className="mt-10">
          <button
            onClick={() => onSchedule?.(workshop.id)}
            disabled={workshop.spotsAvailable === 0}
            className="w-full py-4 rounded-full border border-white font-semibold tracking-wide transition-all duration-300 hover:bg-white hover:text-black disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {workshop.spotsAvailable === 0 ? "AGOTADO" : "AGENDAR"}
          </button>
        </div>
      </div>
    </div>
  );
}
