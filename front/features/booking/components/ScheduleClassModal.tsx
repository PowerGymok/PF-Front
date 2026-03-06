"use client";

import { useEffect } from "react";
import { useScheduleClass } from "../hooks/useScheduleClass";

interface ScheduleClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  authToken: string;
  userRole: string;
}

export default function ScheduleClassModal({
  isOpen,
  onClose,
  onSuccess,
  authToken,
  userRole,
}: ScheduleClassModalProps) {
  const {
    form,
    updateField,
    catalog,
    isCatalogLoading,
    catalogError,
    loadCatalog,
    selectedClass,
    isSubmitting,
    error,
    success,
    submit,
    reset,
  } = useScheduleClass(authToken, userRole, onSuccess);

  /* Cargar catálogo al abrir */
  useEffect(() => {
    if (!isOpen) return;

    reset();
    loadCatalog();
  }, [isOpen, authToken]);

  /* Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isSubmitting) onClose();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, isSubmitting, onClose]);

  /* Auto cerrar tras éxito */
  useEffect(() => {
    if (success) {
      const t = setTimeout(onClose, 1500);
      return () => clearTimeout(t);
    }
  }, [success, onClose]);

  if (!isOpen) return null;

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
        onClick={() => !isSubmitting && onClose()}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="schedule-modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div
          className="relative w-full max-w-md bg-[#111] border border-white/10 rounded-2xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/8">
            <div>
              <h2
                id="schedule-modal-title"
                className="text-white font-semibold text-sm"
              >
                Programar clase
              </h2>

              <p className="text-white/35 text-xs mt-0.5">
                Selecciona del catálogo y asigna fecha y hora
              </p>
            </div>

            <button
              onClick={onClose}
              disabled={isSubmitting}
              aria-label="Cerrar"
              className="w-7 h-7 flex items-center justify-center rounded-lg text-white/35 hover:text-white hover:bg-white/8 transition-colors disabled:opacity-40"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M1 1l10 10M11 1L1 11"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Body */}
          {!success ? (
            <div className="px-6 py-5 space-y-4">
              {(error || catalogError) && (
                <ErrorBanner message={error ?? catalogError ?? ""} />
              )}

              {/* Selector del catálogo */}
              <Field label="Clase" required>
                {isCatalogLoading ? (
                  <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-t-transparent border-white/30 animate-spin" />
                    <span className="text-white/30 text-sm">
                      Cargando catálogo...
                    </span>
                  </div>
                ) : catalogError ? (
                  <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-red-500/8 border border-red-500/20">
                    <span className="text-red-400/80 text-sm">
                      No se pudo cargar el catálogo
                    </span>

                    <button
                      onClick={loadCatalog}
                      className="text-xs text-white/40 hover:text-white/70 underline"
                    >
                      Reintentar
                    </button>
                  </div>
                ) : (
                  <select
                    value={form.id_class}
                    onChange={(e) => updateField("id_class", e.target.value)}
                    className={`${inputCls} ${
                      !form.id_class ? "text-white/25" : "text-white"
                    }`}
                  >
                    <option value="" disabled>
                      Selecciona una clase...
                    </option>

                    {catalog.length === 0 ? (
                      <option disabled>No hay clases disponibles</option>
                    ) : (
                      catalog.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} — {c.duration} min
                        </option>
                      ))
                    )}
                  </select>
                )}
              </Field>

              {/* Preview clase */}
              {selectedClass && (
                <div className="rounded-xl bg-white/4 border border-white/8 px-4 py-3 space-y-1">
                  <p className="text-white text-sm font-medium">
                    {selectedClass.name}
                  </p>

                  <div className="flex items-center gap-3 text-white/35 text-xs">
                    <span>⏱ {selectedClass.duration} min</span>
                    <span>·</span>
                    <span>👥 {selectedClass.capacity} cupos</span>

                    {selectedClass.description && (
                      <>
                        <span>·</span>
                        <span className="truncate">
                          {selectedClass.description}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Fecha y hora */}
              <div className="grid grid-cols-2 gap-3">
                <Field label="Fecha" required>
                  <input
                    type="date"
                    value={form.date}
                    min={today}
                    onChange={(e) => updateField("date", e.target.value)}
                    className={inputCls}
                  />
                </Field>

                <Field label="Hora" required>
                  <input
                    type="time"
                    value={form.time}
                    onChange={(e) => updateField("time", e.target.value)}
                    className={inputCls}
                  />
                </Field>
              </div>

              {/* Tokens */}
              <Field
                label="Tokens requeridos"
                required
                hint="costo para usuario"
              >
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={form.token}
                  onChange={(e) =>
                    updateField(
                      "token",
                      Math.max(1, Number(e.target.value) || 1),
                    )
                  }
                  className={inputCls}
                />
              </Field>

              <div className="pt-1">
                <button
                  onClick={() => {
                    if (!isSubmitting) submit();
                  }}
                  disabled={
                    isSubmitting ||
                    !form.id_class ||
                    !form.date ||
                    !form.time ||
                    isCatalogLoading
                  }
                  className={primaryBtn}
                >
                  {isSubmitting ? (
                    <Spinner label="Programando..." />
                  ) : (
                    "Programar clase"
                  )}
                </button>
              </div>
            </div>
          ) : (
            <SuccessState
              title="Clase programada"
              subtitle={`${selectedClass?.name ?? ""} · ${form.date} a las ${form.time}`}
            />
          )}

          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        </div>
      </div>
    </>
  );
}

/* COMPONENTES AUXILIARES */

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 text-[11px] font-medium text-white/45 uppercase tracking-wider">
        {label}
        {required && <span className="text-white/20">*</span>}
        {hint && (
          <span className="normal-case text-white/25 ml-1">— {hint}</span>
        )}
      </label>

      {children}
    </div>
  );
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="rounded-xl bg-red-500/8 border border-red-500/20 px-4 py-3 flex gap-2 items-start">
      <span className="text-red-400">⚠</span>
      <p className="text-red-400/90 text-sm">{message}</p>
    </div>
  );
}

function Spinner({ label }: { label: string }) {
  return (
    <span className="flex items-center justify-center gap-2">
      <span className="w-4 h-4 rounded-full border-2 border-t-transparent border-black/40 animate-spin" />
      {label}
    </span>
  );
}

function SuccessState({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="px-6 py-10 flex flex-col items-center gap-3 text-center">
      <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
        ✓
      </div>

      <p className="text-white font-semibold">{title}</p>
      <p className="text-white/40 text-sm">{subtitle}</p>
    </div>
  );
}

const inputCls =
  "w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-sm " +
  "placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-[#222]";

const primaryBtn =
  "w-full flex items-center justify-center bg-white text-black text-sm font-semibold " +
  "py-2.5 px-4 rounded-xl hover:bg-white/90 active:scale-[.98] transition-all " +
  "disabled:opacity-40 disabled:cursor-not-allowed";
