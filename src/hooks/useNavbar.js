// src/hooks/useNavbar.js
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
    navItems as initialNav,
    avatarIcons,
    avatarImages,
} from "@/data/navbarData";

export function useNavbar() {
    const pathname = usePathname();
    const router = useRouter();
    const clickSoundRef = useRef(null);
    const [avatarIcon, setAvatarIcon] = useState(avatarIcons[0]);
    const [avatarIndex, setAvatarIndex] = useState(0);
    const [flareState, setFlareState] = useState("center");
    const [navItems, setNavItems] = useState([]);
    const [lensActive, setLensActive] = useState(false);
    const [pendingIndex, setPendingIndex] = useState(null);

    // Initialize nav items with animation delay
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

    // Handle avatar transition effects
    useEffect(() => {
        const interval = setInterval(() => {
            setPendingIndex((prev) => (avatarIndex + 1) % avatarImages.length);
            setLensActive(true);
            setTimeout(() => {
                setAvatarIndex(
                    pendingIndex || (avatarIndex + 1) % avatarImages.length
                );
                setLensActive(false);
            }, 800);
        }, 4000);
        return () => clearInterval(interval);
    }, [avatarIndex, pendingIndex]);

    // Handle cycling through avatar icons
    const cycleAvatarIcon = () => {
        setAvatarIcon((prev) => {
            const index = avatarIcons.indexOf(prev);
            return avatarIcons[(index + 1) % avatarIcons.length];
        });
    };

    // Handle navigation clicks
    const handleNavClick = (href) => {
        clickSoundRef.current?.play();
        const current = navItems.find((item) => item.href === pathname);

        // Reorder nav items and navigate
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
}
