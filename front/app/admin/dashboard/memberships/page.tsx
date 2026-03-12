"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { GetAdminMemberships } from "@/features/memberships/services/membership.service";
import { MembershipAdminResponse } from "@/features/memberships/validators/membershipSchema";
import MembershipAdminCard from "@/features/memberships/pages/GetAllMembership";
import MembershipsToolbar from "@/features/memberships/components/MembershipsToolbar";

export default function AdminMembershipsPage() {
  const { dataUser } = useAuth();
  const [memberships, setMemberships] = useState<MembershipAdminResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = dataUser?.token;
    if (!token) return;

    GetAdminMemberships(token)
      .then((data) => setMemberships(data))
      .catch((err) => setError(err.message ?? "Error al cargar membresías"))
      .finally(() => setLoading(false));
  }, [dataUser?.token]);

  const handleDeleted = (id: string) => {
    setMemberships((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      {/* Header + Toolbar */}
      <div className="max-w-5xl mx-auto flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Membresías</h1>
          <div className="mt-1.5 h-0.5 w-12 bg-red-500" />
        </div>
        <MembershipsToolbar />
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto">
        {loading && (
          <p className="text-white/40 text-sm text-center py-16">
            Cargando membresías...
          </p>
        )}

        {!loading && error && (
          <p className="text-red-400 text-sm text-center py-16">{error}</p>
        )}

        {!loading && !error && memberships.length === 0 && (
          <p className="text-white/40 text-sm text-center py-16">
            No hay membresías creadas aún.
          </p>
        )}

        {!loading && !error && memberships.length > 0 && (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {memberships.map((membership) => (
              <MembershipAdminCard
                key={membership.id}
                membership={membership}
                onDeleted={handleDeleted}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
