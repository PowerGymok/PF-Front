export type ReservationStatus = "Confirmed" | "Cancelled";

export interface ClassScheduleSummary {
  id: string;
  date: string; // "YYYY-MM-DD"
  time: string; // "HH:mm:ss"
  token: string; // viene como string del backend
  isActive: boolean;
}

export interface Reservation {
  id: string;
  date: string; // fecha en que se hizo la reserva
  status: ReservationStatus;
  class_schedule: ClassScheduleSummary;
}
