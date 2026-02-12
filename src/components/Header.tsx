import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Header() {
    return (
        <header style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '2rem 0',
            marginBottom: '3rem',
        }}>
            <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>
                <Link href="/" style={{ textDecoration: 'none' }}>
                    Asci Labs
                </Link>
            </div>

            <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <Link href="/" style={{ fontSize: '1rem', fontWeight: 500 }}>
                    Home
                </Link>
                <Link href="/about" style={{ fontSize: '1rem', fontWeight: 500 }}>
                    About
                </Link>
                <ThemeToggle />
            </nav>
        </header>
    );
}
