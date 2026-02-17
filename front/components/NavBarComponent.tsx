'use client'

import Link from "next/link";
import { useState } from "react";
import { NavItems } from "@/utils/NavItems";
import { PATHROUTES } from "@/utils/PathRoutes";
import { useAuth } from "@/app/contexts/AuthContext";
import { GymLogoComponent } from "./GymLogoComponent";

const NavBarComponent = () => {
  const { dataUser, logOut, userInitial } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-black px-4 md:px-10">
      <div className="flex items-center justify-between h-[70px]">

        {/* Logo */}
        <Link href="/">
          <GymLogoComponent className="w-12 h-12 md:w-16 md:h-16" />
        </Link>

        {/* Botón hamburguesa (solo mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white md:hidden text-2xl"
        >
          ☰
        </button>

        {/* Menú desktop */}
        <nav className="hidden md:flex gap-8 text-white uppercase text-sm tracking-widest font-semibold">
          {NavItems.map((item) => (
            <Link
              key={item.id}
              href={item.route}
              className="hover:text-gray-400 transition"
            >
              {item.nameToRender}
            </Link>
          ))}
        </nav>

        {/* Auth desktop */}
        <div className="hidden md:flex text-white gap-4">
          {dataUser ? (
            <>
              <Link
                href={PATHROUTES.DASHBOARD}
                className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center font-bold"
              >
                {userInitial}
              </Link>
              <button onClick={logOut} className="hover:text-gray-400">
                Logout
              </button>
            </>
          ) : (
            <Link href={PATHROUTES.LOGIN} className="hover:text-gray-400">
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Menú mobile desplegable */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 pb-4 text-white uppercase text-sm tracking-widest">
          {NavItems.map((item) => (
            <Link
              key={item.id}
              href={item.route}
              onClick={() => setIsOpen(false)}
              className="hover:text-gray-400"
            >
              {item.nameToRender}
            </Link>
          ))}

          <div className="border-t border-gray-700 pt-4">
            {dataUser ? (
              <>
                <Link
                  href={PATHROUTES.DASHBOARD}
                  onClick={() => setIsOpen(false)}
                  className="block mb-2"
                >
                  Perfil ({userInitial})
                </Link>
                <button onClick={logOut}>Logout</button>
              </>
            ) : (
              <Link
                href={PATHROUTES.LOGIN}
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBarComponent;