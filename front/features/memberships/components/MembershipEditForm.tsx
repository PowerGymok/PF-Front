"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import { MembershipResponse } from "@/features/memberships/validators/membershipSchema";
import { useMembershipEditForm } from "@/features/memberships/hooks/useMembershipEditForm";
import TextField from "@/features/memberships/fields/TextField";
import ToggleField from "@/features/memberships/fields/ToogleField";

interface MembershipEditFormProps {
  membership: MembershipResponse;
}

export default function MembershipEditForm({
  membership,
}: MembershipEditFormProps) {
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

  return <MembershipEditFormContent membership={membership} />;
}

function MembershipEditFormContent({ membership }: MembershipEditFormProps) {
  const { form, status, message, handleChange, handleSubmit } =
    useMembershipEditForm(membership);

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.title}>Editar membresía</h2>

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

      <TextField
        label="Descuento (%)"
        value={form.discountPercentage}
        onChange={(v) =>
          handleChange("discountPercentage", v ? parseFloat(v) : undefined)
        }
        type="number"
        placeholder="0"
        min={0}
        step={1}
      />

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

      <button type="submit" disabled={status === "loading"} style={styles.btn}>
        {status === "loading" ? "Guardando..." : "Guardar cambios"}
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
