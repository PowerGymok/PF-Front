import { Plan } from "../types/payment.types";

interface Props {
  plan: Plan;
}

export function PaymentSummary({ plan }: Props) {
  return (
    <div className="space-y-4 border border-white/10 p-6 rounded-xl">
      <div className="flex justify-between">
        <span className="text-zinc-400">Membresía</span>
        <span>{plan.id}</span>
      </div>

      <div className="flex justify-between">
        <span className="text-zinc-400">Precio</span>
        <span>
          ${plan.price} {plan.currency}
        </span>
      </div>

      {plan.interval && (
        <div className="flex justify-between">
          <span className="text-zinc-400">Frecuencia</span>
          <span>{plan.interval}</span>
        </div>
      )}
    </div>
  );
}
