import { memberships } from "./membership.data";
import { MembershipCard } from "./MembershipCard";

export function MembershipSection() {
  return (
    <section className="bg-black text-white py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {memberships.map((membership) => (
            <MembershipCard key={membership.title} {...membership} />
          ))}
        </div>
      </div>
    </section>
  );
}
