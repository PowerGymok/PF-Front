"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import { DeleteMembership } from "@/features/memberships/services/membership.service";

interface MembershipDeleteModalProps {
  id: string;
  name: string;
}

export default function MembershipDeleteModal({
  id,
  name,
}: MembershipDeleteModalProps) {
  const { dataUser } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<null | "loading" | "error">(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleDelete = async () => {
    setStatus("loading");
    setErrorMsg("");

    const token = dataUser?.token;

    if (!token) {
      setStatus("error");
      setErrorMsg("No hay sesión activa.");
      return;
    }

    try {
      await DeleteMembership(id, token);
      setOpen(false);
      router.push("/memberships");
    } catch (error) {
      setStatus("error");
      setErrorMsg(error instanceof Error ? error.message : "Error inesperado");
    }
  };

  return (
    <>
      <button onClick={() => setOpen(true)} style={styles.triggerBtn}>
        Eliminar membresía
      </button>

      {open && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h2 style={styles.title}>¿Eliminar membresía?</h2>
            <p style={styles.description}>
              Estás a punto de eliminar <strong>{name}</strong>. Esta acción no
              se puede deshacer.
            </p>

            {errorMsg && <p style={styles.error}>{errorMsg}</p>}

            <div style={styles.actions}>
              <button
                onClick={() => setOpen(false)}
                disabled={status === "loading"}
                style={styles.cancelBtn}
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={status === "loading"}
                style={styles.deleteBtn}
              >
                {status === "loading" ? "Eliminando..." : "Sí, eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  triggerBtn: {
    padding: "0.6rem 1rem",
    background: "#dc2626",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    fontSize: "0.9rem",
    cursor: "pointer",
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
  },
  modal: {
    background: "#fff",
    borderRadius: 10,
    padding: "2rem",
    maxWidth: 400,
    width: "90%",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    fontFamily: "sans-serif",
  },
  title: { margin: 0, fontSize: "1.2rem", fontWeight: 700 },
  description: { margin: 0, fontSize: "0.9rem", color: "#444" },
  error: { color: "red", margin: 0, fontSize: "0.85rem" },
  actions: { display: "flex", gap: "0.75rem", justifyContent: "flex-end" },
  cancelBtn: {
    padding: "0.5rem 1rem",
    background: "#f4f4f4",
    border: "1px solid #ddd",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  deleteBtn: {
    padding: "0.5rem 1rem",
    background: "#dc2626",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: "0.9rem",
  },
};
