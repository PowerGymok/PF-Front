'use client'

import { UserSession } from "@/interface/UserSession"
import { AuthContextProps } from "@/interface/AuthContextProps"
import { useState, useEffect, useContext, createContext} from "react"



const AuthContext = createContext<AuthContextProps>({
    dataUser: null,
    setDataUser: () => {},
    logOut: () => {},
    userInitial: null,
    isLoading: false,
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [dataUser, setDataUser] = useState<UserSession | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
   

    useEffect(() => {
      try {
        
        
      } catch (error) {
        
      }
    })

     useEffect(() => {
    try {
      const stored = localStorage.getItem("userSession");
      console.log("Cargando desde localStorage:", stored);

      if (stored) {
        const parsedData: UserSession = JSON.parse(stored);
        console.log("Datos parseados:", parsedData);

        if (parsedData && parsedData.user) {
          setDataUser(parsedData);
        }
      }
    } catch (error) {
      console.error("Error loading stored user:", error);
      localStorage.removeItem("userSession");
    } finally {
      setIsLoading(false);
    }
  }, []);

  
  useEffect(() => {
    if (dataUser) {
      localStorage.setItem("userSession", JSON.stringify(dataUser));
      console.log("Guardando en localStorage:", dataUser);
    }
  }, [dataUser]);

  
  const logOut = () => {
    setDataUser(null);
    localStorage.removeItem("userSession");
  };

    const userInitial = dataUser?.user?.email ? dataUser.user.email.charAt(0).toUpperCase() : null;

    return (
        <AuthContext.Provider value={{ dataUser, setDataUser, logOut, userInitial, isLoading}}>
            {children}
        </AuthContext.Provider>
    )


}

export const useAuth = () => useContext(AuthContext);
