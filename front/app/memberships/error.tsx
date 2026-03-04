"use client";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function MembershipsError({ error, reset }: ErrorProps) {
  return (
    <main className="flex flex-col items-center justify-center min-h-[400px] gap-4 text-white px-6">
      <p className="text-white/50 text-sm">
        No pudimos cargar los planes EL BACK ESTA APAGADO
      </p>
      <button
        onClick={reset}
        className="px-6 py-2 border border-white/20 rounded-full text-sm hover:bg-white/10 transition"
      >
        Reintentar
      </button>
    </main>
  );
}
