"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import AdminUserManage from "@/app/admin/dashboard/components/AdminUserManage";

const UsersManagePage = () => {
  const { isLoading, dataUser } = useAuth();
  const router = useRouter();

  if (!isLoading && !dataUser) {
    router.replace("/");
    return null;
  }

  if (!isLoading && dataUser?.user?.role !== "Admin") {
    router.replace("/dashboard");
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-gray-400">
        Cargando...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-20 py-20">

      <AdminUserManage />

    </div>
  );
};

export default UsersManagePage;
