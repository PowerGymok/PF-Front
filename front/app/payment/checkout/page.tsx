"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import { useAuth } from "@/app/contexts/AuthContext";
import { useCheckout } from "@/features/payments/hooks/useCheckout";
import { GetMemberships } from "@/features/memberships/services/membership.service";
import { resolveVariant } from "@/features/memberships/utils/membership.mapper";
import { MembershipResponse } from "@/features/memberships/validators/membershipSchema";
import { PaymentSummary } from "@/features/payments/components/PaymentSummary";
import { CheckoutForm } from "@/features/payments/components/CheckoutForm";
import { TokenPackage } from "@/features/payments/types/payment.types";

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
    initTokenPayment,
    clientSecret,
    transactionId,
    loading,
    error,
    stripePromise,
  } = useCheckout();

  const plan = searchParams.get("plan");
  const packageId = searchParams.get("packageId");
  const isTokenFlow = !!packageId;

  const [membership, setMembership] = useState<MembershipResponse | null>(null);
  const [tokenPackage, setTokenPackage] = useState<TokenPackage | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  // ── Refs para evitar doble ejecución ─────────────────────────────────────
  const membershipInitiated = useRef(false);
  const tokenInitiated = useRef(false);

  // ── Guardia: si no está logueado ──────────────────────────────────────────
  useEffect(() => {
    if (isAuthLoading) return;
    if (!dataUser?.user) {
      const redirect = isTokenFlow
        ? `/register?packageId=${packageId}`
        : `/register?plan=${plan}`;
      router.replace(redirect);
    }
  }, [isAuthLoading, dataUser]);

  // ── Flujo MEMBRESÍAS ──────────────────────────────────────────────────────
  useEffect(() => {
    if (isTokenFlow || !plan || isAuthLoading || !dataUser?.user) return;
    if (membershipInitiated.current) return;
    membershipInitiated.current = true;

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
        const userId = getUserIdFromToken(dataUser.token);
        await initPayment({ userId, membershipId: match.id }, dataUser.token);
      } catch (err: any) {
        console.error("[PaymentPage/membership]", err);
        setFetchError(err.message);
      } finally {
        setIsFetching(false);
      }
    };

    resolveMembership();
  }, [plan, isTokenFlow, isAuthLoading, dataUser]);

  // ── Flujo TOKENS ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isTokenFlow || !packageId || isAuthLoading || !dataUser?.user) return;
    if (tokenInitiated.current) return;
    tokenInitiated.current = true;

    const resolveTokenPackage = async () => {
      setIsFetching(true);
      setFetchError(null);
      try {
        const name = searchParams.get("packageName") ?? "Paquete de tokens";
        const tokenAmount = Number(searchParams.get("tokenAmount") ?? 0);
        const price = Number(searchParams.get("price") ?? 0);
        const currency =
          (searchParams.get("currency") as "USD" | "MXN") ?? "USD";

        setTokenPackage({ id: packageId, name, tokenAmount, price, currency });

        const userId = getUserIdFromToken(dataUser.token);
        sessionStorage.setItem("paymentFlow", "tokens");

        await initTokenPayment({ userId, packageId }, dataUser.token);
      } catch (err: any) {
        console.error("[PaymentPage/tokens]", err);
        setFetchError(err.message);
      } finally {
        setIsFetching(false);
      }
    };

    resolveTokenPackage();
  }, [packageId, isTokenFlow, isAuthLoading, dataUser]);

  // Guardar transactionId en sessionStorage para redirect 3DS
  useEffect(() => {
    if (transactionId) {
      sessionStorage.setItem("transactionId", transactionId);
    }
  }, [transactionId]);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleSuccess = (txId: string) => {
    const base = isTokenFlow
      ? `/payment/success?transactionId=${txId}&packageId=${packageId}`
      : `/payment/success?transactionId=${txId}&plan=${plan}`;

    const url = clientSecret
      ? `${base}&clientSecret=${encodeURIComponent(clientSecret)}`
      : base;

    router.push(url);
  };

  const handleError = (message: string) => setFetchError(message);

  // ── Loading ───────────────────────────────────────────────────────────────
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

  // ── Error ─────────────────────────────────────────────────────────────────
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

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-xl bg-zinc-900 p-8 rounded-2xl border border-white/10 space-y-8">
        <h1 className="text-2xl font-semibold text-center">Confirmar Pago</h1>

        {/* Resumen — membresía */}
        {!isTokenFlow && membership && (
          <PaymentSummary
            plan={{
              id: plan?.toUpperCase() as any,
              price: Number(membership.price),
              currency: "USD",
              interval: "monthly",
            }}
          />
        )}

        {/* Resumen — tokens */}
        {isTokenFlow && tokenPackage && (
          <div className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-1">
            <p className="text-sm text-white/50">Paquete seleccionado</p>
            <p className="text-lg font-semibold">{tokenPackage.name}</p>
            <p className="text-white/70 text-sm">
              🪙 {tokenPackage.tokenAmount} tokens
            </p>
            <p className="text-xl font-bold mt-2">
              {tokenPackage.price.toLocaleString("es-MX", {
                style: "currency",
                currency: tokenPackage.currency,
              })}{" "}
              <span className="text-sm font-normal text-white/40">
                {tokenPackage.currency}
              </span>
            </p>
          </div>
        )}

        {/* Stripe Elements */}
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
