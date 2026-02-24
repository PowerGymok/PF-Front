"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MEMBERSHIP_PLANS } from "../data/plans";
import { PaymentSummary } from "../components/PaymentSummary";
import { PaymentButton } from "../components/PaymentButton";
import { MembershipType } from "../types/payment.types";

function isMembershipType(value: string): value is MembershipType {
  return Object.keys(MEMBERSHIP_PLANS).includes(value);
}

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const rawPlanId = searchParams.get("plan");

  useEffect(() => {
    if (!rawPlanId || !isMembershipType(rawPlanId)) {
      router.replace("/memberships");
      // replace evita que el usuario vuelva atrás a la URL inválida
    }
  }, [rawPlanId, router]);

  // Mientras redirige, evitamos renderizar basura
  if (!rawPlanId || !isMembershipType(rawPlanId)) {
    return null;
  }

  const plan = MEMBERSHIP_PLANS[rawPlanId];

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-xl bg-zinc-900 p-8 rounded-2xl border border-white/10 space-y-8">
        <h1 className="text-2xl font-semibold text-center">Confirmar Pago</h1>

        <PaymentSummary plan={plan} />
        <PaymentButton planId={plan.id} />
      </div>
    </main>
  );
}
