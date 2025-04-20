"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaInfoCircle, FaEnvelope, FaSuitcase } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const FLARE_COUNT = 7;
const distance = 35 + Math.random() * 10;

const navItems = [
    { href: "/", icon: FaHome, label: "Home", direction: "top" },
    { href: "/about", icon: FaInfoCircle, label: "About", direction: "left" },
    {
        href: "/projects",
        icon: FaSuitcase,
        label: "Projects",
        direction: "bottom",
    },
    { href: "/contact", icon: FaEnvelope, label: "Contact", direction: "zoom" },
];

const avatarIcons = ["👨‍💻", "🚀", "😎", "☕", "🧠", "🔥"];


export default function Navbar() {
    const pathname = usePathname();
    const clickSoundRef = useRef(null);
    const [avatarIcon, setAvatarIcon] = useState(avatarIcons[0]);
    const [clicked, setClicked] = useState(false);
    const [flareState, setFlareState] = useState("center"); // "center" | "orbit"

    useEffect(() => {
        setClicked(true);
        setFlareState("center");
        const timeout = setTimeout(() => setFlareState("orbit"), 300);
        return () => clearTimeout(timeout);
    }, []);

    const cycleAvatarIcon = () => {
        setAvatarIcon((prev) => {
            const index = avatarIcons.indexOf(prev);
            return avatarIcons[(index + 1) % avatarIcons.length];
        });
        setClicked(true);
        setFlareState("center");
        setTimeout(() => setFlareState("orbit"), 300);
    };

    const getInitial = (dir) => {
        switch (dir) {
            case "top":
                return { y: -40, opacity: 0, scale: 0.8 };
            case "left":
                return { x: -40, opacity: 0, scale: 0.8 };
            case "bottom":
                return { y: 40, opacity: 0, scale: 0.8 };
            case "zoom":
                return { scale: 0, opacity: 0 };
            default:
                return { opacity: 0 };
        }
    };

    const getAnimate = () => ({
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: "easeOut" },
    });

    const getExit = () => ({
        opacity: 0,
        scale: 0.6,
        transition: { duration: 0.3, ease: "easeIn" },
    });

    return (
        <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 bg-black/80 backdrop-blur-xl rounded-full shadow-2xl border border-white/10">
            <audio ref={clickSoundRef} src="/click.mp3" preload="auto" />
            <div className="flex gap-5 items-center">
                {/* Avatar */}
                <div className="relative w-[60px] h-[60px]">
                    <div
                        onClick={() => {
                            clickSoundRef.current?.play();
                            cycleAvatarIcon();
                        }}
                        className="w-full h-full rounded-full overflow-hidden border-2 border-white shadow-md cursor-pointer hover:scale-110 transition-all bg-white relative z-10"
                    >
                        <Image
                            src="/boy_profile.png"
                            alt="Avatar"
                            fill
                            className="rounded-full object-cover"
                        />
                    </div>

                    {/* Flare Orbit */}
                    {clicked && (
                        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
                            {[...Array(FLARE_COUNT)].map((_, i) => {
                                const angle = (i * 360) / FLARE_COUNT;
                                const distance = 40;
                                const duration = 2 + Math.random() * 2; // antara 2 - 4 detik
                                const delay = Math.random() * 1.5; // delay acak

                                const colors = [
                                    "#00ffff",
                                    "#ff00ff",
                                    "#00ff00",
                                    "#ffa500",
                                    "#00bfff",
                                ];
                                const color = colors[i % colors.length];

                                return (
                                    <motion.div
                                        key={`flare-${i}`}
                                        className="absolute rounded-full"
                                        animate={{
                                            transform:
                                                flareState === "center"
                                                    ? "translate(0, 0)"
                                                    : `rotate(${angle}deg) translateX(${distance}px)`,
                                        }}
                                        transition={{
                                            duration: 0.4,
                                            ease: "easeOut",
                                        }}
                                        style={{
                                            width: `${3 + (i % 3)}px`,
                                            height: `${3 + (i % 3)}px`,
                                            backgroundColor: color,
                                            boxShadow: `0 0 6px ${color}, 0 0 10px ${color}`,
                                            transformOrigin: "center",
                                            animationName:
                                                flareState === "orbit"
                                                    ? "flareOrbit"
                                                    : "none",
                                            animationDuration: `${duration}s`,
                                            animationTimingFunction: "linear",
                                            animationIterationCount: "infinite",
                                            animationDelay: `${delay}s`,
                                            opacity: 0.9,
                                            transform:
                                                flareState === "center"
                                                    ? "translate(0, 0)"
                                                    : `rotate(${angle}deg) translateX(${distance}px)`,
                                        }}
                                    />
                                );
                            })}
                        </div>
                    )}

                    <motion.span
                        className="absolute -bottom-1.5 -right-1.5 text-2xl z-30 pointer-events-none drop-shadow-md"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        {avatarIcon}
                    </motion.span>
                </div>

                {/* Nav Items */}
                {navItems.map(({ href, icon: Icon, label, direction }) => {
                    const isActive = pathname === href;

                    return (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => clickSoundRef.current?.play()}
                            className="relative group"
                        >
                            <motion.div
                                key={
                                    isActive
                                        ? `active-${href}`
                                        : `inactive-${href}`
                                }
                                initial={getInitial(direction)}
                                animate={getAnimate()}
                                exit={getExit()}
                                className={`p-3 rounded-full relative transition-all duration-500 ${
                                    isActive
                                        ? "bg-gradient-to-br from-blue-600 to-purple-700 translate-y-1 scale-110 shadow-2xl ring-4 ring-cyan-400 border border-white/30"
                                        : "bg-white/10 hover:bg-white/20 hover:scale-[1.15] hover:translate-y-1"
                                }`}
                            >
                                {isActive && (
                                    <span className="absolute -inset-1 rounded-full border-2 border-cyan-300 opacity-70 blur-xl animate-glow z-0 pointer-events-none" />
                                )}
                                {isActive && (
                                    <span className="absolute inset-0 rounded-full bg-blue-400 opacity-30 animate-ripple" />
                                )}
                                <motion.span
                                    className={`relative z-10 text-white flex items-center justify-center ${
                                        isActive
                                            ? "text-white"
                                            : "group-hover:text-blue-300"
                                    }`}
                                    animate={{
                                        scale: isActive ? 1.3 : 1,
                                        opacity: isActive ? 1 : 0.9,
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        repeatType: "mirror",
                                        duration: 2,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <Icon size={22} />
                                </motion.span>
                                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition duration-300 backdrop-blur-md">
                                    {label}
                                </span>
                            </motion.div>
                        </Link>
                    );
                })}
            </div>

            {/* Animations */}
            <style jsx>{`
                @keyframes ripple {
                    0% {
                        transform: scale(1);
                        opacity: 0.4;
                    }
                    100% {
                        transform: scale(2.5);
                        opacity: 0;
                    }
                }
                .animate-ripple {
                    animation: ripple 1.2s ease-out infinite;
                }
                @keyframes glow {
                    0%,
                    100% {
                        opacity: 0.3;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.8;
                        transform: scale(1.05);
                    }
                }
                .animate-glow {
                    animation: glow 2s ease-in-out infinite;
                }
                @keyframes flareOrbit {
                    0% {
                        transform: rotate(0deg) translateX(40px);
                    }
                    100% {
                        transform: rotate(360deg) translateX(40px);
                    }
                }
                @keyframes flareOrbit {
                    0% {
                        transform: rotate(0deg) translateX(40px);
                    }
                    100% {
                        transform: rotate(360deg) translateX(40px);
                    }
                }
            `}</style>
        </nav>
    );
}
