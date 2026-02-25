import {
  MembershipSchema,
  MembershipResponse,
  MembershipAdminResponse,
} from "@/features/memberships/validators/membershipSchema";

export const CreateMembership = async (
  data: MembershipSchema,
  token: string,
) => {
  const payload: Partial<MembershipSchema> = {
    name: data.name,
    price: data.price,
    includesSpecialClasses: data.includesSpecialClasses,
    includesCoachChat: data.includesCoachChat,
  };

  if (data.description) payload.description = data.description;
  if (data.durationDays !== undefined) payload.durationDays = data.durationDays;
  if (data.discountPercentage !== undefined)
    payload.discountPercentage = data.discountPercentage;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/memberships`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || "Error al crear la membresía");
    }

    return await res.json();
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error("Error al crear la membresía");
  }
};

export const GetMemberships = async (): Promise<MembershipResponse[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/memberships`, {
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Error al obtener membresías");
  }

  return res.json();
};

export const GetMembershipById = async (
  id: string,
): Promise<MembershipResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/memberships/${id}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Error al obtener la membresía");
  }

  return res.json();
};

export const UpdateMembership = async (
  id: string,
  data: Partial<MembershipSchema>,
  token: string,
): Promise<MembershipResponse> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/memberships/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      },
    );

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || "Error al actualizar la membresía");
    }

    return await res.json();
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error("Error al actualizar la membresía");
  }
};

export const DeleteMembership = async (
  id: string,
  token: string,
): Promise<void> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/memberships/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || "Error al eliminar la membresía");
    }
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error("Error al eliminar la membresía");
  }
};

export const GetAdminMemberships = async (
  token: string,
): Promise<MembershipAdminResponse[]> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/memberships/admin`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || "Error al obtener membresías");
    }

    return res.json();
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error("Error al obtener membresías");
  }
};
