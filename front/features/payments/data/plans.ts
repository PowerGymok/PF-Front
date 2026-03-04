import { Plan } from "../types/payment.types";

export const MEMBERSHIP_PLANS: Record<string, Plan> = {
  BRONZE: {
    id: "BRONZE",
    price: 40,
    currency: "USD",
    interval: "monthly",
  },
  SILVER: {
    id: "SILVER",
    price: 80,
    currency: "USD",
    interval: "monthly",
  },
  GOLD: {
    id: "GOLD",
    price: 160,
    currency: "USD",
    interval: "monthly",
  },
  SINGLE: {
    id: "SINGLE",
    price: 10,
    currency: "USD",
  },
};
