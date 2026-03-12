"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import {
  DeleteTokenPackage,
  ActivateTokenPackage,
} from "@/features/token-packages/services/tokenPackageService";
import { TokenPackageAdminResponse } from "@/features/token-packages/validators/Tokenpackageschema";

interface Props {
  tokenPackage: TokenPackageAdminResponse;
  onDeleted: (id: string) => void;
  onRestored?: (id: string) => void;
}

export default function TokenPackageAdminCard({
  tokenPackage,
  onDeleted,
  onRestored,
}: Props) {
  const { dataUser } = useAuth();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleDelete = async () => {
    const token = dataUser?.token;
    if (!token) return;
    setDeleting(true);
    try {
      await DeleteTokenPackage(tokenPackage.id, token);
      setShowModal(false);
      onDeleted(tokenPackage.id);
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : "Error inesperado");
    } finally {
      setDeleting(false);
    }
  };

  const handleRestore = async () => {
    const token = dataUser?.token;
    if (!token) return;
    setRestoring(true);
    setErrorMsg("");
    try {
      await ActivateTokenPackage(tokenPackage.id, token);
      onRestored?.(tokenPackage.id);
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : "Error inesperado");
    } finally {
      setRestoring(false);
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
          <span style={styles.infoChip}>
            🪙 {tokenPackage.tokenAmount} tokens
          </span>
          <span style={styles.infoChip}>
            ${Number(tokenPackage.price).toFixed(2)} USD
          </span>
        </div>

        {tokenPackage.description && (
          <p style={styles.description}>{tokenPackage.description}</p>
        )}

        <div style={styles.divider} />

        {errorMsg && <p style={styles.error}>{errorMsg}</p>}

        <div style={styles.actions}>
          {tokenPackage.isActive ? (
            <>
              <button
                style={styles.btnVer}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")
                }
                onClick={() =>
                  router.push(
                    `/admin/dashboard/token-packages/${tokenPackage.id}`,
                  )
                }
              >
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M7 2.5C4 2.5 1.5 7 1.5 7S4 11.5 7 11.5 12.5 7 12.5 7 10 2.5 7 2.5Z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="7"
                    cy="7"
                    r="1.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                </svg>
                Ver
              </button>
              <button
                style={styles.btnEliminar}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(220,38,38,0.15)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
                onClick={() => setShowModal(true)}
              >
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2 3.5h10M5 3.5V2.5h4v1M5.5 6v4M8.5 6v4M3 3.5l.7 7.5h6.6L11 3.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Eliminar
              </button>
            </>
          ) : (
            <button
              style={restoring ? styles.btnRestoring : styles.btnReactivar}
              disabled={restoring}
              onMouseEnter={(e) =>
                !restoring &&
                (e.currentTarget.style.backgroundColor =
                  "rgba(74,222,128,0.15)")
              }
              onMouseLeave={(e) =>
                !restoring &&
                (e.currentTarget.style.backgroundColor = "transparent")
              }
              onClick={handleRestore}
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2 7a5 5 0 1 1 1.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <path
                  d="M2 4v3h3"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {restoring ? "Reactivando..." : "Reactivar"}
            </button>
          )}
        </div>
      </div>

      {showModal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h2 style={styles.modalTitle}>¿Eliminar paquete?</h2>
            <p style={styles.modalDesc}>
              Estás a punto de eliminar{" "}
              <strong style={{ color: "#fff" }}>{tokenPackage.name}</strong>.
              Esta acción no se puede deshacer.
            </p>
            {errorMsg && <p style={styles.error}>{errorMsg}</p>}
            <div style={styles.modalActions}>
              <button
                onClick={() => setShowModal(false)}
                disabled={deleting}
                style={styles.cancelBtn}
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                style={styles.confirmBtn}
              >
                {deleting ? "Eliminando..." : "Sí, eliminar"}
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
    background: "#18181b",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 14,
    padding: "1.25rem 1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    fontFamily: "sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "0.5rem",
  },
  name: { margin: 0, fontSize: "1rem", fontWeight: 700, color: "#fff" },
  badge: {
    fontSize: "0.7rem",
    fontWeight: 600,
    padding: "0.2rem 0.6rem",
    borderRadius: 999,
    flexShrink: 0,
  },
  badgeActive: { background: "rgba(74,222,128,0.15)", color: "#4ade80" },
  badgeInactive: { background: "rgba(248,113,113,0.15)", color: "#f87171" },
  info: { display: "flex", flexWrap: "wrap", gap: "0.4rem" },
  infoChip: {
    fontSize: "0.78rem",
    color: "rgba(255,255,255,0.5)",
    background: "rgba(255,255,255,0.06)",
    padding: "0.2rem 0.6rem",
    borderRadius: 6,
  },
  description: {
    margin: 0,
    fontSize: "0.8rem",
    color: "rgba(255,255,255,0.4)",
    lineHeight: 1.5,
  },
  divider: { height: "1px", backgroundColor: "rgba(255,255,255,0.07)" },
  actions: { display: "flex", gap: "0.5rem" },
  btnVer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.35rem",
    padding: "0.5rem",
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 8,
    fontSize: "0.8rem",
    fontWeight: 500,
    color: "rgba(255,255,255,0.7)",
    cursor: "pointer",
  },
  btnEliminar: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.35rem",
    padding: "0.5rem",
    background: "transparent",
    border: "1px solid rgba(220,38,38,0.4)",
    borderRadius: 8,
    fontSize: "0.8rem",
    fontWeight: 500,
    color: "#f87171",
    cursor: "pointer",
    transition: "background-color 0.15s",
  },
  btnReactivar: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.35rem",
    padding: "0.5rem",
    background: "transparent",
    border: "1px solid rgba(74,222,128,0.4)",
    borderRadius: 8,
    fontSize: "0.8rem",
    fontWeight: 500,
    color: "#4ade80",
    cursor: "pointer",
    transition: "background-color 0.15s",
  },
  btnRestoring: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.35rem",
    padding: "0.5rem",
    background: "transparent",
    border: "1px solid rgba(74,222,128,0.2)",
    borderRadius: 8,
    fontSize: "0.8rem",
    fontWeight: 500,
    color: "rgba(74,222,128,0.4)",
    cursor: "not-allowed",
  },
  error: { color: "#f87171", margin: 0, fontSize: "0.85rem" },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
  },
  modal: {
    background: "#18181b",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 14,
    padding: "2rem",
    maxWidth: 400,
    width: "90%",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  modalTitle: { margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "#fff" },
  modalDesc: { margin: 0, fontSize: "0.9rem", color: "rgba(255,255,255,0.5)" },
  modalActions: { display: "flex", gap: "0.75rem", justifyContent: "flex-end" },
  cancelBtn: {
    padding: "0.5rem 1rem",
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: "0.875rem",
    color: "rgba(255,255,255,0.6)",
  },
  confirmBtn: {
    padding: "0.5rem 1rem",
    background: "#dc2626",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: "0.875rem",
  },
};
