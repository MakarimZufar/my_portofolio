// Full update with reorder logic only (no fade-out on previous)
"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaHome, FaInfoCircle, FaEnvelope, FaSuitcase } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const avatarIcons = ["👨‍💻", "🚀", "😎", "☕", "🧠", "🔥"];

const initialNav = [
    { href: "/", icon: FaHome, label: "Home" },
    { href: "/about", icon: FaInfoCircle, label: "About" },
    { href: "/projects", icon: FaSuitcase, label: "Projects" },
    { href: "/contact", icon: FaEnvelope, label: "Contact" },
];

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const clickSoundRef = useRef(null);
    const [avatarIcon, setAvatarIcon] = useState(avatarIcons[0]);
    const [clicked, setClicked] = useState(false);
    const [flareState, setFlareState] = useState("center");
    const [navItems, setNavItems] = useState(initialNav);

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

    const handleNavClick = (href) => {
        clickSoundRef.current?.play();
        // Reorder menu so current page pushed to end
        setNavItems((prev) => {
            const current = prev.find((item) => item.href === pathname);
            const filtered = prev.filter((item) => item.href !== pathname);
            return [...filtered, current];
        });
        router.push(href);
    };

    return (
        <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 bg-black/80 backdrop-blur-xl rounded-full shadow-2xl border border-white/10">
            <audio ref={clickSoundRef} src="/click.mp3" preload="auto" />
            <div className="flex gap-5 items-center">
                <div className="relative w-[60px] h-[60px]">
                    <div
                        onClick={cycleAvatarIcon}
                        className="w-full h-full rounded-full overflow-hidden border-2 border-white shadow-md cursor-pointer hover:scale-110 transition-all bg-white relative z-10"
                    >
                        <Image
                            src="/boy_profile.png"
                            alt="Avatar"
                            fill
                            className="rounded-full object-cover"
                        />
                    </div>
                    {clicked && (
                        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
                            {[...Array(7)].map((_, i) => {
                                const angle = (i * 360) / 7;
                                const distance = 40;
                                const duration = 2 + Math.random() * 2;
                                const delay = Math.random() * 1.5;
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

                {navItems.map(({ href, icon: Icon, label }, index) => {
                    const isActive = pathname === href;
                    return (
                        <Link
                            key={href}
                            href={href}
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClick(href);
                            }}
                            className="relative group"
                        >
                            <motion.div
                                key={href}
                                initial={{ x: -50, opacity: 0, scale: 0.8 }}
                                animate={{ x: 0, opacity: 1, scale: 1 }}
                                transition={{
                                    delay: 0.1 + index * 0.1,
                                    duration: 0.5,
                                    ease: "easeInOut",
                                }}
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
                                            ? "text-white pulse-overlay"
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
                .pulse-overlay {
                    background: radial-gradient(
                        circle at center,
                        rgba(255, 255, 255, 0.3) 40%,
                        transparent 70%
                    );
                    border-radius: 9999px;
                    padding: 4px;
                }
            `}</style>
        </nav>
    );
}
