import { TokenPackageResponse } from "@/features/token-packages/validators/Tokenpackageschema";
import { Feature } from "@/features/memberships/types/membership.types";

export interface TokenPackageCardProps {
  id: string;
  name: string;
  price: string; // formateado para mostrar en UI: "$10.00 USD"
  priceRaw: number; // número limpio para pasar a la URL: 10
  tokenAmount: number; // cantidad de tokens para mostrar y pasar a la URL
  description?: string;
  features: Feature[];
  currency?: "USD" | "MXN";
}

export function mapToTokenPackageCard(
  pkg: TokenPackageResponse,
): TokenPackageCardProps {
  const priceRaw = Number(pkg.price);

  return {
    id: pkg.id,
    name: pkg.name,
    price: `$${priceRaw.toFixed(2)} USD`,
    priceRaw,
    tokenAmount: pkg.tokenAmount,
    description: pkg.description,
    features: [{ icon: "token", text: `${pkg.tokenAmount} tokens` }],
    currency: "USD",
  };
}
