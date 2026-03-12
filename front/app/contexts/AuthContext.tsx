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

  useEffect(() => {
    const loadUser = async () => {
      try {
        const stored = localStorage.getItem("userSession");
        if (!stored) {
          setIsLoading(false);
          return;
        }

        const parsedData: UserSession = JSON.parse(stored);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${parsedData.token}`,
          },
        });

        if (!res.ok) {
          setDataUser(parsedData);
          return;
        }

        const user = await res.json();
        const updatedSession: UserSession = {
          ...parsedData,
          user: { ...parsedData.user, ...user },
        };

        setDataUser(updatedSession);
        localStorage.setItem("userSession", JSON.stringify(updatedSession));
      } catch (error) {
        const stored = localStorage.getItem("userSession");
        if (stored) setDataUser(JSON.parse(stored));
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  useEffect(() => {
    if (dataUser && !isLoading) {
      localStorage.setItem("userSession", JSON.stringify(dataUser));
    }
  }, [dataUser, isLoading]);

  const logOut = () => {
    setDataUser(null);
    localStorage.removeItem("userSession");
  };

  const updateProfileImg = (img: string) => {
    setDataUser((prev) => {
      if (!prev) return prev;
      const updatedUser = {
        ...prev,
        user: { ...prev.user, profileImg: img },
      };
      localStorage.setItem("userSession", JSON.stringify(updatedUser));
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
