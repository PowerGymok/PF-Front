import { Suspense } from "react";
import ChatClient from "./ChatClient";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Cargando chat...
        </div>
      }
    >
      <ChatClient />
    </Suspense>
  );
}
