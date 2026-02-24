"use client";

import { useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { MembershipType } from "../types/payment.types";

interface Props {
  planId: MembershipType;
}

export function PaymentButton({ planId }: Props) {
  const { dataUser, isLoading } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    if (!dataUser) {
      setError("Debes iniciar sesión.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // asumimos que el token está dentro de dataUser
      const token = dataUser.token;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payments/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ planId }),
        },
      );

      if (!response.ok) {
        throw new Error("No se pudo iniciar el pago.");
      }

      const data = await response.json();

      window.location.href = data.url;
    } catch (err: any) {
      setError(err.message || "Error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return null;

  return (
    <div className="space-y-3">
      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full py-3 rounded-full border border-white font-semibold
                   hover:bg-white hover:text-black transition-all duration-300
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Procesando..." : "Pagar ahora"}
      </button>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    </div>
  );
}
