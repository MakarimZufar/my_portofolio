"use client";
import Link from "next/link";
import { useState } from "react";
import { FaHome, FaInfoCircle, FaEnvelope, FaSuitcase } from "react-icons/fa"; // Import ikon tambahan untuk Projects

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-black bg-opacity-95 backdrop-blur-md p-4 rounded-lg shadow-lg w-auto">
            <div className="container mx-auto flex justify-between items-center">
                {/* Hamburger Menu (Mobile View) */}
                <button
                    onClick={toggleMenu}
                    className="sm:hidden text-gray-900 dark:text-white"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-8 h-8"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </button>

                {/* Menu Links */}
                <div
                    className={`sm:flex sm:gap-8 ${
                        isOpen ? "block" : "hidden"
                    } sm:block`}
                >
                    <Link
                        href="/"
                        className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition"
                    >
                        <FaHome size={24} />
                    </Link>
                    <Link
                        href="/about"
                        className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition"
                    >
                        <FaInfoCircle size={24} />
                    </Link>
                    <Link
                        href="/projects"
                        className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition"
                    >
                        <FaSuitcase size={24} /> {/* Ikon Projects */}
                    </Link>
                    <Link
                        href="/contact"
                        className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition"
                    >
                        <FaEnvelope size={24} />
                    </Link>
                </div>
            </div>
        </nav>
    );
}
