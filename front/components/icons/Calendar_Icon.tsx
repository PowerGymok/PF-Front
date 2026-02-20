/*
    ICON COMPONENT
  - Renderiza el icono en formato SVG.
  - Usa fill="currentColor" para adaptarse al color de texto del contenedor.
  - Props: acepta cualquier atributo estándar de <svg> (ej. width, height, className).
*/

import { SVGProps } from "react";

export function Calendar_Icon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
      {...props}
    >
      <path
        d="M405.33,42.67h-21.33v-21.33c0-11.78-9.55-21.33-21.33-21.33s-21.33,9.55-21.33,21.33v21.33h-170.67v-21.33c0-11.78-9.55-21.33-21.33-21.33s-21.33,9.55-21.33,21.33v21.33h-21.33C47.79,42.74.07,90.45,0,149.33v256c.07,58.88,47.79,106.6,106.67,106.67h298.67c58.88-.07,106.6-47.79,106.67-106.67V149.33c-.07-58.88-47.79-106.6-106.67-106.67ZM42.67,149.33c0-35.35,28.65-64,64-64h298.67c35.35,0,64,28.65,64,64v21.33H42.67v-21.33ZM405.33,469.33H106.67c-35.35,0-64-28.65-64-64v-192h426.67v192c0,35.35-28.65,64-64,64Z"
        fill="currentColor"
      />
    </svg>
  );
}
