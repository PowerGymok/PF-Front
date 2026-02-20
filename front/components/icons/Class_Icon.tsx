/*
    ICON COMPONENT
  - Renderiza el icono en formato SVG.
  - Usa fill="currentColor" para adaptarse al color de texto del contenedor.
  - Props: acepta cualquier atributo estándar de <svg> (ej. width, height, className).
*/

import { SVGProps } from "react";

export function Class_Icon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
      {...props}
    >
      <path
        d="M512,202.66c0,29.46-23.87,53.33-53.33,53.33s-53.33-23.87-53.33-53.33,23.87-53.33,53.33-53.33,53.33,23.87,53.33,53.33ZM352,0c-17.69,0-32,14.31-32,32v117.33h-128.59c-44.74,0-84.95,24.85-104.94,64.85L3.38,380.34c-7.89,15.81-1.49,35.03,14.31,42.94,15.47,7.81,34.99,1.64,42.94-14.31l76.48-152.98h14.85l86.83,154.34c8.7,15.53,28.46,20.78,43.56,12.2,15.4-8.66,20.86-28.18,12.2-43.58l-69.18-122.98h94.61v138.66c0,17.66,14.31,32,32,32s32-14.34,32-32V32c0-17.69-14.31-32-32-32h.02Z"
        fill="currentColor"
      />
    </svg>
  );
}
