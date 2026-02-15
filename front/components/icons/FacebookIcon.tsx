/*
    ICON COMPONENT
  - Renderiza el icono en formato SVG.
  - Usa fill="currentColor" para adaptarse al color de texto del contenedor.
  - Props: acepta cualquier atributo estándar de <svg> (ej. width, height, className).
*/

import { SVGProps } from "react";

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="currentColor"
      {...props}
    >
      <path
        d="M0,44.99c0-1.77,0-3.54,0-5.3.05-.21.11-.42.14-.64.22-1.61.37-3.24.67-4.83C4.37,15.61,20.45,1.35,39.34.11c11.01-.72,21.03,2.16,29.55,9.21,12.86,10.64,18.27,24.49,15.15,40.87-3.31,17.37-14.16,28.41-31.14,33.37-1.22.36-2.5.54-3.79.81v-29.59h9.8c.62-4.08,1.24-8.1,1.88-12.23h-11.66c0-3.13-.2-6.17.05-9.18.28-3.27,2.45-5.1,5.76-5.29,1.79-.1,3.59-.06,5.38-.08.29,0,.59-.03.84-.04.06-.13.1-.18.1-.23,0-3.23.02-6.46,0-9.69,0-.18-.33-.49-.54-.53-3.47-.52-6.96-.85-10.48-.7-7.93.34-13.74,5.89-14.25,13.82-.23,3.6-.13,7.23-.18,10.85,0,.32,0,.65,0,1.09h-10.69v12.25h10.65v29.49c-.24-.02-.43-.02-.62-.06-7.58-1.36-14.35-4.49-20.2-9.51-7.76-6.67-12.57-15.05-14.33-25.15C.36,48.06.21,46.52,0,44.99Z"
        fill="currentColor"
      />
    </svg>
  );
}
