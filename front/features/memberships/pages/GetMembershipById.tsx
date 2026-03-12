import { GetMembershipById } from "@/features/memberships/services/membership.service";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function MembershipDetailPage({ params }: Props) {
  const { id } = await params;
  const m = await GetMembershipById(id);

  return (
    <main style={styles.main}>
      {/* Botón volver */}
      <Link href="/admin/dashboard/memberships" style={styles.backBtn}>
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
      </Link>

      {/* Card principal */}
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.cardHeader}>
          <div>
            <h1 style={styles.name}>{m.name}</h1>
            {m.description && <p style={styles.description}>{m.description}</p>}
          </div>
        </div>

        <div style={styles.divider} />

        {/* Métricas */}
        <div style={styles.metricsGrid}>
          <div style={styles.metric}>
            <span style={styles.metricLabel}>Precio</span>
            <span style={styles.metricValue}>
              ${Number(m.price).toFixed(2)} USD
            </span>
          </div>
          {m.durationDays && (
            <div style={styles.metric}>
              <span style={styles.metricLabel}>Duración</span>
              <span style={styles.metricValue}>{m.durationDays} días</span>
            </div>
          )}
          {m.discountPercentage ? (
            <div style={styles.metric}>
              <span style={styles.metricLabel}>Descuento</span>
              <span style={styles.metricValue}>{m.discountPercentage}%</span>
            </div>
          ) : null}
          <div style={styles.metric}>
            <span style={styles.metricLabel}>ID</span>
            <span
              style={{
                ...styles.metricValue,
                fontSize: "0.7rem",
                color: "rgba(255,255,255,0.3)",
                wordBreak: "break-all",
              }}
            >
              {m.id}
            </span>
          </div>
        </div>

        <div style={styles.divider} />

        {/* Beneficios */}
        <div style={styles.section}>
          <p style={styles.sectionLabel}>Beneficios</p>
          <div style={styles.benefitsGrid}>
            <div style={styles.benefit}>
              <span
                style={
                  m.includesSpecialClasses ? styles.checkOn : styles.checkOff
                }
              >
                {m.includesSpecialClasses ? "✓" : "✗"}
              </span>
              <span style={styles.benefitText}>Clases especiales</span>
            </div>
            <div style={styles.benefit}>
              <span
                style={m.includesCoachChat ? styles.checkOn : styles.checkOff}
              >
                {m.includesCoachChat ? "✓" : "✗"}
              </span>
              <span style={styles.benefitText}>Chat con coach</span>
            </div>
          </div>
        </div>

        <div style={styles.divider} />

        {/* Footer */}
        <div style={styles.cardFooter}>
          <Link
            href={`/admin/dashboard/memberships/${m.id}/edit`}
            style={styles.editBtn}
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path
                d="M9.5 2.5l2 2L4 12H2v-2L9.5 2.5Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Editar membresía
          </Link>
        </div>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: {
    maxWidth: 540,
    margin: "0 auto",
    padding: "2rem 1.5rem",
    fontFamily: "sans-serif",
  },
  backBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    color: "rgba(255,255,255,0.5)",
    fontSize: "0.875rem",
    textDecoration: "none",
    marginBottom: "1.5rem",
  },
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
  name: {
    margin: 0,
    fontSize: "1.3rem",
    fontWeight: 700,
    color: "#fff",
  },
  description: {
    margin: "0.4rem 0 0",
    fontSize: "0.875rem",
    color: "rgba(255,255,255,0.45)",
  },
  divider: {
    height: "1px",
    backgroundColor: "rgba(255,255,255,0.07)",
  },
  metricsGrid: {
    padding: "1.25rem 1.75rem",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1.25rem",
  },
  metric: {
    display: "flex",
    flexDirection: "column",
    gap: "0.3rem",
  },
  metricLabel: {
    fontSize: "0.7rem",
    fontWeight: 600,
    color: "rgba(255,255,255,0.3)",
    textTransform: "uppercase",
    letterSpacing: "0.07em",
  },
  metricValue: {
    fontSize: "0.95rem",
    fontWeight: 600,
    color: "#fff",
  },
  section: {
    padding: "1.25rem 1.75rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.85rem",
  },
  sectionLabel: {
    margin: 0,
    fontSize: "0.7rem",
    fontWeight: 600,
    color: "rgba(255,255,255,0.3)",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  benefitsGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
  },
  benefit: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
  },
  checkOn: { fontSize: "0.85rem", color: "#4ade80", fontWeight: 700 },
  checkOff: {
    fontSize: "0.85rem",
    color: "rgba(255,255,255,0.2)",
    fontWeight: 700,
  },
  benefitText: {
    fontSize: "0.875rem",
    color: "rgba(255,255,255,0.65)",
  },
  cardFooter: {
    padding: "1.25rem 1.75rem",
    display: "flex",
    justifyContent: "flex-end",
  },
  editBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    padding: "0.55rem 1.25rem",
    background: "#fff",
    color: "#09090b",
    borderRadius: 8,
    fontSize: "0.875rem",
    fontWeight: 600,
    textDecoration: "none",
  },
};
