"use client";

import { useState } from "react";
import type { IntensityValue } from "./useCreateClass";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* ─────────────────────────────────────────
   TIPOS
───────────────────────────────────────── */

export interface EditClassForm {
  name: string;
  duration: string;
  capacity: number;
  intensity: IntensityValue;
  description: string;
  benefits: string; // string separado por comas (igual que CreateClass)
  requirements: string;
}

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
  const [form, setForm] = useState<EditClassForm | null>(null);
  const [classId, setClassId] = useState<string | null>(null);
  const [currentImgUrl, setCurrentImgUrl] = useState<string | null>(null);

  // imagen seleccionada (aún no subida)
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  /* ── Inicializar con datos de la clase a editar ── */
  const load = (clase: ClassToEdit) => {
    setClassId(clase.id);
    setCurrentImgUrl(clase.imgUrl ?? null);
    setImageFile(null);
    setImagePreview(null);
    setError(null);
    setSuccess(false);
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
    setForm(null);
    setClassId(null);
    setCurrentImgUrl(null);
    setImageFile(null);
    setImagePreview(null);
    setError(null);
    setSuccess(false);
  };

  const updateField = <K extends keyof EditClassForm>(
    key: K,
    value: EditClassForm[K],
  ) => setForm((prev) => (prev ? { ...prev, [key]: value } : prev));

  /* ── Selección de imagen local (preview sin subir aún) ── */
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

  /* ── Subir imagen a Cloudinary via backend ── */
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
      // El backend devuelve { imgUrl, cloudinaryId } o similar
      return data.imgUrl ?? data.url ?? null;
    } finally {
      setIsUploadingImage(false);
    }
  };

  /* ── Submit: PUT /clases/:id + imagen opcional ── */
  const submit = async () => {
    if (!form || !classId) return;
    setError(null);

    if (!form.name.trim()) return setError("El nombre es requerido.");
    if (form.name.trim().length < 3)
      return setError("El nombre debe tener al menos 3 caracteres.");
    if (!form.duration.trim()) return setError("La duración es requerida.");
    if (form.capacity < 1) return setError("La capacidad debe ser mayor a 0.");
    if (!form.intensity) return setError("La intensidad es requerida.");

    setIsSubmitting(true);
    try {
      // 1. Actualizar datos de la clase
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
          : (errBody?.message ?? `Error ${res.status} al actualizar`);
        throw new Error(msg);
      }

      // 2. Subir imagen si hay una nueva seleccionada
      if (imageFile) {
        const newImgUrl = await uploadImage(classId);
        if (newImgUrl) setCurrentImgUrl(newImgUrl);
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
    form,
    classId,
    currentImgUrl,
    imageFile,
    imagePreview,
    isSubmitting,
    isUploadingImage,
    error,
    success,
    load,
    reset,
    updateField,
    selectImage,
    clearImage,
    submit,
  };
}
