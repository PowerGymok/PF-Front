import { useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { CreateTokenPackage } from "@/features/token-packages/services/tokenPackageService";
import {
  TokenPackageSchema,
  TOKEN_PACKAGE_INITIAL,
} from "@/features/token-packages/validators/Tokenpackageschema";

export type FormStatus = null | "loading" | "success" | "error";

export function useTokenPackageForm() {
  const { dataUser } = useAuth();
  const [form, setForm] = useState<TokenPackageSchema>(TOKEN_PACKAGE_INITIAL);
  const [status, setStatus] = useState<FormStatus>(null);
  const [message, setMessage] = useState("");

  const handleChange = (
    field: keyof TokenPackageSchema,
    value: string | number | undefined,
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
      const data = await CreateTokenPackage(form, token);
      setStatus("success");
      setMessage(`Paquete "${data.name ?? form.name}" creado ✓`);
      setForm(TOKEN_PACKAGE_INITIAL);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Error inesperado");
    }
  };

  return { form, status, message, handleChange, handleSubmit };
}
