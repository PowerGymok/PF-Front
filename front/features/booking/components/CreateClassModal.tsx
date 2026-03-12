"use client";

import { useEffect } from "react";
import { useCreateClass, type IntensityValue } from "../hooks/useCreateClass";

interface CreateClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  authToken: string;
}

const INTENSITIES: {
  value: IntensityValue;
  label: string;
  color: string;
  dot: string;
}[] = [
  {
    value: "baja",
    label: "Baja",
    color: "text-emerald-400",
    dot: "bg-emerald-400",
  },
  {
    value: "media",
    label: "Media",
    color: "text-amber-400",
    dot: "bg-amber-400",
  },
  { value: "alta", label: "Alta", color: "text-red-400", dot: "bg-red-400" },
];

export default function CreateClassModal({
  isOpen,
  onClose,
  onSuccess,
  authToken,
}: CreateClassModalProps) {
  const { form, updateField, isSubmitting, error, success, submit, reset } =
    useCreateClass(authToken, onSuccess);

  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isSubmitting) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, isSubmitting, onClose]);

  useEffect(() => {
    if (success) {
      const t = setTimeout(onClose, 1500);
      return () => clearTimeout(t);
    }
  }, [success, onClose]);

  if (!isOpen) return null;

  const selectedIntensity = INTENSITIES.find((i) => i.value === form.intensity);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
        onClick={() => !isSubmitting && onClose()}
      />

      {/* Panel — scrollable por si el contenido es largo */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div
          className="relative w-full max-w-md bg-[#111] border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-t-2xl" />

          {/* ── Header (fijo) ── */}
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/8 flex-shrink-0">
            <div>
              <h2
                id="create-modal-title"
                className="text-white font-semibold text-sm"
              >
                Nueva clase al catálogo
              </h2>
              <p className="text-white/35 text-xs mt-0.5">
                Se guardará como plantilla reutilizable
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

          {/* ── Body (scrollable) ── */}
          {!success ? (
            <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">
              {error && <ErrorBanner message={error} />}

              {/* ════ CAMPOS REQUERIDOS ════ */}
              <SectionLabel text="Información requerida" />

              <Field label="Nombre" required>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="ej. Power HIIT, Yoga Flow..."
                  maxLength={50}
                  autoFocus
                  className={inputCls}
                />
                <p className="text-right text-white/20 text-xs mt-1">
                  {form.name.length}/50
                </p>
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Duración" required hint="ej: 60 o 45 min">
                  <input
                    type="text"
                    value={form.duration}
                    onChange={(e) => updateField("duration", e.target.value)}
                    placeholder="60"
                    maxLength={10}
                    className={inputCls}
                  />
                </Field>

                <Field label="Capacidad" required>
                  <input
                    type="number"
                    min={1}
                    max={500}
                    value={form.capacity}
                    onChange={(e) =>
                      updateField(
                        "capacity",
                        Math.max(1, parseInt(e.target.value) || 1),
                      )
                    }
                    className={inputCls}
                  />
                </Field>
              </div>

              <Field label="Intensidad" required>
                <div className="grid grid-cols-3 gap-2">
                  {INTENSITIES.map((i) => (
                    <button
                      key={i.value}
                      type="button"
                      onClick={() => updateField("intensity", i.value)}
                      className={`
                        flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl
                        border text-sm font-medium transition-all
                        ${
                          form.intensity === i.value
                            ? `bg-white/8 border-white/25 ${i.color}`
                            : "bg-white/3 border-white/8 text-white/35 hover:border-white/15 hover:text-white/60"
                        }
                      `}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          form.intensity === i.value ? i.dot : "bg-white/20"
                        }`}
                      />
                      {i.label}
                    </button>
                  ))}
                </div>
              </Field>

              {/* ════ CAMPOS OPCIONALES ════ */}
              <div className="pt-1">
                <SectionLabel text="Información opcional" />
              </div>

              <Field label="Descripción">
                <textarea
                  value={form.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="Descripción breve de la clase..."
                  rows={3}
                  maxLength={200}
                  className={`${inputCls} resize-none`}
                />
                <p className="text-right text-white/20 text-xs mt-1">
                  {form.description.length}/200
                </p>
              </Field>

              <Field label="Beneficios" hint="separados por coma">
                <input
                  type="text"
                  value={form.benefits}
                  onChange={(e) => updateField("benefits", e.target.value)}
                  placeholder="ej. Cardio, Fuerza, Flexibilidad"
                  className={inputCls}
                />
                {/* Preview de tags */}
                {form.benefits.trim() && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {form.benefits
                      .split(",")
                      .map((b) => b.trim())
                      .filter(Boolean)
                      .map((b, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-white/8 border border-white/10 text-white/60 text-xs"
                        >
                          {b}
                        </span>
                      ))}
                  </div>
                )}
              </Field>

              <Field label="Requisitos">
                <input
                  type="text"
                  value={form.requirements}
                  onChange={(e) => updateField("requirements", e.target.value)}
                  placeholder="ej. Ropa cómoda, Tapete de yoga"
                  maxLength={300}
                  className={inputCls}
                />
              </Field>

              {/* Preview resumen */}
              {form.name.trim() && (
                <div className="rounded-xl bg-white/3 border border-white/8 px-4 py-3">
                  <p className="text-white/50 text-xs font-medium uppercase tracking-wider mb-2">
                    Vista previa
                  </p>
                  <p className="text-white text-sm font-medium truncate">
                    {form.name}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1">
                    <span className="text-white/30 text-xs">
                      {form.duration} min
                    </span>
                    <span className="text-white/15 text-xs">·</span>
                    <span className="text-white/30 text-xs">
                      {form.capacity} cupos
                    </span>
                    {selectedIntensity && (
                      <>
                        <span className="text-white/15 text-xs">·</span>
                        <span
                          className={`text-xs flex items-center gap-1 ${selectedIntensity.color}`}
                        >
                          <span
                            className={`w-1 h-1 rounded-full ${selectedIntensity.dot}`}
                          />
                          {selectedIntensity.label}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* ── Éxito ── */
            <div className="px-6 py-10 flex flex-col items-center gap-3 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4 10l4 4 8-8"
                    stroke="#34d399"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-white font-semibold">
                Clase agregada al catálogo
              </p>
              <p className="text-white/40 text-sm">
                "{form.name}" ya está disponible para programar
              </p>
            </div>
          )}

          {/* ── Footer con botón (fijo) ── */}
          {!success && (
            <div className="px-6 py-4 border-t border-white/8 flex-shrink-0">
              <button
                onClick={submit}
                disabled={
                  isSubmitting || !form.name.trim() || !form.duration.trim()
                }
                className={primaryBtn}
              >
                {isSubmitting ? <Spinner /> : "Guardar en catálogo"}
              </button>
            </div>
          )}

          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent rounded-b-2xl" />
        </div>
      </div>
    </>
  );
}

/* ── Subcomponents ── */

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <p className="text-[11px] font-semibold text-white/30 uppercase tracking-widest whitespace-nowrap">
        {text}
      </p>
      <div className="flex-1 h-px bg-white/8" />
    </div>
  );
}

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
        {required && <span className="text-white/20 font-normal">*</span>}
        {hint && (
          <span className="normal-case font-normal text-white/25 tracking-normal ml-0.5">
            — {hint}
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="rounded-xl bg-red-500/8 border border-red-500/20 px-4 py-3 flex gap-2 items-start">
      <span className="text-red-400 flex-shrink-0 text-sm mt-0.5">⚠</span>
      <p className="text-red-400/90 text-sm leading-relaxed">{message}</p>
    </div>
  );
}

function Spinner() {
  return (
    <span className="flex items-center justify-center gap-2">
      <span className="w-4 h-4 rounded-full border-2 border-t-transparent border-black/40 animate-spin" />
      Guardando...
    </span>
  );
}

const inputCls =
  "w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-sm " +
  "placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/7 " +
  "transition-colors [color-scheme:dark]";

const primaryBtn =
  "w-full flex items-center justify-center bg-white text-black text-sm font-semibold " +
  "py-2.5 px-4 rounded-xl hover:bg-white/90 active:scale-[.98] transition-all " +
  "disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100";
