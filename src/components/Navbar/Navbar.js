"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useNavbar } from "@/hooks/useNavbar";
import NavItem from "./NavItem";
import Avatar from "./Avatar";
import { navbarStyles } from "./styles";
import { navSound } from "@/data/navbarData";
import { useState, useEffect } from "react";

/**
 * Komponen Navbar utama
 * Menampilkan navigasi responsif dengan animasi
 */
export default function Navbar() {
    const {
        pathname,
        clickSoundRef,
        avatarIcon,
        avatarIndex,
        navItems,
        lensActive,
        pendingIndex,
        avatarImages,
        secretModeActive,
        easterEggActive,
        cycleAvatarIcon,
        handleNavClick,
    } = useNavbar();

    const [isAvatarClicked, setIsAvatarClicked] = useState(false);
    const [navScale, setNavScale] = useState(1);
    const [navY, setNavY] = useState(0);
    const [shadowEffect, setShadowEffect] = useState(
        "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
    );

    // Effect untuk tambahan class pada navbar saat secret mode aktif
    useEffect(() => {
        const navElement = document.querySelector("nav");
        if (secretModeActive && navElement) {
            navElement.classList.add("rainbow-border");
        } else if (navElement) {
            navElement.classList.remove("rainbow-border");
        }
    }, [secretModeActive]);

    // Effect untuk animasi navbar saat avatar diklik
    useEffect(() => {
        if (isAvatarClicked) {
            // Sequence animasi menggunakan timer
            // Step 1: Scale up
            setNavScale(1.05);
            setNavY(-5);
            setShadowEffect("0 0 25px 5px rgba(59, 130, 246, 0.6)");

            // Step 2: Scale slightly down
            const timer1 = setTimeout(() => {
                setNavScale(0.98);
                setNavY(2);
            }, 200);

            // Step 3: Reset to normal
            const timer2 = setTimeout(() => {
                setNavScale(1);
                setNavY(0);
                setShadowEffect("0 25px 50px -12px rgba(0, 0, 0, 0.25)");
            }, 400);

            // Reset clicked state
            const timer3 = setTimeout(() => {
                setIsAvatarClicked(false);
            }, 600);

            // Cleanup timers
            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
                clearTimeout(timer3);
            };
        }
    }, [isAvatarClicked]);

    // Handler untuk klik avatar dengan animasi tambahan
    const handleAvatarClick = () => {
        cycleAvatarIcon();
        setIsAvatarClicked(true);
    };

    return (
        <motion.nav
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 ${
                secretModeActive
                    ? "bg-black/90 backdrop-blur-xl"
                    : "bg-black/80 backdrop-blur-xl"
            } rounded-full shadow-2xl border border-white/10`}
            style={{
                boxShadow: shadowEffect,
                scale: navScale,
                y: navY,
            }}
        >
            {/* Audio untuk efek suara saat navigasi */}
            <audio ref={clickSoundRef} src={navSound} preload="auto" />

            <div className="flex items-center gap-6">
                {/* Komponen Avatar dengan handler baru */}
                <Avatar
                    avatarIndex={avatarIndex}
                    pendingIndex={pendingIndex}
                    avatarIcon={avatarIcon}
                    lensActive={lensActive}
                    avatarImages={avatarImages}
                    onAvatarClick={handleAvatarClick}
                />

                {/* Item-item navigasi dengan animasi */}
                <AnimatePresence mode="popLayout">
                    {navItems.map(
                        ({ href, icon, label, secretMode }, index) => (
                            <NavItem
                                key={`${href}-${index}`}
                                href={href}
                                Icon={icon}
                                label={label}
                                index={index}
                                isActive={pathname === href}
                                isAvatarClicked={isAvatarClicked}
                                secretMode={secretModeActive || secretMode}
                                onClick={handleNavClick}
                            />
                        )
                    )}
                </AnimatePresence>
            </div>

            {/* Efek cahaya saat avatar diklik */}
            {isAvatarClicked && (
                <div className="absolute -inset-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full z-0 pointer-events-none opacity-0 animate-fade-in-out" />
            )}

            {/* Efek shimmer untuk secret mode */}
            {secretModeActive && (
                <div className="absolute inset-0 rounded-full shimmer-bg z-0 pointer-events-none overflow-hidden opacity-60" />
            )}

            {/* Indikator clicks untuk secret mode */}
            {secretModeActive && (
                <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    ✨
                </div>
            )}

            {/* Styles untuk animasi */}
            <style jsx>{navbarStyles}</style>
            <style jsx>{`
                @keyframes fade-in-out {
                    0% {
                        opacity: 0;
                    }
                    50% {
                        opacity: 0.8;
                    }
                    100% {
                        opacity: 0;
                    }
                }
                .animate-fade-in-out {
                    animation: fade-in-out 0.8s ease-in-out forwards;
                }
            `}</style>
        </motion.nav>
    );
}
