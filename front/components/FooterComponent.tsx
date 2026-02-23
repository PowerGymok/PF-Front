import Link from "next/link";
import { GymLogoComponent } from "./GymLogoComponent";
import { Facebook_Icon } from "./icons/Facebook_Icon";
import { Twitter_Icon } from "./icons/Twitter_Icon";
import { Instagram_Icon } from "./icons/Instagram_Icon";

const FooterComponent = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-20 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <Link href="/" className="relative flex items-center gap-2 group">
            <GymLogoComponent className="w-30 text-white transition-colors duration-300 group-hover:text-red-400" />
            <span
              className="text-xl font-bold text-white relative
               after:content-[''] after:block after:w-0 after:h-0.5
               after:bg-red-500 after:transition-all after:duration-300
               group-hover:after:w-full"
            ></span>
          </Link>

          <p className="text-gray-400">Your daily dose of glow</p>

          <div className="text-sm space-y-1 text-gray-400 py-2">
            <p>Elegir nombre de la ciudad : </p>
            <p>Ciudad, Estado, 12345</p>
            <p>Email: PowerGym@gmail.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>

          <div className="flex gap-6 pt-4">
            <Link href="/booking" className="hover:text-white transition">
              Reserva
            </Link>
            <Link href="/login" className="hover:text-white transition">
              Iniciar Sesión
            </Link>
          </div>
        </div>

        <div className="md:text-right space-y-6">
          <h2 className="text-xl font-semibold text-white">Contact Us</h2>

          <p className="text-gray-400">Follow us on:</p>

          <div className="flex md:justify-end gap-6 text-sm">
            <span className="flex items-center gap-2 cursor-pointer transition hover:text-white relative">
              <Facebook_Icon className="w-5 h-5 text-blue-400" />
              <span className="after:content-[''] after:block after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full">
                Facebook
              </span>
            </span>
            <span className="flex items-center gap-2 cursor-pointer transition hover:text-white relative">
              <Twitter_Icon className="w-5 h-5 text-blue-400" />
              <span className="after:content-[''] after:block after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full">
                Twitter
              </span>
            </span>
            <span className="flex items-center gap-2 cursor-pointer transition hover:text-white relative">
              <Instagram_Icon className="w-5 h-5 text-red-400" />
              <span className="after:content-[''] after:block after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full">
                Instagram
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} PowerGym. All rights reserved.
      </div>
    </footer>
  );
};

export default FooterComponent;
