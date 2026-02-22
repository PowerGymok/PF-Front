import { MembershipVariant } from "./membership.types";

interface FeatureItemProps {
  icon: React.ReactNode;
  text: string;
  premiumOnly?: boolean;
  membershipVariant: MembershipVariant;
  hoverTextStyle: string;
}

/*
  FEATURE ITEM COMPONENT

  - Componente presentacional para mostrar un beneficio individual de la membresía.
  - Separarlo permite:
    * Reutilización futura en otros contextos (ej. landing, dashboard).
    * Mantener PricingCard más limpio y enfocado.
    * Facilitar testeo unitario de cada feature.
*/
export function FeatureItem({ icon, text, hoverTextStyle }: FeatureItemProps) {
  return (
    <div className="flex flex-col items-center text-center space-y-3">
      {/* ICONO DEL FEATURE */}
      <div
        className={`
          transition-colors
          duration-300
          ${hoverTextStyle}
        `}
      >
        {icon}
      </div>

      {/* TEXTO DEL FEATURE */}
      <span
        className={`
          text-xs
          uppercase
          tracking-wide
          leading-snug
          max-w-30
          }
        `}
      >
        {text}
      </span>
    </div>
  );
}
