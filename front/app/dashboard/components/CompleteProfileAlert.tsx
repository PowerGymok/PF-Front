"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";

const CompleteProfileAlert = () => {
  const router = useRouter();
  const { dataUser } = useAuth();

  // Si no hay usuario o ya completó perfil → no mostrar nada
  if (!dataUser || dataUser.user.isProfileComplete) return null;

  return (
    <div className="w-full bg-yellow-100 border border-yellow-400 text-yellow-800 px-6 py-4 rounded-lg flex justify-between items-center mb-6">

      <div>
        <p className="font-semibold">
          ⚠️ Tu perfil está incompleto
        </p>
        <p className="text-sm">
          Necesitamos que completes tu información personal.
        </p>
      </div>

      <button
        onClick={() => router.push("/complete-profile")}
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition"
      >
        Completar perfil
      </button>

    </div>
  );
};

export default CompleteProfileAlert;