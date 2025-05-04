"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaSadTear, FaCode, FaRedo, FaTerminal, FaBug } from "react-icons/fa";

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

export default function NotFound() {
    const [typedLines, setTypedLines] = useState([]);
    const [currentErrorMsg, setCurrentErrorMsg] = useState(errorMessages[0]);
    const [showRedoAnimation, setShowRedoAnimation] = useState(false);
    const [isHacking, setIsHacking] = useState(false);
    const [isBrokenConnectionActive, setIsBrokenConnectionActive] =
        useState(false);
    const [brokenWires, setBrokenWires] = useState([]);
    const [dataFragments, setDataFragments] = useState([]);
    const [audioLoaded, setAudioLoaded] = useState(false);

    const clickSoundRef = useRef(null);
    const containerRef = useRef(null);

    // Initialize audio after component mounts
    useEffect(() => {
        try {
            clickSoundRef.current = new Audio("/navbar-sound/click.mp3");
            clickSoundRef.current.addEventListener("canplaythrough", () => {
                setAudioLoaded(true);
            });
            clickSoundRef.current.addEventListener("error", (e) => {
                console.error("Audio loading error:", e);
            });
        } catch (err) {
            console.error("Audio initialization error:", err);
        }
    }, []);

    // Menyembunyikan komponen lain
    useEffect(() => {
        // Menyembunyikan navbar dan footer menggunakan DOM manipulation
        const navbar = document.querySelector("nav");
        const footer = document.querySelector("footer");

        if (navbar) navbar.style.display = "none";
        if (footer) footer.style.display = "none";

        document.body.style.overflow = "hidden";

        // Cleanup - mengembalikan tampilan saat komponen di-unmount
        return () => {
            if (navbar) navbar.style.display = "";
            if (footer) footer.style.display = "";
            document.body.style.overflow = "";
        };
    }, []);

    // Generate broken wires effect
    useEffect(() => {
        // Create 8-15 broken connection wires
        const wireCount = Math.floor(Math.random() * 8) + 8;
        const newWires = Array.from({ length: wireCount }).map((_, i) => ({
            id: `wire-${i}`,
            startX: Math.random() * 100,
            startY: Math.random() * 40 - 20,
            length: Math.random() * 30 + 20,
            width: Math.random() * 2 + 1,
            rotation: Math.random() * 60 - 30,
            delay: Math.random() * 5,
            duration: Math.random() * 10 + 8,
            color: Math.random() > 0.5 ? "#3B82F6" : "#06B6D4",
        }));

        setBrokenWires(newWires);

        // Generate data fragments (packets of data falling)
        const fragmentCount = 35;
        const fragments = Array.from({ length: fragmentCount }).map((_, i) => ({
            id: `fragment-${i}`,
            x: Math.random() * 100,
            y: Math.random() * 30 - 50, // Start above the screen
            size: Math.floor(Math.random() * 3) + 1,
            duration: Math.random() * 15 + 10,
            delay: Math.random() * 8,
            type:
                Math.random() > 0.7
                    ? "binary"
                    : Math.random() > 0.5
                    ? "code"
                    : "package",
            rotation: Math.random() * 360,
            opacity: Math.random() * 0.5 + 0.3,
        }));

        setDataFragments(fragments);

        // Activate broken connection effect periodically
        const interval = setInterval(() => {
            setIsBrokenConnectionActive(true);
            setTimeout(() => {
                setIsBrokenConnectionActive(false);
            }, 1000);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    // Efek animasi terminal typing
    useEffect(() => {
        let timeouts = [];

        terminalLines.forEach((line, index) => {
            const timeout = setTimeout(() => {
                setTypedLines((prev) => [...prev, { ...line, id: index }]);
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

    // Trigger animasi reload saat tombol di klik
    const triggerReloadAnimation = () => {
        setShowRedoAnimation(true);
        setTimeout(() => setShowRedoAnimation(false), 500);
    };

    // Mode "hacking" fun
    const triggerHackingMode = () => {
        if (clickSoundRef.current && audioLoaded) {
            clickSoundRef.current
                .play()
                .catch((err) => console.log("Audio play error:", err));
        }
        setIsHacking(true);
        setTimeout(() => setIsHacking(false), 3000);
    };

    // Membuat array dengan indeks unik untuk animasi kode jatuh
    const fallingCodeElements = Array.from({ length: 20 }).map((_, i) => ({
        id: `falling-code-${i}`,
        x: Math.random() * 100 - 50,
        y: -20,
        duration: Math.random() * 10 + 15,
        delay: Math.random() * 10,
    }));

    // Generate random code snippet for binary/code fragments
    const getRandomCodeFragment = (type) => {
        if (type === "binary") {
            return Math.random() > 0.5
                ? "01"
                : Math.random() > 0.5
                ? "10"
                : "00";
        } else if (type === "code") {
            const codeBits = [
                "<div>",
                "</div>",
                "<span>",
                "</>",
                "404",
                "null",
                "undefined",
                "error",
                "!found",
                "return void",
                "0x0",
            ];
            return codeBits[Math.floor(Math.random() * codeBits.length)];
        } else {
            // Package emojis
            const emojis = ["📁", "📦", "🔗", "📎", "📑", "🧩"];
            return emojis[Math.floor(Math.random() * emojis.length)];
        }
    };

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-50 bg-gray-900 text-white flex flex-col items-center justify-center p-6 overflow-hidden"
        >
            <style jsx global>{`
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

                @keyframes wireShort {
                    0% {
                        opacity: 0.8;
                        box-shadow: 0 0 8px currentColor;
                    }
                    20% {
                        opacity: 1;
                        box-shadow: 0 0 15px currentColor,
                            0 0 5px rgba(255, 255, 255, 0.8);
                    }
                    25% {
                        opacity: 0.2;
                    }
                    30% {
                        opacity: 1;
                        box-shadow: 0 0 15px currentColor;
                    }
                    70% {
                        box-shadow: 0 0 8px currentColor;
                        opacity: 0.5;
                    }
                    71% {
                        opacity: 0;
                    }
                    100% {
                        opacity: 0;
                    }
                }

                @keyframes dataBreak {
                    0% {
                        clip-path: inset(0 0 0 0);
                    }
                    20% {
                        clip-path: inset(20% 0 25% 0);
                    }
                    40% {
                        clip-path: inset(55% 0 10% 0);
                    }
                    60% {
                        clip-path: inset(15% 0 65% 0);
                    }
                    80% {
                        clip-path: inset(5% 0 40% 0);
                    }
                    100% {
                        clip-path: inset(0 0 0 0);
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

                .data-break {
                    animation: dataBreak 0.5s linear infinite;
                }

                .broken-wire {
                    position: absolute;
                    background: linear-gradient(
                        90deg,
                        currentColor,
                        rgba(6, 182, 212, 0.1)
                    );
                    transform-origin: left center;
                    border-radius: 2px;
                }

                .fragment-binary {
                    font-family: monospace;
                    font-weight: bold;
                    color: #88ff88;
                    text-shadow: 0 0 5px #00ff00;
                }

                .fragment-code {
                    font-family: monospace;
                    color: #0cc;
                }

                .fragment-package {
                    font-size: 1.2em;
                }
            `}</style>

            {/* Broken connection wires */}
            {brokenWires.map((wire) => (
                <motion.div
                    key={`wire-${wire.id}`}
                    className="absolute broken-wire"
                    style={{
                        top: `${wire.startY}%`,
                        left: `${wire.startX}%`,
                        height: `${wire.width}px`,
                        width: `${wire.length}%`,
                        color: wire.color,
                    }}
                    initial={{
                        scaleX: 1,
                        opacity: 0.8,
                        rotate: wire.rotation,
                    }}
                    animate={{
                        scaleX: [1, 0.8, 0.6, 0.4, 0.2, 0],
                        opacity: isBrokenConnectionActive ? [1, 0] : 0.8,
                    }}
                    transition={{
                        scaleX: {
                            duration: wire.duration,
                            delay: wire.delay,
                            repeat: Infinity,
                            ease: "linear",
                        },
                        opacity: isBrokenConnectionActive
                            ? { duration: 0.2, times: [0, 1] }
                            : {},
                    }}
                />
            ))}

            {/* Data fragments (packets falling) */}
            {dataFragments.map((fragment, idx) => (
                <motion.div
                    key={`data-fragment-${fragment.id}-${idx}`}
                    className={`absolute text-xs ${
                        fragment.type === "binary"
                            ? "fragment-binary"
                            : fragment.type === "code"
                            ? "fragment-code"
                            : "fragment-package"
                    }`}
                    style={{ opacity: fragment.opacity }}
                    initial={{
                        x: `${fragment.x}%`,
                        y: fragment.y,
                        rotate: fragment.rotation,
                        scale: fragment.size,
                    }}
                    animate={{
                        y: "150vh",
                        x: [
                            `${fragment.x}%`,
                            `${fragment.x - 5 + Math.random() * 10}%`,
                            `${fragment.x - 8 + Math.random() * 16}%`,
                            `${fragment.x - 10 + Math.random() * 20}%`,
                        ],
                        rotate: fragment.rotation + 360,
                        opacity: [
                            fragment.opacity,
                            fragment.opacity + 0.2,
                            fragment.opacity - 0.1,
                            fragment.opacity + 0.1,
                            0,
                        ],
                    }}
                    transition={{
                        duration: fragment.duration,
                        repeat: Infinity,
                        ease: "linear",
                        delay: fragment.delay,
                        opacity: {
                            times: [0, 0.2, 0.5, 0.8, 1],
                            duration: fragment.duration,
                        },
                    }}
                >
                    {getRandomCodeFragment(fragment.type)}
                </motion.div>
            ))}

            {/* Original animated code elements */}
            {fallingCodeElements.map((item, index) => (
                <motion.div
                    key={`falling-code-element-${item.id}-${index}`}
                    className="absolute text-blue-500 opacity-30 text-xs"
                    initial={{ x: `${item.x}%`, y: item.y, opacity: 0.7 }}
                    animate={{
                        y: "150vh",
                        opacity: [0.7, 0.5, 0.7],
                        x: `calc(${item.x}% + ${
                            Math.sin(Math.random() * 5) * 100
                        }px)`,
                    }}
                    transition={{
                        duration: item.duration,
                        repeat: Infinity,
                        ease: "linear",
                        delay: item.delay,
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
                        className={`text-green-500 font-mono text-2xl ${
                            isBrokenConnectionActive ? "data-break" : ""
                        }`}
                    >
                        ACCESSING MAINFRAME...
                        <span className="blinking-cursor"></span>
                    </motion.div>
                </div>
            )}

            {/* Container utama */}
            <motion.div
                className={`relative z-10 max-w-xl w-full bg-gray-800 rounded-lg overflow-hidden shadow-2xl border border-gray-700 ${
                    isBrokenConnectionActive ? "data-break" : ""
                }`}
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
                        {typedLines.map((line) => (
                            <motion.div
                                key={`terminal-line-${line.id}`}
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
        </div>
    );
}
