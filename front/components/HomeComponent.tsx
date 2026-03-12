"use client";

import Image from "next/image";
import Link from "next/link";
import ButtonComponent from "./ButtonComponent";
import { useEffect, useState } from "react";
import { getPublicCoaches } from "@/services/user.services";

interface CoachPublic {
  name: string;
  profileImg: string | null;
}

const classesMock = [
  {
    id: 1,
    title: "MINDFULNESS",
    description:
      "Entrenamiento enfocado en la conexión mente-cuerpo. A través de técnicas de respiración, conciencia corporal y control mental, esta sesión te ayuda a reducir el estrés, mejorar tu concentración y optimizar tu rendimiento físico desde la estabilidad emocional.",
  },
  {
    id: 2,
    title: "YOGA FLOW",
    description:
      "Sesión de entrenamiento inspirada en técnicas de boxeo profesional. Combina golpes, desplazamientos, coordinación y trabajo cardiovascular para mejorar potencia, velocidad y resistencia.",
  },
  {
    id: 3,
    title: "BOX",
    description:
      "Trabajo de movilidad y estabilidad para optimizar rendimiento y prevenir lesiones.",
  },
];

export default function HomeComponent() {
  const [openId, setOpenId] = useState<number | null>(null);
  const [coaches, setCoaches] = useState<CoachPublic[]>([]);

  useEffect(() => {
    const loadCoaches = async () => {
      const data = await getPublicCoaches();
      setCoaches(data);
    };

    loadCoaches();
  }, []);

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="bg-black text-white">
      {/* HERO */}
      <section className="relative w-full h-screen overflow-hidden">
        <Image
          src="/imagen_fondoPowerGym.jpg"
          alt="Imagen de fondo"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 w-full h-full">
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-light tracking-wide">
              TRANSFORMA TU CUERPO
            </h1>
          </div>

          <div className="absolute bottom-14 w-full flex justify-center">
            <Link href="/workouts">
              <ButtonComponent size="large" label="Reserva Ahora" />
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="min-h-screen grid md:grid-cols-2 gap-20 px-6 md:px-20 py-24 bg-black text-white">
        <div className="flex flex-col justify-center max-w-xl">
          <h2 className="text-4xl md:text-5xl font-light mb-8 tracking-wide">
            Quiénes Somos
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed mb-12">
            En PowerGym creemos en la disciplina, la constancia y el crecimiento
            personal. No somos solo un gimnasio, somos una comunidad enfocada en
            el rendimiento físico y mental.
          </p>

          <Link href="/workouts">
            <ButtonComponent size="large" label="Reserva Ahora" />
          </Link>
        </div>

        {/* CLASSES */}
        <div className="flex flex-col justify-center space-y-8">
          {classesMock.map((item) => (
            <div key={item.id} className="border-b border-neutral-800 pb-6">
              <div
                onClick={() => toggle(item.id)}
                className="flex justify-between items-center cursor-pointer group"
              >
                <h3 className="text-xl font-light tracking-wide">
                  {item.title}
                </h3>

                <span className="text-2xl font-light transition-transform duration-300 group-hover:scale-110">
                  {openId === item.id ? "−" : "+"}
                </span>
              </div>

              {openId === item.id && (
                <p className="mt-4 text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* COACHES CAROUSEL */}
      <section className="bg-black text-white py-28 overflow-hidden">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light tracking-wide">
            Nuestra Comunidad
          </h2>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="flex gap-12 animate-scroll whitespace-nowrap">
            {[...coaches, ...coaches].map((coach, index) => (
              <div
                key={index}
                className="min-w-[250px] bg-neutral-900 rounded-xl p-6 flex flex-col items-center"
              >
                <div className="w-40 h-40 mb-6 overflow-hidden rounded-full">
                  <img
                    src={
                      coach.profileImg?.startsWith("http")
                        ? coach.profileImg
                        : "/default-coach.png"
                    }
                    alt={coach.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-lg font-light tracking-wide">
                  {coach.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr />
    </div>
  );
}
