"use client";

import { useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import {
  SpendTokensRequest,
  SpendTokensResponse,
} from "@/features/payments/types/payment.types";

function getUserIdFromToken(token: string): string {
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.sub;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function useSpendTokens() {
  const { dataUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newBalance, setNewBalance] = useState<number | null>(null);

  const spendTokens = async (amount: number, description: string) => {
    if (!dataUser?.user) {
      setError("No autenticado");
      return null;
    }

    try {
      setLoading(true);
      setError(null);
      setNewBalance(null);

      const userId = getUserIdFromToken(dataUser.token);

      const response = await fetch(`${API_URL}/payments/tokens/spend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${dataUser.token}`,
        },
        body: JSON.stringify({
          userId,
          amount,
          description,
        } satisfies SpendTokensRequest),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || `Error ${response.status}`);
      }

      const result: SpendTokensResponse = await response.json();
      setNewBalance(result.newBalance);
      return result;
    } catch (err: any) {
      console.error("[useSpendTokens]", err);
      setError(err.message || "No se pudo gastar los tokens.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setNewBalance(null);
  };

  return {
    spendTokens,
    loading,
    error,
    newBalance,
    reset,
  };
}
