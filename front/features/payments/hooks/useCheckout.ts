"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CheckoutRequest,
  CheckoutResponse,
  TokenCheckoutRequest,
  TokenCheckoutResponse,
} from "../types/payment.types";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function useCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [transactionId, setTransactionId] = useState<string | null>(null);

  // ── Helpers internos ──────────────────────────────────────────────────────

  const prepareState = () => {
    setLoading(true);
    setError(null);
    setClientSecret(null);
    setTransactionId(null);
  };

  const handleResponse = async (
    response: Response,
  ): Promise<CheckoutResponse> => {
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(
        err.message || `Error ${response.status} al iniciar el pago`,
      );
    }
    const result: CheckoutResponse = await response.json();
    if (!result?.clientSecret)
      throw new Error("Respuesta inválida del servidor");
    return result;
  };

  // ── Membresías: POST /payments/membership ─────────────────────────────────

  const initPayment = async (data: CheckoutRequest, token: string) => {
    try {
      prepareState();

      const response = await fetch(`${API_URL}/payments/membership`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await handleResponse(response);
      setClientSecret(result.clientSecret);
      setTransactionId(result.transactionId);
    } catch (err: any) {
      console.error("[useCheckout] initPayment:", err);
      setError(err.message || "No se pudo iniciar el proceso de pago.");
    } finally {
      setLoading(false);
    }
  };

  // ── Tokens: POST /payments/tokens ─────────────────────────────────────────

  const initTokenPayment = async (
    data: TokenCheckoutRequest,
    token: string,
  ) => {
    try {
      prepareState();

      const response = await fetch(`${API_URL}/payments/tokens`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await handleResponse(response);
      setClientSecret(result.clientSecret);
      setTransactionId(result.transactionId);
    } catch (err: any) {
      console.error("[useCheckout] initTokenPayment:", err);
      setError(err.message || "No se pudo iniciar el proceso de pago.");
    } finally {
      setLoading(false);
    }
  };

  // ── Confirmar con Stripe Elements (compartido) ────────────────────────────

  const confirmPayment = async (elements: any, returnUrl: string) => {
    const stripe = await stripePromise;
    if (!stripe || !elements || !clientSecret) return { error: "No iniciado" };

    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: returnUrl },
      redirect: "if_required",
    });

    setLoading(false);

    if (error) {
      setError(error.message ?? "Error al confirmar el pago");
      return { error: error.message };
    }

    return { paymentIntent };
  };

  // ── Reset ─────────────────────────────────────────────────────────────────

  const reset = () => {
    setClientSecret(null);
    setTransactionId(null);
    setError(null);
    setLoading(false);
  };

  return {
    initPayment,
    initTokenPayment,
    confirmPayment,
    clientSecret,
    transactionId,
    loading,
    error,
    reset,
    stripePromise,
  };
}
