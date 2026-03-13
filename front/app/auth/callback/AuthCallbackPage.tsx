"use client";

export const dynamic = "force-dynamic";

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
        const token = searchParams.get("token");

        if (!token) {
          router.push("/login");
          return;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          localStorage.removeItem("userSession");
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }

        const data = await res.json();

        const session = {
          login: true,
          token,
          user: {
            id: data.id,
            name: data.name,
            email: data.email,
            role: data.role,
            phone: data.phone,
            orders: data.orders || [],
            isProfileComplete: data.isProfileComplete,
            profileImg: data.profileImg,
          },
        };

        localStorage.setItem("token", token);
        localStorage.setItem("userSession", JSON.stringify(session));
        setDataUser(session);

        router.push("/dashboard");
      } catch (error) {
        console.error("Error en Google callback:", error);
        localStorage.removeItem("userSession");
        localStorage.removeItem("token");
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