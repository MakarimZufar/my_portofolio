"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import ParticleEffect from "./ParticleEffect";

/**
 * Komponen Avatar untuk navbar
 * @param {number} avatarIndex - Indeks avatar saat ini
 * @param {number|null} pendingIndex - Indeks avatar yang akan tampil selanjutnya
 * @param {string} avatarIcon - Emoji ikon yang ditampilkan di pojok avatar
 * @param {boolean} lensActive - Status efek lensa aktif atau tidak
 * @param {string[]} avatarImages - Array path gambar avatar
 * @param {function} onAvatarClick - Handler saat avatar diklik
 */
const Avatar = ({
    avatarIndex,
    pendingIndex,
    avatarIcon,
    lensActive,
    avatarImages,
    onAvatarClick,
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    // Handler untuk klik avatar
    const handleClick = () => {
        setIsClicked(true);
        onAvatarClick();

        // Reset animasi klik setelah 1 detik
        setTimeout(() => {
            setIsClicked(false);
        }, 1000);
    };

    return (
        <div className="relative w-[60px] h-[60px]">
            {/* Avatar image container */}
            <motion.div
                key={avatarIndex}
                initial={{ scale: 0.9 }}
                animate={
                    isClicked
                        ? { scale: 1.2, rotate: -10 } // First animation
                        : { scale: 1, rotate: 0 }
                }
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                }}
                className="w-full h-full rounded-full overflow-hidden border-2 border-white shadow-md cursor-pointer hover:scale-110 transition-all bg-white relative z-10 group"
                onClick={handleClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Follow-up animations after click */}
                {isClicked && (
                    <motion.div
                        className="absolute inset-0 bg-transparent"
                        animate={{ scale: [1.2, 0.95, 1.1, 1] }}
                        transition={{
                            duration: 0.5,
                            times: [0, 0.3, 0.6, 1],
                            ease: "easeInOut",
                        }}
                    />
                )}

                <Image
                    src={
                        avatarImages[
                            pendingIndex !== null ? pendingIndex : avatarIndex
                        ]
                    }
                    alt="Avatar"
                    fill
                    className={`object-cover rounded-full transition-all duration-300 ${
                        lensActive ? "opacity-70" : "opacity-100"
                    } ${isHovered ? "brightness-75" : "brightness-100"}`}
                />
                {lensActive && (
                    <div className="absolute inset-0 z-20 spiral-in-mask"></div>
                )}

                {/* Overlay "Click Me" */}
                <div
                    className={`absolute inset-0 flex items-center justify-center text-white font-bold text-xs transition-opacity duration-300 ${
                        isHovered ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <span className="bg-black/50 px-2 py-1 rounded-full animate-pulse">
                        Click Me!
                    </span>
                </div>
            </motion.div>

            {/* Ikon avatar di pojok kanan bawah */}
            <motion.span
                className="absolute -bottom-1.5 -right-1.5 text-2xl z-30 pointer-events-none drop-shadow-md"
                initial={{ y: 10, opacity: 0 }}
                animate={{
                    y: 0,
                    opacity: 1,
                    scale: isClicked ? 1.5 : 1,
                    rotate: isClicked ? 15 : 0,
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    delay: isClicked ? 0 : 0.2,
                }}
            >
                {avatarIcon}
            </motion.span>

            {/* Follow-up icon animation after initial scale */}
            {isClicked && (
                <motion.div
                    className="absolute -bottom-1.5 -right-1.5 text-2xl z-20 pointer-events-none opacity-0"
                    animate={{
                        rotate: [-15, 0],
                        scale: [1.5, 1],
                        opacity: [1, 0],
                    }}
                    transition={{
                        duration: 0.5,
                        delay: 0.1,
                        ease: "easeOut",
                    }}
                />
            )}

            {/* Efek partikel */}
            <ParticleEffect isActive={isClicked} />

            {/* Efek ledakan saat diklik */}
            {isClicked && (
                <motion.div
                    className="absolute inset-0 z-20 pointer-events-none"
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 3, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="w-full h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 opacity-50"></div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default Avatar;
