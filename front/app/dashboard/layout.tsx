"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchWithAuth } from "@/helpers/fetchWithAuth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const checkUser = async () => {

      try {

        await fetchWithAuth(
          "http://localhost:3000/auth/me"
        );

        setLoading(false);

      } catch (error: unknown) {

  if (error instanceof Error) {

    if (error.message === "403") {
      router.push("/complete-profile");
    } else {
      router.push("/login");
    }

  } else {
    router.push("/login");
  }
}
    };

    checkUser();

  }, [router]);

  if (loading) return <p>Verificando usuario...</p>;

  return <>{children}</>;
}

