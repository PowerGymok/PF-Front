"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardAdminComponent from "@/app/dashboard/components/DashboardAdminComponent";

const AdminDashboardPage = () => {
  const { dataUser, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!dataUser) {
        router.replace("/");
      } else if (dataUser.user.role !== "admin") {
        router.replace("/dashboard"); 
      }
    }
  }, [dataUser, isLoading, router]);

  if (isLoading || !dataUser) return null;

  return <DashboardAdminComponent />;
};

export default AdminDashboardPage;