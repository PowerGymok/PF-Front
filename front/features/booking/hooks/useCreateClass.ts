"use client";

import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* ─────────────────────────────────────────
   TIPOS
   POST /clases/create
   Requeridos:  name, duration, capacity, intensity
   Opcionales:  description, benefits (text[]), requirements
───────────────────────────────────────── */

export type IntensityValue = "alta" | "media" | "baja";

export interface CreateClassForm {
  name: string;
  duration: string;
  capacity: number;
  intensity: IntensityValue;
  description: string;
  benefits: string;
  requirements: string;
}

export const EMPTY_CREATE_FORM: CreateClassForm = {
  name: "",
  duration: "60",
  capacity: 15,
  intensity: "media",
  description: "",
  benefits: "",
  requirements: "",
};

/* ─────────────────────────────────────────
   HOOK
───────────────────────────────────────── */

export function useCreateClass(authToken: string, onSuccess?: () => void) {
  const [form, setForm] = useState<CreateClassForm>(EMPTY_CREATE_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateField = <K extends keyof CreateClassForm>(
    key: K,
    value: CreateClassForm[K],
  ) => setForm((prev) => ({ ...prev, [key]: value }));

  const reset = () => {
    setForm(EMPTY_CREATE_FORM);
    setError(null);
    setSuccess(false);
  };

  const submit = async () => {
    setError(null);

    // Validaciones requeridos
    if (!form.name.trim()) return setError("El nombre es requerido.");
    if (form.name.trim().length < 3)
      return setError("El nombre debe tener al menos 3 caracteres.");
    if (!form.duration.trim()) return setError("La duración es requerida.");
    if (form.duration.trim().length < 2)
      return setError("La duración debe tener al menos 2 caracteres.");
    if (form.capacity < 1) return setError("La capacidad debe ser mayor a 0.");
    if (!form.intensity) return setError("La intensidad es requerida.");

    setIsSubmitting(true);
    try {
      const body: Record<string, unknown> = {
        name: form.name.trim(),
        duration: form.duration.trim(),
        capacity: Number(form.capacity),
        intensity: form.intensity,
      };

      // Opcionales — solo se envían si tienen valor
      if (form.description.trim()) {
        body.description = form.description.trim();
      }

      if (form.benefits.trim()) {
        body.benefits = form.benefits
          .split(",")
          .map((b) => b.trim())
          .filter(Boolean);
      }

      if (form.requirements.trim()) {
        body.requirements = form.requirements.trim();
      }

      const res = await fetch(`${API_URL}/clases/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        const msg = Array.isArray(errBody?.message)
          ? errBody.message.join(", ")
          : (errBody?.message ?? `Error ${res.status} al crear la clase`);
        throw new Error(msg);
      }

      setSuccess(true);
      onSuccess?.();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { form, updateField, isSubmitting, error, success, submit, reset };
}
