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

  isLoading: false,
  isProfileComplete: true,
  setIsProfileComplete: () => {},
  updateProfileImg: () => {},

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

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isProfileComplete, setIsProfileComplete] = useState<boolean>(true);

  useEffect(() => {
    const loadUser = async () => {
      console.log("1. loadUser corriendo");
      try {
        const stored = localStorage.getItem("userSession");
        console.log("2. stored:", stored ? "tiene datos" : "null");

        if (!stored) {
          setIsLoading(false);
          return;
        }

        const parsedData: UserSession = JSON.parse(stored);
        console.log(
          "3. parsedData.token:",
          parsedData?.token ? "tiene token" : "sin token",
        );

        const res = await fetch("http://localhost:3030/auth/me", {
          headers: {
            Authorization: `Bearer ${parsedData.token}`,
          },
        });

        console.log("4. /auth/me status:", res.status);

        if (!res.ok) {
          console.log("5. /auth/me falló, usando parsedData");
          setDataUser(parsedData);
          return;
        }

        const user = await res.json();
        console.log("6. user de /auth/me:", user);

        const updatedSession: UserSession = {
          ...parsedData,
          user: {
            ...parsedData.user,
            ...user,
          },
        };

        setDataUser(updatedSession);
        localStorage.setItem("userSession", JSON.stringify(updatedSession));
      } catch (error) {
        console.log("7. catch error:", error);
        const stored = localStorage.getItem("userSession");
        if (stored) {
          setDataUser(JSON.parse(stored));
        }
      } finally {
        console.log("8. finally, setIsLoading(false)");
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
        user: {
          ...prev.user,
          profileImg: img,
        },
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
