"use client";

import { useRouter } from "next/navigation";

export default function CancelPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white px-6">
      <div className="bg-zinc-900 p-8 rounded-2xl border border-white/10 text-center space-y-6 max-w-md w-full">
        <h1 className="text-2xl font-semibold">Pago cancelado</h1>

        <p className="text-white/70 text-sm">No se realizó ningún cargo.</p>

        <div className="space-y-3">
          <button
            onClick={() => router.push("/memberships")}
            className="w-full py-3 rounded-full border border-white font-semibold
                       hover:bg-white hover:text-black transition-all duration-300"
          >
            Volver a membresías
          </button>

          <button
            onClick={() => router.push("/dashboard")}
            className="w-full py-3 rounded-full border border-white/30 font-semibold
                       hover:bg-white/10 transition-all duration-300"
          >
            Ir al dashboard
          </button>
        </div>
      </div>
    </main>
  );
}
