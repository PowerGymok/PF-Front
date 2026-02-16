'use client'

import Link from "next/link";
import { NavItems } from "@/utils/NavItems";
import { PATHROUTES } from "@/utils/PathRoutes";
import { useAuth } from "@/app/contexts/AuthContext";

const NavBarComponent = () => {

  const {dataUser, logOut, userInitial} = useAuth();


  return (
    <div className="flex items-center justify-between h-[80px] w-full bg-black px-10">

      <section>
        <nav className="flex gap-8 items-center text-white uppercase text-sm tracking-widest font-semibold">

          {NavItems.map((navigationItem)=>(
            <Link
              key={navigationItem.id}
              href={navigationItem.route}
              className="hover:text-gray-400 transition"
            >
              {navigationItem.nameToRender}
            </Link>
          ))}
          {dataUser ? (
            <div className="flex items-center gap-4">
              <span className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold">
                {userInitial}
              </span>
              <button

                onClick={logOut}
                className="hover:text-gray-400 transition"
              >
                Logout
              </button>
            </div>
          ) : (

          <Link
            href={PATHROUTES.LOGIN}
            className="hover:text-gray-400 transition"
          >
            Login
          </Link>
          )}
        </nav>
      </section>
    </div>
  )
}

export default NavBarComponent;