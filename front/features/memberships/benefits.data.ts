export interface Benefit {
  icon: "class" | "equipment" | "calendar" | "partner" | "shower" | "coach";
  text: string;
}

export const benefits: Benefit[] = [
  { icon: "class", text: "DIFERENTES CLASES DISPONIBLES" },
  { icon: "equipment", text: "TE PROPORCIONAMOS EL EQUIPO" },
  { icon: "calendar", text: "AMPLIOS HORARIOS" },
  { icon: "partner", text: "INVITA A UN COMPAÑERO" },
  { icon: "shower", text: "REGADERAS Y PRODUCTOS DE ASEO" },
  { icon: "coach", text: "ENTRENAMIENTOS SEMI-PERSONALIZADOS" },
];
