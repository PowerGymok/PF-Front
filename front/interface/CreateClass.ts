export interface CreateClassPayload {
  name: string;
  description?: string;
  duration: string;
  capacity: number;
  intensity: "baja" | "media" | "alta";
}