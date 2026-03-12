"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminNewClasesManage from "../components/AdminNewClasesManage";

const NewClasesPage = () => {
  const { dataUser, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!dataUser && !isLoading) router.replace("/");
    if (dataUser && dataUser.user?.role !== "Admin") {
      router.replace("/dashboard");
    }
  }, [dataUser, isLoading, router]);

  if (isLoading) return <p>Cargando...</p>;

  return <AdminNewClasesManage />;
};

export default NewClasesPage;