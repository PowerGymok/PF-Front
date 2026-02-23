import { benefits, Benefit } from "./benefits.data";

import { Class_Icon } from "@/components/icons/Class_Icon";
import { Equipment_Icon } from "@/components/icons/Equipment_Icon";
import { Calendar_Icon } from "@/components/icons/Calendar_Icon";
import { Partner_Icon } from "@/components/icons/Partner_Icon";
import { Shower_Icon } from "@/components/icons/Shower_Icon";
import { Coach_Icon } from "@/components/icons/Coach_Icon";

const iconMap: Record<Benefit["icon"], React.ElementType> = {
  class: Class_Icon,
  equipment: Equipment_Icon,
  calendar: Calendar_Icon,
  partner: Partner_Icon,
  shower: Shower_Icon,
  coach: Coach_Icon,
};

export function BenefitsSection() {
  return (
    <section className="bg-black text-white py-24 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div
          className="
            grid
            text-center
            gap-10
            grid-cols-2
            sm:grid-cols-3
            lg:grid-cols-6
          "
        >
          {benefits.map((benefit, index) => {
            const Icon = iconMap[benefit.icon];

            return (
              <div key={index} className="flex flex-col items-center space-y-4">
                <Icon className="w-6 h-6 lg:w-8 lg:h-8 text-red-500" />

                <p className="text-xs lg:text-sm uppercase tracking-wide">
                  {benefit.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
