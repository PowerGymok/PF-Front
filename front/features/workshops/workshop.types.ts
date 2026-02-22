/*
  INTENSITY TYPE

  - Define los niveles de intensidad posibles para un workshop.
  - Se usa como contrato fuerte en TypeScript para evitar valores inválidos.
  - En producción:
    * Puede mapearse a un ENUM en base de datos.
*/
export type Intensity = "BAJO" | "MEDIO" | "ALTO";

/*
  WORKSHOP INTERFACE

  - Representa la estructura de datos de una clase en la aplicación.
  - En producción:
    * id debe provenir de la base de datos.
    * coach debería ser relación (workshop -> coach_id -> tabla coaches).
    * spotsAvailable debe actualizarse mediante lógica transaccional segura.
*/
export interface Workshop {
  id: number;
  title: string;
  description: string;
  intensity: Intensity;
  coach: string;
  image: string;
  capacity: number;
  spotsAvailable: number;
  time: string;
  date: string;
}
