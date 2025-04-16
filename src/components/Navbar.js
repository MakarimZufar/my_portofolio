"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="bg-gray-900 text-white shadow-md fixed top-0 z-50 w-full">
            <div className="max-w-5xl mx-auto flex justify-between items-center px-6 py-4">
                {/* Judul/logo */}
                <Link
                    href="/"
                    className="text-xl font-bold text-blue-400 hover:text-white transition"
                >
                    MyPortofolio
                </Link>

                {/* Menu navigasi */}
                <div className="flex gap-6 text-sm">
                    <Link
                        href="/"
                        className={
                            pathname === "/"
                                ? "underline text-blue-300"
                                : "hover:text-blue-300 transition"
                        }
                    >
                        Home
                    </Link>
                    <Link
                        href="/about"
                        className={
                            pathname === "/about"
                                ? "underline text-blue-300"
                                : "hover:text-blue-300 transition"
                        }
                    >
                        About
                    </Link>
                    <Link
                        href="/projects"
                        className={
                            pathname === "/projects"
                                ? "underline text-blue-300"
                                : "hover:text-blue-300 transition"
                        }
                    >
                        Projects
                    </Link>
                    <Link
                        href="/contact"
                        className={
                            pathname === "/contact"
                                ? "underline text-blue-300"
                                : "hover:text-blue-300 transition"
                        }
                    >
                        Contact
                    </Link>
                </div>
            </div>
        </nav>
    );
}
