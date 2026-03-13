"use client";

export const dynamic = "force-dynamic";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import { UserSession } from "@/interface/UserSession";

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setDataUser } = useAuth();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const getUser = async () => {
      try {
        const token = searchParams.get("token");

        if (!token) {
          router.replace("/login");
          return;
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        if (!apiUrl) {
          console.error("NEXT_PUBLIC_API_URL no está definida");
          router.replace("/login");
          return;
        }

        const res = await fetch(`${apiUrl}/auth/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        });

        if (!res.ok) {
          localStorage.removeItem("userSession");
          localStorage.removeItem("token");
          router.replace("/login");
          return;
        }

        const data = await res.json();

        const session: UserSession = {
          login: true,
          token,
          user: {
            id: data.id,
            name: data.name,
            email: data.email,
            role: data.role,
            phone: data.phone,
            orders: data.orders ?? [],
            isProfileComplete: data.isProfileComplete ?? true,
            profileImg: data.profileImg ?? null,
          },
        };

        setDataUser(session);

        if (data.role === "Admin") {
          router.replace("/admin/dashboard");
          return;
        }

        if (data.role === "Coach") {
          router.replace("/coach/dashboard");
          return;
        }

        router.replace("/dashboard");
      } catch (error) {
        console.error("Error en Google callback:", error);
        localStorage.removeItem("userSession");
        localStorage.removeItem("token");
        router.replace("/login");
      }
    };

    getUser();
  }, [router, searchParams, setDataUser]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-lg">Iniciando sesión con Google...</p>
    </div>
  );
}