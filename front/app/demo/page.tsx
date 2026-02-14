import { GymLogoComponent } from "@/components/GymLogoComponent";
import { FacebookIcon } from "@/components/icons/FacebookIcon";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { TwitterIcon } from "@/components/icons/TwitterIcon";
import Image from "next/image";

export default function DemoPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8 gap-12">
      <h1 className="text-2xl font-bold">Logo SVG vs Logo Png</h1>
      <p className="text-gray-400">
        Comparación de efectos aplicados al logo como componente SVG y como
        imagen importada
      </p>

      {/* Grid comparativo */}
      <div className="grid grid-cols-2 gap-12">
        {/* Hover color */}
        <div className="flex flex-col items-center gap-2">
          <GymLogoComponent className="w-36 hover:text-red-400 transition-colors" />
          <FacebookIcon className="w-8 hover:text-blue-400 transition-colors" />
          <InstagramIcon className="w-8 hover:text-red-400 transition-colors" />
          <TwitterIcon className="w-8 hover:text-blue-400 transition-colors" />
          <span className="text-sm text-gray-400">SVG: cambia color</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Logo corporativo"
            width={150}
            height={150}
            className="hover:opacity-80 transition-opacity"
          />
          <span className="text-sm text-gray-400">
            Imagen: solo opacidad, no color interno
          </span>
        </div>

        {/* Zoom */}
        <div className="flex flex-col items-center gap-2">
          <GymLogoComponent className="w-36 text-blue-500 hover:scale-110 transition-transform duration-300" />
          <span className="text-sm text-gray-400">SVG: zoom + color</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Logo corporativo"
            width={150}
            height={150}
            className="hover:scale-110 transition-transform duration-300"
          />
          <span className="text-sm text-gray-400">
            Imagen: zoom sí funciona
          </span>
        </div>

        {/* Rotación */}
        <div className="flex flex-col items-center gap-2">
          <GymLogoComponent className="w-36 text-green-500 hover:rotate-12 transition-transform duration-300" />
          <span className="text-sm text-gray-400">SVG: rotación + color</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Logo corporativo"
            width={150}
            height={150}
            className="hover:rotate-12 transition-transform duration-300"
          />
          <span className="text-sm text-gray-400">
            Imagen: rotación sí funciona
          </span>
        </div>

        {/* Animaciones */}
        <div className="flex flex-col items-center gap-2">
          <GymLogoComponent className="w-36 text-purple-500 animate-pulse" />
          <span className="text-sm text-gray-400">SVG: pulso infinito</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Logo corporativo"
            width={150}
            height={150}
            className="animate-pulse"
          />
          <span className="text-sm text-gray-400">
            Imagen: pulso sí funciona
          </span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <GymLogoComponent className="w-36 text-orange-500 animate-spin" />
          <span className="text-sm text-gray-400">SVG: rotación continua</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Logo corporativo"
            width={150}
            height={150}
            className="animate-spin"
          />
          <span className="text-sm text-gray-400">
            Imagen: spin sí funciona
          </span>
        </div>
      </div>

      {/* Tabla comparativa */}
      <div className="w-full max-w-4xl">
        <table className="table-auto border-collapse border border-gray-700 w-full text-sm">
          <thead>
            <tr className="bg-gray-800">
              <th className="border border-gray-700 px-4 py-2">Aspecto</th>
              <th className="border border-gray-700 px-4 py-2">
                SVG Componente
              </th>
              <th className="border border-gray-700 px-4 py-2">
                Imagen (png/jpg/svg)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-700 px-4 py-2">
                Cambiar color interno
              </td>
              <td className="border border-gray-700 px-4 py-2">✔️ Sí</td>
              <td className="border border-gray-700 px-4 py-2">❌ No</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">
                Animaciones CSS
              </td>
              <td className="border border-gray-700 px-4 py-2">✔️ Sí</td>
              <td className="border border-gray-700 px-4 py-2">✔️ Limitadas</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">
                Escalabilidad
              </td>
              <td className="border border-gray-700 px-4 py-2">✔️ Perfecta</td>
              <td className="border border-gray-700 px-4 py-2">
                ❌ Puede pixelarse
              </td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">
                Peso/Performance
              </td>
              <td className="border border-gray-700 px-4 py-2">✔️ Ligero</td>
              <td className="border border-gray-700 px-4 py-2">
                ❌ Depende del tamaño
              </td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">
                Reutilización
              </td>
              <td className="border border-gray-700 px-4 py-2">✔️ Con props</td>
              <td className="border border-gray-700 px-4 py-2">❌ Estático</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
