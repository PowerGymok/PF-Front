import { Intensity } from "./types/workout.types";

export const intensityLabelMap: Record<Intensity, string> = {
  ALTO: "Alta Intensidad",
  MEDIO: "Intensidad Media",
  BAJO: "Baja Intensidad",
};

export const getIntensityStyles = (intensity: Intensity) => {
  switch (intensity) {
    case "ALTO":
      return {
        text: "text-rose-500",
        border: "border-rose-600",
        bg: "bg-rose-600",
        borderHover: "group-hover:border-rose-600",
        textHover: "group-hover:text-rose-500",
        badge:
          "bg-transparent border border-rose-400 opacity-0 group-hover:opacity-100 group-hover:bg-rose-400 group-hover:text-black transition duration-300",
        button:
          "border-rose-500 text-rose-500 hover:bg-rose-600 hover:text-white transition duration-300",
      };

    case "MEDIO":
      return {
        text: "text-yellow-400",
        border: "border-yellow-400",
        bg: "bg-yellow-400",
        borderHover: "group-hover:border-yellow-400",
        textHover: "group-hover:text-yellow-400",
        badge:
          "bg-transparent border border-yellow-400 opacity-0 group-hover:opacity-100 group-hover:bg-yellow-400 group-hover:text-black transition duration-300",
        button:
          "border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition duration-300",
      };

    default:
      return {
        text: "text-green-400",
        border: "border-green-400",
        bg: "bg-green-500",
        borderHover: "group-hover:border-green-400",
        textHover: "group-hover:text-green-400",
        badge:
          "bg-transparent border border-green-400 opacity-0 group-hover:opacity-100 group-hover:bg-green-400 group-hover:text-black transition duration-300",
        button:
          "border-green-400 text-green-400 hover:bg-green-500 hover:text-black transition duration-300",
      };
  }
};
