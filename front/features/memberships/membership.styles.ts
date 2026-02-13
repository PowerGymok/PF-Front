import { MembershipVariant } from "./membership.types";

/*
  CONFIGURACIÓN VISUAL POR TIPO DE MEMBRESÍA

  - Este objeto define las clases de Tailwind para cada variante de membresía.
  - Se usa en PricingCard y otros componentes para aplicar estilos dinámicos.
  - En producción:
    * Puede evolucionar hacia un sistema de design tokens centralizado.
    * Facilitaría mantener consistencia visual en toda la app.
*/
export const variantStyles: Record<
  MembershipVariant,
  {
    border: string;
    hoverBorder: string;
    hoverText: string;
  }
> = {
  /*
    BRONZE
    - Color base: ámbar.
    - Hover: resalta borde y texto en tonos cálidos.
  */
  bronze: {
    border: "border-white/30",
    hoverBorder: "group-hover:border-amber-500",
    hoverText: "group-hover:text-amber-500",
  },

  /*
    SILVER
    - Color base: gris/zinc.
    - Hover: resalta borde y texto en tonos metálicos.
  */
  silver: {
    border: "border-white/30",
    hoverBorder: "group-hover:border-zinc-600",
    hoverText: "group-hover:text-zinc-600",
  },

  /*
    GOLD
    - Color base: amarillo.
    - Hover: resalta borde y texto en tonos dorados.
  */
  gold: {
    border: "border-white/30",
    hoverBorder: "group-hover:border-yellow-400",
    hoverText: "group-hover:text-yellow-400",
  },

  /*
    UNLIMITED
    - Color base: rosa intenso.
    - Hover: resalta borde y texto en tonos vibrantes.
  */
  unlimited: {
    border: "border-white/30",
    hoverBorder: "group-hover:border-rose-600",
    hoverText: "group-hover:text-rose-600",
  },

  /*
    FIRST TIME
    - Color base: verde.
    - Hover: resalta borde y texto en tonos frescos.
  */
  firstTime: {
    border: "border-white/30",
    hoverBorder: "group-hover:border-green-400",
    hoverText: "group-hover:text-green-400",
  },

  /*
    SINGLE TOKEN
    - Color base: verde.
    - Hover: resalta borde y texto en tonos frescos.
    - Similar a firstTime, pero aplicado a compras individuales.
  */
  singleToken: {
    border: "border-white/30",
    hoverBorder: "group-hover:border-green-400",
    hoverText: "group-hover:text-green-400",
  },
};
