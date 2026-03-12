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
  classId: string;
  title: string;
  description: string;
  coach: string;
  intensity: Intensity;
  image?: string;
  capacity: number;
  spaces_available: number;
  time: string;
  date: string;
  duration?: number;
  tokens_required: number;
  isActive?: boolean;
}

/*
  USER SESSION
*/
export interface BookingUserMeta {
  membership_active: boolean;
  tokens: number;
}
