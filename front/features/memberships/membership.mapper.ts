import { MembershipVariant } from "./types/membership.types";
import { MembershipType } from "../payments/types/payment.types";

export const variantToMembershipType: Record<
  MembershipVariant,
  MembershipType
> = {
  bronze: "BRONZE",
  silver: "SILVER",
  gold: "GOLD",
  single: "SINGLE",
};
