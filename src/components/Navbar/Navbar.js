"use client";
import { AnimatePresence } from "framer-motion";
import { useNavbar } from "@/hooks/useNavbar";
import NavItem from "./NavItem";
import Avatar from "./Avatar";
import styles from "./Navbar.module.css";

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
        <nav className={styles.navContainer}>
            <audio ref={clickSoundRef} src="/click.mp3" preload="auto" />
            <div className={styles.navContent}>
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
        </nav>
    );
}
