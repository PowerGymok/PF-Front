import { useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { UpdateMembership } from "@/features/memberships/services/membership.service";
import {
  MembershipSchema,
  MembershipResponse,
} from "@/features/memberships/validators/membershipSchema";

export type FormStatus = null | "loading" | "success" | "error";

export function useMembershipEditForm(membership: MembershipResponse) {
  const { dataUser } = useAuth();
  const [form, setForm] = useState<MembershipSchema>({
    name: membership.name,
    price: membership.price,
    description: membership.description ?? "",
    durationDays: membership.durationDays,
    includesSpecialClasses: membership.includesSpecialClasses ?? false,
    includesCoachChat: membership.includesCoachChat ?? false,
    discountPercentage: membership.discountPercentage,
  });
  const [status, setStatus] = useState<FormStatus>(null);
  const [message, setMessage] = useState("");

  const handleChange = (
    field: keyof MembershipSchema,
    value: string | boolean | number | undefined,
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const token = dataUser?.token;

    if (!token) {
      setStatus("error");
      setMessage("No hay sesión activa.");
      return;
    }

    try {
      await UpdateMembership(membership.id, form, token);
      setStatus("success");
      setMessage("Membresía actualizada correctamente ✓");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Error inesperado");
    }
  };

  return { form, status, message, handleChange, handleSubmit };
}
