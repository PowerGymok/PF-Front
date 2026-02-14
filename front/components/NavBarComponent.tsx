// import Link from "next/link"

// export const NavBarComponent = () => {
//     return (
//         <div>
//             <nav>
//                 <ul className="flex justify-end px-10 gap-x-4 py-4">
//                     <li><Link href="/">Home</Link></li>
//                     <li><Link href="/about">About</Link></li>
//                     <li><Link href="/clases">Clases</Link></li>
//                     <li><Link href="/login">Login</Link></li>
//                 </ul>
//             </nav>
//         </div>
//     )
// }
'use client'

import Link from "next/link";
import { NavItems } from "@/utils/NavItems";
// import Image from "next/image";
import { PATHROUTES } from "@/utils/PathRoutes";

const NavBarComponent = () => {
  return (
    <div className="flex items-center justify-between h-[80px] w-full bg-black px-10">
      
      {/* Logo */}
      {/* <section className="flex items-center">
        <Image
          src="/logo.png"
          alt="Logo"
          width={180}
          height={60}
          className="object-contain"
        />
      </section> */}

      {/* Links */}
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

          <Link
            href={PATHROUTES.LOGIN}
            className="hover:text-gray-400 transition"
          >
            Login
          </Link>

        </nav>
      </section>
    </div>
  )
}

export default NavBarComponent;