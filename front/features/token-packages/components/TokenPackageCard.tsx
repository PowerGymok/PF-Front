"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { FeatureItem } from "@/features/memberships/components/FeatureItem";
import { TokenPackageCardProps } from "@/features/token-packages/utils/tokenpackage.mapper";

export function TokenPackageCard({
  id,
  name,
  price,
  description,
  features,
}: TokenPackageCardProps) {
  const router = useRouter();
  const { dataUser, isLoading } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (isLoading) return;

    if (!dataUser?.user) {
      router.push(`/register?package=${id}`);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payments/tokens`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${dataUser.token}`,
          },
          body: JSON.stringify({
            userId: dataUser.user.id,
            packageId: id,
          }),
        },
      );

      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || "Error al iniciar el pago");
      }

      const { clientSecret, transactionId } = await res.json();
      router.push(
        `/payment/checkout?clientSecret=${clientSecret}&transactionId=${transactionId}`,
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group relative flex flex-col justify-between w-full max-w-sm mx-auto border-2 rounded-3xl p-5 text-white bg-black transition-all duration-300 hover:scale-105 hover:shadow-2xl border-white/30 hover:border-red-500">
      {/* Título */}
      <div className="text-center space-y-3">
        <h3 className="text-2xl font-extrabold transition-colors duration-300 group-hover:text-red-500">
          {name}
        </h3>
      </div>

      {/* Features con FeatureItem */}
      <div className="mt-10 flex justify-center">
        <div className="flex gap-10">
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              feature={feature}
              hoverTextStyle="group-hover:text-red-500"
            />
          ))}
        </div>
      </div>

      {/* Descripción */}
      {description && (
        <p className="text-center text-white/60 text-sm mt-4">{description}</p>
      )}

      {/* Precio + Botón */}
      <div className="mt-7 text-center space-y-4">
        <p className="text-3xl font-extrabold transition-colors duration-300 group-hover:text-red-500">
          {price}
        </p>

        <button
          onClick={handleClick}
          disabled={isLoading || loading}
          className="w-full py-3 rounded-full border border-white font-semibold hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading || loading
            ? "Cargando…"
            : dataUser?.user
              ? "¡COMPRAR AHORA!"
              : "¡OBTENER TOKENS!"}
        </button>
      </div>
    </div>
  );
}
