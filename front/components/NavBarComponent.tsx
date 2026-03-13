"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PATHROUTES } from "@/utils/PathRoutes";
import { useAuth } from "@/app/contexts/AuthContext";
import { GymLogoComponent } from "./GymLogoComponent";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { navAdmin } from "../utils/Navigation/navAdmin";
import { navCoach } from "../utils/Navigation/navCoach";
import { navPublic } from "../utils/Navigation/navPublic";
import { navUser } from "../utils/Navigation/navUsers";
import { PowerGym_Logo } from "../components/icons/PowerGym_Logo";

const NavBarComponent = () => {
  const { dataUser, logOut, userInitial, isLoading } = useAuth();

  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  const isAuthenticated =
    !isLoading && !!dataUser?.token && dataUser?.login === true;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const role = dataUser?.user?.role;
  const profileImg = dataUser?.user?.profileImg;

  let navItems = navPublic;

  if (role === "Admin") {
    navItems = navAdmin;
  } else if (role === "Coach") {
    navItems = navCoach;
  } else if (role === "user") {
    navItems = navUser;
  }

  return (
    <header className="w-full bg-black px-4 md:px-10">
      <div className="flex items-center justify-between h-[70px]">
        <Link href={PATHROUTES.HOME}>
          <GymLogoComponent className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24" />
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white md:hidden text-2xl"
        >
          ☰
        </button>

        <nav className="hidden md:flex gap-14 text-white text-md tracking-wide font-light">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.route}
              className={clsx(
                "hover:text-gray-300 relative transition-all duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300",
                pathname === item.route && "after:w-full"
              )}
            >
              {item.nameToRender}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex text-white gap-4">
          {isAuthenticated ? (
            <Link href={PATHROUTES.DASHBOARD}>
              {role === "Admin" ? (
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                  <PowerGym_Logo className="w-5 h-5 text-black" />
                </div>
              ) : profileImg ? (
                <Image
                  src={profileImg}
                  alt="Foto de perfil"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center font-bold">
                  {userInitial}
                </div>
              )}
            </Link>
          ) : (
            <Link
              href={PATHROUTES.LOGIN}
              className="text-md mr-4 hover:text-gray-300 relative transition-all duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 pb-4 text-white uppercase text-md tracking-widest">
          {navItems.map((item) => (
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
            {isAuthenticated ? (
              <>
                <Link
                  href={PATHROUTES.DASHBOARD}
                  onClick={() => setIsOpen(false)}
                  className="block mb-2"
                >
                  {role === "Admin" ? (
                    <Image
                      src="/images/admin-avatar.png"
                      alt="Admin"
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full object-cover inline-block mr-2"
                    />
                  ) : profileImg ? (
                    <Image
                      src={profileImg}
                      alt="Foto de perfil"
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full object-cover inline-block mr-2"
                    />
                  ) : (
                    `Perfil (${userInitial})`
                  )}
                </Link>

                <button onClick={logOut}>Logout</button>
              </>
            ) : (
              <Link href={PATHROUTES.LOGIN} onClick={() => setIsOpen(false)}>
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