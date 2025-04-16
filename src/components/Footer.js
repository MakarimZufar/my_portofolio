export default function Footer() {
    return (
        <footer className="bg-black text-center text-sm text-white-600 py-4 mt-10 hover:scale-105">
            <p>
                © {new Date().getFullYear()} Zufar. Powered by: 50% Next.js, 50%
                Tailwind, 100% kopi ☕ — Jangan lupa commit sebelum tidur 😴
            </p>
        </footer>
    );
}
