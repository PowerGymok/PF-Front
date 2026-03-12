"use client";

import { useState, useCallback } from "react";
import type { IntensityValue } from "./useCreateClass";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* ─────────────────────────────────────────
   TIPOS
───────────────────────────────────────── */

export type Intensity = "baja" | "media" | "alta";

function normalizeIntensity(raw: string): Intensity {
  const map: Record<string, Intensity> = {
    BAJO: "baja",
    bajo: "baja",
    baja: "baja",
    MEDIO: "media",
    medio: "media",
    media: "media",
    ALTO: "alta",
    alto: "alta",
    alta: "alta",
  };
  return map[raw] ?? "baja";
}

export interface CatalogClass {
  id: string;
  name: string;
  duration: string;
  capacity: number;
  intensity: Intensity;
  description?: string;
  benefits?: string[] | null;
  requirements?: string | null;
  imgUrl?: string | null;
}

export interface EditClassForm {
  name: string;
  duration: string;
  capacity: number;
  intensity: IntensityValue;
  description: string;
  benefits: string;
  requirements: string;
}

// Mantenemos ClassToEdit por compatibilidad con BookingClient
export interface ClassToEdit {
  id: string;
  name: string;
  duration: string;
  capacity: number;
  intensity: IntensityValue;
  description?: string;
  benefits?: string[] | null;
  requirements?: string | null;
  imgUrl?: string | null;
}

/* ─────────────────────────────────────────
   HOOK
───────────────────────────────────────── */

