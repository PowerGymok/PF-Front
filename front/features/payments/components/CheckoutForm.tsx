"use client";

import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

interface CheckoutFormProps {
  transactionId: string;
  onSuccess: (transactionId: string) => void;
  onError?: (message: string) => void;
}

export function CheckoutForm({
  transactionId,
  onSuccess,
  onError,
}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);
    setErrorMessage(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Stripe redirige aquí si el banco requiere autenticación 3D Secure
        return_url: `${window.location.origin}/payment/success?transactionId=${transactionId}`,
      },
      // Si no hay redirección (mayoría de tarjetas de prueba), resolvemos aquí
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message ?? "Error al procesar el pago");
      onError?.(error.message ?? "Error al procesar el pago");
    } else if (paymentIntent?.status === "succeeded") {
      onSuccess(transactionId);
    } else {
      setErrorMessage(
        "El pago está siendo procesado. Te notificaremos pronto.",
      );
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Stripe renderiza aquí el campo de tarjeta */}
      <PaymentElement
        options={{ layout: "tabs", paymentMethodOrder: ["card"] }}
      />

      {errorMessage && (
        <p className="text-red-400 text-sm text-center" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={!stripe || !elements || isLoading}
        className="w-full py-3 rounded-full border border-white font-semibold hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Procesando…" : "Confirmar pago"}
      </button>
    </form>
  );
}
