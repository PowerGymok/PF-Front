"use client";

export const dynamic = "force-dynamic";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import { UserSession } from "@/interface/UserSession";

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setDataUser } = useAuth();

  const token = searchParams.get("token");

  useEffect(() => {
    let cancelled = false;

    const clearAndRedirect = () => {
      if (cancelled) return;
      localStorage.removeItem("userSession");
      localStorage.removeItem("token");
      router.replace("/login");
    };

    const wait = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    const fetchMeWithRetry = async (apiUrl: string, authToken: string) => {
      let lastResponse: Response | null = null;

      for (let attempt = 0; attempt < 3; attempt++) {
        const res = await fetch(`${apiUrl}/auth/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          cache: "no-store",
        });

        if (res.ok) return res;

        lastResponse = res;

        // pequeño retry por si Render/backend está despertando
        if (attempt < 2) {
          await wait(700);
        }
      }

      return lastResponse;
    };

    const getUser = async () => {
      try {
        // No redirigir instantáneamente:
        // en algunos renders iniciales token puede venir null y luego aparecer.
        if (!token) {
          await wait(1200);

          if (cancelled) return;

          const lateToken = searchParams.get("token");
          if (!lateToken) {
            clearAndRedirect();
            return;
          }

          const apiUrl = process.env.NEXT_PUBLIC_API_URL;

          if (!apiUrl) {
            console.error("NEXT_PUBLIC_API_URL no está definida");
            clearAndRedirect();
            return;
          }

          const res = await fetchMeWithRetry(apiUrl, lateToken);

          if (!res || !res.ok) {
            clearAndRedirect();
            return;
          }

          const data = await res.json();

          const session: UserSession = {
            login: true,
            token: lateToken,
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

          if (cancelled) return;

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
          return;
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        if (!apiUrl) {
          console.error("NEXT_PUBLIC_API_URL no está definida");
          clearAndRedirect();
          return;
        }

        const res = await fetchMeWithRetry(apiUrl, token);

        if (!res || !res.ok) {
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

        if (cancelled) return;

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

    return () => {
      cancelled = true;
    };
  }, [router, searchParams, setDataUser, token]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-lg">Iniciando sesión con Google...</p>
    </div>
  );
}