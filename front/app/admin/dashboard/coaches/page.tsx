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

  if (isLoading) return <p>Cargando...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <AdminCoachManage />
    </div>
  );
};

export default CoachManagePage;
