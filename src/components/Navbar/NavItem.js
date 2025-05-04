// src/components/Navbar/NavItem.js
"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

/**
 * Komponen untuk item navigasi dalam navbar
 * @param {string} href - Path tujuan navigasi
 * @param {Component} Icon - Komponen ikon React
 * @param {string} label - Label untuk navigasi
 * @param {boolean} isActive - Status item aktif atau tidak
 * @param {boolean} isAvatarClicked - Status apakah avatar sedang diklik
 * @param {boolean} secretMode - Status mode rahasia aktif
 * @param {function} onClick - Handler ketika item diklik
 * @param {number} index - Indeks item untuk animasi
 */
const NavItem = ({
    href,
    Icon,
    label,
    isActive,
    isAvatarClicked,
    secretMode,
    onClick,
    index,
}) => {
    const [hovered, setHovered] = useState(false);
    const [specialColorActive, setSpecialColorActive] = useState(false);
    const [animationActive, setAnimationActive] = useState(false);

    // Effect untuk animasi khusus dalam secret mode
    useEffect(() => {
        if (secretMode) {
            const interval = setInterval(() => {
                setSpecialColorActive((prev) => !prev);
            }, 1500);

            return () => clearInterval(interval);
        }
    }, [secretMode]);

    // Effect untuk trigger animasi saat avatar diklik
    useEffect(() => {
        if (isAvatarClicked) {
            setAnimationActive(true);
            const timer = setTimeout(() => {
                setAnimationActive(false);
            }, 600);
            return () => clearTimeout(timer);
        }
    }, [isAvatarClicked]);

    // Tentukan animasi berdasarkan posisi dan status
    const getAvatarClickAnimation = (idx) => {
        // Secret mode animation: circular pattern
        if (secretMode) {
            return 0; // Akan dihandle dengan CSS animation
        }

        // Direction alternates based on index
        const direction = idx % 2 === 0 ? -1 : 1;
        return animationActive ? 10 * direction : 0;
    };

    // Warna khusus untuk secret mode
    const getSpecialColors = () => {
        if (!secretMode) return {};

        const gradientColors = specialColorActive
            ? "from-purple-600 via-pink-500 to-blue-600"
            : "from-blue-600 via-green-500 to-purple-600";

        return {
            background: `bg-gradient-to-r ${gradientColors}`,
            border: "border-white/30",
            textColor: "text-white",
        };
    };

    const specialColors = getSpecialColors();

    return (
        <motion.div
            layout
            initial={{ x: -80, opacity: 0 }}
            animate={{
                x: secretMode ? getAvatarClickAnimation(index) : 0,
                y: animationActive ? getAvatarClickAnimation(index) : 0,
                opacity: 1,
                rotate: animationActive && !secretMode ? 5 : 0,
            }}
            exit={{ y: 60, scale: 0.95, opacity: 0 }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                delay: index * 0.2,
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={secretMode ? "nav-item-circle" : ""}
            style={
                secretMode
                    ? {
                          // CSS variables for custom animation
                          "--circle-offset": `${index * 45}deg`,
                          "--animation-delay": `${index * 0.1}s`,
                      }
                    : {}
            }
        >
            {/* Animasi follow-up untuk rotasi */}
            {animationActive && !secretMode && (
                <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: [-3, 0] }}
                    transition={{
                        duration: 0.3,
                        delay: 0.1,
                        ease: "easeOut",
                    }}
                />
            )}
            <Link
                href={href}
                onClick={(e) => {
                    e.preventDefault();
                    onClick(href);
                }}
                className="relative group"
            >
                <div
                    className={`p-3 rounded-full relative transition-all duration-500 ${
                        isActive && !secretMode
                            ? "bg-gradient-to-br from-blue-600 to-purple-700 translate-y-1 scale-110 shadow-2xl ring-4 ring-cyan-400 border border-white/30"
                            : secretMode
                            ? `${specialColors.background} translate-y-1 scale-110 shadow-2xl border ${specialColors.border}`
                            : "bg-white/10 hover:bg-white/20 hover:scale-[1.15] hover:translate-y-1"
                    } ${animationActive && !secretMode ? "nav-item-glow" : ""}`}
                >
                    {isActive && !secretMode && (
                        <span className="absolute -inset-1 rounded-full border-2 border-cyan-300 opacity-70 blur-xl animate-glow z-0 pointer-events-none" />
                    )}
                    {(isActive || secretMode) && (
                        <span
                            className={`absolute inset-0 rounded-full ${
                                secretMode ? "bg-white" : "bg-blue-400"
                            } opacity-${secretMode ? "20" : "30"} ${
                                secretMode
                                    ? "animate-pulse-slow"
                                    : "animate-ripple"
                            }`}
                        />
                    )}
                    <motion.span
                        className={`relative z-10 flex items-center justify-center ${
                            isActive && !secretMode
                                ? "text-white pulse-overlay"
                                : secretMode
                                ? `${specialColors.textColor}`
                                : "text-white group-hover:text-blue-300"
                        }`}
                        animate={{
                            scale: isActive || secretMode ? 1.3 : 1,
                            opacity: isActive || secretMode ? 1 : 0.9,
                            rotate: secretMode && hovered ? 360 : 0,
                        }}
                        transition={{
                            scale: { type: "spring", stiffness: 300 },
                            rotate: {
                                duration: 1.5,
                                ease: "easeInOut",
                                repeat: secretMode && hovered ? Infinity : 0,
                            },
                        }}
                    >
                        <Icon size={22} />
                    </motion.span>

                    <span
                        className={`absolute -bottom-8 left-1/2 -translate-x-1/2 ${
                            secretMode
                                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                                : "bg-black/70 text-white"
                        } text-xs px-2 py-1 rounded shadow ${
                            secretMode
                                ? "opacity-100 animate-bounce"
                                : "opacity-0 group-hover:opacity-100"
                        } transition duration-300 backdrop-blur-md`}
                    >
                        {secretMode ? `✨ ${label} ✨` : label}
                    </span>
                </div>
            </Link>
        </motion.div>
    );
};

export default NavItem;
