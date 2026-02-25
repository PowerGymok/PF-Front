import { MembershipResponse as BackendMembership } from "@/features/memberships/validators/membershipSchema";
import {
  Membership,
  MembershipVariant,
  Feature,
} from "@/features/memberships/types/membership.types";

function resolveVariant(name: string): MembershipVariant {
  const lower = name.toLowerCase();
  if (lower.includes("oro") || lower.includes("oro")) return "gold";
  if (lower.includes("silver") || lower.includes("plata")) return "silver";
  if (lower.includes("bronze") || lower.includes("bronce")) return "bronze";
  return "single";
}

function resolveFeatures(membership: BackendMembership): Feature[] {
  const features: Feature[] = [
    { icon: "workshop", text: "AGENDA TUS CLASES" },
    { icon: "token", text: "30 TOKENS" },
    {
      icon: "shower",
      text: "ACCESO A REGADERAS",
    },
  ];

  if (membership.includesCoachChat) {
    features.push({ icon: "chat", text: "CHAT CON COACH" });
  }

  return features;
}

export function mapToMembershipCard(membership: BackendMembership): Membership {
  return {
    title: membership.name,
    price: `${Number(membership.price).toFixed(2)} USD`,
    membershipVariant: resolveVariant(membership.name),
    features: resolveFeatures(membership),
  };
}
