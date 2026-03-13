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

  const token = searchParams.get("token");

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const clearAndRedirect = () => {
      localStorage.removeItem("userSession");
      localStorage.removeItem("token");
      router.replace("/login");
    };

    const getUser = async () => {
      try {
        if (!token) {
          clearAndRedirect();
          return;
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        if (!apiUrl) {
          console.error("NEXT_PUBLIC_API_URL no está definida");
          clearAndRedirect();
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
          clearAndRedirect();
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
            phone: data.phone ?? "",
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
        clearAndRedirect();
      }
    };

    getUser();
  }, [router, setDataUser, token]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-lg">Iniciando sesión con Google...</p>
    </div>
  );
}