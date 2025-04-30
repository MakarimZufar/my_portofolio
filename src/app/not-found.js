"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    FaHome,
    FaSadTear,
    FaCode,
    FaRedo,
    FaTerminal,
    FaBug,
} from "react-icons/fa";

// Array komentar lucu terkait error 404
const errorMessages = [
    "// Error 404: Page tidak ditemukan di cache memori",
    "/* Sepertinya ada bug pada URL ini */",
    "// ToDo: Perbaiki halaman yang hilang",
    "// Kehilangan reference ke halaman ini",
    "/* Halaman ini masih di local environment */",
    "// git commit -m 'halaman ini' belum di-push",
    "// Halaman sedang di-compile, silakan tunggu...",
    "/* NPM masih menginstall router untuk halaman ini */",
];

// Terminal effect
const terminalLines = [
    { text: "> finding page...", delay: 500, class: "text-gray-300" },
    { text: "> ERROR: page not found", delay: 1000, class: "text-red-500" },
    { text: "> running diagnostics...", delay: 1500, class: "text-gray-300" },
    { text: "> status code: 404", delay: 2000, class: "text-red-500" },
    {
        text: "> trying to recover page...",
        delay: 2500,
        class: "text-gray-300",
    },
    { text: "> recovery failed", delay: 3000, class: "text-red-500" },
    {
        text: "> suggesting alternative routes...",
        delay: 3500,
        class: "text-yellow-400",
    },
];

// Kode untuk background effect
const codeSnippets = [
    "function Page404() {",
    "  return <Error code={404} />",
    "}",
    "router.push('/404')",
    "throw new Error('Route not found')",
    "const routes = getStaticPaths()",
    "export async function getStaticProps() {",
    "try {",
    "  const data = await fetch(API)",
    "} catch (error) {",
    "  console.error('404 not found')",
    "}",
    "<Route path='*' element={<NotFound />} />",
    "if (!page) return <NotFoundPage />",
    "export const NotFoundPage = () => {",
];

