"use client";

import { UserSession } from "@/interface/UserSession";
import { AuthContextProps } from "@/interface/AuthContextProps";
import { useState, useEffect, useContext, createContext } from "react";

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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [dataUser, setDataUser] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isProfileComplete, setIsProfileComplete] = useState<boolean>(true);

  const clearSession = () => {
    setDataUser(null);
    localStorage.removeItem("userSession");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const stored = localStorage.getItem("userSession");
        const token = localStorage.getItem("token");

        if (!stored || !token) {
          clearSession();
          return;
        }

        const parsedData: UserSession = JSON.parse(stored);

        if (!parsedData?.token || parsedData.token !== token) {
          clearSession();
          return;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${parsedData.token}`,
          },
        });

        if (!res.ok) {
          clearSession();
          return;
        }

        const user = await res.json();

        const updatedSession: UserSession = {
          ...parsedData,
          login: true,
          token: parsedData.token,
          user: {
            ...parsedData.user,
            ...user,
          },
        };

        setDataUser(updatedSession);
        localStorage.setItem("userSession", JSON.stringify(updatedSession));
        localStorage.setItem("token", parsedData.token);
      } catch (error) {
        clearSession();
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (dataUser?.token) {
        localStorage.setItem("userSession", JSON.stringify(dataUser));
        localStorage.setItem("token", dataUser.token);
      } else {
        localStorage.removeItem("userSession");
        localStorage.removeItem("token");
      }
    }
  }, [dataUser, isLoading]);

  const logOut = () => {
    clearSession();
  };

  const updateProfileImg = (img: string) => {
    setDataUser((prev) => {
      if (!prev) return prev;

      const updatedUser = {
        ...prev,
        user: {
          ...prev.user,
          profileImg: img,
        },
      };

      localStorage.setItem("userSession", JSON.stringify(updatedUser));
      localStorage.setItem("token", updatedUser.token);
      return updatedUser;
    });
  };

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