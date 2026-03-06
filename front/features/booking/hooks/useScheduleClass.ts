"use client";

import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* ─────────────────────────────────────────
   TIPOS
───────────────────────────────────────── */

export interface CatalogClass {
  id: string;
  name: string;
  duration: string;
  capacity: number;
  description?: string;
}

export interface Coach {
  id: string;
  name: string;
  email: string;
}

export interface ScheduleClassForm {
  id_class: string;
  date: string;
  time: string;
  token: number;
  id_coach?: string;
}

export const EMPTY_SCHEDULE_FORM: ScheduleClassForm = {
  id_class: "",
  date: "",
  time: "",
  token: 1,
  id_coach: "",
};

/* ─────────────────────────────────────────
   HOOK
───────────────────────────────────────── */

export function useScheduleClass(
  authToken: string,
  userRole: string,
  onSuccess?: () => void,
) {
  const [form, setForm] = useState<ScheduleClassForm>(EMPTY_SCHEDULE_FORM);

  const [catalog, setCatalog] = useState<CatalogClass[]>([]);
  const [coaches, setCoaches] = useState<Coach[]>([]);

  const [isCatalogLoading, setIsCatalogLoading] = useState(false);
  const [isCoachesLoading, setIsCoachesLoading] = useState(false);

  const [catalogError, setCatalogError] = useState<string | null>(null);
  const [coachError, setCoachError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  /* ── Cargar catálogo ── */

  const loadCatalog = async () => {
    setIsCatalogLoading(true);
    setCatalogError(null);

    try {
      const res = await fetch(`${API_URL}/clases`);

      if (!res.ok) throw new Error(`Error ${res.status} al cargar catálogo`);

      const data = await res.json();

      const active = Array.isArray(data)
        ? data.filter((c: any) => c.isActive !== false)
        : [];

      setCatalog(active);
    } catch (err: any) {
      setCatalogError(err.message);
    } finally {
      setIsCatalogLoading(false);
    }
  };

  /* ── Cargar coaches (solo admin) ── */

  const loadCoaches = async () => {
    if (userRole !== "Admin") return;

    setIsCoachesLoading(true);
    setCoachError(null);

    try {
      const res = await fetch(`${API_URL}/coach`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!res.ok) throw new Error(`Error ${res.status} al cargar coaches`);

      const data = await res.json();
      setCoaches(data);
    } catch (err: any) {
      setCoachError(err.message);
    } finally {
      setIsCoachesLoading(false);
    }
  };

  /* ── Helpers ── */

  const updateField = <K extends keyof ScheduleClassForm>(
    key: K,
    value: ScheduleClassForm[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const reset = () => {
    setForm(EMPTY_SCHEDULE_FORM);
    setError(null);
    setSuccess(false);
  };

  const selectedClass = catalog.find((c) => c.id === form.id_class) ?? null;

  /* ── Submit ── */

  const submit = async () => {
    setError(null);

    if (!form.id_class) return setError("Selecciona una clase.");
    if (!form.date) return setError("La fecha es requerida.");
    if (!form.time) return setError("La hora es requerida.");
    if (form.token < 1) return setError("Los tokens deben ser mínimo 1.");

    const selectedDateTime = new Date(`${form.date}T${form.time}`);

    if (selectedDateTime <= new Date()) {
      return setError("La fecha y hora deben ser en el futuro.");
    }

    setIsSubmitting(true);

    try {
      const body: any = {
        date: selectedDateTime.toISOString(),
        time: form.time,
        token: Number(form.token),
      };

      /* Admin puede elegir coach */

      if (userRole === "Admin" && form.id_coach) {
        body.id_coach = form.id_coach;
      }

      console.log("Body enviado:", body);

      const res = await fetch(
        `${API_URL}/class_schedule/appointment?id_class=${form.id_class}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(body),
        },
      );

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg = Array.isArray(data?.message)
          ? data.message.join(", ")
          : (data?.message ?? `Error ${res.status}`);

        throw new Error(msg);
      }

      console.log("Clase agendada:", data);

      setSuccess(true);
      onSuccess?.();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    updateField,

    catalog,
    coaches,

    loadCatalog,
    loadCoaches,

    selectedClass,

    isCatalogLoading,
    isCoachesLoading,

    catalogError,
    coachError,

    isSubmitting,
    error,
    success,

    submit,
    reset,
  };
}
