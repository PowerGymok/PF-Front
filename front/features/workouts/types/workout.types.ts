export type Intensity = "BAJO" | "MEDIO" | "ALTO";

export interface Workout {
  id: number;
  name: string;
  intensity: Intensity;
  duration: number;
  spots: number;
  image: string;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  requirements: string;
}
