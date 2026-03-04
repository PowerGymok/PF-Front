import { MembershipVariant } from "@/features/memberships/types/membership.types";

export const variantStyles: Record<
  MembershipVariant,
  { border: string; hoverBorder: string; hoverText: string }
> = {
  bronze: {
    border: "border-white/30",
    hoverBorder: "group-hover:border-amber-500",
    hoverText: "group-hover:text-amber-500",
  },
  silver: {
    border: "border-white/30",
    hoverBorder: "group-hover:border-zinc-600",
    hoverText: "group-hover:text-zinc-600",
  },
  gold: {
    border: "border-white/30",
    hoverBorder: "group-hover:border-yellow-400",
    hoverText: "group-hover:text-yellow-400",
  },
  single: {
    border: "border-white/30",
    hoverBorder: "group-hover:border-green-400",
    hoverText: "group-hover:text-green-400",
  },
};
