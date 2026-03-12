import { GetMembershipById } from "@/features/memberships/services/membership.service";
import MembershipEditForm from "@/features/memberships/components/MembershipEditForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function MembershipEditPage({ params }: Props) {
  const { id } = await params;
  const membership = await GetMembershipById(id);

  return (
    <main style={{ maxWidth: 480, margin: "2rem auto", padding: "1.5rem" }}>
      <MembershipEditForm membership={membership} />
    </main>
  );
}
