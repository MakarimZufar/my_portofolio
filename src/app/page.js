"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const roles = [
    "Full Stack Developer",
    "Web Developer",
    "Software Engineer",
    "UI/UX Enthusiast",
];
const contactMessages = [
    "✉️ Contact Me",
    "🚀 Let's Collaborate",
    "💡 Build a Project Together",
    "☕ Let's Connect",
    "⚒️ Work With Me",
];

export default function HomePage() {
    const [roleIndex, setRoleIndex] = useState(0);
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const roleInterval = setInterval(() => {
            setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 2200);
        const msgInterval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % contactMessages.length);
        }, 3000);
        return () => {
            clearInterval(roleInterval);
            clearInterval(msgInterval);
        };
    }, []);

    return (
        <main className="flex flex-col items-center justify-center min-h-screen px-6 sm:px-20 py-16 gap-6 text-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white transition-colors duration-300 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/10 via-blue-900/10 to-transparent blur-3xl z-0" />

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative z-10"
            >
                <div className="p-1 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-600 animate-pulse shadow-lg">
                    <Image
                        src="/boy_profile.png"
                        alt="My Photo"
                        width={150}
                        height={150}
                        className="rounded-full border-4 border-white dark:border-gray-700 shadow-xl"
                    />
                </div>
            </motion.div>

            <motion.h1
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, type: "spring" }}
                className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 z-10"
            >
                Makarim Zufar Prambudyo
            </motion.h1>

            <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-lg sm:text-xl font-mono text-cyan-400 z-10"
            >
                {roles[roleIndex]}
            </motion.h2>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="text-base sm:text-lg text-gray-300 max-w-xl z-10"
            >
                I'm a passionate Computer Science student at the University of
                Indonesia, striving to become a proficient Full Stack Developer.
                I focus on mastering both frontend and backend technologies to
                craft impactful digital experiences.
            </motion.p>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="italic text-sm text-gray-500 z-10"
            >
                "Code. Coffee. Repeat."
            </motion.p>

            <div className="flex flex-wrap justify-center gap-4 mt-8 z-10">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 0.8 }}
                >
                    <Link
                        href="/projects"
                        className="px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition shadow-xl hover:shadow-blue-500/50"
                    >
                        🚀 View Projects
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.2, duration: 0.8 }}
                >
                    <Link
                        href="/contact"
                        className="relative group px-6 py-2 rounded-full border border-blue-500 text-white hover:text-white bg-transparent hover:bg-gradient-to-r from-cyan-500 to-blue-600 transition duration-500 overflow-hidden shadow-xl hover:shadow-cyan-500/40"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition duration-500 blur-sm"></span>
                        <span className="relative z-10 font-medium inline-block">
                            {contactMessages[messageIndex]}
                        </span>
                    </Link>
                </motion.div>
            </div>
        </main>
    );
}