export default function NotFound() {
    const [typedLines, setTypedLines] = useState([]);
    const [currentErrorMsg, setCurrentErrorMsg] = useState(errorMessages[0]);
    const [showRedoAnimation, setShowRedoAnimation] = useState(false);
    const [isHacking, setIsHacking] = useState(false);

    const codeRainRef = useRef(null);
    const clickSoundRef = useRef(null);

    // Efek animasi terminal typing
    useEffect(() => {
        let timeouts = [];

        terminalLines.forEach((line, index) => {
            const timeout = setTimeout(() => {
                setTypedLines((prev) => [...prev, line]);
            }, line.delay);

            timeouts.push(timeout);
        });

        // Rotasi pesan error
        const intervalId = setInterval(() => {
            setCurrentErrorMsg((prev) => {
                const currentIndex = errorMessages.indexOf(prev);
                return errorMessages[(currentIndex + 1) % errorMessages.length];
            });
        }, 3000);

        return () => {
            timeouts.forEach((timeout) => clearTimeout(timeout));
            clearInterval(intervalId);
        };
    }, []);

    // Animasi code rain di background
    useEffect(() => {
        if (!codeRainRef.current) return;

        const container = codeRainRef.current;
        const elementsCount = 30;
        const elements = [];

        for (let i = 0; i < elementsCount; i++) {
            const element = document.createElement("div");
            element.className = "codeBgElement";

            // Posisi dan style acak
            element.style.left = `${Math.random() * 100}%`;
            element.style.top = `-${Math.random() * 20}px`;
            element.style.fontSize = `${Math.random() * 0.5 + 0.7}rem`;
            element.style.opacity = `${Math.random() * 0.5 + 0.1}`;
            element.style.position = "fixed";
            element.style.color = "rgba(59, 130, 246, 0.3)";
            element.style.fontFamily = "monospace";
            element.style.whiteSpace = "nowrap";
            element.style.pointerEvents = "none";

            // Tentukan konten kode random
            element.textContent =
                codeSnippets[Math.floor(Math.random() * codeSnippets.length)];

            // Set animasi
            element.style.animation = `fall ${
                Math.random() * 15 + 10
            }s linear infinite`;
            element.style.animationDelay = `${Math.random() * 10}s`;

            container.appendChild(element);
            elements.push(element);
        }

        // Clean up
        return () => {
            elements.forEach((element) => {
                if (container.contains(element)) {
                    container.removeChild(element);
                }
            });
        };
    }, []);

    // Trigger animasi reload saat tombol di klik
    const triggerReloadAnimation = () => {
        setShowRedoAnimation(true);
        setTimeout(() => setShowRedoAnimation(false), 500);
    };

    // Mode "hacking" fun
    const triggerHackingMode = () => {
        if (clickSoundRef.current) {
            clickSoundRef.current
                .play()
                .catch((err) => console.log("Audio play error:", err));
        }
        setIsHacking(true);
        setTimeout(() => setIsHacking(false), 3000);
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white p-6 overflow-hidden">
            {/* Audio untuk click sound */}
            <audio ref={clickSoundRef} src="/click.mp3" preload="auto" />

            {/* Background code rain effect */}
            <div
                ref={codeRainRef}
                className="fixed inset-0 pointer-events-none z-0"
            >
                <style jsx global>{`
                    @keyframes fall {
                        0% {
                            transform: translateY(-20px);
                        }
                        100% {
                            transform: translateY(100vh);
                        }
                    }

                    @keyframes float {
                        0%,
                        100% {
                            transform: translateY(0px) rotate(0deg);
                        }
                        25% {
                            transform: translateY(-10px) rotate(2deg);
                        }
                        50% {
                            transform: translateY(0px) rotate(0deg);
                        }
                        75% {
                            transform: translateY(10px) rotate(-2deg);
                        }
                    }

                    @keyframes glitch-animation {
                        0% {
                            transform: translate(0);
                        }
                        20% {
                            transform: translate(-3px, 3px);
                        }
                        40% {
                            transform: translate(-3px, -3px);
                        }
                        60% {
                            transform: translate(3px, 3px);
                        }
                        80% {
                            transform: translate(3px, -3px);
                        }
                        100% {
                            transform: translate(0);
                        }
                    }

                    @keyframes blink {
                        0%,
                        100% {
                            opacity: 1;
                        }
                        50% {
                            opacity: 0;
                        }
                    }

                    @keyframes pulse {
                        0% {
                            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
                        }
                        70% {
                            box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
                        }
                        100% {
                            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
                        }
                    }

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

                    @keyframes scanner {
                        0%,
                        100% {
                            transform: translateY(-100%);
                            opacity: 0;
                        }
                        10%,
                        90% {
                            opacity: 0.15;
                        }
                        50% {
                            transform: translateY(100%);
                            opacity: 0.3;
                        }
                    }

                    .glitch {
                        position: relative;
                        font-size: 8rem;
                        font-weight: 700;
                        text-align: center;
                        color: #f56565;
                        letter-spacing: -0.02em;
                    }

                    .glitch::before,
                    .glitch::after {
                        content: "404";
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                    }

                    .glitch::before {
                        left: 2px;
                        text-shadow: -2px 0 #49c5f6;
                        animation: glitch-animation 2s infinite linear
                            alternate-reverse;
                        clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
                    }

                    .glitch::after {
                        left: -2px;
                        text-shadow: 2px 0 #f56565;
                        animation: glitch-animation 3s infinite linear
                            alternate-reverse;
                        clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
                    }

                    .animate-ripple {
                        animation: ripple 1.2s ease-out infinite;
                    }

                    .animate-blink {
                        animation: blink 1s step-end infinite;
                    }

                    .animate-pulse-button {
                        position: relative;
                    }

                    .animate-pulse-button::after {
                        content: "";
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        border-radius: 0.375rem;
                        box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
                        animation: pulse 2s infinite;
                    }

                    .blinking-cursor {
                        display: inline-block;
                        width: 0.6em;
                        height: 1em;
                        background-color: currentColor;
                        margin-left: 2px;
                        animation: blink 1s step-end infinite;
                    }

                    .scan-line {
                        position: absolute;
                        height: 4px;
                        width: 100%;
                        background-color: rgba(0, 255, 0, 0.2);
                        animation: scanner 3s linear infinite;
                    }
                `}</style>
            </div>

            {/* Animated code elements */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute text-blue-500 opacity-30 text-xs"
                    initial={{
                        x: Math.random() * 100 - 50 + "%",
                        y: -20,
                        opacity: 0.7,
                    }}
                    animate={{
                        y: "150vh",
                        opacity: [0.7, 0.5, 0.7],
                        x: `calc(${Math.random() * 100 - 50}% + ${
                            Math.sin(Math.random() * 5) * 100
                        }px)`,
                    }}
                    transition={{
                        duration: Math.random() * 10 + 15,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 10,
                    }}
                >
                    {Math.random() > 0.5 ? "</" : "<"}
                    {
                        ["div", "span", "p", "h1", "a", "code", "img"][
                            Math.floor(Math.random() * 7)
                        ]
                    }
                    {Math.random() > 0.5 ? " />" : ">"}
                </motion.div>
            ))}

            {/* Matrix effect for hacking mode */}
            {isHacking && (
                <div className="fixed inset-0 bg-black bg-opacity-80 z-20 flex items-center justify-center">
                    <div className="scan-line"></div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-green-500 font-mono text-2xl"
                    >
                        ACCESSING MAINFRAME...
                        <span className="blinking-cursor"></span>
                    </motion.div>
                </div>
            )}

            {/* Container utama */}
            <motion.div
                className="relative z-10 max-w-xl w-full bg-gray-800 rounded-lg overflow-hidden shadow-2xl border border-gray-700"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Header seperti window browser */}
                <div className="bg-gray-900 px-4 py-2 flex items-center">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1 text-center text-sm text-gray-400">
                        error.log
                    </div>
                </div>

                {/* 404 Section */}
                <div className="p-6">
                    <div className="glitch">404</div>

                    {/* Error message rotating */}
                    <div className="h-8 flex justify-center mb-8">
                        <motion.div
                            key={currentErrorMsg}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-green-400 font-mono text-sm"
                        >
                            {currentErrorMsg}
                        </motion.div>
                    </div>

                    {/* Terminal effect */}
                    <div className="bg-black p-4 rounded-md mb-6 font-mono text-sm">
                        <div className="flex items-center mb-2">
                            <span className="text-green-500">user@nextjs</span>
                            <span className="text-white">:</span>
                            <span className="text-blue-400">~/project</span>
                            <span className="text-white">$ </span>
                            <FaTerminal className="ml-2 text-gray-400" />
                        </div>
                        {typedLines.map((line, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={line.class}
                            >
                                {line.text}
                            </motion.div>
                        ))}
                        {typedLines.length >= terminalLines.length && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 4 }}
                                className="text-yellow-400 mt-2"
                            >
                                {">"} homepage is available at{" "}
                                <span className="underline">
                                    root(&apos;/&apos;)
                                </span>
                                <span className="blinking-cursor"></span>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex justify-center gap-4 p-6 bg-gray-900">
                    <Link href="/">
                        <motion.button
                            className="animate-pulse-button bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaHome /> Home
                        </motion.button>
                    </Link>

                    <motion.button
                        className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-md flex items-center gap-2 relative overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            triggerReloadAnimation();
                            setTimeout(() => window.location.reload(), 500);
                        }}
                    >
                        <FaRedo
                            className={showRedoAnimation ? "animate-spin" : ""}
                        />{" "}
                        Reload
                        {showRedoAnimation && (
                            <motion.div
                                className="absolute inset-0 bg-gray-500"
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{ duration: 0.5 }}
                            />
                        )}
                    </motion.button>

                    <motion.button
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={triggerHackingMode}
                    >
                        <FaBug /> Debug
                    </motion.button>
                </div>
            </motion.div>

            {/* Footer message */}
            <motion.div
                className="mt-8 text-gray-500 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <p className="flex items-center justify-center gap-2">
                    <FaSadTear className="text-yellow-500" />
                    <span>Sepertinya URL yang kamu cari tidak valid</span>
                    <FaCode className="text-blue-500" />
                </p>
                <p className="mt-2 text-sm">
                    Error ID: {Math.random().toString(36).substring(2, 10)}
                </p>
            </motion.div>
        </main>
    );
}
