"use client";
import { AnimatePresence } from "framer-motion";
import { useNavbar } from "@/hooks/useNavbar";
import NavItem from "./NavItem";
import Avatar from "./Avatar";
import { navbarStyles } from "./styles";
import { navSound } from "@/data/navbarData";

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
        cycleAvatarIcon,
        handleNavClick,
    } = useNavbar();

    return (
        <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 bg-black/80 backdrop-blur-xl rounded-full shadow-2xl border border-white/10">
            {/* Audio untuk efek suara saat navigasi */}
            <audio ref={clickSoundRef} src={navSound} preload="auto" />
            <div className="flex items-center gap-6">
                
                {/* Komponen Avatar */}
                <Avatar
                    avatarIndex={avatarIndex}
                    pendingIndex={pendingIndex}
                    avatarIcon={avatarIcon}
                    lensActive={lensActive}
                    avatarImages={avatarImages}
                    onAvatarClick={cycleAvatarIcon}
                />
                
                {/* Item-item navigasi dengan animasi */}
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
            
            {/* Styles untuk animasi */}
            <style jsx>{navbarStyles}</style>
        </nav>
    );
}