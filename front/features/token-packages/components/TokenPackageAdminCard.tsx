"use client";

import { useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { DeleteTokenPackage } from "@/features/token-packages/services/tokenPackageService";
import { TokenPackageAdminResponse } from "@/features/token-packages/validators/Tokenpackageschema";

interface TokenPackageAdminCardProps {
  tokenPackage: TokenPackageAdminResponse;
  onDeleted: (id: string) => void;
}

export default function TokenPackageAdminCard({
  tokenPackage,
  onDeleted,
}: TokenPackageAdminCardProps) {
  const { dataUser } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState<null | "loading" | "error">(
    null,
  );
  const [errorMsg, setErrorMsg] = useState("");

  const handleDelete = async () => {
    setDeleteStatus("loading");
    setErrorMsg("");

    const token = dataUser?.token;
    if (!token) {
      setDeleteStatus("error");
      setErrorMsg("No hay sesión activa.");
      return;
    }

    try {
      await DeleteTokenPackage(tokenPackage.id, token);
      setShowModal(false);
      onDeleted(tokenPackage.id);
    } catch (error) {
      setDeleteStatus("error");
      setErrorMsg(error instanceof Error ? error.message : "Error inesperado");
    }
  };

  return (
    <>
      <div style={styles.card}>
        <div style={styles.header}>
          <h3 style={styles.name}>{tokenPackage.name}</h3>
          <span
            style={{
              ...styles.badge,
              ...(tokenPackage.isActive
                ? styles.badgeActive
                : styles.badgeInactive),
            }}
          >
            {tokenPackage.isActive ? "Activo" : "Inactivo"}
          </span>
        </div>

        <div style={styles.info}>
          <span>🪙 {tokenPackage.tokenAmount} tokens</span>
          <span>${Number(tokenPackage.price).toFixed(2)} USD</span>
        </div>

        {tokenPackage.description && (
          <p style={styles.description}>{tokenPackage.description}</p>
        )}

        <button onClick={() => setShowModal(true)} style={styles.deleteBtn}>
          Eliminar
        </button>
      </div>

      {showModal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h2 style={styles.modalTitle}>¿Eliminar paquete?</h2>
            <p style={styles.modalDesc}>
              Estás a punto de eliminar <strong>{tokenPackage.name}</strong>.
              Esta acción no se puede deshacer.
            </p>

            {errorMsg && <p style={styles.error}>{errorMsg}</p>}

            <div style={styles.modalActions}>
              <button
                onClick={() => setShowModal(false)}
                disabled={deleteStatus === "loading"}
                style={styles.cancelBtn}
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteStatus === "loading"}
                style={styles.confirmBtn}
              >
                {deleteStatus === "loading" ? "Eliminando..." : "Sí, eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    border: "1px solid #e5e7eb",
    borderRadius: 10,
    padding: "1.25rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    fontFamily: "sans-serif",
    background: "#fff",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "0.5rem",
  },
  name: { margin: 0, fontSize: "1rem", fontWeight: 700, color: "#111" },
  badge: {
    fontSize: "0.7rem",
    fontWeight: 600,
    padding: "0.2rem 0.6rem",
    borderRadius: 999,
    flexShrink: 0,
  },
  badgeActive: { background: "#dcfce7", color: "#16a34a" },
  badgeInactive: { background: "#fee2e2", color: "#dc2626" },
  info: {
    display: "flex",
    gap: "1rem",
    fontSize: "0.85rem",
    color: "#555",
  },
  description: { margin: 0, fontSize: "0.825rem", color: "#777" },
  deleteBtn: {
    padding: "0.5rem",
    background: "#fff",
    color: "#dc2626",
    border: "1px solid #dc2626",
    borderRadius: 6,
    fontSize: "0.85rem",
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
  modalTitle: { margin: 0, fontSize: "1.1rem", fontWeight: 700 },
  modalDesc: { margin: 0, fontSize: "0.9rem", color: "#444" },
  error: { color: "red", margin: 0, fontSize: "0.85rem" },
  modalActions: { display: "flex", gap: "0.75rem", justifyContent: "flex-end" },
  cancelBtn: {
    padding: "0.5rem 1rem",
    background: "#f4f4f4",
    border: "1px solid #ddd",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  confirmBtn: {
    padding: "0.5rem 1rem",
    background: "#dc2626",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: "0.9rem",
  },
};
