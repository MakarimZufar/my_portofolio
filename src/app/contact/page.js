"use client";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import UnderConstructionNotification from "@/components/UnderConstructionNotifications";

export default function ContactPage() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
            < UnderConstructionNotification />
            <h1 className="text-3xl font-bold mb-6 text-center">
                Hubungi Saya
            </h1>
            <p className="text-center text-gray-700 mb-8">
                Kirimkan pesan langsung ke email saya lewat form di bawah ini.
            </p>

            {/* FORM KONTAK */}
            <form
                action="https://formsubmit.co/381995bdbef10eea6fb5b9fdf7bec572 "
                method="POST"
                className="flex flex-col gap-6 bg-black p-6 rounded-lg shadow-md w-1/2 max-w-4xl" // Mengatur lebar form
            >
                {/* Redirect setelah submit */}
                <input
                    type="hidden"
                    name="_next"
                    value="https://makarimzufar.vercel.app/thank-you"
                />

                {/* Honeypot anti spam */}
                <input type="text" name="_honey" style={{ display: "none" }} />

                <input
                    type="text"
                    name="name"
                    placeholder="Nama Kamu"
                    required
                    className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email Kamu"
                    required
                    className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <textarea
                    name="message"
                    placeholder="Pesan Kamu"
                    required
                    className="border border-gray-300 rounded px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Kirim Pesan
                </button>
            </form>

            {/* Bagian ikon sosmed */}
            <div className="flex justify-center gap-6 mt-10 text-2xl text-gray-600">
                <a
                    href="https://github.com/MakarimZufar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black"
                >
                    <FaGithub />
                </a>
                <a
                    href="https://linkedin.com/in/makarimzufar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600"
                >
                    <FaLinkedin />
                </a>
                <a
                    href="https://www.instagram.com/zufar.mkrm/"
                    className="hover:text-red-600"
                >
                    <FaInstagram />
                </a>
            </div>
        </main>
    );
}
