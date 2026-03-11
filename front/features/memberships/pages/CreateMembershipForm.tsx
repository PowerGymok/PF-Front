"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import { useMembershipForm } from "@/features/memberships/hooks/useMembershipForm";
import TextField from "@/features/memberships/fields/TextField";
import ToggleField from "@/features/memberships/fields/ToogleField";

export default function MembershipForm() {
  const { dataUser, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && dataUser?.user.role !== "Admin") {
      router.replace("/");
    }
  }, [dataUser, isLoading]);

  if (isLoading)
    return (
      <div style={styles.loadingWrap}>
        <p style={styles.loadingText}>Cargando...</p>
      </div>
    );
  if (dataUser?.user.role !== "Admin") return null;

  return <MembershipFormContent />;
}

function MembershipFormContent() {
  const { form, status, message, handleChange, handleSubmit } =
    useMembershipForm();
  const router = useRouter();

  return (
    <div style={styles.wrapper}>
      {/* Botón volver */}
      <button
        type="button"
        onClick={() => router.push("/admin/dashboard/memberships")}
        style={styles.backBtn}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
        }
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M10 3L5 8l5 5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Volver a membresías
      </button>

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Header */}
        <div style={styles.formHeader}>
          <h2 style={styles.title}>Nueva membresía</h2>
          <p style={styles.subtitle}>
            Completa los campos para crear un nuevo plan
          </p>
        </div>

        <div style={styles.divider} />

        {/* Información general */}
        <div style={styles.section}>
          <p style={styles.sectionLabel}>Información general</p>
          <TextField
            label="Nombre"
            value={form.name}
            onChange={(v) => handleChange("name", v)}
            placeholder="Plan Premium"
            required
          />
          <TextField
            label="Descripción"
            value={form.description}
            onChange={(v) => handleChange("description", v)}
            type="textarea"
            placeholder="Acceso completo al gimnasio..."
          />
        </div>

        <div style={styles.divider} />

        {/* Precio y duración */}
        <div style={styles.section}>
          <p style={styles.sectionLabel}>Precio y duración</p>
          <div style={styles.row}>
            <TextField
              label="Precio (USD)"
              value={form.price}
              onChange={(v) => handleChange("price", parseFloat(v))}
              type="number"
              placeholder="29.99"
              required
              min={0}
              step={0.01}
            />
            <TextField
              label="Duración (días)"
              value={form.durationDays}
              onChange={(v) =>
                handleChange("durationDays", v ? parseInt(v) : undefined)
              }
              type="number"
              placeholder="30"
              min={1}
            />
          </div>
        </div>

        {/* <TextField
          label="Descuento (%)"
          value={form.discountPercentage}
          onChange={(v) =>
            handleChange("discountPercentage", v ? parseFloat(v) : undefined)
          }
          type="number"
          placeholder="0"
          min={0}
          step={1}
        /> */}

        <div style={styles.divider} />

        {/* Beneficios */}
        <div style={styles.section}>
          <p style={styles.sectionLabel}>Beneficios</p>
          <ToggleField
            label="Incluye clases especiales"
            checked={form.includesSpecialClasses ?? false}
            onChange={(v) => handleChange("includesSpecialClasses", v)}
          />
          <ToggleField
            label="Incluye chat con coach"
            checked={form.includesCoachChat ?? false}
            onChange={(v) => handleChange("includesCoachChat", v)}
          />
        </div>

        <div style={styles.divider} />

        {/* Footer */}
        <div style={styles.footer}>
          {message && (
            <p style={status === "success" ? styles.success : styles.error}>
              {message}
            </p>
          )}
          <div style={styles.footerBtns}>
            <button
              type="button"
              onClick={() => router.push("/admin/dashboard/memberships")}
              style={styles.cancelBtn}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")
              }
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={status === "loading"}
              style={{
                ...styles.submitBtn,
                opacity: status === "loading" ? 0.7 : 1,
              }}
            >
              {status === "loading" ? "Creando..." : "Crear membresía"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  loadingWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
  loadingText: {
    color: "rgba(255,255,255,0.4)",
    fontFamily: "sans-serif",
    fontSize: "0.9rem",
  },
  wrapper: {
    maxWidth: 540,
    margin: "0 auto",
    padding: "2rem 1.5rem",
    fontFamily: "sans-serif",
  },
  backBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    background: "none",
    border: "none",
    color: "rgba(255,255,255,0.5)",
    fontSize: "0.875rem",
    cursor: "pointer",
    padding: "0.25rem 0",
    marginBottom: "1.5rem",
    transition: "color 0.15s",
  },
  form: {
    background: "#18181b",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 14,
    overflow: "hidden",
  },
  formHeader: { padding: "1.5rem 1.75rem 1.25rem" },
  title: { margin: 0, fontSize: "1.15rem", fontWeight: 700, color: "#fff" },
  subtitle: {
    margin: "0.25rem 0 0",
    fontSize: "0.8rem",
    color: "rgba(255,255,255,0.35)",
  },
  divider: { height: "1px", backgroundColor: "rgba(255,255,255,0.07)" },
  section: {
    padding: "1.25rem 1.75rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.9rem",
  },
  sectionLabel: {
    margin: 0,
    fontSize: "0.7rem",
    fontWeight: 600,
    color: "rgba(255,255,255,0.3)",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
    alignItems: "end",
  },
  footer: {
    padding: "1.25rem 1.75rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  footerBtns: { display: "flex", gap: "0.75rem", justifyContent: "flex-end" },
  cancelBtn: {
    padding: "0.55rem 1.25rem",
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: "0.875rem",
    color: "rgba(255,255,255,0.6)",
    transition: "border-color 0.15s",
  },
  submitBtn: {
    padding: "0.55rem 1.5rem",
    background: "#fff",
    color: "#09090b",
    border: "none",
    borderRadius: 8,
    fontSize: "0.875rem",
    fontWeight: 600,
    cursor: "pointer",
  },
  success: {
    color: "#4ade80",
    margin: 0,
    fontSize: "0.85rem",
    textAlign: "right" as const,
  },
  error: {
    color: "#f87171",
    margin: 0,
    fontSize: "0.85rem",
    textAlign: "right" as const,
  },
};
