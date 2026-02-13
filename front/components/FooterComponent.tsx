import Link from "next/link";

const FooterComponent = () => {
     return (
        <footer className="bg-gray-900 text-gray-300 mt-20">
            <div className="max-w-7xl mx-auto px-20 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">

                <div className="space-y-6">
                    <h1 className="text-3xl font-bold text-white">
                        PowerGym
                    </h1>

                    <p className="text-gray-400">
                        Your daily dose of glow
                    </p>

                    <div className="text-sm space-y-1 text-gray-400 py-2">
                        <p>Elegir nombre de la ciudad : </p>
                        <p>Ciudad, Estado, 12345</p>
                        <p>Email: PowerGym@gmail.com</p>
                        <p>Phone: (123) 456-7890</p>
                    </div>

                    <div className="flex gap-6 pt-4">
                        <Link href="/clases" className="hover:text-white transition">
                            Reserva
                        </Link>
                        <Link href="/login" className="hover:text-white transition">
                            Iniciar Sesión
                        </Link>
                    </div>
                </div>

                <div className="md:text-right space-y-6">
                    <h2 className="text-xl font-semibold text-white">
                        Contact Us
                    </h2>

                    <p className="text-gray-400">
                        Follow us on:
                    </p>

                    <div className="flex md:justify-end gap-6 text-sm">
                        <span className="hover:text-white cursor-pointer transition">
                            Facebook
                        </span>
                        <span className="hover:text-white cursor-pointer transition">
                            Twitter
                        </span>
                        <span className="hover:text-white cursor-pointer transition">
                            Instagram
                        </span>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-800 py-6 text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} PowerGym. All rights reserved.
            </div>
        </footer>
    )
}

export default FooterComponent;