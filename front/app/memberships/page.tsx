import { GetMemberships } from "@/features/memberships/services/membership.service";
import { GetTokenPackages } from "@/features/token-packages/services/tokenPackageService";
import { MembershipCard } from "@/features/memberships/components/MembershipCard";
import { TokenPackageCard } from "@/features/token-packages/components/TokenPackageCard";
import { mapToMembershipCard } from "@/features/memberships/utils/membership.mapper";
import { mapToTokenPackageCard } from "@/features/token-packages/utils/tokenpackage.mapper";
import { BenefitsSection } from "@/features/memberships/components/BenefitsSection";
import { DescriptionSection } from "@/features/memberships/components/DescriptionSection";

export default async function MembershipsPage() {
  const [memberships, tokenPackages] = await Promise.all([
    GetMemberships(),
    GetTokenPackages(),
  ]);

  const membershipCards = memberships.map(mapToMembershipCard);
  const tokenCards = tokenPackages.map(mapToTokenPackageCard);

  return (
    <main className="bg-black">
      <DescriptionSection />

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        {/* Membresías */}
        <div className="max-w-7xl mx-auto mb-10">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Planes de membresía
          </h1>
          <div className="mt-2 h-0.5 w-16 bg-red-500" />
        </div>

        <div className="max-w-7xl mx-auto">
          {membershipCards.length === 0 ? (
            <p className="text-white/50 text-center py-12">
              No hay membresías disponibles.
            </p>
          ) : (
            <div
              className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              style={{
                gridTemplateColumns: `repeat(${Math.min(membershipCards.length, 4)}, minmax(0, 1fr))`,
              }}
            >
              {membershipCards.map((card) => (
                <MembershipCard key={card.title} {...card} />
              ))}
            </div>
          )}
        </div>

        {/* Divisor */}
        <div className="max-w-7xl mx-auto my-16 h-px bg-white/10" />

        {/* Token Packages */}
        <div className="max-w-7xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Paquetes de tokens
          </h2>
          <div className="mt-2 h-0.5 w-16 bg-red-500" />
        </div>

        <div className="max-w-7xl mx-auto">
          {tokenCards.length === 0 ? (
            <p className="text-white/50 text-center py-12">
              No hay paquetes disponibles.
            </p>
          ) : (
            <div
              className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              style={{
                gridTemplateColumns: `repeat(${Math.min(tokenCards.length, 4)}, minmax(0, 1fr))`,
              }}
            >
              {tokenCards.map((card) => (
                <TokenPackageCard key={card.id} {...card} />
              ))}
            </div>
          )}
        </div>
      </section>

      <BenefitsSection />
    </main>
  );
}
