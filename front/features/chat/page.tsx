"use client";

import { useState } from "react";
import MembershipTester from "./componentes/MembershipTester";
import { useChatAccess } from "./hooks/useChatAccess";

export default function ChatPage() {

    
  const [membership, setMembership] = useState<any>(null);

  const hasAccess = useChatAccess(membership);

  return (
    <div className="p-8">
      <MembershipTester onChange={setMembership} />

      {hasAccess ? (
        <div className="border p-4 rounded-md bg-green-100">
        <p>Chat disponible
        </p>
        </div>
      ) : (
        <div className="border p-4 rounded-md bg-red-100">
        <p>Necesitas una membresía activa para usar el chat
        </p>
        </div>
      )}
    </div>
  );
}