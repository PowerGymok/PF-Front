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
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [dataUser, setDataUser] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileComplete, setIsProfileComplete] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("userSession");

    if (stored) {
      const parsed = JSON.parse(stored);
      setDataUser(parsed);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (dataUser) {
      localStorage.setItem("userSession", JSON.stringify(dataUser));
    }
  }, [dataUser]);

  const logOut = () => {
    setDataUser(null);
    localStorage.removeItem("userSession");
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);