import Link from "next/link";
import { GymLogoComponent } from "./GymLogoComponent";
import { Facebook_Icon } from "./icons/Facebook_Icon";
import { Twitter_Icon } from "./icons/Twitter_Icon";
import { Instagram_Icon } from "./icons/Instagram_Icon";
const FooterComponent = () => {
  return (
    <footer className="bg-black text-gray-400 mt-24">
      <div className="max-w-7xl mx-auto px-8 md:px-20 py-20 grid grid-cols-1 md:grid-cols-2 gap-16">

        {/* LEFT */}
        <div className="space-y-8">
          <Link href="/" className="flex items-center gap-3 group">
            <GymLogoComponent className="w-20 text-white" />
          </Link>

          <p className="text-gray-500 font-light tracking-wide">
            Disciplina. Comunidad. Rendimiento.
          </p>

          <div className="text-sm space-y-2 text-gray-600 font-light">
            <p>Puebla, México</p>
            <p>Email: contact@powergym.com</p>
            <p>Phone: +52 222 000 0000</p>
          </div>

          <div className="flex gap-8 pt-6">
            <Link
              href="/workouts"
              className="relative text-white font-light after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            >
              Reserva
            </Link>

            <Link
              href="/login"
              className="relative text-white font-light after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="md:text-right space-y-8">
          <h2 className="text-2xl font-light text-white tracking-wide">
            Síguenos
          </h2>

          <div className="flex md:justify-end gap-10">

            <Link
              href="#"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            >
              <Facebook_Icon className="w-5 h-5" />
              <span>Facebook</span>
            </Link>

            <Link
              href="#"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            >
              <Twitter_Icon className="w-5 h-5" />
              <span>Twitter</span>
            </Link>

            <Link
              href="#"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            >
              <Instagram_Icon className="w-5 h-5" />
              <span>Instagram</span>
            </Link>

          </div>
        </div>
      </div>

      <div className="border-t border-neutral-900 py-8 text-center text-sm text-gray-600 font-light tracking-wide">
        © {new Date().getFullYear()} PowerGym. All rights reserved.
      </div>
    </footer>
  );
};

export default FooterComponent;