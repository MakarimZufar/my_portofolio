"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaSkull,
    FaExclamationTriangle,
    FaBan,
    FaVirus,
    FaTimes,
    FaHardHat,
    FaTools,
    FaWrench,
    FaHammer,
    FaExclamation,
    FaHome,
    FaCog,
} from "react-icons/fa";

const UnderConstructionNotifications = () => {
    const [showNotification, setShowNotification] = useState(true);
    const [isBlinking, setIsBlinking] = useState(false);
    const [showGlitchEffect, setShowGlitchEffect] = useState(false);
    const [toolIndex, setToolIndex] = useState(0);
    const [shakeConstruction, setShakeConstruction] = useState(false);

    // Array tools untuk animasi
    const constructionTools = [FaHardHat, FaTools, FaWrench, FaHammer, FaCog];
    const currentTool = constructionTools[toolIndex];

    useEffect(() => {
        // Blink effect timer
        const blinkInterval = setInterval(() => {
            setIsBlinking((prev) => !prev);
        }, 500);

        // Occasional glitch effect
        const glitchInterval = setInterval(() => {
            setShowGlitchEffect(true);
            setTimeout(() => setShowGlitchEffect(false), 200);
        }, 3000);

        // Rotate construction tools
        const toolInterval = setInterval(() => {
            setToolIndex((prev) => (prev + 1) % constructionTools.length);
        }, 2000);

        // Shake construction card
        const constructionShakeInterval = setInterval(() => {
            setShakeConstruction(true);
            setTimeout(() => setShakeConstruction(false), 300);
        }, 5000);

        return () => {
            clearInterval(blinkInterval);
            clearInterval(glitchInterval);
            clearInterval(toolInterval);
            clearInterval(constructionShakeInterval);
        };
    }, []);

    const closeNotification = () => {
        setShowNotification(false);
    };

    // Dynamically render the current tool icon
    const ToolIcon = currentTool;

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 relative overflow-hidden">
            {/* Animated background pattern for construction theme */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute inset-0 opacity-10">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute bg-yellow-500"
                            style={{
                                width: `${Math.random() * 100 + 50}px`,
                                height: "20px",
                                transform: `rotate(${Math.random() * 45}deg)`,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                opacity: 0.3,
                            }}
                        />
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {showNotification && (
                    <>
                        {/* Warning di kiri atas */}
                        <motion.div
                            className={`fixed top-5 left-5 z-50 flex items-center space-x-3 p-4 shadow-xl rounded-lg border-2 
                                    ${
                                        showGlitchEffect
                                            ? "bg-red-800"
                                            : "bg-black"
                                    } 
                                    ${
                                        isBlinking
                                            ? "border-red-600"
                                            : "border-yellow-500"
                                    }`}
                            initial={{ x: -100, opacity: 0 }}
                            animate={{
                                x: 0,
                                opacity: 1,
                                scale: isBlinking ? 1.03 : 1,
                            }}
                            exit={{ x: -100, opacity: 0 }}
                            transition={{
                                type: showGlitchEffect ? "spring" : "tween",
                                stiffness: 300,
                                damping: 20,
                            }}
                        >
                            <div
                                className={`${
                                    isBlinking ? "bg-red-600" : "bg-yellow-500"
                                } text-black p-3 rounded-full flex items-center justify-center transform ${
                                    showGlitchEffect ? "rotate-12" : "rotate-0"
                                } transition-transform`}
                            >
                                <FaSkull size={22} className="animate-pulse" />
                            </div>
                            <div className="text-white relative">
                                {showGlitchEffect && (
                                    <div className="absolute inset-0 bg-red-600 opacity-20 animate-pulse"></div>
                                )}
                                <h3 className="font-bold text-lg text-red-500 mb-1 flex items-center">
                                    <FaExclamationTriangle className="mr-1" />{" "}
                                    BAHAYA KRITIS
                                </h3>
                                <p className="font-mono leading-tight">
                                    JANGAN PERNAH COBA
                                </p>
                                <p className="font-mono font-bold leading-tight">
                                    MENGAKSES HALAMAN 404
                                </p>
                                <div className="mt-1 text-xs bg-red-900 p-1 rounded">
                                    <span className="text-yellow-300">
                                        Risiko tinggi: corrupted data
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={closeNotification}
                                className="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                            >
                                <FaTimes />
                            </button>
                        </motion.div>

                        {/* Warning di kanan atas */}
                        <motion.div
                            className={`fixed top-5 right-5 z-50 flex items-center space-x-3 p-4 shadow-xl rounded-lg border-2
                                    ${
                                        showGlitchEffect
                                            ? "bg-black"
                                            : "bg-red-900"
                                    }
                                    ${
                                        isBlinking
                                            ? "border-yellow-500"
                                            : "border-red-600"
                                    }`}
                            initial={{ x: 100, opacity: 0 }}
                            animate={{
                                x: 0,
                                opacity: 1,
                                scale: isBlinking ? 1 : 1.03,
                            }}
                            exit={{ x: 100, opacity: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                            }}
                        >
                            <div
                                className={`${
                                    isBlinking ? "bg-yellow-500" : "bg-red-600"
                                } text-black p-3 rounded-full flex items-center justify-center transform ${
                                    showGlitchEffect ? "rotate-0" : "rotate-12"
                                } transition-transform`}
                            >
                                <FaVirus
                                    size={22}
                                    className={`${
                                        isBlinking
                                            ? "animate-spin"
                                            : "animate-pulse"
                                    }`}
                                />
                            </div>
                            <div className="text-white relative">
                                {showGlitchEffect && (
                                    <div className="absolute inset-0 bg-yellow-500 opacity-10 animate-pulse"></div>
                                )}
                                <h3 className="font-bold text-lg text-yellow-400 mb-1 flex items-center">
                                    <FaBan className="mr-1" /> PERINGATAN SISTEM
                                </h3>
                                <p className="font-mono leading-tight">
                                    HALAMAN 404 TERDETEKSI
                                </p>
                                <p className="font-mono font-bold leading-tight">
                                    SEGERA ABAIKAN
                                </p>
                                <div className="mt-1 text-xs bg-black p-1 rounded flex items-center">
                                    <span className="text-red-500 animate-pulse">
                                        ⚠️ Security breach imminent
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={closeNotification}
                                className="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                            >
                                <FaTimes />
                            </button>
                        </motion.div>

                        {/* Efek warning screen */}
                        <motion.div
                            className="fixed inset-0 bg-red-900 opacity-5 pointer-events-none z-10"
                            animate={{ opacity: [0.05, 0.1, 0.05] }}
                            transition={{
                                repeat: Infinity,
                                duration: 2,
                            }}
                        />
                    </>
                )}
            </AnimatePresence>

            {/* Card notifikasi konstruksi di tengah halaman */}
            <div className="flex justify-center items-center min-h-screen p-6 z-20 relative">
                <motion.div
                    className="relative max-w-2xl w-full"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    {/* Pita konstruksi atas */}
                    <div className="absolute -top-4 left-0 right-0 h-12 bg-yellow-400 z-0 transform -rotate-1 shadow-lg">
                        <div className="w-full h-full bg-black bg-opacity-10 flex items-center">
                            {Array.from({ length: 10 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="h-full flex-1 transform skew-x-12"
                                    style={{
                                        background:
                                            i % 2 === 0
                                                ? "#000"
                                                : "transparent",
                                        opacity: i % 2 === 0 ? 0.8 : 0,
                                    }}
                                ></div>
                            ))}
                        </div>
                    </div>

                    {/* Card konstruksi utama */}
                    <motion.div
                        className={`bg-white dark:bg-gray-800 rounded-lg shadow-2xl border-4 border-yellow-500 overflow-hidden z-10 relative mt-8`}
                        animate={{
                            x: shakeConstruction ? [-5, 5, -5, 5, 0] : 0,
                        }}
                        transition={{
                            duration: 0.5,
                        }}
                    >
                        {/* Icon hardhat di pojok */}
                        <div className="absolute -right-7 -top-7 bg-yellow-500 w-20 h-20 rounded-full flex items-end justify-start p-2 transform rotate-12">
                            <FaHardHat size={24} className="text-black" />
                        </div>

                        {/* Header konstruksi */}
                        <div className="bg-yellow-500 p-4 flex items-center">
                            <motion.div
                                className="bg-white rounded-full p-3 mr-4"
                                animate={{ rotate: [0, 360] }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            >
                                <ToolIcon
                                    size={24}
                                    className="text-yellow-600"
                                />
                            </motion.div>
                            <div>
                                <h2 className="text-black font-extrabold text-2xl flex items-center">
                                    <FaExclamation className="mr-2" /> SEDANG
                                    DALAM KONSTRUKSI
                                </h2>
                                <p className="text-gray-800 font-semibold">
                                    Halaman ini masih dalam tahap pengembangan
                                </p>
                            </div>
                        </div>

                        {/* Konten konstruksi */}
                        <div className="p-6 relative">
                            {/* Efek polkadot konstruksi */}
                            <div className="absolute inset-0 pointer-events-none">
                                {Array.from({ length: 30 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className={`absolute rounded-full ${
                                            i % 2 === 0
                                                ? "bg-yellow-200"
                                                : "bg-gray-200"
                                        } dark:bg-gray-700 opacity-30`}
                                        style={{
                                            width: `${
                                                Math.random() * 20 + 5
                                            }px`,
                                            height: `${
                                                Math.random() * 20 + 5
                                            }px`,
                                            left: `${Math.random() * 100}%`,
                                            top: `${Math.random() * 100}%`,
                                        }}
                                    ></div>
                                ))}
                            </div>

                            <div className="relative space-y-4">
                                <div className="flex items-start">
                                    <div className="bg-yellow-500 p-2 rounded-full mr-4 flex-shrink-0">
                                        <FaWrench className="text-black" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-800 dark:text-white">
                                            Apa yang Sedang Kami Kerjakan?
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            Tim developer kami sedang
                                            memperbarui halaman ini dengan
                                            fitur-fitur baru yang akan
                                            meningkatkan pengalaman pengguna
                                            Anda.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-yellow-500 p-2 rounded-full mr-4 flex-shrink-0">
                                        <FaTools className="text-black" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-800 dark:text-white">
                                            Kapan Selesai?
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            Kami berencana menyelesaikan
                                            konstruksi ini dalam beberapa hari.
                                            Terima kasih atas kesabaran Anda!
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-yellow-500 p-2 rounded-full mr-4 flex-shrink-0">
                                        <FaHammer className="text-black" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-800 dark:text-white">
                                            Fitur yang Akan Datang
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            Antarmuka yang lebih intuitif,
                                            kecepatan loading yang lebih baik,
                                            dan fungsionalitas baru yang akan
                                            memukau Anda.
                                        </p>
                                    </div>
                                </div>

                                {/* Progress bar */}
                                <div className="mt-6">
                                    <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 flex justify-between">
                                        <span>Progress</span>
                                        <span>60%</span>
                                    </div>
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-yellow-500"
                                            initial={{ width: "0%" }}
                                            animate={{ width: "60%" }}
                                            transition={{
                                                duration: 2,
                                                delay: 0.5,
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Back to home button */}
                                <div className="mt-6 flex justify-center">
                                    <motion.a
                                        href="/"
                                        className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg flex items-center space-x-2 transform transition-transform"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <FaHome />
                                        <span>Kembali ke Halaman Utama</span>
                                    </motion.a>
                                </div>
                            </div>
                        </div>

                        {/* Pita konstruksi bawah */}
                        <div className="absolute -bottom-4 left-0 right-0 h-12 bg-yellow-400 z-0 transform rotate-1 shadow-lg">
                            <div className="w-full h-full bg-black bg-opacity-10 flex items-center">
                                {Array.from({ length: 10 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-full flex-1 transform -skew-x-12"
                                        style={{
                                            background:
                                                i % 2 === 0
                                                    ? "#000"
                                                    : "transparent",
                                            opacity: i % 2 === 0 ? 0.8 : 0,
                                        }}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Style tambahan */}
            <style jsx global>{`
                @keyframes textFlicker {
                    0%,
                    19%,
                    21%,
                    23%,
                    25%,
                    54%,
                    56%,
                    100% {
                        text-shadow: 0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff,
                            0 0 40px #f00, 0 0 80px #f00;
                    }
                    20%,
                    24%,
                    55% {
                        text-shadow: none;
                    }
                }

                @keyframes shake {
                    0%,
                    100% {
                        transform: translateX(0);
                    }
                    10%,
                    30%,
                    50%,
                    70%,
                    90% {
                        transform: translateX(-2px);
                    }
                    20%,
                    40%,
                    60%,
                    80% {
                        transform: translateX(2px);
                    }
                }

                @keyframes rotateTools {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }

                .animate-text-flicker {
                    animation: textFlicker 1.5s infinite alternate;
                }

                .animate-shake {
                    animation: shake 0.5s infinite;
                }

                .animate-spin {
                    animation: rotateTools 3s linear infinite;
                }

                body {
                    overflow-x: hidden;
                }
            `}</style>
        </div>
    );
};

export default UnderConstructionNotifications;
