export interface AllUsers {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  city: string | null;
  Birthdate: string | null;
  role: "user" | "Coach" | "Admin";
  profileImg: string | null;
  isActive: boolean;
  courtesyClass: boolean;
  tokenBalance: number;
  authProvider: "local" | "google";
  googleId: string | null;
  isProfileComplete: boolean;
}