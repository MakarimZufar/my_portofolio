"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
    navItems as initialNav,
    avatarIcons,
    avatarImages,
    navSound,
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
    const [avatarClickCount, setAvatarClickCount] = useState(0);
    const [easterEggActive, setEasterEggActive] = useState(false);
    const [secretModeActive, setSecretModeActive] = useState(false);

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
        // Nonaktifkan pergantian otomatis jika secret mode aktif
        if (secretModeActive) return;

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
    }, [avatarIndex, secretModeActive, avatarImages.length]);

    // Secret mode setelah 10 kali klik
    useEffect(() => {
        if (avatarClickCount >= 10 && !secretModeActive) {
            activateSecretMode();
        }
    }, [avatarClickCount, secretModeActive]);

    // Animasi spesial setelah klik avatar beberapa kali
    useEffect(() => {
        // Easter egg: setelah mengklik avatar 5 kali
        if (
            avatarClickCount >= 5 &&
            avatarClickCount < 10 &&
            !easterEggActive
        ) {
            setEasterEggActive(true);

            // Efek special: semua icon berputar
            const current = [...navItems];
            setNavItems([]);

            // Tampilkan kembali setelah jeda singkat dengan urutan teracak
            setTimeout(() => {
                // Shuffle urutan item navigasi
                const shuffled = [...current].sort(() => Math.random() - 0.5);
                let delay = 0;
                shuffled.forEach((item) => {
                    setTimeout(() => {
                        setNavItems((prev) => [...prev, item]);
                    }, delay);
                    delay += 150;
                });

                // Reset easter egg setelah 5 detik
                setTimeout(() => {
                    setEasterEggActive(false);
                }, 5000);
            }, 300);
        }
    }, [avatarClickCount, easterEggActive, navItems]);

    // Aktifkan secret mode - tema tersembunyi khusus
    const activateSecretMode = () => {
        // Play special sound
        try {
            const specialSound = new Audio("/special-unlock.mp3");
            specialSound.volume = 0.5;
            specialSound.play().catch((e) => console.log("Sound error:", e));
        } catch (error) {
            console.log("Error playing sound:", error);
        }

        setSecretModeActive(true);

        // Animasi khusus untuk secret mode
        const current = [...navItems];
        setNavItems([]);

        setTimeout(() => {
            // Show message in console
            console.log(
                "🌟 Secret mode activated! Click avatar 3 more times for surprise! 🌟"
            );

            // Tambahkan kembali item navigasi dengan efek khusus
            current.forEach((item, index) => {
                setTimeout(() => {
                    setNavItems((prev) => [
                        ...prev,
                        {
                            ...item,
                            // Tambahkan properti untuk efek visual khusus
                            secretMode: true,
                        },
                    ]);
                }, index * 200);
            });
        }, 500);
    };

    // Ganti ikon avatar saat diklik
    const cycleAvatarIcon = () => {
        // Play sound effect
        if (clickSoundRef.current) {
            clickSoundRef.current
                .play()
                .catch((e) => console.log("Sound error:", e));
        }

        // Increment counter for easter egg
        setAvatarClickCount((prev) => prev + 1);

        // Change emoji icon
        setAvatarIcon((prev) => {
            const index = avatarIcons.indexOf(prev);
            return avatarIcons[(index + 1) % avatarIcons.length];
        });

        // Special action jika secret mode aktif dan diklik 3 kali lagi
        if (secretModeActive && avatarClickCount >= 12) {
            // Reset counter
            setAvatarClickCount(0);
            setSecretModeActive(false);

            // Special surprise animation
            const navElement = document.querySelector("nav");
            if (navElement) {
                navElement.classList.add("rotate-360");
                setTimeout(() => {
                    navElement.classList.remove("rotate-360");
                }, 1000);
            }
        }
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
        if (!current) return;

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
        avatarClickCount,
        secretModeActive,
        easterEggActive,
        cycleAvatarIcon,
        handleNavClick,
    };
};

export default useNavbar;
