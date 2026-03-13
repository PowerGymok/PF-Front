import { Suspense } from "react";
import AuthCallbackClient from "../callback/AuthCallbackPage";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Procesando login...
        </div>
      }
    >
      <AuthCallbackClient />
    </Suspense>
  );
}