"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import DashboardAdminComponent from "./components/DashboardAdminComponent";
import DashboardCoachComponent from "./components/DashboardCoachComponent";
import DashboardUsersComponent from "./components/DashboardUsersComponent";

const Dashboard = () => {
  const { dataUser, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !dataUser) {
      router.replace("/");
    }
  }, [dataUser, isLoading, router]);

  if (isLoading || !dataUser) return null;

  // 👇 Normalizamos el role para evitar problemas
  const role = dataUser.user.role.toLowerCase();

  if (role === "admin") return <DashboardAdminComponent />;
  if (role === "coach") return <DashboardCoachComponent />;
  return <DashboardUsersComponent />;
};

export default Dashboard;