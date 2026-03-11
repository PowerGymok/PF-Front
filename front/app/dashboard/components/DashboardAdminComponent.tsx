"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAllCoaches, GetAllUsers } from "@/services/user.services";
import { AllUsers } from "@/interface/AllUsers";
import { CoachInterface } from "@/interface/Coach";
import { getClassHistory } from "../../../services/clases.services";
import { AdminClass } from "../../../interface/AdminClassInterface";

const DashboardAdminPage = () => {
  const { isLoading, dataUser, logOut } = useAuth();
  const router = useRouter();

  const [coaches, setCoaches] = useState<CoachInterface[]>([]);
  const [users, setUsers] = useState<AllUsers[]>([]);
  const [classes, setClasses] = useState<AdminClass[]>([]);

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
        console.log("Coaches:", c);

        setUsers(u);
        setCoaches(c);
      } catch (e: unknown) {
        if (e instanceof Error) console.error(e.message);
      }
    };

    fetch();
  }, [dataUser]);

  useEffect(() => {
    const fetchClasses = async () => {
      if (!dataUser?.token) return;

      try {
        const data = await getClassHistory(dataUser.token);
        setClasses(data);
      } catch (error) {
        console.error("Error cargando clases", error);
      }
    };

    fetchClasses();
  }, [dataUser]);

  const handleLogout = () => {
    logOut();
    router.push("/");
  };

  if (isLoading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-gray-400">
        Cargando...
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-20 py-20 max-w-7xl mx-auto">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-light tracking-wide">
          Dashboard Admin
        </h1>

        <p className="text-gray-500 mt-3">
          Bienvenido, {dataUser?.user?.email}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-xl">
          <h2 className="text-sm text-gray-500 mb-2">Coaches Activos</h2>
          <p className="text-3xl font-light">{coaches.length}</p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-xl">
          <h2 className="text-sm text-gray-500 mb-2">Usuarios Registrados</h2>
          <p className="text-3xl font-light">{users.length}</p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-xl">
          <h2 className="text-sm text-gray-500 mb-2">Clases este mes</h2>
          <p className="text-3xl font-light">{classes.length}</p>
          <Link
            href="/admin/dashboard/clases"
            className="text-sm text-gray-400 mt-4 inline-block relative transition-all duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:text-gray-300"
          >
            Ver clases
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
        <Link
          href="/admin/dashboard/users"
          className="bg-neutral-900 border border-neutral-800 p-8 rounded-xl hover:border-neutral-600 transition"
        >
          <h3 className="text-lg font-light tracking-wide mb-2">
            Gestionar Usuarios
          </h3>
          <p className="text-gray-500 leading-relaxed">
            Promover, buscar y administrar usuarios.
          </p>
        </Link>

        <Link
          href="/admin/dashboard/coaches"
          className="bg-neutral-900 border border-neutral-800 p-8 rounded-xl hover:border-neutral-600 transition"
        >
          <h3 className="text-lg font-light tracking-wide mb-2">
            Gestionar Coaches
          </h3>
          <p className="text-gray-500 leading-relaxed">
            Administrar coaches registrados.
          </p>
        </Link>

        <Link
          href="/admin/dashboard/memberships"
          className="bg-neutral-900 border border-neutral-800 p-8 rounded-xl hover:border-neutral-600 transition"
        >
          <h3 className="text-lg font-light tracking-wide mb-2">
            Gestionar Membresías
          </h3>
          <p className="text-gray-500 leading-relaxed">
            Crear y editar planes de membresía.
          </p>
        </Link>

        <Link
          href="/admin/dashboard/token-packages"
          className="bg-neutral-900 border border-neutral-800 p-8 rounded-xl hover:border-neutral-600 transition"
        >
          <h3 className="text-lg font-light tracking-wide mb-2">
            Gestionar Paquetes De Tokens.
          </h3>
          <p className="text-gray-500 leading-relaxed">
            Crear y editar planes de tokens.
          </p>
        </Link>

        <Link
          href="/workouts"
          className="bg-neutral-900 border border-neutral-800 p-8 rounded-xl hover:border-neutral-600 transition"
        >
          <h3 className="text-lg font-light tracking-wide mb-2">
            Crear Nueva Clase De Catalogo
          </h3>
          <p className="text-gray-500 leading-relaxed">
            Crear/editar o eliminar clases del catalogo.
          </p>
        </Link>

        <Link
          href="/booking"
          className="bg-neutral-900 border border-neutral-800 p-8 rounded-xl hover:border-neutral-600 transition"
        >
          <h3 className="text-lg font-light tracking-wide mb-2">
            Crear Nueva Clase
          </h3>
          <p className="text-gray-500 leading-relaxed">
            Agregar nuevas clases al sistema.
          </p>
        </Link>
      </div>

      <div className="mt-24">
        <button
          onClick={handleLogout}
          className="cursor-pointer text-white relative transition-all duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:text-gray-300"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default DashboardAdminPage;
