"use client";

import Image from "next/image";
import { Workshop } from "@/features/workshops/workshop.types";
import { SpotsIcon } from "./icons/SpotsIcon";
import { CoachIcon } from "./icons/CoachIcon";
import { IntensityIcon } from "./icons/IntensityIcon";

interface Props {
  workshop: Workshop;

  /*
    onSchedule actualmente es una función local simulada.

    En producción:
    - Será un wrapper que ejecute:
      POST /api/workshops/:id/schedule
    - El backend validará disponibilidad real.
    - El frontend solo reaccionará a la respuesta.
  */
  onSchedule?: (id: number) => void;
}

export function WorkshopCardComponent({ workshop, onSchedule }: Props) {
  /*
    CÁLCULO DE OCUPACIÓN (DERIVADO EN FRONTEND)

    Actualmente:
    - Calculamos el porcentaje en cliente.
    - Es solo visual.

    En producción:
    - capacity y spotsAvailable vendrán del backend.
    - Este cálculo puede mantenerse en frontend
      ya que es un dato derivado.
  */
  const percent =
    workshop.capacity === 0
      ? 0
      : Math.round((workshop.spotsAvailable / workshop.capacity) * 100);

  /*
    ESTILOS POR INTENSIDAD

    Actualmente:
    - Basado en string literal del workshop.
    - intensity es un string del mock.

    En producción:
    - intensity debería ser un ENUM real en base de datos.
    - Ejemplo PostgreSQL:
      CREATE TYPE intensity_level AS ENUM ('BAJO','MEDIO','ALTO');

    Esto evita valores inválidos.
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
    COLOR DE BARRA SEGÚN DISPONIBILIDAD

    Actualmente:
    - Lógica puramente visual.

    En producción:
    - La validación real de cupos NO debe depender
      de este cálculo.
    - El backend debe impedir que spotsAvailable sea negativo.
  */
  const progressColor =
    percent < 20
      ? "bg-rose-600"
      : percent < 60
        ? "bg-yellow-400"
        : "bg-green-400";

  return (
    <div
      className={`
        group
        relative
        flex
        flex-col
        justify-between
        border
        border-white/30
        ${intensityStyles.border}
        rounded-3xl
        bg-black
        text-white
        transition-all
        duration-300
        hover:scale-105
        overflow-hidden
      `}
    >
      {/* 
        IMAGEN

        En producción:
        - image debe ser una URL persistida (imageUrl).
        - Puede provenir de:
          - Cloudinary
          - S3
          - Supabase storage
        - Se recomienda validar tamaño y formato en backend.
      */}
      <div className="relative h-72 w-full overflow-hidden">
        <Image
          src={workshop.image}
          alt={workshop.title}
          fill
          className="
            object-cover
            object-center
            transition-transform
            duration-500
            group-hover:scale-110
          "
        />
      </div>

      {/* CONTENIDO */}
      <div className="flex flex-col justify-between p-8 flex-1">
        <div className="space-y-6">
          {/* 
            TÍTULO

            En producción:
            - title vendrá del backend.
            - Puede requerir sanitización si viene de CMS.
          */}
          <h3
            className={`
              text-3xl
              font-extrabold
              tracking-wide
              transition-colors
              duration-300
              ${intensityStyles.text}
            `}
          >
            {workshop.title}
          </h3>

          {/* 
            INTENSIDAD

            En producción:
            - Debe provenir de ENUM real.
            - Nunca confiar en valores libres.
          */}
          <div
            className={`
              flex items-center gap-3
              text-sm
              uppercase
              tracking-wide
              transition-colors
              duration-300
              ${intensityStyles.text}
            `}
          >
            <IntensityIcon className="w-5 h-5 text-white transition-colors duration-300 group-hover:text-inherit" />
            <span>Intensidad {workshop.intensity}</span>
          </div>

          {/* 
            COACH Y CUPOS

            En producción:
            - coach debería ser relación:
              workshop -> coach_id -> tabla coaches.
            - spotsAvailable debe actualizarse mediante
              endpoint transaccional seguro.
          */}
          <div className="flex justify-between text-sm tracking-wide">
            <div
              className={`
                flex items-center gap-2
                transition-colors
                duration-300
                ${intensityStyles.text}
              `}
            >
              <CoachIcon className="w-5 h-5 text-white transition-colors duration-300 group-hover:text-inherit" />
              <span>{workshop.coach}</span>
            </div>

            <div className="flex items-center gap-2">
              <SpotsIcon className="w-5 h-5" />
              <span>
                {workshop.spotsAvailable}/{workshop.capacity}
              </span>
            </div>
          </div>

          {/* 
            BARRA DE OCUPACIÓN

            Solo representación visual.
            No sustituye validación backend.
          */}
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className={`h-2 ${progressColor} transition-all duration-500`}
              style={{ width: `${percent}%` }}
            />
          </div>

          {/* 
            DESCRIPCIÓN

            En producción:
            - Puede provenir de CMS.
            - Considerar sanitización si permite HTML.
          */}
          <div
            className="
              overflow-hidden
              max-h-0
              opacity-0
              group-hover:max-h-40
              group-hover:opacity-100
              transition-all
              duration-500
            "
          >
            <p className="text-sm leading-relaxed opacity-80">
              {workshop.description}
            </p>
          </div>
        </div>

        {/* 
          BOTÓN AGENDAR

          Actualmente:
          - Solo ejecuta función local.

          En producción:
          - Debe:
            1. Validar autenticación del usuario.
            2. Ejecutar POST /api/workshops/:id/schedule
            3. Manejar:
               - 200 OK
               - 409 (sin cupo)
               - 401 (no autenticado)
               - 500 (error servidor)
          - El backend debe manejar concurrencia.
        */}
        <div className="mt-10">
          <button
            onClick={() => onSchedule?.(workshop.id)}
            disabled={workshop.spotsAvailable === 0}
            className="
              w-full
              py-4
              rounded-full
              border
              border-white
              font-semibold
              tracking-wide
              transition-all
              duration-300
              hover:bg-white
              hover:text-black
              disabled:opacity-40
              disabled:cursor-not-allowed
            "
          >
            {workshop.spotsAvailable === 0 ? "AGOTADO" : "AGENDAR"}
          </button>
        </div>
      </div>
    </div>
  );
}