export function useEditClass(authToken: string, onSuccess?: () => void) {
  // ── Catálogo ──
  const [catalog, setCatalog] = useState<CatalogClass[]>([]);
  const [isCatalogLoading, setIsCatalogLoading] = useState(false);
  const [catalogError, setCatalogError] = useState<string | null>(null);
  const [selectedClassId, setSelectedClassId] = useState<string>("");

  // ── Form ──
  const [form, setForm] = useState<EditClassForm | null>(null);
  const [classId, setClassId] = useState<string | null>(null);
  const [currentImgUrl, setCurrentImgUrl] = useState<string | null>(null);

  // ── Imagen ──
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // ── Estado ──
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  /* ── Cargar catálogo — devuelve los items para pre-selección ── */
  const loadCatalog = useCallback(async (): Promise<CatalogClass[]> => {
    setIsCatalogLoading(true);
    setCatalogError(null);
    try {
      const res = await fetch(`${API_URL}/clases`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      const active: CatalogClass[] = Array.isArray(data)
        ? data
            .filter((c: any) => c.isActive !== false)
            .map((c: any) => ({
              id: c.id,
              name: c.name,
              duration: c.duration,
              capacity: c.capacity,
              intensity: normalizeIntensity(c.intensity ?? "baja"),
              description: c.description ?? "",
              benefits: c.benefits ?? [],
              requirements: c.requirements ?? "",
              imgUrl: c.imgUrl ?? null,
            }))
        : [];
      setCatalog(active);
      return active;
    } catch (err: any) {
      setCatalogError(err.message);
      return [];
    } finally {
      setIsCatalogLoading(false);
    }
  }, [authToken]);

  /* ── Seleccionar clase a partir de una lista externa (para pre-selección al abrir) ── */
  const selectClassFromItems = (id: string, items: CatalogClass[]) => {
    setSelectedClassId(id);
    setError(null);
    setImageFile(null);
    setImagePreview(null);

    if (!id) {
      setForm(null);
      setClassId(null);
      setCurrentImgUrl(null);
      return;
    }

    const clase = items.find((c) => c.id === id);
    if (!clase) return;

    setClassId(clase.id);
    setCurrentImgUrl(clase.imgUrl ?? null);
    setForm({
      name: clase.name,
      duration: clase.duration,
      capacity: clase.capacity,
      intensity: clase.intensity,
      description: clase.description ?? "",
      benefits: Array.isArray(clase.benefits)
        ? clase.benefits.join(", ")
        : (clase.benefits ?? ""),
      requirements: clase.requirements ?? "",
    });
  };

  /* ── Seleccionar clase del dropdown — pre-carga el form ── */
  const selectClass = (id: string) => {
    setSelectedClassId(id);
    setError(null);
    setImageFile(null);
    setImagePreview(null);

    if (!id) {
      setForm(null);
      setClassId(null);
      setCurrentImgUrl(null);
      return;
    }

    const clase = catalog.find((c) => c.id === id);
    if (!clase) return;

    setClassId(clase.id);
    setCurrentImgUrl(clase.imgUrl ?? null);
    setForm({
      name: clase.name,
      duration: clase.duration,
      capacity: clase.capacity,
      intensity: clase.intensity,
      description: clase.description ?? "",
      benefits: Array.isArray(clase.benefits)
        ? clase.benefits.join(", ")
        : (clase.benefits ?? ""),
      requirements: clase.requirements ?? "",
    });
  };

  const reset = () => {
    setSelectedClassId("");
    setForm(null);
    setClassId(null);
    setCurrentImgUrl(null);
    setImageFile(null);
    setImagePreview(null);
    setError(null);
    setSuccess(false);
    setCatalog([]);
    setCatalogError(null);
  };

  const updateField = <K extends keyof EditClassForm>(
    key: K,
    value: EditClassForm[K],
  ) => setForm((prev) => (prev ? { ...prev, [key]: value } : prev));

  /* ── Selección de imagen ── */
  const selectImage = (file: File) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  /* ── Upload imagen ── */
  const uploadImage = async (id: string): Promise<string | null> => {
    if (!imageFile) return null;
    setIsUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      const res = await fetch(`${API_URL}/clases/${id}/image`, {
        method: "POST",
        headers: { Authorization: `Bearer ${authToken}` },
        body: formData,
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message ?? `Error ${res.status} al subir imagen`);
      }
      const data = await res.json();
      return data.imgUrl ?? data.url ?? null;
    } finally {
      setIsUploadingImage(false);
    }
  };

  /* ── Submit ── */
  const submit = async () => {
    if (!form || !classId) return;
    setError(null);

    if (!form.name.trim()) return setError("El nombre es requerido.");
    if (form.name.trim().length < 3)
      return setError("El nombre debe tener al menos 3 caracteres.");
    if (!form.duration.trim()) return setError("La duración es requerida.");
    if (form.capacity < 1) return setError("La capacidad debe ser mayor a 0.");

    setIsSubmitting(true);
    try {
      const body: Record<string, unknown> = {
        name: form.name.trim(),
        duration: form.duration.trim(),
        capacity: Number(form.capacity),
        intensity: form.intensity,
      };
      if (form.description.trim()) body.description = form.description.trim();
      if (form.benefits.trim()) {
        body.benefits = form.benefits
          .split(",")
          .map((b) => b.trim())
          .filter(Boolean);
      }
      if (form.requirements.trim())
        body.requirements = form.requirements.trim();

      const res = await fetch(`${API_URL}/clases/${classId}`, {
        method: "PUT",
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
          : (errBody?.message ?? `Error ${res.status}`);
        throw new Error(msg);
      }

      if (imageFile) {
        const newUrl = await uploadImage(classId);
        if (newUrl) setCurrentImgUrl(newUrl);
      }

      setSuccess(true);
      onSuccess?.();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // catálogo
    catalog,
    isCatalogLoading,
    catalogError,
    loadCatalog,
    selectedClassId,
    selectClass,
    selectClassFromItems,
    // form
    form,
    classId,
    currentImgUrl,
    // imagen
    imageFile,
    imagePreview,
    selectImage,
    clearImage,
    // estado
    isSubmitting,
    isUploadingImage,
    error,
    success,
    // acciones
    updateField,
    reset,
    submit,
  };
}
