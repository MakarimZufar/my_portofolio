// HomePage with Typing Effect + Hero Card Style + Dynamic Background
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

const skills = [
    { name: "Next.js", icon: "" },
    { name: "React", icon: "" },
    { name: "Tailwind CSS", icon: "" },
    { name: "JavaScript", icon: "" },
    { name: "Git", icon: "" },
    { name: "Figma", icon: "" },
];

export default function HomePage() {
    const [messageIndex, setMessageIndex] = useState(0);
    const [typedRole, setTypedRole] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [roleIndex, setRoleIndex] = useState(0);

    useEffect(() => {
        const current = roles[roleIndex];
        let typingSpeed = isDeleting ? 50 : 100;

        const type = setTimeout(() => {
            setTypedRole((prev) =>
                isDeleting
                    ? current.substring(0, prev.length - 1)
                    : current.substring(0, prev.length + 1)
            );

            if (!isDeleting && typedRole === current) {
                setTimeout(() => setIsDeleting(true), 1000);
            } else if (isDeleting && typedRole === "") {
                setIsDeleting(false);
                setRoleIndex((prev) => (prev + 1) % roles.length);
            }
        }, typingSpeed);

        return () => clearTimeout(type);
    }, [typedRole, isDeleting, roleIndex]);

    useEffect(() => {
        const msgInterval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % contactMessages.length);
        }, 3000);
        return () => clearInterval(msgInterval);
    }, []);

    return (
        <main className="relative pt-48 flex flex-col items-center px-6 sm:px-20 py-16 gap-24 text-white overflow-hidden">
            {/* Dynamic BG */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-900 via-black to-gray-900 animate-background-pan"></div>

            {/* HERO SECTION WRAPPED IN CARD */}
            <section className="relative w-full max-w-4xl rounded-3xl px-8 py-12 backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl ring-1 ring-white/10 z-10">
                <div className="text-center flex flex-col items-center gap-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
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
                        className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600"
                    >
                        Makarim Zufar Prambudyo
                    </motion.h1>

                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-lg sm:text-xl font-mono text-cyan-400 h-6 min-h-[1.5rem]"
                    >
                        {typedRole}
                        <span className="animate-ping ml-1">|</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="text-base sm:text-lg text-gray-300 max-w-xl"
                    >
                        I'm a passionate Computer Science student at the
                        University of Indonesia, striving to become a proficient
                        Full Stack Developer. I focus on mastering both frontend
                        and backend technologies to craft impactful digital
                        experiences.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="italic text-sm text-gray-500"
                    >
                        "Code. Coffee. Repeat."
                    </motion.p>

                    <div className="flex flex-wrap justify-center gap-4 mt-6">
                        <Link
                            href="/projects"
                            className="px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition shadow-xl hover:shadow-blue-500/50"
                        >
                            🚀 View Projects
                        </Link>
                        <Link
                            href="/contact"
                            className="relative group px-6 py-2 rounded-full border border-blue-500 text-white hover:text-white bg-transparent hover:bg-gradient-to-r from-cyan-500 to-blue-600 transition duration-500 overflow-hidden shadow-xl hover:shadow-cyan-500/40"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition duration-500 blur-sm"></span>
                            <span className="relative z-10 font-medium inline-block">
                                {contactMessages[messageIndex]}
                            </span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ABOUT SECTION */}
            <section className="text-center max-w-3xl">
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-2xl font-semibold mb-4"
                >
                    About Me
                </motion.h3>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-gray-400"
                >
                    I enjoy turning complex problems into simple, beautiful, and
                    intuitive designs. When I'm not coding, you'll find me
                    exploring UI trends, learning new frameworks, or sipping a
                    good cup of coffee.
                </motion.p>
            </section>

            {/* SKILLS SECTION */}
            <section className="max-w-5xl w-full">
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-2xl font-semibold text-center mb-6"
                >
                    Tech Stack & Tools
                </motion.h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-items-center">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.1 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="flex flex-col items-center gap-2 bg-white/10 p-4 rounded-xl shadow-md hover:shadow-blue-500/30 backdrop-blur"
                        >
                            <Image
                                src={skill.icon}
                                alt={skill.name}
                                width={40}
                                height={40}
                            />
                            <p className="text-sm text-white font-medium">
                                {skill.name}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <style jsx>{`
                @keyframes background-pan {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }
                .animate-background-pan {
                    background-size: 400% 400%;
                    animation: background-pan 15s ease infinite;
                }
            `}</style>
        </main>
    );
}
