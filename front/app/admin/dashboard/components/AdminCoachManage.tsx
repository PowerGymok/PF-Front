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

  const handleDeactivate = async (coachId: string) => {
    if (!dataUser?.token) return;

    try {
      setActionLoadingId(coachId);

      setCoaches((prev) =>
        prev.map((c) => (c.id === coachId ? { ...c, isActive: false } : c)),
      );
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDemoteToUser = async (coachId: string) => {
    if (!dataUser?.token) return;

    try {
      setActionLoadingId(coachId);

      setCoaches((prev) => prev.filter((c) => c.id !== coachId));
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setActionLoadingId(null);
    }
  };

  if (isLoading) return <p>Cargando coaches...</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Gestión de Coaches
          </h2>
          <p className="text-gray-500 mt-1">
            Administra coaches activos y sus permisos.
          </p>
        </div>

        <button
          onClick={() => router.push("/admin/dashboard")}
          className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-50 transition cursor-pointer"
        >
          Volver al Dashboard
        </button>
      </div>

      <input
        type="text"
        placeholder="Buscar por nombre o email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-5 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {filteredCoaches.length === 0 ? (
        <p className="text-gray-500">No se encontraron coaches.</p>
      ) : (
        <div className="space-y-3">
          {filteredCoaches.map((coach) => {
            const isBusy = actionLoadingId === coach.id;
            const active = coach.isActive ?? true;

            return (
              <div
                key={coach.id}
                className="p-4 border rounded-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold">
                    {coach.name?.slice(0, 1)?.toUpperCase() ?? "C"}
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800">{coach.name}</p>
                    <p className="text-sm text-gray-500">{coach.email}</p>

                    <div className="mt-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {active ? "Activo" : "Inactivo"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    disabled={!active || isBusy}
                    onClick={() => handleDeactivate(coach.id)}
                    className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Dar de baja
                  </button>

                  <button
                    disabled={isBusy}
                    onClick={() => handleDemoteToUser(coach.id)}
                    className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Convertir a Usuario
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <p className="text-xs text-gray-400 mt-6">
        * “Dar de baja” idealmente marca al coach como inactivo (no borra).
        “Convertir a Usuario” cambia rol y puede retirar permisos.
      </p>
    </div>
  );
};

export default AdminCoachManage;
