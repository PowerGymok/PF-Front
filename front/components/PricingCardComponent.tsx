"use client";

import { useRouter } from "next/navigation";
import { variantStyles } from "@/features/memberships/membership.styles";
import { FeatureItem } from "@/features/memberships/FeatureItem";
import { MembershipVariant } from "@/features/memberships/membership.types";

/*
  PROPS DE PRICINGCARD

  - title: nombre del plan/membresía.
  - price: precio mostrado en la card.
  - features: lista de beneficios con icono y texto.
    * premiumOnly: indica si el beneficio aplica solo a planes premium.
  - membershipVariant: tipo de membresía (Bronze, Plata, Oro, etc.).
  - highlighted: resalta visualmente la card (ej. plan recomendado).
*/
export interface PricingCardProps {
  title: string;
  price: string;
  features: {
    icon: React.ReactNode;
    text: string;
    premiumOnly?: boolean;
  }[];
  membershipVariant: MembershipVariant;
  highlighted?: boolean;
}

export function PricingCardComponent({
  title,
  price,
  features,
  membershipVariant,
  highlighted = false,
}: PricingCardProps) {
  const router = useRouter();

  /*
    ESTILOS SEGÚN VARIANTE

    - variantStyles contiene clases de Tailwind
      específicas para cada tipo de membresía.
    - Permite cambiar colores y bordes dinámicamente.
  */
  const styles = variantStyles[membershipVariant];

  /*
    NAVEGACIÓN AL REGISTRO

    - handleRegister redirige al formulario de registro.
    - Se pasa el plan seleccionado como query param (?plan=).
    - En producción: el backend debe validar el plan recibido.
  */
  const handleRegister = () => {
    router.push(`/register?plan=${membershipVariant}`);
  };

  return (
    <div
      className={`
        group
        relative
        flex
        flex-col
        justify-between
        min-h-64
        border
        ${styles.border}
        ${styles.hoverBorder}
        rounded-3xl
        p-10
        text-white
        bg-black
        transition-all
        duration-300
        hover:scale-105
        ${highlighted ? "shadow-2xl shadow-white/10" : ""}
      `}
    >
      {/* CONTENIDO SUPERIOR */}
      <div className="space-y-6">
        {/* TÍTULO DEL PLAN */}
        <div className="text-center space-y-3">
          <h2
            className={`
              text-4xl
              font-extrabold
              tracking-wide
              transition-colors
              duration-300
              ${styles.hoverText}
            `}
          >
            {title}
          </h2>
        </div>

        {/* LISTA DE FEATURES */}
        <div className="mt-10 flex justify-center">
          <div className="grid grid-cols-2 gap-y-10 gap-x-12 max-w-md">
            {features.map((feature, index) => (
              <FeatureItem
                key={index}
                icon={feature.icon}
                text={feature.text}
                membershipVariant={membershipVariant}
                hoverTextStyle={styles.hoverText}
              />
            ))}
          </div>
        </div>
      </div>

      {/* PRECIO + BOTÓN */}
      <div className="mt-12 text-center space-y-6">
        {/* PRECIO DEL PLAN */}
        <p
          className={`
            text-3xl
            font-extrabold
            tracking-wide
            transition-colors
            duration-300
            ${styles.hoverText}
          `}
        >
          {price}
        </p>

        {/* BOTÓN DE REGISTRO */}
        <button
          onClick={handleRegister}
          className="
            w-full
            py-4
            rounded-full
            border
            border-white
            font-semibold
            tracking-wide
            transition-all
            duration-300
            hover:bg-white
            hover:text-black
          "
        >
          ¡INSCRÍBETE AHORA!
        </button>
      </div>
    </div>
  );
}
