import { Workout } from "./workout.types";

export const workoutsMock: Workout[] = [
  {
    id: 1,
    name: "CrossFit Avanzado",
    intensity: "ALTO",
    duration: 60,
    spots: 20,
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    shortDescription:
      "Entrenamiento funcional de alta intensidad que combina fuerza y resistencia.",
    fullDescription:
      "Clase avanzada con movimientos olímpicos, trabajo metabólico y WOD cronometrado. Diseñada para atletas que buscan superar sus límites.",
    benefits: [
      "Quema hasta 800 kcal",
      "Aumento de fuerza funcional",
      "Mejora explosividad",
      "Alta motivación grupal",
    ],
    requirements:
      "Experiencia previa en entrenamiento funcional. Evaluación obligatoria.",
  },

  {
    id: 2,
    name: "HIIT Express",
    intensity: "ALTO",
    duration: 45,
    spots: 18,
    image:
      "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=800&q=80",
    shortDescription: "Intervalos explosivos para máxima quema calórica.",
    fullDescription:
      "Entrenamiento basado en intervalos de alta intensidad con descansos activos. Ideal para mejorar resistencia y acelerar metabolismo.",
    benefits: [
      "Alta quema calórica",
      "Mejora cardiovascular",
      "Sesiones rápidas y efectivas",
    ],
    requirements: "Condición física básica recomendada.",
  },

  {
    id: 3,
    name: "Spartan Conditioning",
    intensity: "ALTO",
    duration: 55,
    spots: 16,
    image:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80",
    shortDescription: "Entrenamiento militar enfocado en resistencia total.",
    fullDescription:
      "Circuitos funcionales con peso corporal y cargas externas que desarrollan fuerza mental y física.",
    benefits: [
      "Mayor resistencia",
      "Fortalecimiento total",
      "Mejora disciplina",
    ],
    requirements: "Recomendado para nivel intermedio-avanzado.",
  },

  {
    id: 4,
    name: "Yoga Flow",
    intensity: "MEDIO",
    duration: 50,
    spots: 20,
    image:
      "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800&q=80",
    shortDescription:
      "Secuencias dinámicas enfocadas en respiración y movilidad.",
    fullDescription:
      "Clase fluida que combina fuerza, flexibilidad y control corporal. Ideal para equilibrar cuerpo y mente.",
    benefits: ["Mayor flexibilidad", "Reducción de estrés", "Mejor postura"],
    requirements: "Tapete obligatorio. Apto para todos los niveles.",
  },

  {
    id: 5,
    name: "Functional Core",
    intensity: "MEDIO",
    duration: 40,
    spots: 15,
    image:
      "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=800&q=80",
    shortDescription: "Entrenamiento enfocado en abdomen y estabilidad.",
    fullDescription:
      "Rutina enfocada en fortalecimiento del core con ejercicios funcionales y control postural.",
    benefits: [
      "Mayor estabilidad",
      "Prevención de lesiones",
      "Mejor rendimiento deportivo",
    ],
    requirements: "Sin lesiones lumbares activas.",
  },

  {
    id: 6,
    name: "Boxing Conditioning",
    intensity: "ALTO",
    duration: 50,
    spots: 14,
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
    shortDescription: "Entrenamiento inspirado en boxeo profesional.",
    fullDescription:
      "Combinación de técnica básica de golpeo y acondicionamiento físico intenso.",
    benefits: [
      "Alta quema calórica",
      "Mejora coordinación",
      "Desarrollo de resistencia",
    ],
    requirements: "Guantes opcionales. Apto para nivel intermedio.",
  },

  {
    id: 7,
    name: "Powerlifting Básico",
    intensity: "BAJO",
    duration: 70,
    spots: 12,
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
    shortDescription: "Aprende técnica correcta en movimientos básicos.",
    fullDescription:
      "Clase centrada en sentadilla, press banca y peso muerto con progresión estructurada.",
    benefits: ["Incremento de fuerza", "Mejor técnica", "Progresión segura"],
    requirements: "Experiencia básica con barra.",
  },

  {
    id: 8,
    name: "Mobility Reset",
    intensity: "BAJO",
    duration: 35,
    spots: 20,
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
    shortDescription: "Clase suave enfocada en movilidad articular.",
    fullDescription:
      "Trabajo de movilidad, liberación miofascial y estiramientos activos.",
    benefits: [
      "Mayor rango de movimiento",
      "Menor rigidez muscular",
      "Recuperación activa",
    ],
    requirements: "Apto para todos los niveles.",
  },

  {
    id: 9,
    name: "TRX Strength",
    intensity: "MEDIO",
    duration: 45,
    spots: 16,
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80",
    shortDescription: "Entrenamiento con suspensión para fuerza funcional.",
    fullDescription:
      "Rutina completa usando TRX para desarrollar estabilidad y fuerza corporal.",
    benefits: [
      "Fortalecimiento integral",
      "Mejora equilibrio",
      "Trabajo de core constante",
    ],
    requirements: "Apto para nivel principiante-intermedio.",
  },

  {
    id: 10,
    name: "Cardio Dance",
    intensity: "MEDIO",
    duration: 50,
    spots: 25,
    image:
      "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80",
    shortDescription: "Entrenamiento divertido con ritmos energéticos.",
    fullDescription:
      "Coreografías dinámicas que combinan cardio y coordinación.",
    benefits: [
      "Alta quema calórica",
      "Mejora coordinación",
      "Ambiente divertido",
    ],
    requirements: "Ropa cómoda. Apto para todos.",
  },

  {
    id: 11,
    name: "Strength & Conditioning",
    intensity: "ALTO",
    duration: 65,
    spots: 15,
    image:
      "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=800&q=80",
    shortDescription: "Clase completa para desarrollar fuerza y resistencia.",
    fullDescription:
      "Programa mixto que combina levantamientos pesados con intervalos metabólicos.",
    benefits: ["Mayor fuerza", "Mejor resistencia", "Progreso medible"],
    requirements: "Experiencia intermedia recomendada.",
  },

  {
    id: 12,
    name: "Stretch & Relax",
    intensity: "BAJO",
    duration: 40,
    spots: 20,
    image:
      "https://images.unsplash.com/photo-1524863479829-916d8e77f114?w=800&q=80",
    shortDescription: "Clase suave enfocada en relajación y estiramiento.",
    fullDescription:
      "Sesión guiada para liberar tensión muscular y mejorar flexibilidad.",
    benefits: [
      "Reducción de estrés",
      "Mejora flexibilidad",
      "Recuperación muscular",
    ],
    requirements: "Apto para todos los niveles.",
  },
];
