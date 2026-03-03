"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import { useTransactionHistory } from "@/features/payments/hooks/useTransactionHistory";
import { TransactionHistory } from "@/features/payments/components/TransactionHistory";
import { SpendTokensTest } from "@/features/token-packages/components/SpendTokensTest";
import { useTokenStatus } from "@/features/token-packages/hooks/useTokenStatus";

export default function TokensPage() {
  const router = useRouter();
  const { dataUser, isLoading: isAuthLoading } = useAuth();
  const { transactions, loading, error, confirmedBalance, pendingTokens } =
    useTransactionHistory();
  const { status: tokenStatus } = useTokenStatus();

  // ── Guardia auth ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isAuthLoading && !dataUser?.user) router.replace("/register");
  }, [isAuthLoading, dataUser]);

  // ── Loading ───────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-[#080810] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-2 border-amber-500/20 animate-ping" />
            <div className="w-12 h-12 rounded-full border-2 border-t-amber-400 border-amber-500/20 animate-spin" />
          </div>
          <p className="text-white/40 text-sm">Cargando…</p>
        </div>
      </div>
    );
  }

  // ── Error ─────────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen bg-[#080810] flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-red-400">⚠️ {error}</p>
          <button
            onClick={() => router.back()}
            className="px-6 py-2 border border-white/20 rounded-full text-sm text-white/60 hover:text-white transition-all"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-[#080810] text-white">
      <div
        className="pointer-events-none fixed inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% -10%, rgba(245,158,11,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-12 space-y-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1
              className="text-3xl font-bold"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
            >
              Mis Tokens
            </h1>
            <p className="text-white/40 text-sm mt-1">{dataUser?.user?.name}</p>
          </div>
          <button
            onClick={() => router.push("/memberships")}
            className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-400 text-sm font-medium hover:bg-amber-500/20 transition-all"
          >
            + Comprar tokens
          </button>
        </div>

        {/* ── Balance ──────────────────────────────────────────────────── */}
        <section className="space-y-3">
          <h2 className="text-xs font-semibold text-white/30 uppercase tracking-widest">
            Balance de tokens
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-6 space-y-2">
              <p className="text-xs text-white/40 uppercase tracking-widest">
                Disponibles
              </p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold text-amber-400">
                  {confirmedBalance}
                </span>
                <span className="text-white/30 text-sm mb-1">tokens</span>
              </div>
              <p className="text-xs text-white/25">Transacciones confirmadas</p>
            </div>
            <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-6 space-y-2">
              <p className="text-xs text-white/40 uppercase tracking-widest">
                En procesamiento
              </p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold text-amber-200/50">
                  {pendingTokens}
                </span>
                <span className="text-white/30 text-sm mb-1">tokens</span>
              </div>
              <p className="text-xs text-white/25">Se confirman vía webhook</p>
            </div>
          </div>

          {confirmedBalance === 0 && pendingTokens > 0 && (
            <div className="rounded-xl bg-amber-500/5 border border-amber-500/15 px-4 py-3 flex gap-3 items-start">
              <span className="text-amber-400 mt-0.5 flex-shrink-0">⚠</span>
              <p className="text-amber-200/60 text-sm leading-relaxed">
                Tus compras están en <strong>pendiente</strong> porque el
                webhook de Stripe no está activo en desarrollo. En producción se
                confirman automáticamente.
              </p>
            </div>
          )}
        </section>

        {/* ── Historial ────────────────────────────────────────────────── */}
        <section className="space-y-3">
          <h2 className="text-xs font-semibold text-white/30 uppercase tracking-widest">
            Historial de transacciones
          </h2>
          <TransactionHistory
            transactions={transactions}
            emptyMessage="No hay transacciones aún."
          />
        </section>

        <p className="text-center text-xs text-white/15 pt-2">
          El balance se actualiza automáticamente al confirmar cada transacción.
        </p>
      </div>
      <SpendTokensTest />
    </main>
  );
}
