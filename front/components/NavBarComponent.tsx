'use client'

import Link from "next/link";
import { NavItems } from "@/utils/NavItems";
import { PATHROUTES } from "@/utils/PathRoutes";
import { useAuth } from "@/app/contexts/AuthContext";
import { GymLogoComponent } from "./GymLogoComponent";

const NavBarComponent = () => {

  const {dataUser, logOut, userInitial} = useAuth();


  return (<div className="grid grid-cols-3 items-center h-[80px] w-full bg-black px-10">

  
  <div className="flex justify-start">
    <Link href={"/"}><GymLogoComponent className="w-16 h-16"/></Link>
  </div>

  
  <nav className="flex justify-center gap-8 text-white uppercase text-sm tracking-widest font-semibold">
    {NavItems.map((navigationItem) => (
      <Link
        key={navigationItem.id}
        href={navigationItem.route}
        className="hover:text-gray-400 transition"
      >
        {navigationItem.nameToRender}
      </Link>
    ))}
  </nav>

  
  <div className="flex justify-end text-white gap-4">
    {dataUser ? (
      <>
      <Link href={PATHROUTES.DASHBOARD} className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center font-bold">{userInitial}</Link>
        <button
          onClick={logOut}
          className="hover:text-gray-400 transition"
        >
          Logout
        </button>
      </>
    ) : (
      <Link
        href={PATHROUTES.LOGIN}
        className="hover:text-gray-400 transition"
      >
        Login
      </Link>
    )}
  </div>

</div>
  )
}

export default NavBarComponent;