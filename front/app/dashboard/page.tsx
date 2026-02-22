"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


const Dashboard = () => {
  const { dataUser, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!dataUser) {
        router.replace("/");
        return;
      }

      const role = dataUser.user.role;

      if (role === "admin") {
        router.replace("/admin/dashboard");
      } else if (role === "coach") {
        router.replace("/coach/dashboard");
      } else {
        router.replace("/users/dashboard");
      }
    }
  }, [dataUser, isLoading, router]);

  return null; 
};

export default Dashboard;