export interface Reservation {
  id: string;
  user?: {
    id: string;
    name?: string;
  };
  class_schedule?: {
    id: string;
    date?: string;
    start_time?: string;
    end_time?: string;
    class?: {
      title?: string;
      description?: string;
    };
  };
}
