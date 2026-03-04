import { useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { CreateMembership } from "@/features/memberships/services/membership.service";
import {
  MembershipSchema,
  MEMBERSHIP_INITIAL,
} from "@/features/memberships/validators/membershipSchema";

export type FormStatus = null | "loading" | "success" | "error";

export function useMembershipForm() {
  const { dataUser } = useAuth();
  const [form, setForm] = useState<MembershipSchema>(MEMBERSHIP_INITIAL);
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
      const data = await CreateMembership(form, token);
      setStatus("success");
      setMessage(`Membresía "${data.name ?? form.name}" creada ✓`);
      setForm(MEMBERSHIP_INITIAL);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Error inesperado");
    }
  };

  return { form, status, message, handleChange, handleSubmit };
}
