"use client";

import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/app/contexts/AuthContext";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TokenPackageInfo {
  id: string;
  name: string;
  description: string;
  tokenAmount: number;
  price: string;
  isActive: boolean;
}

export interface Transaction {
  id: string;
  type: "token_purchase" | "membership_purchase" | "token_spend";
  status: "pending" | "succeeded" | "failed" | "completed";
  amount: string;
  tokenAmount: number;
  stripePaymentIntentId: string | null;
  description: string;
  createdAt: string;
  tokenPackage: TokenPackageInfo | null;
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function getUserIdFromToken(token: string): string {
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.sub;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useTransactionHistory() {
  const { dataUser, isLoading: isAuthLoading } = useAuth();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (isAuthLoading || !dataUser?.user) return;
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchHistory = async () => {
      try {
        const userId = getUserIdFromToken(dataUser.token);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/payments/history/${userId}`,
          { headers: { Authorization: `Bearer ${dataUser.token}` } },
        );
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data: Transaction[] = await res.json();
        setTransactions(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [isAuthLoading, dataUser]);

  // ── Balance calculado ─────────────────────────────────────────────────────
  const confirmedBalance = transactions
    .filter(
      (t) =>
        (t.status === "succeeded" || t.status === "completed") &&
        t.type !== "membership_purchase",
    )
    .reduce(
      (sum, t) =>
        t.type === "token_spend" ? sum - t.tokenAmount : sum + t.tokenAmount,
      0,
    );

  const pendingTokens = transactions
    .filter((t) => t.status === "pending" && t.type === "token_purchase")
    .reduce((sum, t) => sum + t.tokenAmount, 0);

  return {
    transactions,
    loading: isAuthLoading || loading,
    error,
    confirmedBalance,
    pendingTokens,
  };
}
