"use client";

import { useState } from "react";
import { CheckoutRequest, CheckoutResponse } from "../types/payment.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function useCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkout = async (data: CheckoutRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/payments/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // importante si usan cookies
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Error iniciando el pago");
      }

      const result: CheckoutResponse = await response.json();

      if (!result?.url) {
        throw new Error("Respuesta inválida del servidor");
      }

      // Redirección a Stripe Checkout
      window.location.href = result.url;
    } catch (err) {
      console.error("Checkout error:", err);
      setError("No se pudo iniciar el proceso de pago.");
    } finally {
      setLoading(false);
    }
  };

  return {
    checkout,
    loading,
    error,
  };
}
