"use client";

import { UserSession } from "@/interface/UserSession";
import { AuthContextProps } from "@/interface/AuthContextProps";
import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from "react";

const AuthContext = createContext<AuthContextProps>({
  dataUser: null,
  setDataUser: () => {},
  logOut: () => {},
  userInitial: null,
  isLoading: true,
  isProfileComplete: true,
  setIsProfileComplete: () => {},
  updateProfileImg: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [dataUser, setDataUserState] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileComplete, setIsProfileComplete] = useState(true);

  const persistSession = (session: UserSession | null) => {
    if (!session) {
      localStorage.removeItem("userSession");
      return;
    }
    localStorage.setItem("userSession", JSON.stringify(session));
  };

  const setDataUser = (session: UserSession | null) => {
    setDataUserState(session);
    persistSession(session);
  };

  const logOut = () => {
    setDataUserState(null);
    localStorage.removeItem("userSession");
    localStorage.removeItem("token"); // por si en algún flujo viejo lo guardaste así
  };

  const updateProfileImg = (img: string) => {
    setDataUserState((prev) => {
      if (!prev) return prev;

      const updatedSession = {
        ...prev,
        user: {
          ...prev.user,
          profileImg: img,
        },
      };

      localStorage.setItem("userSession", JSON.stringify(updatedSession));
      return updatedSession;
    });
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedSession = localStorage.getItem("userSession");

        if (!storedSession) {
          setIsLoading(false);
          return;
        }

        let parsedData: UserSession;

        try {
          parsedData = JSON.parse(storedSession);
        } catch {
          localStorage.removeItem("userSession");
          setIsLoading(false);
          return;
        }

        if (!parsedData?.token) {
          localStorage.removeItem("userSession");
          setIsLoading(false);
          return;
        }

        // Primero hidratamos con lo que ya existe en localStorage
        setDataUserState(parsedData);

        // Si no existe API_URL, no intentamos refrescar
        if (!process.env.NEXT_PUBLIC_API_URL) {
          setIsLoading(false);
          return;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${parsedData.token}`,
          },
          cache: "no-store",
        });

        // Si el backend falla, NO tumbamos la sesión local
        if (!res.ok) {
          setIsLoading(false);
          return;
        }

        const userFromApi = await res.json();

        const updatedSession: UserSession = {
          ...parsedData,
          user: {
            ...parsedData.user,
            ...userFromApi,
          },
        };

        setDataUserState(updatedSession);
        localStorage.setItem("userSession", JSON.stringify(updatedSession));
      } catch (error) {
        console.error("Error loading auth session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const userInitial = dataUser?.user?.email
    ? dataUser.user.email.charAt(0).toUpperCase()
    : null;

  return (
    <AuthContext.Provider
      value={{
        dataUser,
        setDataUser,
        logOut,
        userInitial,
        isLoading,
        isProfileComplete,
        setIsProfileComplete,
        updateProfileImg,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);