/* ─────────────────────────────────────────
   TIPOS FRONTEND — Intensity alineado al backend
───────────────────────────────────────── */

export type Intensity = "baja" | "media" | "alta";

export interface Workout {
  id: string;
  name: string;
  intensity: Intensity;
  duration: number;
  spots: number;
  image: string;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  requirements: string;
}

/* ─────────────────────────────────────────
   TIPO BACKEND — respuesta de GET /clases
───────────────────────────────────────── */

export interface WorkoutBackend {
  id: string;
  name: string;
  duration: string;
  description?: string;
  capacity: number;
  isActive: boolean;
  intensity: Intensity;
  benefits?: string[] | null;
  requirements?: string | null;
  imgUrl?: string | null;
  cloudinaryId?: string | null;
}

/* ─────────────────────────────────────────
   IMÁGENES FALLBACK POR INTENSIDAD PROVISIONALES
───────────────────────────────────────── */

const FALLBACK_IMAGES: Record<Intensity, string> = {
  alta: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
  media: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800&q=80",
  baja: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
};

// Normaliza valores legacy del backend ("BAJO/MEDIO/ALTO") al formato actual
function normalizeIntensity(raw: string): Intensity {
  const map: Record<string, Intensity> = {
    BAJO: "baja",
    bajo: "baja",
    baja: "baja",
    MEDIO: "media",
    medio: "media",
    media: "media",
    ALTO: "alta",
    alto: "alta",
    alta: "alta",
  };
  return map[raw] ?? "baja";
}

export function mapWorkout(item: WorkoutBackend): Workout {
  return {
    id: item.id,
    name: item.name,
    intensity: normalizeIntensity(item.intensity),
    duration: parseInt(item.duration, 10) || 0,
    spots: item.capacity,
    image: item.imgUrl ?? FALLBACK_IMAGES[item.intensity],
    shortDescription: item.description ?? "",
    fullDescription: item.description ?? "",
    benefits: item.benefits ?? [],
    requirements: item.requirements ?? "",
  };
}
