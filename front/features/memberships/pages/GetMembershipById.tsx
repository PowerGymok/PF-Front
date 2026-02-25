import { GetMembershipById } from "@/features/memberships/services/membership.service";

interface MembershipDetailPageProps {
  params: { id: string };
}

export default async function MembershipDetailPage({
  params,
}: MembershipDetailPageProps) {
  const membership = await GetMembershipById(params.id);

  return (
    <main
      style={{
        maxWidth: 480,
        margin: "2rem auto",
        padding: "1.5rem",
        fontFamily: "sans-serif",
      }}
    >
      <h1
        style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "1.5rem" }}
      >
        Detalle de membresía
      </h1>

      <pre
        style={{
          background: "#f4f4f4",
          borderRadius: 8,
          padding: "1rem",
          fontSize: "0.85rem",
          overflowX: "auto",
        }}
      >
        {JSON.stringify(membership, null, 2)}
      </pre>
    </main>
  );
}
