"use client";

import { ReactNode } from "react";
import { Transaction } from "@/features/payments/hooks/useTransactionHistory";
import { Token_Icon } from "@/components/icons/Token_Icon";
import { Workshop_Icon } from "@/components/icons/Workshop_Icon";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatCurrency(amount: string) {
  return Number(amount).toLocaleString("es-MX", {
    style: "currency",
    currency: "usd",
  });
}

const TYPE_LABEL: Record<Transaction["type"], string> = {
  token_purchase: "Compra de tokens",
  membership_purchase: "Compra de membresía",
  token_spend: "Gasto de tokens",
};

const TYPE_ICON: Record<Transaction["type"], ReactNode> = {
  token_purchase: <Token_Icon />,
  membership_purchase: <Workshop_Icon />,
  token_spend: "−",
};

// ─── StatusBadge ──────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Transaction["status"] }) {
  const styles = {
    succeeded: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    failed: "bg-red-500/10 text-red-400 border-red-500/20",
  };
  const labels = {
    succeeded: "Confirmado",
    completed: "Completado",
    pending: "Pendiente",
    failed: "Fallido",
  };
  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-full border font-medium ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface TransactionHistoryProps {
  transactions: Transaction[];
  emptyMessage?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function TransactionHistory({
  transactions,
  emptyMessage = "No hay transacciones aún.",
}: TransactionHistoryProps) {
  if (transactions.length === 0) {
    return (
      <div className="rounded-2xl bg-white/[0.02] border border-white/6 p-10 text-center">
        <p className="text-4xl mb-3">📋</p>
        <p className="text-white/40 text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {transactions.map((tx) => (
        <div
          key={tx.id}
          className="rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-3 flex items-center justify-between gap-4 hover:bg-white/[0.05] transition-colors"
        >
          {/* Left */}
          <div className="flex items-center gap-3 min-w-0">
            {/* Icono sin fondo */}
            <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
              {TYPE_ICON[tx.type]}
            </div>
            <div className="min-w-0">
              <p className="text-sm text-white/80 truncate">{tx.description}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-white/25">
                  {formatDate(tx.createdAt)}
                </span>
                <span className="text-white/15">·</span>
                <span className="text-xs text-white/30">
                  {TYPE_LABEL[tx.type]}
                </span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
            {tx.type !== "membership_purchase" && tx.tokenAmount > 0 && (
              <span
                className={`text-sm font-semibold ${
                  tx.type === "token_spend" ? "text-red-400" : "text-amber-400"
                }`}
              >
                {tx.type === "token_spend" ? "−" : "+"}
                {tx.tokenAmount} tkn
              </span>
            )}
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/25">
                {formatCurrency(tx.amount)}
              </span>
              <StatusBadge status={tx.status} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
