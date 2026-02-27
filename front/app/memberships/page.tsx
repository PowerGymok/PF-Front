import { GetMemberships } from "@/features/memberships/services/membership.service";
import { MembershipCard } from "@/features/memberships/components/MembershipCard";
import { mapToMembershipCard } from "@/features/memberships/utils/membership.mapper";
import { BenefitsSection } from "@/features/memberships/components/BenefitsSection";
import { DescriptionSection } from "@/features/memberships/components/DescriptionSection";

export default async function MembershipsPage() {
  const memberships = await GetMemberships();
  const cards = memberships.map(mapToMembershipCard);

  return (
    <main className="bg-black">
      <DescriptionSection />

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <div className="max-w-7xl mx-auto mb-10">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Planes de membresía
          </h1>
          <div className="mt-2 h-0.5 w-16" />
        </div>

        {/* Cards */}
        <div className="max-w-7xl mx-auto">
          {cards.length === 0 ? (
            <p className="text-white/50 text-center py-12">
              No hay membresías disponibles.
            </p>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {cards.map((card) => (
                <MembershipCard key={card.title} {...card} />
              ))}
            </div>
          )}
        </div>
      </section>

      <BenefitsSection />
    </main>
  );
}
