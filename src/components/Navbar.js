// Updated spiral effect from edges inward (spiral-in)
"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaHome, FaInfoCircle, FaEnvelope, FaSuitcase } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const avatarIcons = ["👨‍💻", "🚀", "😎", "☕", "🧠", "🔥"];
const avatarImages = ["/boy_profile.png", "/boy_profile_2.png"];

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
    const [avatarIndex, setAvatarIndex] = useState(0);
    const [flareState, setFlareState] = useState("center");
    const [navItems, setNavItems] = useState([]);
    const [lensActive, setLensActive] = useState(false);

    useEffect(() => {
        let delay = 0;
        initialNav.forEach((item, index) => {
            setTimeout(() => {
                setNavItems((prev) => [...prev, item]);
            }, delay);
            delay += 200;
        });
        setFlareState("center");
        const timeout = setTimeout(() => setFlareState("orbit"), 300);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setLensActive(true);
            setTimeout(() => {
                setAvatarIndex((prev) => (prev + 1) % avatarImages.length);
                setLensActive(false);
            }, 800);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const cycleAvatarIcon = () => {
        setAvatarIcon((prev) => {
            const index = avatarIcons.indexOf(prev);
            return avatarIcons[(index + 1) % avatarIcons.length];
        });
    };

    const handleNavClick = (href) => {
        clickSoundRef.current?.play();
        const current = navItems.find((item) => item.href === pathname);
        setTimeout(() => {
            setNavItems((prev) => {
                const filtered = prev.filter((item) => item.href !== pathname);
                return [...filtered, current];
            });
            router.push(href);
        }, 400);
    };

    return (
        <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 bg-black/80 backdrop-blur-xl rounded-full shadow-2xl border border-white/10">
            <audio ref={clickSoundRef} src="/click.mp3" preload="auto" />
            <div className="flex items-center gap-6">
                <div className="relative w-[60px] h-[60px]">
                    <div
                        onClick={cycleAvatarIcon}
                        className="w-full h-full rounded-full overflow-hidden border-2 border-white shadow-md cursor-pointer hover:scale-110 transition-all bg-white relative z-10"
                    >
                        <Image
                            key={avatarIndex}
                            src={avatarImages[avatarIndex]}
                            alt="Avatar"
                            fill
                            className={`rounded-full object-cover transition-opacity duration-300 ${
                                lensActive ? "opacity-0" : "opacity-100"
                            }`}
                        />
                        {lensActive && (
                            <div className="absolute inset-0 z-20 spiral-in-mask"></div>
                        )}
                    </div>

                    <motion.span
                        className="absolute -bottom-1.5 -right-1.5 text-2xl z-30 pointer-events-none drop-shadow-md"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            delay: 2,
                        }}
                    >
                        {avatarIcon}
                    </motion.span>
                </div>

                <AnimatePresence mode="popLayout">
                    {navItems.map(({ href, icon: Icon, label }, index) => {
                        const isActive = pathname === href;
                        return (
                            <motion.div
                                key={href}
                                layout
                                initial={{ x: -80, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ y: 60, scale: 0.95, opacity: 1 }}
                                transition={{
                                    delay: index * 0.2,
                                    duration: 0.5,
                                    ease: "easeOut",
                                }}
                            >
                                <Link
                                    href={href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavClick(href);
                                    }}
                                    className="relative group"
                                >
                                    <div
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
                                                duration: 4,
                                                ease: "easeInOut",
                                            }}
                                        >
                                            <Icon size={22} />
                                        </motion.span>
                                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition duration-300 backdrop-blur-md">
                                            {label}
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
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
                .spiral-in-mask {
                    background: conic-gradient(black 0deg, black 360deg);
                    animation: spiralInCover 0.8s ease-in-out forwards;
                    clip-path: circle(100%);
                }
                @keyframes spiralInCover {
                    0% {
                        transform: rotate(0deg) scale(1);
                        clip-path: circle(100%);
                    }
                    100% {
                        transform: rotate(1080deg) scale(0);
                        clip-path: circle(0%);
                    }
                }
            `}</style>
        </nav>
    );
}
