export interface Reservation {
  id: string;
  date: string;
  status: string;

  class_schedule: {
    id: string;
    date: string;
    time: string;
    token: string;
    isActive: boolean;
  };
}
