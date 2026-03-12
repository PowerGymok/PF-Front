import { Suspense } from "react";
import PaymentSuccessClient from "../success/PaymentSuccesClient";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Verificando pago...
        </div>
      }
    >
      <PaymentSuccessClient />
    </Suspense>
  );
}
