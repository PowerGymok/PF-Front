"use client";

import { useEffect, useState } from "react";
import { getPublicCoaches } from "../../services/user.services";
import { CoachPublic } from "@/services/mockCoaches";
import { useRouter } from "next/navigation";
import { PATHROUTES } from "@/utils/PathRoutes";

const CoachesPage = () => {
  const [coaches, setCoaches] = useState<CoachPublic[]>([]);
  const router = useRouter();
  useEffect(() => {
    const loadCoaches = async () => {
      const data = await getPublicCoaches();

      setCoaches(data);
    };

    loadCoaches();
  }, []);

  const handleChat = (coachId: string) => {
    if (typeof window !== "undefined") {
      router.push(`${PATHROUTES.USERS_CHAT}?coachId=${coachId}`);
    } else {
      console.error("No se puede redirigir en el servidor");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Coaches</h1>

      <div className="grid grid-cols-3 gap-4">
        {coaches.map((coach) => (
          <div key={coach.id} className="border p-4 rounded">
            <img src={coach.image} alt={coach.name} />
            <h2>{coach.name}</h2>
            <button
              className="mt-2 bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
              onClick={() => handleChat(coach.id)}
            >
              Iniciar Chat
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoachesPage;
