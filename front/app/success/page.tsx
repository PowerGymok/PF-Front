"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { dataUser, isLoading } = useAuth();

  const sessionId = searchParams.get("session_id");

  //  Si no está logueado, lo mandamos a login
  useEffect(() => {
    if (!isLoading && !dataUser) {
      router.replace("/login");
    }
  }, [dataUser, isLoading, router]);

  //  Redirigir al dashboard después de unos segundos
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/dashboard");
    }, 4000);

    return () => clearTimeout(timeout);
  }, [router]);

  if (isLoading) return null;

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white px-6">
      <div className="bg-zinc-900 p-8 rounded-2xl border border-white/10 text-center space-y-4 max-w-md w-full">
        <h1 className="text-2xl font-semibold">Pago recibido 🎉</h1>

        <p className="text-white/70 text-sm">
          Estamos procesando tu membresía.
        </p>

        {sessionId && (
          <p className="text-white/40 text-xs break-all">
            ID de sesión: {sessionId}
          </p>
        )}

        <p className="text-white/50 text-xs">
          Serás redirigido automáticamente...
        </p>
      </div>
    </main>
  );
}
