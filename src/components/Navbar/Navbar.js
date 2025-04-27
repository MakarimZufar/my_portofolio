"use client";
import { AnimatePresence } from "framer-motion";
import { useNavbar } from "@/hooks/useNavbar";
import NavItem from "./NavItem";
import Avatar from "./Avatar";

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
        cycleAvatarIcon,
        handleNavClick,
    } = useNavbar();

    return (
        <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 bg-black/80 backdrop-blur-xl rounded-full shadow-2xl border border-white/10">
            <audio ref={clickSoundRef} src="/click.mp3" preload="auto" />
            <div className="flex items-center gap-6">
                <Avatar
                    avatarIndex={avatarIndex}
                    pendingIndex={pendingIndex}
                    avatarIcon={avatarIcon}
                    lensActive={lensActive}
                    avatarImages={avatarImages}
                    onAvatarClick={cycleAvatarIcon}
                />

                <AnimatePresence mode="popLayout">
                    {navItems.map(({ href, icon, label }, index) => (
                        <NavItem
                            key={href}
                            href={href}
                            Icon={icon}
                            label={label}
                            index={index}
                            isActive={pathname === href}
                            onClick={handleNavClick}
                        />
                    ))}
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
                .spiral-in-mask {
                    background: conic-gradient(black 0deg, black 360deg);
                    animation: spiralInCover 0.8s ease-in-out forwards;
                    clip-path: circle(100%);
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
