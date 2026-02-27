"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import { useAuth } from "@/app/contexts/AuthContext";
import { useCheckout } from "@/features/payments/hooks/useCheckout";
import { GetMemberships } from "@/features/memberships/services/membership.service";
import { resolveVariant } from "@/features/memberships/utils/membership.mapper";
import { MembershipResponse } from "@/features/memberships/validators/membershipSchema";
import { PaymentSummary } from "@/features/payments/components/PaymentSummary";
import { CheckoutForm } from "@/features/payments/components/CheckoutForm";

// Extrae el userId (sub) del JWT sin librerías externas
function getUserIdFromToken(token: string): string {
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.sub;
}

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { dataUser, isLoading: isAuthLoading } = useAuth();
  const {
    initPayment,
    clientSecret,
    transactionId,
    loading,
    error,
    stripePromise,
  } = useCheckout();

  const plan = searchParams.get("plan");

  const [membership, setMembership] = useState<MembershipResponse | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  // ── Guardia: si no está logueado, manda al registro ──────────────────────
  useEffect(() => {
    if (!isAuthLoading && !dataUser?.user) {
      router.replace(`/register?plan=${plan}`);
    }
  }, [isAuthLoading, dataUser, plan, router]);

  // ── Resuelve el membershipId y arranca el PaymentIntent ──────────────────
  useEffect(() => {
    if (!plan || isAuthLoading || !dataUser?.user) return;

    const resolveMembership = async () => {
      setIsFetching(true);
      setFetchError(null);

      try {
        const memberships = await GetMemberships();

        const match = memberships.find(
          (m) => resolveVariant(m.name) === plan.toLowerCase(),
        );

        if (!match) throw new Error(`No se encontró el plan "${plan}"`);

        setMembership(match);

        // ✅ Sacamos el userId del JWT (campo sub) en lugar de dataUser.user.id
        const userId = getUserIdFromToken(dataUser.token);

        await initPayment({ userId, membershipId: match.id }, dataUser.token);
      } catch (err: any) {
        console.error("[PaymentPage]", err);
        setFetchError(err.message);
      } finally {
        setIsFetching(false);
      }
    };

    resolveMembership();
  }, [plan, isAuthLoading, dataUser]);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleSuccess = (transactionId: string) => {
    router.push(`/payment/success?transactionId=${transactionId}&plan=${plan}`);
  };

  const handleError = (message: string) => {
    setFetchError(message);
  };

  // ── Estados de carga y error ──────────────────────────────────────────────
  if (isAuthLoading || isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-white/60">Preparando tu checkout…</p>
        </div>
      </div>
    );
  }

  if (fetchError || error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center space-y-4">
          <p className="text-red-400">⚠️ {fetchError || error}</p>
          <button
            onClick={() => router.back()}
            className="px-6 py-2 border border-white rounded-full text-sm hover:bg-white hover:text-black transition-all"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-xl bg-zinc-900 p-8 rounded-2xl border border-white/10 space-y-8">
        <h1 className="text-2xl font-semibold text-center">Confirmar Pago</h1>

        {/* Resumen del plan */}
        {membership && (
          <PaymentSummary
            plan={{
              id: plan?.toUpperCase() as any,
              price: Number(membership.price),
              currency: "USD",
              interval: "monthly",
            }}
          />
        )}

        {/* Stripe Elements con el formulario de tarjeta */}
        {clientSecret ? (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: {
                theme: "night",
                variables: {
                  colorPrimary: "#ffffff",
                  colorBackground: "#18181b",
                  borderRadius: "8px",
                },
              },
            }}
          >
            <CheckoutForm
              transactionId={transactionId!}
              onSuccess={handleSuccess}
              onError={handleError}
            />
          </Elements>
        ) : (
          <div className="flex justify-center py-6">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <p className="text-center text-white/30 text-xs">
          🔒 Pago seguro procesado por Stripe. No almacenamos datos de tu
          tarjeta.
        </p>
      </div>
    </main>
  );
}
