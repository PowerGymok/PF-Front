export type MembershipType = "BRONZE" | "SILVER" | "GOLD" | "SINGLE";

export type BillingInterval = "monthly";

export interface Plan {
  id: MembershipType;
  price: number;
  currency: "USD";
  interval?: BillingInterval; // SINGLE_TOKEN no tiene intervalo
}

export interface CheckoutRequest {
  planId: MembershipType;
}

export interface CheckoutResponse {
  url: string;
}
