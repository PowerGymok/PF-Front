"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminCoachManage from "@/app/admin/dashboard/components/AdminCoachManage";

const CoachManagePage = () => {
  const { isLoading, dataUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!dataUser && !isLoading) router.replace("/");

    if (dataUser && dataUser.user?.role !== "Admin")
      router.replace("/dashboard");
  }, [dataUser, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-gray-400">
        Cargando...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-20 py-20">

      <AdminCoachManage />

    </div>
  );
};

export default CoachManagePage;