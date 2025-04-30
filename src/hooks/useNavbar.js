"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
    navItems as initialNav,
    avatarIcons,
    avatarImages,
} from "@/data/navbarData";

export const useNavbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const clickSoundRef = useRef(null);
    const [avatarIcon, setAvatarIcon] = useState(avatarIcons[0]);
    const [avatarIndex, setAvatarIndex] = useState(0);
    const [navItems, setNavItems] = useState([]);
    const [lensActive, setLensActive] = useState(false);
    const [pendingIndex, setPendingIndex] = useState(null);

    // Inisialisasi item navigasi dengan animasi
    useEffect(() => {
        let delay = 0;
        initialNav.forEach((item, index) => {
            setTimeout(() => {
                setNavItems((prev) => [...prev, item]);
            }, delay);
            delay += 200;
        });
    }, []);

    // Efek pergantian avatar otomatis
    useEffect(() => {
        const interval = setInterval(() => {
            setPendingIndex((avatarIndex + 1) % avatarImages.length);
            setLensActive(true);
            setTimeout(() => {
                setAvatarIndex((prev) => (prev + 1) % avatarImages.length);
                setLensActive(false);
                setPendingIndex(null);
            }, 800);
        }, 4000);
        return () => clearInterval(interval);
    }, [avatarIndex]);

    // Ganti ikon avatar saat diklik
    const cycleAvatarIcon = () => {
        setAvatarIcon((prev) => {
            const index = avatarIcons.indexOf(prev);
            return avatarIcons[(index + 1) % avatarIcons.length];
        });
    };

    // Navigasi dengan efek suara dan animasi
    const handleNavClick = (href) => {
        if (clickSoundRef.current) {
            clickSoundRef.current
                .play()
                .catch((e) => console.log("Sound play error:", e));
        }

        // Jika mengklik halaman yang sama, tidak perlu melakukan apapun
        if (pathname === href) return;

        const current = navItems.find((item) => item.href === pathname);
        setTimeout(() => {
            // Pindahkan item aktif ke akhir array untuk efek reorder
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
        navItems,
        lensActive,
        pendingIndex,
        avatarImages,
        cycleAvatarIcon,
        handleNavClick,
    };
};

export default useNavbar;
