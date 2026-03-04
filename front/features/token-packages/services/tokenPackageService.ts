import {
  TokenPackageSchema,
  TokenPackageResponse,
  TokenPackageAdminResponse,
} from "@/features/token-packages/validators/Tokenpackageschema";

export const CreateTokenPackage = async (
  data: TokenPackageSchema,
  token: string,
): Promise<TokenPackageResponse> => {
  const payload: Partial<TokenPackageSchema> = {
    name: data.name,
    tokenAmount: data.tokenAmount,
    price: data.price,
  };

  if (data.description) payload.description = data.description;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/token-packages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      },
    );

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || "Error al crear el paquete");
    }

    return await res.json();
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error("Error al crear el paquete");
  }
};

export const GetTokenPackages = async (): Promise<TokenPackageResponse[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/token-packages`, {
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Error al obtener paquetes");
  }

  return res.json();
};

export const GetAdminTokenPackages = async (
  token: string,
): Promise<TokenPackageAdminResponse[]> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/token-packages`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || "Error al obtener paquetes");
    }

    return res.json();
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error("Error al obtener paquetes");
  }
};

export const DeleteTokenPackage = async (
  id: string,
  token: string,
): Promise<void> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/token-packages/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || "Error al eliminar el paquete");
    }
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error("Error al eliminar el paquete");
  }
};
