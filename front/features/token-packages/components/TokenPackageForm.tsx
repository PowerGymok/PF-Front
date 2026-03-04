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
    if (!isLoading && dataUser?.user.role !== "Admin") {
      router.replace("/");
    }
  }, [dataUser, isLoading]);

  if (isLoading)
    return (
      <p style={{ fontFamily: "sans-serif", padding: "2rem" }}>Cargando...</p>
    );
  if (dataUser?.user.role !== "Admin") return null;

  return <TokenPackageFormContent />;
}

function TokenPackageFormContent() {
  const { form, status, message, handleChange, handleSubmit } =
    useTokenPackageForm();

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.title}>Nuevo paquete de tokens</h2>

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
          onChange={(v) => handleChange("price", v ? parseFloat(v) : undefined)}
          type="number"
          placeholder="9.99"
          required
          min={0}
          step={0.01}
        />
      </div>

      <button type="submit" disabled={status === "loading"} style={styles.btn}>
        {status === "loading" ? "Creando..." : "Crear paquete"}
      </button>

      {message && (
        <p style={status === "success" ? styles.success : styles.error}>
          {message}
        </p>
      )}
    </form>
  );
}

const styles: Record<string, React.CSSProperties> = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    maxWidth: 480,
    margin: "2rem auto",
    padding: "1.5rem",
    border: "1px solid #ddd",
    borderRadius: 8,
    fontFamily: "sans-serif",
  },
  title: { margin: 0, fontSize: "1.2rem" },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
  },
  btn: {
    padding: "0.6rem",
    background: "#111",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    fontSize: "0.95rem",
    cursor: "pointer",
  },
  success: { color: "green", margin: 0, fontSize: "0.9rem" },
  error: { color: "red", margin: 0, fontSize: "0.9rem" },
};
