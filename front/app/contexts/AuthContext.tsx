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
      localStorage.removeItem("token");
      return;
    }

    localStorage.setItem("userSession", JSON.stringify(session));
    localStorage.setItem("token", session.token);
  };

  const setDataUser = (session: UserSession | null) => {
    setDataUserState(session);
    persistSession(session);
  };

  const clearSession = () => {
    setDataUserState(null);
    localStorage.removeItem("userSession");
    localStorage.removeItem("token");
  };

  const logOut = () => {
    clearSession();
  };

  const updateProfileImg = (img: string) => {
    setDataUserState((prev) => {
      if (!prev) return prev;

      const updatedSession: UserSession = {
        ...prev,
        user: {
          ...prev.user,
          profileImg: img,
        },
      };

      persistSession(updatedSession);
      return updatedSession;
    });
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedSession = localStorage.getItem("userSession");
        const legacyToken = localStorage.getItem("token");

        if (!storedSession) {
          if (legacyToken) {
            localStorage.removeItem("token");
          }
          setIsLoading(false);
          return;
        }

        let parsedData: UserSession;

        try {
          parsedData = JSON.parse(storedSession);
        } catch {
          clearSession();
          setIsLoading(false);
          return;
        }

        if (!parsedData?.token) {
          clearSession();
          setIsLoading(false);
          return;
        }

        // Hidratar primero desde localStorage para evitar parpadeo/deslogueo visual
        setDataUserState(parsedData);

        // Re-sincronizar token viejo por compatibilidad
        if (!legacyToken || legacyToken !== parsedData.token) {
          localStorage.setItem("token", parsedData.token);
        }

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

        // Si falla el backend o el token expiró, conservamos la sesión local.
        // Así evitamos "entra y se sale" por fallos temporales de deploy/backend.
        if (!res.ok) {
          setIsLoading(false);
          return;
        }

        const userFromApi = await res.json();

        const updatedSession: UserSession = {
          ...parsedData,
          login: true,
          token: parsedData.token,
          user: {
            ...parsedData.user,
            ...userFromApi,
          },
        };

        setDataUserState(updatedSession);
        persistSession(updatedSession);
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