import { UserSession } from "./UserSession";

export interface AuthContextProps {
  dataUser: UserSession | null;
  setDataUser: (dataUSer: UserSession | null) => void;
  logOut: () => void;
  userInitial: string | null;
  isLoading: boolean;
}
