/*
  INTENSITY TYPE — alineado al backend
  Backend enum: 'alta' | 'media' | 'baja'
*/
export type Intensity = "baja" | "media" | "alta";

/*
  BOOKING INTERFACE
*/
export interface Booking {
  id: string;
  id_class_schedule: string;
  classId: string; // ✅ id de la clase (no del schedule) — para editar
  title: string;
  description: string;
  coach: string;
  intensity: Intensity;
  image?: string;
  capacity: number;
  spaces_available: number;
  time: string;
  date: string;
  duration?: number; // ✅ duración en minutos — para editar
  tokens_required: number;
}

/*
  USER SESSION
*/
export interface BookingUserMeta {
  membership_active: boolean;
  tokens: number;
}
