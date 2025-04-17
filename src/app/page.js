"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion"; // Import Framer Motion

export default function HomePage() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen px-6 sm:px-20 py-16 gap-6 text-center bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
            {/* Animasi untuk Foto/Avatar */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
            >
                <Image
                    src="/boy_profile.png"
                    alt="Foto saya"
                    width={150}
                    height={150}
                    className="rounded-full border-4 border-white dark:border-gray-700 shadow-lg"
                />
            </motion.div>

            {/* Animasi untuk Perkenalan */}
            <motion.h1
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, type: "spring" }}
                className="text-3xl sm:text-4xl font-bold"
            >
                Halo, saya Makarim Zufar Prambudyo 👋
            </motion.h1>

            {/* Animasi untuk Deskripsi */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-xl"
            >
                Saya adalah seorang pengembang web yang sedang belajar Next.js,
                Tailwind CSS, dan Git. Ini adalah proyek portofolio pribadi
                saya.
            </motion.p>

            {/* Tombol navigasi dengan animasi fade-in */}
            <div className="flex flex-wrap justify-center gap-4 mt-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    <Link
                        href="/projects"
                        className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 dark:hover:bg-blue-500 transition"
                    >
                        Lihat Proyek
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                >
                    <Link
                        href="/contact"
                        className="border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 px-6 py-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900 transition"
                    >
                        Hubungi Saya
                    </Link>
                </motion.div>
            </div>
        </main>
    );
}
