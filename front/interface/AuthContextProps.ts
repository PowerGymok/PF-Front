import { UserSession } from "./UserSession";

export interface AuthContextProps {
  dataUser: UserSession | null;
  setDataUser: (dataUser: UserSession | null) => void;
  logOut: () => void;
  userInitial: string | null;
  isLoading: boolean;
  isProfileComplete: boolean;
  setIsProfileComplete: (value: boolean) => void;
}