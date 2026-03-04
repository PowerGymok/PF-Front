"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setDataUser } = useAuth();

  useEffect(() => {
    const getUser = async () => {
      try {
        // ✅ Leer token desde la URL
        const token = searchParams.get("token");

        if (!token) {
          router.push("/login");
          return;
        }

        localStorage.setItem("token", token);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          router.push("/login");
          return;
        }

        const data = await res.json();

        // 🟢 Actualizamos el contexto
        setDataUser({
          login: true,
          token: token,
          user: {
            id: data.id,
            name: data.name,
            email: data.email,
            role: data.role,
            phone: data.phone,
            orders: data.orders || [],
            isProfileComplete: data.isProfileComplete,
          },
        });

        // 🔴 Redirección según perfil
        if (!data.isProfileComplete) {
          router.push("/complete-profile");
          return;
        }

        // ✅ Siempre ir a /dashboard
        router.push("/dashboard");
      } catch (error) {
        console.error("Error en Google callback:", error);
        router.push("/login");
      }
    };

    getUser();
  }, [router, setDataUser, searchParams]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-lg">Iniciando sesión con Google...</p>
    </div>
  );
}
