import Link from "next/link"

export const NavBarComponent = () => {
    return (
        <div>
            <nav>
                <ul className="flex justify-end px-10 gap-x-4 py-4">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/clases">Clases</Link></li>
                    <li><Link href="/login">Login</Link></li>
                </ul>
            </nav>
        </div>
    )
}