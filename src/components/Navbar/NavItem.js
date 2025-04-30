// src/components/Navbar/NavItem.js
"use client";
import Link from "next/link";
import { motion } from "framer-motion";

/**
 * Komponen untuk item navigasi dalam navbar
 * @param {string} href - Path tujuan navigasi
 * @param {Component} Icon - Komponen ikon React
 * @param {string} label - Label untuk navigasi
 * @param {boolean} isActive - Status item aktif atau tidak
 * @param {function} onClick - Handler ketika item diklik
 * @param {number} index - Indeks item untuk animasi
 */
const NavItem = ({ href, Icon, label, isActive, onClick, index }) => {
    return (
        <motion.div
            layout
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ y: 60, scale: 0.95, opacity: 0 }}
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
                    onClick(href);
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
};

export default NavItem;
