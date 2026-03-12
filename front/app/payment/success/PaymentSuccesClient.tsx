"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "@/app/contexts/AuthContext";

// ─── Types ───────────────────────────────────────────────────────────────────

type PaymentStatus = "verifying" | "success" | "error";
type PaymentFlow = "membership" | "tokens" | "unknown";

interface SuccessState {
  status: PaymentStatus;
  flow: PaymentFlow;
  message: string;
  detail?: string;
  amount?: string;
  transactionId?: string;
}

// ─── Stripe init ─────────────────────────────────────────────────────────────

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

// ─── Helper ──────────────────────────────────────────────────────────────────

function detectFlow(params: URLSearchParams): PaymentFlow {
  // Flujo membresías: tiene ?plan=
  if (params.get("plan")) return "membership";
  // Flujo tokens: tiene ?packageId= (nunca lo tiene membresías)
  if (params.get("packageId")) return "tokens";
  // Redirect 3DS: leer sessionStorage
  if (typeof window !== "undefined") {
    const stored = sessionStorage.getItem("paymentFlow");
    if (stored === "membership" || stored === "tokens") return stored;
  }
  return "unknown";
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [state, setState] = useState<SuccessState>({
    status: "verifying",
    flow: "unknown",
    message: "Verificando tu pago…",
  });

  const [dots, setDots] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const hasRun = useRef(false);

  // Animated dots while verifying
  useEffect(() => {
    if (state.status !== "verifying") return;
    const iv = setInterval(() => setDots((d) => (d + 1) % 4), 400);
    return () => clearInterval(iv);
  }, [state.status]);

  // Reveal animation after status resolves
  useEffect(() => {
    if (state.status !== "verifying") {
      setTimeout(() => setShowContent(true), 80);
    }
  }, [state.status]);

  // ── Main verification logic ────────────────────────────────────────────────
  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const verify = async () => {
      const clientSecret =
        searchParams.get("payment_intent_client_secret") || // 3DS redirect
        searchParams.get("clientSecret"); // direct flow

      const transactionId =
        searchParams.get("transactionId") ||
        sessionStorage.getItem("transactionId") ||
        undefined;

      const flow = detectFlow(searchParams);

      // ── Sin clientSecret no podemos verificar ────────────────────────────
      if (!clientSecret) {
        setState({
          status: "error",
          flow,
          message: "Información de pago no encontrada",
          detail:
            "No se recibió confirmación del proveedor de pagos. Por favor verifica tu historial.",
        });
        return;
      }

      try {
        const stripe = await stripePromise;
        if (!stripe) throw new Error("Stripe no pudo inicializarse");

        const { paymentIntent, error } =
          await stripe.retrievePaymentIntent(clientSecret);

        if (error) throw new Error(error.message);

        const intentStatus = paymentIntent?.status ?? null;
        let amountReceived: string | undefined;

        if (paymentIntent?.amount) {
          amountReceived = (paymentIntent.amount / 100).toLocaleString(
            "es-MX",
            { style: "currency", currency: "MXN" },
          );
        }

        // ── Evaluar resultado ────────────────────────────────────────────────
        if (
          intentStatus === "succeeded" ||
          intentStatus === "processing" ||
          searchParams.get("redirect_status") === "succeeded"
        ) {
          sessionStorage.removeItem("paymentFlow");
          sessionStorage.removeItem("transactionId");

          const flowLabel =
            flow === "membership"
              ? "Tu membresía ha sido activada"
              : flow === "tokens"
                ? "Tus tokens han sido acreditados"
                : "Tu pago fue procesado correctamente";

          setState({
            status: "success",
            flow,
            message: flowLabel,
            detail:
              intentStatus === "processing"
                ? "El pago está siendo procesado. Recibirás una confirmación por correo."
                : "¡Todo listo! Ya puedes disfrutar de tus beneficios.",
            amount: amountReceived,
            transactionId,
          });
        } else if (
          intentStatus === "requires_action" ||
          searchParams.get("redirect_status") === "requires_action"
        ) {
          setState({
            status: "error",
            flow,
            message: "Se requiere acción adicional",
            detail:
              "Tu banco solicita una verificación adicional. Por favor intenta de nuevo.",
          });
        } else {
          setState({
            status: "error",
            flow,
            message: "El pago no pudo completarse",
            detail: `Estado: ${intentStatus ?? "desconocido"}. Por favor intenta de nuevo o contacta soporte.`,
          });
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Error inesperado";
        setState({
          status: "error",
          flow,
          message: "Ocurrió un error al verificar el pago",
          detail: message,
        });
      }
    };

    verify();
  }, [searchParams]);

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <main className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 overflow-hidden">
      {/* Background glow */}
      <div
        className="pointer-events-none fixed inset-0"
        aria-hidden="true"
        style={{
          background:
            state.status === "success"
              ? "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(34,197,94,0.12) 0%, transparent 70%)"
              : state.status === "error"
                ? "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(239,68,68,0.12) 0%, transparent 70%)"
                : "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(99,102,241,0.1) 0%, transparent 70%)",
          transition: "background 0.8s ease",
        }}
      />

      <div
        className="relative z-10 w-full max-w-md"
        style={{
          opacity: state.status === "verifying" ? 1 : showContent ? 1 : 0,
          transform:
            state.status === "verifying"
              ? "none"
              : showContent
                ? "translateY(0)"
                : "translateY(16px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        {/* Card */}
        <div
          className="rounded-2xl border bg-[#111118] p-8 text-center shadow-2xl"
          style={{
            borderColor:
              state.status === "success"
                ? "rgba(34,197,94,0.25)"
                : state.status === "error"
                  ? "rgba(239,68,68,0.25)"
                  : "rgba(255,255,255,0.07)",
          }}
        >
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            {state.status === "verifying" && <PulsingOrb />}
            {state.status === "success" && <SuccessIcon />}
            {state.status === "error" && <ErrorIcon />}
          </div>

          {/* Title */}
          <h1
            className="text-2xl font-bold tracking-tight mb-2"
            style={{
              color:
                state.status === "success"
                  ? "#4ade80"
                  : state.status === "error"
                    ? "#f87171"
                    : "#e2e8f0",
              fontFamily: "'DM Serif Display', Georgia, serif",
            }}
          >
            {state.status === "verifying"
              ? `Verificando${".".repeat(dots)}`
              : state.message}
          </h1>

          {/* Detail */}
          {state.detail && (
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">
              {state.detail}
            </p>
          )}

          {/* Amount badge */}
          {state.amount && state.status === "success" && (
            <div className="inline-block mt-4 px-4 py-1.5 rounded-full text-sm font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {state.amount} pagados
            </div>
          )}

          {/* Transaction ID */}
          {state.transactionId && state.status === "success" && (
            <p className="mt-2 text-xs text-slate-600 font-mono">
              Ref: {state.transactionId}
            </p>
          )}

          {/* Flow badge */}
          {state.status === "success" && state.flow !== "unknown" && (
            <div className="mt-3 flex justify-center gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-white/5 text-slate-400 border border-white/10">
                {state.flow === "membership" ? "🏅 Membresía" : "🪙 Tokens"}
              </span>
            </div>
          )}

          {/* Divider */}
          {state.status !== "verifying" && (
            <div className="my-6 border-t border-white/5" />
          )}

          {/* Actions */}
          {state.status === "success" && (
            <div className="flex flex-col gap-3">
              <ActionButton
                onClick={() => router.push("/dashboard")}
                primary
                label="Ir al dashboard →"
              />
              {state.flow === "membership" && (
                <ActionButton
                  onClick={() => router.push("/memberships")}
                  label="Ver mi membresía"
                />
              )}
              {state.flow === "tokens" && (
                <ActionButton
                  onClick={() => router.push("/users/dashboard/tokens")}
                  label="Ver mis tokens"
                />
              )}
            </div>
          )}

          {state.status === "error" && (
            <div className="flex flex-col gap-3">
              <ActionButton
                onClick={() => router.back()}
                primary
                label="← Volver e intentar de nuevo"
              />
              <ActionButton
                onClick={() => router.push("/support")}
                label="Contactar soporte"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-600 mt-4">
          Pagos procesados de forma segura con Stripe
        </p>
      </div>
    </main>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function PulsingOrb() {
  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <div
        className="absolute inset-0 rounded-full bg-indigo-500/20 animate-ping"
        style={{ animationDuration: "1.4s" }}
      />
      <div className="w-10 h-10 rounded-full bg-indigo-500/30 border border-indigo-400/40 flex items-center justify-center">
        <svg
          className="w-5 h-5 text-indigo-400 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      </div>
    </div>
  );
}

function SuccessIcon() {
  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <div className="absolute inset-0 rounded-full bg-emerald-500/15 animate-pulse" />
      <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center">
        <svg
          className="w-7 h-7 text-emerald-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
            style={{
              strokeDasharray: 30,
              strokeDashoffset: 0,
              animation: "drawCheck 0.4s ease-out 0.1s both",
            }}
          />
        </svg>
      </div>
      <style>{`
        @keyframes drawCheck {
          from { stroke-dashoffset: 30; }
          to   { stroke-dashoffset: 0;  }
        }
      `}</style>
    </div>
  );
}

function ErrorIcon() {
  return (
    <div className="w-16 h-16 rounded-full bg-red-500/15 border border-red-400/25 flex items-center justify-center">
      <svg
        className="w-7 h-7 text-red-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
  );
}

function ActionButton({
  onClick,
  label,
  primary = false,
}: {
  onClick: () => void;
  label: string;
  primary?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
        primary
          ? "bg-white text-[#0a0a0f] hover:bg-slate-100 active:scale-[0.98]"
          : "bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 active:scale-[0.98]"
      }`}
    >
      {label}
    </button>
  );
}
