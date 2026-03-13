"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GetAllUsers } from "@/services/user.services";
import { AllUsers } from "@/interface/AllUsers";
import { UpdateUserRole } from "@/services/user.services";
import { ActivateUser, DeactivateUser } from "@/services/user.services";

const AdminUserManage = () => {
  const { dataUser } = useAuth();
  const router = useRouter();

  const [users, setUsers] = useState<AllUsers[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const limit = 10;

  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!dataUser?.token) return;

      try {
        const response = await GetAllUsers(dataUser.token, 1000);
        console.log("Usuarios obtenidos:", response);
        setUsers(response);
      } catch (error: any) {
        if (error.status === 401) {
          router.replace("/");
        } else if (error.status === 403) {
          router.replace("/dashboard");
        } else {
          console.error(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [dataUser, router]);

  const normalUsers = users.filter((u) => u.role !== "Admin");

  const filteredUsers = normalUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredUsers.length / limit);

  const startIndex = (page - 1) * limit;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + limit);

  const handleToggleUserStatus = async (userId: string, isActive: boolean) => {
    if (!dataUser?.token) return;

    try {
      setActionLoadingId(userId);

      if (isActive) {
        await DeactivateUser(userId, dataUser.token);
      } else {
        await ActivateUser(userId, dataUser.token);
      }
    } catch (error) {
      console.error(error);
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, isActive: !u.isActive } : u)),
      );
    } finally {
      setActionLoadingId(null);
    }
  };

  const handlePromoteToCoach = async (userId: string) => {
    if (!dataUser?.token) return;

    try {
      setActionLoadingId(userId);

      await UpdateUserRole(userId, "Coach", dataUser.token);
      alert("Usuario ascendido a Coach exitosamente.");

      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: "Coach" } : u)),
      );
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoadingId(null);
    }
  };

  if (isLoading)
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Cargando usuarios...</p>
      </div>
    );

  return (
    <div className="bg-black text-white min-h-screen px-6 md:px-20 py-16">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-10">
        <h1 className="text-3xl md:text-4xl font-light tracking-wide">
          Gestión de Usuarios
        </h1>

        <button
          onClick={() => router.push("/dashboard")}
          className="text-white relative transition-all duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white 
          after:transition-all after:duration-300 hover:text-gray-300 cursor-pointer"
        >
          Volver al dashboard
        </button>
      </div>

      <input
        type="text"
        placeholder="Buscar por nombre o email"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 mb-10 text-white placeholder-gray-500 focus:outline-none focus:border-white transition"
      />

      <p className="text-gray-500 mb-8">
        Usuarios encontrados: {filteredUsers.length}
      </p>

      <div className="space-y-6">
        {paginatedUsers.length === 0 ? (
          <p className="text-gray-500">No se encontraron usuarios.</p>
        ) : (
          paginatedUsers.map((user) => {
            const isBusy = actionLoadingId === user.id;

            return (
              <div
                key={user.id}
                className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4 hover:border-neutral-600 transition cursor-pointer"
              >
                <div>
                  <p className="text-lg font-light tracking-wide">
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>

                <p
                  className={`text-xs ${
                    user.isActive ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {user.isActive ? "Activo" : "Suspendido"}
                </p>

                {user.role === "user" && (
                  <button
                    disabled={isBusy}
                    onClick={() => handlePromoteToCoach(user.id)}
                    className="text-white relative transition-all duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white 
                    after:transition-all after:duration-300 hover:text-gray-300 cursor-pointer"
                  >
                    {isBusy ? "Procesando..." : "Ascender a Coach"}
                  </button>
                )}
                <button
                  disabled={isBusy}
                  onClick={() => handleToggleUserStatus(user.id, user.isActive)}
                  className="text-red-400 relative transition-all duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-red-400 after:transition-all after:duration-300 hover:text-red-300 cursor-pointer"
                >
                  {isBusy
                    ? "Procesando..."
                    : user.isActive
                      ? "Desactivar Usuario"
                      : "Activar Usuario"}
                </button>
              </div>
            );
          })
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-10 flex-wrap">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="border border-neutral-700 px-4 py-2 rounded hover:bg-neutral-900 disabled:opacity-30 transition cursor-pointer"
          >
            ←
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-5 py-2 rounded border transition cursor-pointer ${
                page === i + 1
                  ? "bg-white text-black border-white"
                  : "border-neutral-700 hover:bg-neutral-900"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="border border-neutral-700 px-4 py-2 rounded hover:bg-neutral-900 disabled:opacity-30 transition cursor-pointer"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminUserManage;
