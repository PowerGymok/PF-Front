"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

type Status = "loading" | "success" | "error";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const transactionId = searchParams.get("transactionId");
  const plan = searchParams.get("plan");
  // Stripe agrega este param cuando redirige tras 3D Secure
  const paymentIntentClientSecret = searchParams.get(
    "payment_intent_client_secret",
  );

  const [status, setStatus] = useState<Status>(
    // Si ya tenemos transactionId, el pago fue confirmado directamente
    transactionId ? "success" : "loading",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // ── Verifica el estado si venimos de un redirect 3D Secure ───────────────
  useEffect(() => {
    if (!paymentIntentClientSecret || transactionId) return;

    const verifyPayment = async () => {
      try {
        const stripe = await stripePromise;
        if (!stripe) throw new Error("Stripe no disponible");

        const { paymentIntent, error } = await stripe.retrievePaymentIntent(
          paymentIntentClientSecret,
        );

        if (error) throw new Error(error.message);

        if (paymentIntent?.status === "succeeded") {
          setStatus("success");
        } else if (paymentIntent?.status === "processing") {
          setStatus("success");
        } else {
          throw new Error(`Estado inesperado: ${paymentIntent?.status}`);
        }
      } catch (err: any) {
        console.error("[PaymentSuccess] verify:", err);
        setErrorMessage(err.message);
        setStatus("error");
      }
    };

    verifyPayment();
  }, [paymentIntentClientSecret, transactionId]);

  // ── Render: Loading ───────────────────────────────────────────────────────
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-white/60">Verificando tu pago…</p>
        </div>
      </div>
    );
  }

  // ── Render: Error ─────────────────────────────────────────────────────────
  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center space-y-6 max-w-sm">
          <div className="w-20 h-20 rounded-full border-2 border-red-400 flex items-center justify-center mx-auto">
            <svg
              className="w-10 h-10 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold">Pago fallido</h1>
            <p className="text-white/50 text-sm">
              {errorMessage ?? "Hubo un problema procesando tu pago."}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => router.back()}
              className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-all"
            >
              Reintentar
            </button>
            <button
              onClick={() => router.push("/")}
              className="px-8 py-3 border border-white/30 rounded-full text-white/70 hover:border-white hover:text-white transition-all"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Render: Success ───────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-6">
        {/* Ícono */}
        <div className="w-20 h-20 rounded-full border-2 border-green-400 flex items-center justify-center mx-auto">
          <svg
            className="w-10 h-10 text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Texto */}
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold">¡Pago exitoso!</h1>
          <p className="text-white/50">
            Tu membresía{" "}
            <span className="text-white font-semibold capitalize">{plan}</span>{" "}
            ya está activa.
          </p>
        </div>

        {/* ID de transacción */}
        {transactionId && (
          <p className="text-xs text-white/30 font-mono">
            Transacción: {transactionId}
          </p>
        )}

        {/* Acciones */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-all"
          >
            Ir al dashboard
          </button>
          <button
            onClick={() => router.push("/")}
            className="px-8 py-3 border border-white/30 rounded-full text-white/70 hover:border-white hover:text-white transition-all"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </main>
  );
}
