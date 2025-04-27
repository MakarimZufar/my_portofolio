// src/hooks/useNavbar.js
"use client";
import { usePathname, useRouter } from "next/navigation";
import { FaHome, FaInfoCircle, FaEnvelope, FaSuitcase } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

const avatarIcons = [
    "\u{1F468}\u200D\u{1F4BB}",
    "\u{1F680}",
    "\u{1F60E}",
    "\u{2615}",
    "\u{1F9E0}",
    "\u{1F525}",
];
const avatarImages = [
    "/profile_image/boy_profile.png",
    "/profile_image/boy_profile_2.png",
];

const initialNav = [
    { href: "/", icon: FaHome, label: "Home" },
    { href: "/about", icon: FaInfoCircle, label: "About" },
    { href: "/projects", icon: FaSuitcase, label: "Projects" },
    { href: "/contact", icon: FaEnvelope, label: "Contact" },
];

export const useNavbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const clickSoundRef = useRef(null);
    const [avatarIcon, setAvatarIcon] = useState(avatarIcons[0]);
    const [avatarIndex, setAvatarIndex] = useState(0);
    const [flareState, setFlareState] = useState("center");
    const [navItems, setNavItems] = useState([]);
    const [lensActive, setLensActive] = useState(false);
    const [pendingIndex, setPendingIndex] = useState(null);

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
            setPendingIndex((prev) => (avatarIndex + 1) % avatarImages.length);
            setLensActive(true);
            setTimeout(() => {
                setAvatarIndex((prev) => (prev + 1) % avatarImages.length);
                setLensActive(false);
            }, 800);
        }, 4000);
        return () => clearInterval(interval);
    }, [avatarIndex]);

    const cycleAvatarIcon = () => {
        setAvatarIcon((prev) => {
            const index = avatarIcons.indexOf(prev);
            return avatarIcons[(index + 1) % avatarIcons.length];
        });
    };

    const handleNavClick = (href) => {
        if (clickSoundRef.current) {
            clickSoundRef.current
                .play()
                .catch((e) => console.log("Sound play error:", e));
        }
        const current = navItems.find((item) => item.href === pathname);
        setTimeout(() => {
            setNavItems((prev) => {
                const filtered = prev.filter((item) => item.href !== pathname);
                return [...filtered, current];
            });
            router.push(href);
        }, 400);
    };

    return {
        pathname,
        router,
        clickSoundRef,
        avatarIcon,
        avatarIndex,
        flareState,
        navItems,
        lensActive,
        pendingIndex,
        avatarImages,
        cycleAvatarIcon,
        handleNavClick,
    };
};

export default useNavbar;
