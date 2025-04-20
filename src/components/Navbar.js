"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaInfoCircle, FaEnvelope, FaSuitcase } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const navItems = [
    { href: "/", icon: <FaHome size={20} />, label: "Home", direction: "top" },
    {
        href: "/about",
        icon: <FaInfoCircle size={20} />,
        label: "About",
        direction: "left",
    },
    {
        href: "/projects",
        icon: <FaSuitcase size={20} />,
        label: "Projects",
        direction: "bottom",
    },
    {
        href: "/contact",
        icon: <FaEnvelope size={20} />,
        label: "Contact",
        direction: "zoom",
    },
];

export default function Navbar() {
    const pathname = usePathname();
    const clickSoundRef = useRef(null);

    useEffect(() => {
        if (clickSoundRef.current) {
            clickSoundRef.current.volume = 0.5;
        }
    }, []);

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
        <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 bg-black/80 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10">
            <audio ref={clickSoundRef} src="/click.mp3" preload="auto" />
            <div className="flex gap-5">
                {navItems.map(({ href, icon, label, direction }) => {
                    const isActive = pathname === href;

                    const handleClick = () => {
                        clickSoundRef.current?.play();
                    };

                    return (
                        <Link
                            key={href}
                            href={href}
                            onClick={handleClick}
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
                                className={`p-3 rounded-full relative transition-all duration-500 overflow-hidden
                  ${
                      isActive
                          ? "bg-gradient-to-br from-blue-600 to-purple-700 translate-y-1 scale-110 shadow-xl ring-2 ring-blue-500/60 animate-pulse"
                          : "bg-white/10 hover:bg-white/20 hover:scale-105"
                  }`}
                            >
                                {/* Glitch Effect */}
                                <span className="absolute inset-0 bg-white opacity-5 mix-blend-difference animate-glitch z-0 pointer-events-none"></span>

                                {/* Ripple */}
                                {isActive && (
                                    <span className="absolute inset-0 rounded-full bg-blue-500 opacity-10 animate-ripple"></span>
                                )}

                                {/* Icon */}
                                <motion.span
                                    className={`relative z-10 text-white flex items-center justify-center 
                    ${
                        isActive
                            ? "drop-shadow-[0_0_8px_#60a5fa]"
                            : "group-hover:text-blue-300"
                    }`}
                                    animate={{
                                        scale: isActive ? 1.2 : 1,
                                        opacity: isActive ? 1 : 0.9,
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        repeatType: "mirror",
                                        duration: 2,
                                        ease: "easeInOut",
                                    }}
                                >
                                    {icon}
                                </motion.span>

                                {/* Tooltip */}
                                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition duration-300 backdrop-blur-md">
                                    {label}
                                </span>
                            </motion.div>
                        </Link>
                    );
                })}
            </div>

            {/* Keyframes for glitch and ripple */}
            <style jsx>{`
                @keyframes glitch {
                    0% {
                        transform: translate(0, 0);
                    }
                    20% {
                        transform: translate(-1px, 1px);
                    }
                    40% {
                        transform: translate(-1px, -1px);
                    }
                    60% {
                        transform: translate(1px, 1px);
                    }
                    80% {
                        transform: translate(1px, -1px);
                    }
                    100% {
                        transform: translate(0, 0);
                    }
                }
                .animate-glitch {
                    animation: glitch 0.4s infinite;
                }

                @keyframes ripple {
                    0% {
                        transform: scale(1);
                        opacity: 0.2;
                    }
                    100% {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
                .animate-ripple {
                    animation: ripple 1s infinite;
                }
            `}</style>
        </nav>
    );
}
