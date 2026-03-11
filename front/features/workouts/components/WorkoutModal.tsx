"use client";

import { useEffect, useState } from "react";
import { Workout } from "../types/workout.types";
import { getIntensityStyles } from "../styles/workout.styles";
import WorkoutMeta from "./WorkoutMeta";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface WorkoutModalProps {
  workout: Workout;
  onClose: () => void;
  onDeleted?: (id: string) => void;
  onEditRequest?: (workout: Workout) => void;
}

export default function WorkoutModal({
  workout,
  onClose,
  onDeleted,
  onEditRequest,
}: WorkoutModalProps) {
  const router = useRouter();
  const intensityStyles = getIntensityStyles(workout.intensity);
  const { dataUser, isLoading } = useAuth();

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const role = dataUser?.user?.role as string | undefined;
  const isAdminOrCoach = role === "Admin" || role === "Coach";

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Reset confirm si se cambia de workout
  useEffect(() => {
    setConfirmDelete(false);
    setDeleteError(null);
  }, [workout.id]);

  const handleBooking = () => {
    if (dataUser) router.push("/booking");
    else router.push("/login");
  };

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    setIsDeleting(true);
    setDeleteError(null);
    try {
      const res = await fetch(`${API_URL}/clases/delete/${workout.id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${dataUser?.token}` },
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message ?? `Error ${res.status}`);
      }
      onDeleted?.(workout.id);
      onClose();
    } catch (err: any) {
      setDeleteError(err.message);
      setConfirmDelete(false);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#111] rounded-2xl border ${intensityStyles.border} shadow-2xl animate-scaleIn`}
      >
        {/* Hero */}
        <div className="relative h-56 overflow-hidden rounded-t-2xl">
          <img
            src={workout.image}
            alt={workout.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/20 to-black/80" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white w-9 h-9 rounded-full flex items-center justify-center transition"
          >
            ✕
          </button>

          <div className="absolute bottom-5 left-6">
            <h2 className="text-3xl font-bold text-white mt-3">
              {workout.name}
            </h2>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-6 text-zinc-300">
          <div className="bg-zinc-900 rounded-xl p-4">
            <WorkoutMeta workout={workout} variant="modal" />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-2">
              Sobre el entrenamiento
            </h4>
            <p className="text-sm leading-relaxed text-zinc-400">
              {workout.fullDescription}
            </p>
          </div>

          {workout.benefits.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">
                ¿Qué vas a lograr?
              </h4>
              <ul className="flex flex-col gap-2">
                {workout.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <span
                      className={`w-2 h-2 rounded-full ${intensityStyles.bg}`}
                    />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-sm text-zinc-400">
            {workout.requirements || "Sin requisitos especiales"}
          </div>

          {/* Error eliminar */}
          {deleteError && (
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 flex gap-2 items-start">
              <span className="text-red-400 text-sm mt-0.5">⚠</span>
              <p className="text-red-400/90 text-sm">{deleteError}</p>
            </div>
          )}

          {/* CTAs según rol */}
          {isAdminOrCoach ? (
            <div className="flex flex-col gap-3 mt-2">
              {/* Editar */}
              <button
                onClick={() => onEditRequest?.(workout)}
                className="cursor-pointer py-3 text-sm font-semibold rounded-lg border border-white/20 text-white/70 hover:border-white hover:text-white transition-all"
              >
                EDITAR
              </button>

              {/* Eliminar con doble confirmación */}
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className={`cursor-pointer py-3 text-sm font-semibold rounded-lg border transition-all
                  ${
                    confirmDelete
                      ? "border-rose-400 bg-rose-400/10 text-rose-300 animate-pulse"
                      : "border-red-500 text-red-500 hover:bg-red-500/10"
                  } disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                {isDeleting
                  ? "Eliminando..."
                  : confirmDelete
                    ? "¿Confirmar eliminación?"
                    : "ELIMINAR"}
              </button>

              {confirmDelete && !isDeleting && (
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="text-xs text-white/30 hover:text-white/60 transition-colors text-center"
                >
                  Cancelar
                </button>
              )}
            </div>
          ) : (
            /* CTA usuario normal */
            <button
              onClick={handleBooking}
              className={`cursor-pointer mt-2 py-3 text-sm font-semibold rounded-lg border transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-95 ${intensityStyles.button}`}
            >
              {dataUser ? "Agendar Lugar →" : "Inicia Sesión para Agendar →"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
