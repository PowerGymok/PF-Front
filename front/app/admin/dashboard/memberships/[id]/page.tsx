import { GetMembershipById } from "@/features/memberships/services/membership.service";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function MembershipDetailPage({ params }: Props) {
  const { id } = await params;
  const membership = await GetMembershipById(id);

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
          color: "green",
        }}
      >
        {JSON.stringify(membership, null, 2)}
      </pre>
    </main>
  );
}
