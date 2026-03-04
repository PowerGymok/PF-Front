export interface TokenPackageSchema {
  name: string;
  description?: string;
  tokenAmount: number;
  price: number;
}

export interface TokenPackageResponse extends TokenPackageSchema {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TokenPackageAdminResponse extends TokenPackageResponse {
  isActive: boolean;
}

export const TOKEN_PACKAGE_INITIAL: TokenPackageSchema = {
  name: "",
  description: "",
  tokenAmount: "" as unknown as number,
  price: "" as unknown as number,
};
