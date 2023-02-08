import Link from "next/link";

function NavBar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/porti-fier-forjat">Porti fier forjat</Link>
                </li>
                <li>
                    <Link href="/porti-tabla-zincata">Porti tabla zincata</Link>
                </li>
                <li>
                    <Link href="/porti-aluminiu">Porti aluminiu</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;