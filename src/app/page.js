// HomePage with Flip Card and Dedicated Hover Zone
"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const helloGreetings = [
    "Hello.",
    "Bonjour.",
    "こんにちは.",
    "Hola.",
    "안녕하세요.",
    "Ciao.",
    "Hallo.",
    "Salam.",
];

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
    const [helloText, setHelloText] = useState("");
    const [helloIndex, setHelloIndex] = useState(0);
    const [isDeletingHello, setIsDeletingHello] = useState(false);
    const [typedRole, setTypedRole] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [roleIndex, setRoleIndex] = useState(0);
    const [messageIndex, setMessageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [canHover, setCanHover] = useState(true);

    useEffect(() => {
        if (isHovered) return;
        const current = helloGreetings[helloIndex];
        const speed = isDeletingHello ? 80 : 150;
        const timeout = setTimeout(() => {
            setHelloText((prev) =>
                isDeletingHello
                    ? current.substring(0, prev.length - 1)
                    : current.substring(0, prev.length + 1)
            );

            if (!isDeletingHello && helloText === current) {
                setTimeout(() => setIsDeletingHello(true), 1000);
            } else if (isDeletingHello && helloText === "") {
                setIsDeletingHello(false);
                setHelloIndex((prev) => (prev + 1) % helloGreetings.length);
            }
        }, speed);
        return () => clearTimeout(timeout);
    }, [helloText, isDeletingHello, helloIndex, isHovered]);

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

    const handleHover = () => {
        if (!canHover) return;
        setIsHovered(true);
        setCanHover(false);
        setTimeout(() => {
            setCanHover(true);
            setIsHovered(false);
        }, 30000);
    };

    return (
        <main className="relative pt-48 flex flex-col items-center px-6 sm:px-20 py-16 gap-24 text-white overflow-hidden">
            <div className="absolute inset-0 -z-10 animate-futuristic-background"></div>
            <div className="absolute inset-0 -z-20 bg-gradient-to-tr from-[#0f0c29]/40 via-[#302b63]/30 to-[#24243e]/40"></div>

            <div className="relative w-full max-w-4xl aspect-[4/3]">
                <div
                    className="absolute top-0 left-0 right-0 h-[80%] z-20"
                    onMouseEnter={handleHover}
                    onClick={() => {
                        if (isHovered) {
                            const btn =
                                document.getElementById("view-projects-btn");
                            if (btn) btn.click();
                        }
                    }}
                ></div>

                <div
                    className={`w-full h-full transition-transform duration-[1800ms] ease-[cubic-bezier(0.77,0,0.175,1)] [transform-style:preserve-3d] rounded-3xl ${
                        isHovered
                            ? "[transform:rotateY(180deg)_scale(1.05)]"
                            : ""
                    }`}
                >
                    {/* Front Side */}
                    <div className="absolute inset-0 bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl ring-1 ring-white/10 rounded-3xl flex flex-col items-center justify-center [backface-visibility:hidden]">
                        <motion.h1 className="text-6xl sm:text-7xl font-extrabold text-white font-[HelveticaNeue] text-center">
                            {helloText}
                            <span className="animate-pulse">|</span>
                        </motion.h1>
                    </div>

                    {/* Back Side */}
                    <div className="absolute inset-0 bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl ring-1 ring-white/10 rounded-3xl p-8 flex flex-col items-center justify-center gap-6 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                        <div className="p-1 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-600 animate-pulse shadow-lg">
                            <Image
                                src="/boy_profile.png"
                                alt="My Photo"
                                width={150}
                                height={150}
                                className="rounded-full border-4 border-white dark:border-gray-700 shadow-xl"
                            />
                        </div>

                        <motion.h2
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isHovered ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 drop-shadow-xl tracking-wide text-center"
                        >
                            Makarim Zufar Prambudyo
                        </motion.h2>

                        <motion.h3
                            className="text-lg sm:text-xl font-mono text-cyan-400 h-6 min-h-[1.5rem]"
                            initial={{ opacity: 0, x: -30 }}
                            animate={isHovered ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            I&apos;m a {typedRole}
                            <span className="animate-ping ml-1">|</span>
                        </motion.h3>

                        <p className="text-base sm:text-lg text-gray-300 max-w-xl text-center">
                            I&apos;m a passionate Computer Science student at
                            the University of Indonesia, striving to become a
                            proficient Full Stack Developer. I focus on
                            mastering both frontend and backend technologies to
                            craft impactful digital experiences.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 mt-4">
                            <Link
                                id="view-projects-btn"
                                href="/projects"
                                className="px-6 py-2 rounded-full bg-blue-600 text-white shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-[0_10px_20px_rgba(0,132,255,0.6)]"
                            >
                                🚀 View Projects
                            </Link>
                            <Link
                                href="/contact"
                                className="relative group px-6 py-2 rounded-full border border-blue-500 text-white bg-transparent shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-[0_10px_20px_rgba(0,255,255,0.5)]"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition duration-500 blur-sm rounded-full"></span>
                                <span className="relative z-10 font-medium inline-block">
                                    {contactMessages[messageIndex]}
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes futuristicBackground {
                    0% {
                        background: linear-gradient(
                            135deg,
                            #0f0c29,
                            #302b63,
                            #24243e
                        );
                    }
                    50% {
                        background: linear-gradient(
                            135deg,
                            #1a1a2e,
                            #16213e,
                            #0f3460
                        );
                    }
                    100% {
                        background: linear-gradient(
                            135deg,
                            #0f0c29,
                            #302b63,
                            #24243e
                        );
                    }
                }
                .animate-futuristic-background {
                    animation: futuristicBackground 40s ease infinite;
                    background-size: 400% 400%;
                    background-position: center;
                }
            `}</style>
        </main>
    );
}
