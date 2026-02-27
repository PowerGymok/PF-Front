export type MembershipType = "BRONZE" | "SILVER" | "GOLD" | "SINGLE";

export type BillingInterval = "monthly";

export interface Plan {
  id: MembershipType;
  price: number;
  currency: "USD";
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
