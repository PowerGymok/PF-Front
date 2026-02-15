import { Workshop } from "./workshop.types";

/*
  WORKSHOPS MOCK DATA

  - Representa un conjunto de clases/talleres de ejemplo para el frontend.
  - Se usa en desarrollo para probar componentes como WorkshopCard.
  - En producción:
    * Estos datos vendrán de la base de datos vía API.
    * spotsAvailable debe actualizarse en tiempo real según reservas.
    * coach debería ser relación con tabla de instructores.
*/
export const workshopsMock: Workshop[] = [
  {
    id: 1,
    title: "HIIT",
    description:
      "Entrenamiento de intervalos de alta intensidad que combina cardio y fuerza en ráfagas explosivas...",
    intensity: "ALTO",
    coach: "Carlos",
    image: "/images/workshops/hiit.jpg",
    capacity: 20,
    spotsAvailable: 20,
    time: "08:00",
  },
  {
    id: 2,
    title: "JAB TRAINING",
    description:
      "Clase enfocada en técnicas de boxeo, perfecciona tu jab y mejora coordinación y velocidad...",
    intensity: "MEDIO",
    coach: "Lucía",
    image: "/images/workshops/jab.jpg",
    capacity: 20,
    spotsAvailable: 20,
    time: "09:00",
  },
  {
    id: 3,
    title: "FULL BODY TONIC",
    description:
      "Sesión integral que activa todos los grupos musculares con rutinas dinámicas de fuerza y tonificación...",
    intensity: "MEDIO",
    coach: "Andrés",
    image: "/images/workshops/fullbody.jpg",
    capacity: 20,
    spotsAvailable: 20,
    time: "10:00",
  },
  {
    id: 4,
    title: "LEG TONIC",
    description:
      "Entrenamiento específico para piernas y glúteos, fortaleciendo la base del cuerpo...",
    intensity: "ALTO",
    coach: "María",
    image: "/images/workshops/leg.jpg",
    capacity: 20,
    spotsAvailable: 20,
    time: "11:00",
  },
  {
    id: 5,
    title: "BOOTY TONIC",
    description:
      "Clase diseñada para esculpir y tonificar los glúteos mediante movimientos funcionales...",
    intensity: "MEDIO",
    coach: "Diego",
    image: "/images/workshops/booty.jpg",
    capacity: 20,
    spotsAvailable: 20,
    time: "12:00",
  },
  {
    id: 6,
    title: "CYCLING",
    description:
      "Entrenamiento cardiovascular en bicicleta fija, acompañado de música motivadora...",
    intensity: "ALTO",
    coach: "Paola",
    image: "/images/workshops/cycling.jpg",
    capacity: 20,
    spotsAvailable: 20,
    time: "13:00",
  },
  {
    id: 7,
    title: "YOGA",
    description:
      "Práctica de posturas y respiración consciente que mejora flexibilidad y reduce el estrés...",
    intensity: "BAJO",
    coach: "Sofía",
    image: "/images/workshops/yoga.jpg",
    capacity: 20,
    spotsAvailable: 20,
    time: "14:00",
  },
  {
    id: 8,
    title: "DANCING",
    description:
      "Clase divertida de baile con coreografías fáciles de seguir, perfecta para quemar calorías...",
    intensity: "BAJO",
    coach: "Diego",
    image: "/images/workshops/dancing.jpg",
    capacity: 20,
    spotsAvailable: 20,
    time: "15:00",
  },
  {
    id: 9,
    title: "MINDFULNESS",
    description:
      "Práctica enfocada en la atención plena y la conexión con el momento presente...",
    intensity: "BAJO",
    coach: "Valeria",
    image: "/images/workshops/mind.jpg",
    capacity: 20,
    spotsAvailable: 20,
    time: "16:00",
  },
  {
    id: 10,
    title: "LEG TONIC",
    description:
      "Entrenamiento específico para piernas y glúteos, fortaleciendo la base del cuerpo...",
    intensity: "ALTO",
    coach: "Sofía",
    image: "/images/workshops/leg.jpg",
    capacity: 20,
    spotsAvailable: 20,
    time: "15:00",
  },
  {
    id: 11,
    title: "BOOTY TONIC",
    description:
      "Clase diseñada para esculpir y tonificar los glúteos mediante movimientos funcionales...",
    intensity: "MEDIO",
    coach: "Diego",
    image: "/images/workshops/booty.jpg",
    capacity: 20,
    spotsAvailable: 20,
    time: "13:00",
  },
  {
    id: 12,
    title: "CYCLING",
    description:
      "Entrenamiento cardiovascular en bicicleta fija, acompañado de música motivadora...",
    intensity: "ALTO",
    coach: "Paola",
    image: "/images/workshops/cycling.jpg",
    capacity: 20,
    spotsAvailable: 20,
    time: "19:00",
  },
];
