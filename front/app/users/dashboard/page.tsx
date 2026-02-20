"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardUsersComponent from "@/app/dashboard/components/DashboardUsersComponent";

const UserDashboardPage = () => {
  const { dataUser, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!dataUser) {
        router.replace("/");
      } else if (dataUser.user.role !== "user") {
        router.replace("/dashboard");
      }
    }
  }, [dataUser, isLoading, router]);

  if (isLoading || !dataUser) return null;

  return <DashboardUsersComponent />;
};

export default UserDashboardPage;