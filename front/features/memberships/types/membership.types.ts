export type MembershipVariant = "bronze" | "silver" | "gold" | "single";

export type FeatureIconType = "workshop" | "token" | "shower" | "chat";

export interface Feature {
  icon: FeatureIconType;
  text: string;
}

export interface Membership {
  title: string;
  price: string;
  membershipVariant: MembershipVariant;
  features: Feature[];
}
