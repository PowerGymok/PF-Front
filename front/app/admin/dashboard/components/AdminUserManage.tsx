"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GetAllUsers } from "@/services/user.services";
import { AllUsers } from "@/interface/AllUsers";
import { UpdateUserRole } from "@/services/user.services";

const AdminUserManage = () => {
  const { dataUser } = useAuth();
  const router = useRouter();

  const [users, setUsers] = useState<AllUsers[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      if (!dataUser?.token) return;

      try {
        const data = await GetAllUsers(dataUser.token);
        setUsers(data);
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

  const handleChange = async (userId: string) => {
    if (!dataUser?.token) return;

    try {
      await UpdateUserRole(userId, "Coach", dataUser.token);

      const data = await GetAllUsers(dataUser.token);
      setUsers(data);
      router.push("/dashboard");
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const normalUsers = users.filter((u) => u.role === "user");

  const filteredUsers = normalUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  if (isLoading) return <p>Cargando usuarios</p>; // aqui podremos colocar un spinner si lo deseamos

  return (
    <div className="mt-10 bg-white p-6 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">
        Gestión de Usuarios
      </h1>
      <button
        onClick={() => router.push("/admin/dashboard")}
        className="px-4 py-2 mt-4 mb-4 flex rounded-lg border text-gray-700 hover:bg-gray-50 transition cursor-pointer"
      >
        Volver al Dashboard
      </button>

      <input
        type="text"
        placeholder="Buscar por nombre o email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {filteredUsers.length === 0 ? (
        <p className="text-gray-500">No se encontraron usuarios.</p>
      ) : (
        filteredUsers.map((user) => (
          <div
            key={user.id}
            className="p-4 border rounded-lg mb-3 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-gray-700">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <button
              onClick={() => handleChange(user.id)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600c cursor-pointer"
            >
              Hacer Coach
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminUserManage;
