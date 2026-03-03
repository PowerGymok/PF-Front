"use client";

import { useState } from "react";
import { useSpendTokens } from "@/features/token-packages/hooks/useSpendTokens";

export function SpendTokensTest() {
  const { spendTokens, loading, error, newBalance, reset } = useSpendTokens();
  const [amount, setAmount] = useState(10);
  const [description, setDescription] = useState(
    "Reserva clase yoga - martes 10am",
  );

  const handleSpend = async () => {
    reset();
    await spendTokens(amount, description);
  };

  return (
    <div className="rounded-2xl bg-[#080810] border border-white/10 p-6 space-y-4 max-w-md">
      <h3 className="text-sm font-semibold text-white/40 uppercase tracking-widest">
        Test — Gastar tokens
      </h3>

      {/* Amount */}
      <div className="space-y-1">
        <label className="text-xs text-white/40">Cantidad de tokens</label>
        <input
          type="number"
          min={1}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-white/30"
        />
      </div>

      {/* Description */}
      <div className="space-y-1">
        <label className="text-xs text-white/40">Descripción</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-white/30"
        />
      </div>

      {/* Button */}
      <button
        onClick={handleSpend}
        disabled={loading || amount <= 0}
        className="w-full py-2.5 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Gastando…" : `Gastar ${amount} tokens`}
      </button>

      {/* Error */}
      {error && <p className="text-red-400 text-sm">⚠️ {error}</p>}

      {/* Success */}
      {newBalance !== null && (
        <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/15 px-4 py-3">
          <p className="text-emerald-400 text-sm">
            ✓ Tokens gastados correctamente
          </p>
          <p className="text-emerald-300/60 text-xs mt-1">
            Nuevo balance: <strong>{newBalance}</strong> tokens
          </p>
        </div>
      )}
    </div>
  );
}
