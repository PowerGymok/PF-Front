interface Membership {
  type: "free" | "basic" | "premium" | null;
  isActive: boolean;
}

export const useChatAccess = (membership: Membership | null) => {
  if (!membership) return false;

  return membership.isActive;
};