"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useEditClass } from "../hooks/useEditClass";
import type { IntensityValue } from "../hooks/useCreateClass";

interface EditClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  authToken: string;
  preselectedId?: string;
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

export default function EditClassModal({
  isOpen,
  onClose,
  onSuccess,
  authToken,
  preselectedId,
}: EditClassModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownTriggerRef = useRef<HTMLButtonElement>(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });

  const openDropdown = useCallback(() => {
    if (dropdownTriggerRef.current) {
      const rect = dropdownTriggerRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + 6,
        left: rect.left,
        width: rect.width,
      });
    }
    setDropdownOpen(true);
  }, []);

  const {
    catalog,
    isCatalogLoading,
    catalogError,
    loadCatalog,
    selectedClassId,
    selectClass,
    selectClassFromItems,
    form,
    currentImgUrl,
    imagePreview,
    selectImage,
    clearImage,
    isSubmitting,
    isUploadingImage,
    error,
    success,
    updateField,
    reset,
    submit,
  } = useEditClass(authToken, onSuccess);

  useEffect(() => {
    if (!isOpen) return;
    reset();
    if (preselectedId) {
      loadCatalog().then((items) => selectClassFromItems(preselectedId, items));
    } else {
      loadCatalog();
    }
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

  const isBusy = isSubmitting || isUploadingImage;
  const selectedIntensity = INTENSITIES.find(
    (i) => i.value === form?.intensity,
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!/image\/(jpeg|jpg|png|webp)/.test(file.type)) {
      alert("Formato inválido. Usa JPG, PNG o WebP.");
      return;
    }
    if (file.size > 1024 * 1024) {
      alert("La imagen debe pesar menos de 1MB.");
      return;
    }
    selectImage(file);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
        onClick={() => !isBusy && onClose()}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div
          className="relative w-full max-w-md bg-[#111] border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-t-2xl" />

          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/8 flex-shrink-0">
            <div>
              <h2
                id="edit-modal-title"
                className="text-white font-semibold text-sm"
              >
                Editar clase del catálogo
              </h2>
              <p className="text-white/35 text-xs mt-0.5">
                Selecciona una clase y modifica sus datos
              </p>
            </div>
            <button
              onClick={onClose}
              disabled={isBusy}
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
            <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">
              {error && <ErrorBanner message={error} />}

              {/* ── SELECTOR DE CLASE ── */}
              <Field label="Clase a editar" required>
                {isCatalogLoading ? (
                  <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-t-transparent border-white/30 animate-spin" />
                    <span className="text-white/30 text-sm">Cargando...</span>
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
                ) : preselectedId && selectedClassId ? (
                  /* Clase pre-seleccionada: solo mostrar nombre, sin dropdown */
                  <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-white text-sm truncate">
                      {catalog.find((c) => c.id === selectedClassId)?.name ??
                        "Cargando..."}
                    </span>
                    <span className="text-white/25 text-xs flex-shrink-0 ml-2">
                      {catalog.find((c) => c.id === selectedClassId)?.duration}{" "}
                      min
                    </span>
                  </div>
                ) : (
                  <div className="relative">
                    <button
                      ref={dropdownTriggerRef}
                      type="button"
                      onClick={() =>
                        dropdownOpen ? setDropdownOpen(false) : openDropdown()
                      }
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm hover:border-white/20 transition-colors ${!selectedClassId ? "text-white/25" : "text-white"}`}
                    >
                      <span className="truncate">
                        {selectedClassId
                          ? catalog.find((c) => c.id === selectedClassId)
                              ?.name +
                            " — " +
                            catalog.find((c) => c.id === selectedClassId)
                              ?.duration +
                            " min"
                          : "Selecciona una clase..."}
                      </span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        className={`flex-shrink-0 ml-2 text-white/30 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                      >
                        <path
                          d="M2 4l4 4 4-4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    {dropdownOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-[60]"
                          onClick={() => setDropdownOpen(false)}
                        />
                        <div
                          className="fixed z-[61] bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                          style={{
                            top: dropdownPos.top,
                            left: dropdownPos.left,
                            width: dropdownPos.width,
                          }}
                        >
                          <div className="max-h-52 overflow-y-auto">
                            {catalog.map((c) => (
                              <button
                                key={c.id}
                                type="button"
                                onClick={() => {
                                  selectClass(c.id);
                                  setDropdownOpen(false);
                                }}
                                className={`w-full text-left px-3.5 py-2.5 text-sm transition-colors flex items-center justify-between gap-2
                                ${
                                  selectedClassId === c.id
                                    ? "bg-white/10 text-white"
                                    : "text-white/60 hover:bg-white/6 hover:text-white"
                                }`}
                              >
                                <span className="truncate">{c.name}</span>
                                <span className="text-white/30 text-xs flex-shrink-0">
                                  {c.duration} min
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </Field>

              {/* ── FORM — solo visible tras seleccionar clase ── */}
              {form && (
                <>
                  {/* IMAGEN */}
                  <SectionLabel text="Imagen de portada" />
                  <div className="space-y-2">
                    {(imagePreview ?? currentImgUrl) && (
                      <div className="relative rounded-xl overflow-hidden h-36 bg-white/5 border border-white/10">
                        <img
                          src={imagePreview ?? currentImgUrl!}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                        {imagePreview && (
                          <div className="absolute top-2 right-2 flex gap-1.5">
                            <span className="text-[10px] bg-amber-500/20 border border-amber-500/30 text-amber-400 px-2 py-0.5 rounded-full font-medium">
                              Nueva imagen
                            </span>
                            <button
                              onClick={clearImage}
                              className="w-5 h-5 flex items-center justify-center rounded-full bg-black/60 text-white/60 hover:text-white transition-colors"
                            >
                              <svg
                                width="8"
                                height="8"
                                viewBox="0 0 8 8"
                                fill="none"
                              >
                                <path
                                  d="M1 1l6 6M7 1L1 7"
                                  stroke="currentColor"
                                  strokeWidth="1.4"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-dashed border-white/15 text-white/35 text-sm hover:border-white/30 hover:text-white/60 transition-all"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M7 1v8M4 4l3-3 3 3M2 10v2a1 1 0 001 1h8a1 1 0 001-1v-2"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {imagePreview
                        ? "Cambiar imagen"
                        : currentImgUrl
                          ? "Reemplazar imagen"
                          : "Subir imagen"}
                      <span className="text-white/20 text-xs">
                        JPG, PNG, WebP · máx 1MB
                      </span>
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>

                  {/* INFORMACIÓN REQUERIDA */}
                  <SectionLabel text="Información requerida" />

                  <Field label="Nombre" required>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      maxLength={50}
                      className={inputCls}
                    />
                    <p className="text-right text-white/20 text-xs mt-1">
                      {form.name.length}/50
                    </p>
                  </Field>

                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Duración" required hint="minutos">
                      <input
                        type="text"
                        value={form.duration}
                        onChange={(e) =>
                          updateField("duration", e.target.value)
                        }
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
                            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${form.intensity === i.value ? i.dot : "bg-white/20"}`}
                          />
                          {i.label}
                        </button>
                      ))}
                    </div>
                  </Field>

                  {/* INFORMACIÓN OPCIONAL */}
                  <div className="pt-1">
                    <SectionLabel text="Información opcional" />
                  </div>

                  <Field label="Descripción">
                    <textarea
                      value={form.description}
                      onChange={(e) =>
                        updateField("description", e.target.value)
                      }
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
                      className={inputCls}
                    />
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
                      onChange={(e) =>
                        updateField("requirements", e.target.value)
                      }
                      maxLength={300}
                      className={inputCls}
                    />
                  </Field>

                  {/* Preview */}
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
                </>
              )}
            </div>
          ) : (
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
              <p className="text-white font-semibold">Clase actualizada</p>
              <p className="text-white/40 text-sm">
                "{form?.name}" fue guardada correctamente
              </p>
            </div>
          )}

          {/* Footer */}
          {!success && form && (
            <div className="px-6 py-4 border-t border-white/8 flex-shrink-0">
              <button
                onClick={submit}
                disabled={isBusy || !form.name.trim() || !form.duration.trim()}
                className={primaryBtn}
              >
                {isUploadingImage ? (
                  <Spinner label="Subiendo imagen..." />
                ) : isSubmitting ? (
                  <Spinner label="Guardando..." />
                ) : (
                  "Guardar cambios"
                )}
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

function Spinner({ label }: { label: string }) {
  return (
    <span className="flex items-center justify-center gap-2">
      <span className="w-4 h-4 rounded-full border-2 border-t-transparent border-black/40 animate-spin" />
      {label}
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
