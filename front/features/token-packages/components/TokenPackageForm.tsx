"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import { useTokenPackageForm } from "@/features/token-packages/hooks/useTokenPackageForm";
import TextField from "@/features/token-packages/fields/TextField";

export default function TokenPackageForm() {
  const { dataUser, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && dataUser?.user.role !== "Admin") router.replace("/");
  }, [dataUser, isLoading]);

  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <p
          style={{
            color: "rgba(255,255,255,0.4)",
            fontFamily: "sans-serif",
            fontSize: "0.9rem",
          }}
        >
          Cargando...
        </p>
      </div>
    );
  if (dataUser?.user.role !== "Admin") return null;

  return <TokenPackageFormContent />;
}

function TokenPackageFormContent() {
  const { form, status, message, handleChange, handleSubmit } =
    useTokenPackageForm();
  const router = useRouter();

  return (
    <div style={styles.wrapper}>
      {/* Botón volver — va al dashboard, no a la lista */}
      <button
        type="button"
        onClick={() => router.push("/admin/dashboard/token-packages")}
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
        Volver a paquetes
      </button>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formHeader}>
          <h2 style={styles.title}>Nuevo paquete de tokens</h2>
          <p style={styles.subtitle}>
            Completa los campos para crear un nuevo paquete
          </p>
        </div>

        <div style={styles.divider} />

        <div style={styles.section}>
          <p style={styles.sectionLabel}>Información general</p>
          <TextField
            label="Nombre"
            value={form.name}
            onChange={(v) => handleChange("name", v)}
            placeholder="Starter Pack"
            required
          />
          <TextField
            label="Descripción"
            value={form.description}
            onChange={(v) => handleChange("description", v)}
            type="textarea"
            placeholder="Ideal para probar clases especiales..."
          />
        </div>

        <div style={styles.divider} />

        <div style={styles.section}>
          <p style={styles.sectionLabel}>Precio y tokens</p>
          <div style={styles.row}>
            <TextField
              label="Cantidad de tokens"
              value={form.tokenAmount}
              onChange={(v) =>
                handleChange("tokenAmount", v ? parseInt(v) : undefined)
              }
              type="number"
              placeholder="100"
              required
              min={1}
              step={1}
            />
            <TextField
              label="Precio (USD)"
              value={form.price}
              onChange={(v) =>
                handleChange("price", v ? parseFloat(v) : undefined)
              }
              type="number"
              placeholder="9.99"
              required
              min={0}
              step={0.01}
            />
          </div>
        </div>

        <div style={styles.divider} />

        <div style={styles.footer}>
          {message && (
            <p style={status === "success" ? styles.success : styles.error}>
              {message}
            </p>
          )}
          <div style={styles.footerBtns}>
            <button
              type="button"
              onClick={() => router.push("/admin/dashboard/token-packages")}
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
              {status === "loading" ? "Creando..." : "Crear paquete"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
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
