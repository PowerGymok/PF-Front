"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";

export default function CallbackPage() {
  const router = useRouter();
  const { setDataUser } = useAuth();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/auth/google/callback",
          {
            credentials: "include", // 👈 IMPORTANTE para cookies
          }
        );

        if (!res.ok) {
          router.push("/login");
          return;
        }

        const data = await res.json();

        // 🟢 Guardamos token en localStorage
        localStorage.setItem("token", data.accessToken);

        // 🟢 Actualizamos el contexto
        setDataUser({
          login: true,
          token: data.accessToken,
          user: {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role,
            phone: data.user.phone,
            orders: data.user.orders || [],
            isProfileComplete: data.user.isProfileComplete,
          },
        });

        // 🔴 Redirección según perfil
        if (!data.user.isProfileComplete) {
          router.push("/complete-profile");
          return;
        }

        if (data.user.role === "admin") {
          router.push("/admin/dashboard");
        } else if (data.user.role === "coach") {
          router.push("/coach/dashboard");
        } else {
          router.push("/user/dashboard");
        }
      } catch (error) {
        console.error("Error en Google callback:", error);
        router.push("/login");
      }
    };

    getUser();
  }, [router, setDataUser]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-lg">Iniciando sesión con Google...</p>
    </div>
  );
}