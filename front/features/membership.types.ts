/*
  MEMBERSHIP VARIANT TYPE

  - Define los tipos de membresía disponibles en la aplicación.
  - Se usa como contrato fuerte en TypeScript para evitar valores inválidos.
  - En producción:
    * Puede mapearse directamente a un ENUM en base de datos.
    * Facilita validación y consistencia entre frontend y backend.
*/
export type MembershipVariant =
  | "bronze" // Plan básico, tokens limitados, beneficios iniciales.
  | "silver" // Plan intermedio, más tokens y acceso ampliado.
  | "gold" // Plan avanzado, incluye beneficios premium.
  | "unlimited" // Acceso ilimitado mensual, todos los beneficios.
  | "firstTime" // Plan de prueba para nuevos usuarios.
  | "singleToken"; // Compra individual de tokens, flexible y puntual.
