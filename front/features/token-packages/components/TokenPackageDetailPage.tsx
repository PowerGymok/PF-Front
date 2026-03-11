"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import { GetAdminTokenPackages } from "@/features/token-packages/services/tokenPackageService";
import { TokenPackageAdminResponse } from "@/features/token-packages/validators/Tokenpackageschema";

export default function TokenPackageDetailPage() {
  const { dataUser } = useAuth();
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [pkg, setPkg] = useState<TokenPackageAdminResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = dataUser?.token;
    if (!token) return;

    GetAdminTokenPackages(token)
      .then((list) => {
        const found = list.find((p) => p.id === id);
        if (!found) setError("Paquete no encontrado.");
        else setPkg(found);
      })
      .catch((err) => setError(err.message ?? "Error al cargar el paquete"))
      .finally(() => setLoading(false));
  }, [dataUser?.token, id]);

  return (
    <div style={styles.wrapper}>
      {/* Botón volver */}
      <button
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

      {loading && <p style={styles.muted}>Cargando...</p>}
      {!loading && error && <p style={styles.errorText}>{error}</p>}

      {!loading && pkg && (
        <div style={styles.card}>
          {/* Header */}
          <div style={styles.cardHeader}>
            <div>
              <h1 style={styles.title}>{pkg.name}</h1>
              {pkg.description && (
                <p style={styles.description}>{pkg.description}</p>
              )}
            </div>
            <span
              style={{
                ...styles.badge,
                ...(pkg.isActive ? styles.badgeActive : styles.badgeInactive),
              }}
            >
              {pkg.isActive ? "Activo" : "Inactivo"}
            </span>
          </div>

          <div style={styles.divider} />

          {/* Métricas */}
          <div style={styles.section}>
            <p style={styles.sectionLabel}>Detalles del paquete</p>
            <div style={styles.metricsGrid}>
              <div style={styles.metricBox}>
                <span style={styles.metricLabel}>Tokens</span>
                <span style={styles.metricValue}>🪙 {pkg.tokenAmount}</span>
              </div>
              <div style={styles.metricBox}>
                <span style={styles.metricLabel}>Precio</span>
                <span style={styles.metricValue}>
                  ${Number(pkg.price).toFixed(2)} USD
                </span>
              </div>
              <div style={styles.metricBox}>
                <span style={styles.metricLabel}>Estado</span>
                <span
                  style={{
                    ...styles.metricValue,
                    color: pkg.isActive ? "#4ade80" : "#f87171",
                  }}
                >
                  {pkg.isActive ? "Activo" : "Inactivo"}
                </span>
              </div>
              <div style={styles.metricBox}>
                <span style={styles.metricLabel}>ID</span>
                <span
                  style={{
                    ...styles.metricValue,
                    fontSize: "0.7rem",
                    wordBreak: "break-all",
                  }}
                >
                  {pkg.id}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    maxWidth: 580,
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
  muted: { color: "rgba(255,255,255,0.4)", fontSize: "0.9rem" },
  errorText: { color: "#f87171", fontSize: "0.9rem" },
  card: {
    background: "#18181b",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 14,
    overflow: "hidden",
  },
  cardHeader: {
    padding: "1.5rem 1.75rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "1rem",
  },
  title: { margin: 0, fontSize: "1.2rem", fontWeight: 700, color: "#fff" },
  description: {
    margin: "0.4rem 0 0",
    fontSize: "0.85rem",
    color: "rgba(255,255,255,0.4)",
    lineHeight: 1.5,
  },
  badge: {
    fontSize: "0.7rem",
    fontWeight: 600,
    padding: "0.2rem 0.6rem",
    borderRadius: 999,
    flexShrink: 0,
  },
  badgeActive: { background: "rgba(74,222,128,0.15)", color: "#4ade80" },
  badgeInactive: { background: "rgba(248,113,113,0.15)", color: "#f87171" },
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
  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "0.75rem",
  },
  metricBox: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 10,
    padding: "0.9rem 1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.3rem",
  },
  metricLabel: {
    fontSize: "0.7rem",
    color: "rgba(255,255,255,0.3)",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },
  metricValue: { fontSize: "0.95rem", fontWeight: 600, color: "#fff" },
};
