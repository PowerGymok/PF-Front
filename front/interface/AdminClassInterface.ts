export interface AdminClass {
  id: string;
  date: string;
  time: string;
  token: number;
  isActive: boolean;
  spaces_available: number;

  class: {
    id: string;
    name: string;
    duration: number;
    capacity: number;
  };

  coach: {
    id: string;
    name: string;
    email: string;
  };
}