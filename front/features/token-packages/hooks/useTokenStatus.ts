"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ActiveMembership {
  name: string;
  endDate: Date;
  includesCoachChat: boolean;
  includesSpecialClasses: boolean;
  discountPercentage: number;
}

export interface TokenStatus {
  hasActiveMembership: boolean;
  tokenBalance: number;
  canUseTokens: boolean;
  activeMembership?: ActiveMembership;
  message: string;
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function getUserIdFromToken(token: string): string {
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.sub;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useTokenStatus() {
  const { dataUser, isLoading: isAuthLoading } = useAuth();
  const [status, setStatus] = useState<TokenStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(async () => {
    if (!dataUser?.user) return;
    try {
      const userId = getUserIdFromToken(dataUser.token);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payments/status/${userId}`,
        { headers: { Authorization: `Bearer ${dataUser.token}` } },
      );
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data: TokenStatus = await res.json();
      setStatus(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [dataUser]);

  useEffect(() => {
    if (isAuthLoading || !dataUser?.user) return;
    fetchStatus();
  }, [isAuthLoading, dataUser, fetchStatus]);

  return { status, loading, error, refetch: fetchStatus };
}
