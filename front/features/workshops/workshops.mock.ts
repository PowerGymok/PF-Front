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
      "Entrenamiento de intervalos de alta intensidad que combina cardio y fuerza en ráfagas explosivas. Ideal para mejorar la resistencia y quemar calorías en poco tiempo. Cada sesión te reta a superar tus límites con dinámicas variadas y motivadoras.",
    intensity: "ALTO",
    coach: "Carlos",
    image: "/images/workshops/hiit.jpg",
    capacity: 20,
    spotsAvailable: 20,
  },
  {
    id: 2,
    title: "JAB TRAINING",
    description:
      "Clase enfocada en técnicas de boxeo, perfecciona tu jab y mejora coordinación y velocidad. Aprenderás fundamentos de defensa y ataque mientras trabajas tu condición física. Es perfecta para liberar estrés y ganar confianza en tus movimientos.",
    intensity: "MEDIO",
    coach: "Lucía",
    image: "/images/workshops/jab.jpg",
    capacity: 20,
    spotsAvailable: 20,
  },
  {
    id: 3,
    title: "FULL BODY TONIC",
    description:
      "Sesión integral que activa todos los grupos musculares con rutinas dinámicas de fuerza y tonificación. Combina ejercicios funcionales y circuitos para mejorar postura y energía. Es ideal para quienes buscan un entrenamiento completo y equilibrado.",
    intensity: "MEDIO",
    coach: "Andrés",
    image: "/images/workshops/fullbody.jpg",
    capacity: 20,
    spotsAvailable: 20,
  },
  {
    id: 4,
    title: "LEG TONIC",
    description:
      "Entrenamiento específico para piernas y glúteos, fortaleciendo la base del cuerpo. Incluye ejercicios de resistencia y potencia que mejoran tu rendimiento en otras disciplinas. Perfecto para quienes buscan definición y estabilidad en la parte inferior.",
    intensity: "ALTO",
    coach: "María",
    image: "/images/workshops/leg.jpg",
    capacity: 20,
    spotsAvailable: 20,
  },
  {
    id: 5,
    title: "BOOTY TONIC",
    description:
      "Clase diseñada para esculpir y tonificar los glúteos mediante movimientos funcionales. Se enfoca en mejorar fuerza, resistencia y estética con rutinas variadas. Es una opción divertida y efectiva para quienes quieren resultados visibles en poco tiempo.",
    intensity: "MEDIO",
    coach: "Diego",
    image: "/images/workshops/booty.jpg",
    capacity: 20,
    spotsAvailable: 20,
  },
  {
    id: 6,
    title: "CYCLING",
    description:
      "Entrenamiento cardiovascular en bicicleta fija, acompañado de música motivadora y cambios de ritmo. Mejora tu resistencia, quema calorías y fortalece piernas en cada sesión. La energía grupal hace que cada pedaleo sea una experiencia intensa y divertida.",
    intensity: "ALTO",
    coach: "Paola",
    image: "/images/workshops/cycling.jpg",
    capacity: 20,
    spotsAvailable: 20,
  },
  {
    id: 7,
    title: "YOGA",
    description:
      "Práctica de posturas y respiración consciente que mejora flexibilidad y reduce el estrés. Favorece la conexión mente-cuerpo y promueve la calma interior. Es ideal para quienes buscan equilibrio físico y mental en un ambiente relajado.",
    intensity: "BAJO",
    coach: "Sofía",
    image: "/images/workshops/yoga.jpg",
    capacity: 20,
    spotsAvailable: 20,
  },
  {
    id: 8,
    title: "DANCING",
    description:
      "Clase divertida de baile con coreografías fáciles de seguir, perfecta para quemar calorías. Estimula la coordinación, la memoria y la expresión corporal mientras disfrutas de la música. Es una opción alegre para entrenar sin sentir que estás haciendo ejercicio.",
    intensity: "BAJO",
    coach: "Diego",
    image: "/images/workshops/dancing.jpg",
    capacity: 20,
    spotsAvailable: 20,
  },
  {
    id: 9,
    title: "MINDFULNESS",
    description:
      "Práctica enfocada en la atención plena y la conexión con el momento presente. A través de ejercicios de respiración, meditación guiada y dinámicas de relajación, aprenderás a reducir el estrés y mejorar tu concentración. Es ideal para quienes buscan equilibrio emocional, claridad mental y bienestar integral.",
    intensity: "BAJO",
    coach: "Valeria",
    image: "/images/workshops/mind.jpg",
    capacity: 20,
    spotsAvailable: 20,
  },
];
