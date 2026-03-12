"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { GetAdminTokenPackages } from "@/features/token-packages/services/tokenPackageService";
import { TokenPackageAdminResponse } from "@/features/token-packages/validators/Tokenpackageschema";
import TokenPackageAdminCard from "@/features/token-packages/components/TokenPackageAdminCard";
import TokenPackageToolbar from "@/features/token-packages/components/TokenPackageToolbar";

export default function AdminTokenPackagesPage() {
  const { dataUser } = useAuth();
  const [packages, setPackages] = useState<TokenPackageAdminResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showInactive, setShowInactive] = useState(false);

  useEffect(() => {
    const token = dataUser?.token;
    if (!token) return;

    GetAdminTokenPackages(token)
      .then((data) => setPackages(data))
      .catch((err) => setError(err.message ?? "Error al cargar paquetes"))
      .finally(() => setLoading(false));
  }, [dataUser?.token]);

  const handleDeleted = (id: string) => {
    setPackages((prev) => prev.filter((p) => p.id !== id));
  };

  const handleRestored = (id: string) => {
    setPackages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: true } : p)),
    );
  };

  const inactiveCount = packages.filter((p) => !p.isActive).length;
  const visiblePackages = showInactive
    ? packages
    : packages.filter((p) => p.isActive);

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      {/* Header + Toolbar */}
      <div className="max-w-5xl mx-auto flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-white">
            Paquetes de tokens
          </h1>
          <div className="mt-1.5 h-0.5 w-12 bg-red-500" />
        </div>
        <div className="flex items-center gap-3">
          {inactiveCount > 0 && (
            <button
              onClick={() => setShowInactive((prev) => !prev)}
              className={`px-4 py-2 rounded-xl border text-sm font-semibold transition-all whitespace-nowrap ${
                showInactive
                  ? "border-emerald-500 text-emerald-400 bg-emerald-500/10"
                  : "border-white/20 text-white/50 hover:border-white/40 hover:text-white/80"
              }`}
            >
              {showInactive
                ? "Ocultar inactivos"
                : `Ver inactivos (${inactiveCount})`}
            </button>
          )}
          <TokenPackageToolbar />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto">
        {loading && (
          <p className="text-white/40 text-sm text-center py-16">
            Cargando paquetes...
          </p>
        )}
        {!loading && error && (
          <p className="text-red-400 text-sm text-center py-16">{error}</p>
        )}
        {!loading && !error && visiblePackages.length === 0 && (
          <p className="text-white/40 text-sm text-center py-16">
            No hay paquetes creados aún.
          </p>
        )}
        {!loading && !error && visiblePackages.length > 0 && (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {visiblePackages.map((pkg) => (
              <TokenPackageAdminCard
                key={pkg.id}
                tokenPackage={pkg}
                onDeleted={handleDeleted}
                onRestored={handleRestored}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
