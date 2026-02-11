import Image from "next/image"
import Link from "next/link"

export default function HomeComponent() {
    return (
        <div className="px-4 md:px-10 mt-10">
            <div className="relative w-full h-[300px] md:h-[450px] lg:h-[600px]">
                <Image src="/imagen_fondoPowerGym.jpg" alt="Imagen de fondo" fill className="object-cover rounded-2xl" />
                <div className="absolute inset-0 flex items-center justify-center top-50">
                    <Link href="/" className="px-4 py-2 text-white rounded-md mt-4 transition hover:scale-105 md:top[70%]">Reserva Ahora</Link>
                </div>
                
            </div>
        </div>
    )
}
