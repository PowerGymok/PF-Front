"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardCoachComponent from "@/app/dashboard/components/DashboardCoachComponent";

const CoachDashboardPage = () => {
  const { dataUser, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!dataUser) {
        router.replace("/");
      } else if (dataUser.user.role !== "Coach") {
        router.replace("/dashboard");
      }
    }
  }, [dataUser, isLoading, router]);

  if (isLoading || !dataUser) return null;

  return <DashboardCoachComponent />;
};

export default CoachDashboardPage;