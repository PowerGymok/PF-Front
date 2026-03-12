export type MembershipType = "BRONZE" | "SILVER" | "GOLD" | "SINGLE";

export type BillingInterval = "monthly";

export interface Plan {
  id: MembershipType;
  price: number;
  currency: "USD" | "MXN";
  interval?: BillingInterval;
}

export interface CheckoutRequest {
  userId: string;
  membershipId: string; // UUID real del backend
}

// El backend devuelve clientSecret para usar Stripe Elements embebido.
export interface CheckoutResponse {
  clientSecret: string;
  transactionId: string;
}

// ─── Tokens ───────────────────────────────────────────────────────────────────

export interface TokenCheckoutRequest {
  userId: string;
  packageId: string; // UUID del paquete de tokens
}

// Misma forma de respuesta que membresías
export type TokenCheckoutResponse = CheckoutResponse;

export interface TokenPackage {
  id: string;
  name: string;
  description?: string;
  tokenAmount: number;
  price: number;
  currency: "USD" | "MXN";
}

export interface SpendTokensRequest {
  userId: string;
  amount: number;
  description: string;
}

export interface SpendTokensResponse {
  newBalance: number;
}
