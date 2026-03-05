"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAllCoaches, GetAllUsers } from "@/services/user.services";
import { AllUsers } from "@/interface/AllUsers";
import UsersManagePage from "@/app/admin/dashboard/users/page";

const DashboardAdminPage = () => {
  const { isLoading, dataUser, logOut } = useAuth();
  const router = useRouter();
  const [coaches, setCoaches] = useState<any[]>([]);
  const [users, setUsers] = useState<AllUsers[]>([]);

  useEffect(() => {
    if (!dataUser && !isLoading) router.replace("/");
    if (dataUser && dataUser.user?.role !== "Admin")
      router.replace("/dashboard");
  }, [dataUser, isLoading, router]);

  useEffect(() => {
    const fetch = async () => {
      if (!dataUser?.token) return;
      try {
        const u = await GetAllUsers(dataUser.token, 100);
        const c = await getAllCoaches(dataUser.token, 100);
        setUsers(u);
        setCoaches(c);
      } catch (e: any) {
        console.error(e.message);
      }
    };
    fetch();
  }, [dataUser]);

  const handleLogout = () => {
    logOut();
    router.push("/");
  };

  if (isLoading) return <p>Cargando...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard de Admin</h1>
        <p className="text-gray-500 mt-2">
          Bienvenido, {dataUser?.user?.email}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-sm text-gray-500">Coaches Activos</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {coaches.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-sm text-gray-500">Usuarios Registrados</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {users.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-sm text-gray-500">Clases este mes</h2>
          <p className="text-3xl font-bold text-purple-600 mt-2">
            Ejemplo de 36
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/dashboard/users"
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold text-gray-800">
            Gestionar Usuarios
          </h3>
          <p className="text-gray-500 mt-1">
            Promover, buscar y administrar usuarios.
          </p>
        </Link>

        <Link
          href="/admin/dashboard/coaches"
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold text-gray-800">
            Gestionar Coaches
          </h3>
          <p className="text-gray-500 mt-1">Administrar coaches registrados.</p>
        </Link>

        <Link
          href="/admin/dashboard/memberships"
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold text-gray-800">
            Gestionar Membresías
          </h3>
          <p className="text-gray-500 mt-1">
            Crear/editar planes y beneficios.
          </p>
        </Link>
      </div>

      <div className="mt-10">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition cursor-pointer"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default DashboardAdminPage;
