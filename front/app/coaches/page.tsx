"use client";

import { useEffect, useState } from "react";
import { getPublicCoaches, CoachPublic } from "@/services/user.services";

const CoachesPage = () => {
  const [coaches, setCoaches] = useState<CoachPublic[]>([]);

  useEffect(() => {
    const loadCoaches = async () => {
      const data = await getPublicCoaches();
      setCoaches(data);
    };

    loadCoaches();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="text-center py-20 px-6">
        <h1 className="text-5xl font-bold mb-6">Nuestros Coaches</h1>

        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Entrena con profesionales certificados que te ayudarán a alcanzar tu
          máximo rendimiento.
        </p>
      </section>

      {/* GRID COACHES */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {coaches.map((coach, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl bg-zinc-900 hover:bg-zinc-800 transition-all duration-300"
            >
              {/* IMAGE */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={
                    coach.profileImg ||
                    "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"
                  }
                  alt={coach.name}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* INFO */}
              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold tracking-wide">
                  {coach.name}
                </h2>

                <p className="text-sm text-gray-400">PowerGym Coach</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CoachesPage;
