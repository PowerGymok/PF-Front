import { Suspense } from "react";
import CheckoutClient from "../checkout/PaymentCheckoutClient";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Cargando checkout...
        </div>
      }
    >
      <CheckoutClient />
    </Suspense>
  );
}
