"use client";

import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { useCheckout } from "../hooks/useCheckout";
import { GetMemberships } from "@/features/memberships/services/membership.service";
import { CheckoutForm } from "./CheckoutForm";

interface RenewalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  userId: string;
  membershipId: string;
  membershipName: string;
  authToken: string;
}

export default function RenewalModal({
  isOpen,
  onClose,
  onSuccess,
  userId,
  membershipId,
  membershipName,
  authToken,
}: RenewalModalProps) {
  const {
    initRenewal,
    clientSecret,
    transactionId,
    loading,
    error,
    reset,
    stripePromise,
  } = useCheckout();
  const [succeeded, setSucceeded] = useState(false);
  const [resolvedMembershipId, setResolvedMembershipId] = useState<
    string | null
  >(null);
  const [resolveError, setResolveError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      reset();
      setSucceeded(false);
      setResolvedMembershipId(null);
      setResolveError(null);
      return;
    }
    // Buscar el UUID real de la membresía por nombre
    GetMemberships()
      .then((memberships) => {
        const found = memberships.find(
          (m) => m.name.toLowerCase() === membershipName.toLowerCase(),
        );
        if (!found)
          throw new Error(`No se encontró la membresía "${membershipName}"`);
        setResolvedMembershipId(found.id);
        initRenewal({ userId, membershipId: found.id }, authToken);
      })
      .catch((err) => {
        setResolveError(err.message);
      });
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !loading) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, loading]);

  if (!isOpen) return null;

  const handleSuccess = () => {
    setSucceeded(true);
    onSuccess();
    setTimeout(onClose, 2000);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
        onClick={() => !loading && onClose()}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-md bg-[#111] border border-white/10 rounded-2xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-t-2xl" />

          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/8">
            <div>
              <h2 className="text-white font-semibold text-sm">
                Renovar membresía
              </h2>
              <p className="text-white/35 text-xs mt-0.5">{membershipName}</p>
            </div>
            <button
              onClick={onClose}
              disabled={loading}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-white/35 hover:text-white hover:bg-white/8 transition-colors disabled:opacity-40"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M1 1l10 10M11 1L1 11"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className="px-6 py-5">
            {succeeded ? (
              /* Éxito */
              <div className="py-8 flex flex-col items-center gap-3 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M4 10l4 4 8-8"
                      stroke="#34d399"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-white font-semibold">¡Membresía renovada!</p>
                <p className="text-white/40 text-sm">
                  Tu acceso ha sido extendido correctamente.
                </p>
              </div>
            ) : loading && !clientSecret ? (
              /* Cargando clientSecret */
              <div className="py-8 flex flex-col items-center gap-3">
                <span className="w-8 h-8 rounded-full border-2 border-t-white border-white/20 animate-spin" />
                <p className="text-white/40 text-sm">Preparando pago...</p>
              </div>
            ) : resolveError ? (
              <div className="py-4 space-y-4">
                <div className="rounded-xl bg-red-500/8 border border-red-500/20 px-4 py-3 flex gap-2">
                  <span className="text-red-400">⚠</span>
                  <p className="text-red-400/90 text-sm">{resolveError}</p>
                </div>
              </div>
            ) : error && !clientSecret ? (
              /* Error al iniciar */
              <div className="py-4 space-y-4">
                <div className="rounded-xl bg-red-500/8 border border-red-500/20 px-4 py-3 flex gap-2">
                  <span className="text-red-400">⚠</span>
                  <p className="text-red-400/90 text-sm">{error}</p>
                </div>
                <button
                  onClick={() =>
                    initRenewal({ userId, membershipId }, authToken)
                  }
                  className="w-full py-2.5 rounded-xl border border-white/15 text-white/60 text-sm hover:border-white/30 hover:text-white transition-all"
                >
                  Reintentar
                </button>
              </div>
            ) : clientSecret && transactionId ? (
              /* Stripe Elements */
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance: {
                    theme: "night",
                    variables: {
                      colorPrimary: "#ffffff",
                      colorBackground: "#1a1a1a",
                      colorText: "#ffffff",
                      colorDanger: "#f87171",
                      borderRadius: "12px",
                    },
                  },
                }}
              >
                <CheckoutForm
                  transactionId={transactionId}
                  onSuccess={handleSuccess}
                  onError={(msg) => console.error("[RenewalModal]", msg)}
                />
              </Elements>
            ) : null}
          </div>

          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent rounded-b-2xl" />
        </div>
      </div>
    </>
  );
}
