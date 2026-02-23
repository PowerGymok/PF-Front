import { memberships } from "@/features/memberships/membership.data";
import { MembershipCard } from "@/features/memberships/MembershipCard";
import { BenefitsSection } from "@/features/memberships/BenefitsSection";
import { DescriptionSection } from "@/features/memberships/DescriptionSection";

export default function Memberships() {
  return (
    <main className="min-h-screen bg-black py-24 px-6">
      {/* CARDS */}
      <div className="max-w-7xl mx-auto mb-16">
        <div
          className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-4 
          gap-8
        "
        >
          {memberships.map((plan) => (
            <MembershipCard key={plan.title} {...plan} />
          ))}
        </div>
      </div>

      {/* BENEFITS */}
      <BenefitsSection />

      {/* DESCRIPTION */}
      <DescriptionSection />
    </main>
  );
}
