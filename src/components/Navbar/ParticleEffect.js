"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Komponen untuk menghasilkan efek partikel saat avatar diklik
 * @param {boolean} isActive - Status apakah efek aktif
 */
const ParticleEffect = ({ isActive }) => {
    const [particles, setParticles] = useState([]);
    const prevActiveRef = useRef(false);

    useEffect(() => {
        // Hanya jalankan ketika status berubah dari tidak aktif menjadi aktif
        if (isActive && !prevActiveRef.current) {
            // Buat 12 partikel acak dengan berbagai bentuk dan warna
            const newParticles = Array.from({ length: 12 }, (_, i) => {
                // Calculate random values for each particle
                const xMovement = Math.random() * 60 - 30; // -30 to 30
                const yMovement = -40 - Math.random() * 20; // -40 to -60
                const rotation = Math.random() * 360; // 0 to 360

                return {
                    id: `particle-${Date.now()}-${i}`,
                    left: `${Math.random() * 60 + 20}px`,
                    top: `${Math.random() * 30 + 20}px`,
                    size: `${Math.random() * 4 + 2}px`,
                    delay: Math.random() * 0.3, // 0 to 0.3
                    duration: Math.random() * 0.5 + 0.5, // 0.5 to 1
                    color: getRandomColor(),
                    shape: Math.random() > 0.7 ? "star" : "circle",
                    xMove: xMovement,
                    yMove: yMovement,
                    rotate: rotation,
                };
            });

            setParticles(newParticles);

            // Hapus partikel setelah animasi selesai
            const timer = setTimeout(() => {
                setParticles([]);
            }, 1500);

            return () => clearTimeout(timer);
        }

        // Update ref untuk track perubahan status
        prevActiveRef.current = isActive;
    }, [isActive]);

    // Fungsi untuk menghasilkan warna acak dengan kecenderungan ke biru
    const getRandomColor = () => {
        // Terkadang gunakan warna khusus
        if (Math.random() > 0.7) {
            const specialColors = [
                "rgb(59, 130, 246)", // blue-500
                "rgb(6, 182, 212)", // cyan-500
                "rgb(168, 85, 247)", // purple-500
                "rgb(249, 115, 22)", // orange-500
                "rgb(16, 185, 129)", // emerald-500
            ];
            return specialColors[
                Math.floor(Math.random() * specialColors.length)
            ];
        }

        // Atau buat warna acak dengan dominasi biru
        const blue = Math.floor(Math.random() * 55 + 200); // 200-255
        const green = Math.floor(Math.random() * 100 + 100); // 100-200
        const red = Math.floor(Math.random() * 70 + 30); // 30-100
        return `rgb(${red}, ${green}, ${blue})`;
    };

    // Fungsi untuk menghasilkan bentuk bintang
    const renderParticleShape = (particle) => {
        if (particle.shape === "star") {
            return (
                <svg
                    width={particle.size}
                    height={particle.size}
                    viewBox="0 0 24 24"
                    fill={particle.color}
                >
                    <path d="M12 0L15.1 8.3H24L16.5 13.5L19.6 21.8L12 16.7L4.4 21.8L7.5 13.5L0 8.3H8.9L12 0Z" />
                </svg>
            );
        }

        // Default: lingkaran
        return (
            <div
                style={{
                    width: particle.size,
                    height: particle.size,
                    backgroundColor: particle.color,
                    borderRadius: "50%",
                }}
            />
        );
    };

    if (!isActive && particles.length === 0) return null;

    return (
        <div className="absolute inset-0 pointer-events-none z-30">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute"
                    style={{
                        left: particle.left,
                        top: particle.top,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0, 1, 0], // Use tween animation for multiple opacity keyframes
                        scale: 1.5,
                        x: particle.xMove,
                        y: particle.yMove,
                        rotate: particle.rotate,
                    }}
                    transition={{
                        opacity: {
                            duration: particle.duration,
                            times: [0, 0.2, 1],
                        },
                        scale: { duration: 0.3 },
                        x: { duration: particle.duration },
                        y: { duration: particle.duration },
                        rotate: { duration: particle.duration },
                        delay: particle.delay,
                        ease: "easeOut",
                    }}
                >
                    {renderParticleShape(particle)}
                </motion.div>
            ))}
        </div>
    );
};

export default ParticleEffect;
