"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminUserManage from "@/app/admin/dashboard/components/AdminUserManage";

const UsersManagePage = () => {
  const { isLoading, dataUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!dataUser && !isLoading) router.replace("/");

    if (dataUser && dataUser.user?.role !== "Admin")
      router.replace("/dashboard");
  }, [dataUser, isLoading, router]);

  if (isLoading) return <p>Cargando.</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Gestión de Usuarios
        </h1>
        <p className="text-gray-500 mt-2">Administra usuarios registrados.</p>
      </div>

      <AdminUserManage />
    </div>
  );
};

export default UsersManagePage;
