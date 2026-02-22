"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CallbackPage() {

  const router = useRouter();

  useEffect(() => {

    const getUser = async () => {

      const res = await fetch(
        "http://localhost:3000/auth/google/callback",
        {
          credentials: "include", // 👈 MUY IMPORTANTE
        }
      );

      if (!res.ok) {
        router.push("/login");
        return;
      }

      const data = await res.json();

      localStorage.setItem("token", data.accessToken);

      if (!data.user.isProfileComplete) {
        router.push("/complete-profile");
        return;
      }

      if (data.user.role === "admin") {
        router.push("/admin/dashboard");
      }
      else if (data.user.role === "coach") {
        router.push("/coach/dashboard");
      }
      else {
        router.push("/user/dashboard");
      }
    };

    getUser();

  }, [router]);

  return <p>Iniciando sesión...</p>;
}