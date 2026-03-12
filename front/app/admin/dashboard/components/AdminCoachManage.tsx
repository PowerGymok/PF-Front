"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CoachInterface } from "@/interface/Coach";
import { getAllCoaches } from "@/services/user.services";

const AdminCoachManage = () => {
  const { dataUser } = useAuth();
  const router = useRouter();

  const [coaches, setCoaches] = useState<CoachInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoaches = async () => {
      if (!dataUser?.token) return;

      try {
        const data = await getAllCoaches(dataUser.token, 100);
        setCoaches(data as CoachInterface[]);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoaches();
  }, [dataUser]);

  const filteredCoaches = useMemo(() => {
    return coaches.filter((c) => {
      const res = search.toLowerCase();
      return (
        c.name.toLowerCase().includes(res) ||
        c.email.toLowerCase().includes(res)
      );
    });
  }, [coaches, search]);

  if (isLoading)
    return (
      <div className="text-center text-gray-400 mt-20">
        Cargando coaches...
      </div>
    );

  return (
    <div className="bg-black text-white px-6 md:px-20 py-20">

     
      <div className="flex justify-between items-center mb-12">
        <div>
          <h2 className="text-4xl font-light tracking-wide">
            Gestión de Coaches
          </h2>
          
        </div>

        <button
          onClick={() => router.push("/admin/dashboard")}
          className="border border-neutral-700 px-6 py-2 rounded-lg hover:bg-neutral-800 transition cursor-pointer"
        >
          Dashboard
        </button>
      </div>

   
      <input
        type="text"
        placeholder="Buscar por nombre o email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-neutral-900 border border-neutral-800 px-4 py-3 rounded-lg mb-10 placeholder-gray-500 focus:outline-none focus:border-neutral-600"
      />

      {filteredCoaches.length === 0 ? (
        <p className="text-gray-500">No se encontraron coaches.</p>
      ) : (
        <div className="space-y-4">

          {filteredCoaches.map((coach) => {
            const isBusy = actionLoadingId === coach.id;
            const active = coach.isActive ?? true;

            return (
              <div
                key={coach.id}
                className="border border-neutral-800 bg-neutral-900 p-6 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:border-neutral-600 transition"
              >
                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center text-white font-light">
                    {coach.name?.slice(0, 1)?.toUpperCase() ?? "C"}
                  </div>

                  <div>
                    <p className="font-light tracking-wide text-lg">
                      {coach.name}
                    </p>

                    <p className="text-gray-500 text-sm">
                      {coach.email}
                    </p>

                    <div className="mt-2">
                      <span
                        className={`text-xs px-3 py-1 rounded-full ${
                          active
                            ? "bg-green-900 text-green-400"
                            : "bg-red-900 text-red-400"
                        }`}
                      >
                        {active ? "Activo" : "Inactivo"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

export default AdminCoachManage;