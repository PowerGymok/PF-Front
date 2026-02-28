import { TokenPackageResponse } from "@/features/token-packages/validators/Tokenpackageschema";
import { Feature } from "@/features/memberships/types/membership.types";

export interface TokenPackageCardProps {
  id: string;
  name: string;
  price: string;
  description?: string;
  features: Feature[];
}

export function mapToTokenPackageCard(
  pkg: TokenPackageResponse,
): TokenPackageCardProps {
  return {
    id: pkg.id,
    name: pkg.name,
    price: `$${Number(pkg.price).toFixed(2)} USD`,
    description: pkg.description,
    features: [{ icon: "token", text: `${pkg.tokenAmount} tokens` }],
  };
}
