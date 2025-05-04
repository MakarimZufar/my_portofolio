"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    FaSadTear,
    FaCode,
    FaRedo,
    FaTerminal,
    FaBug,
    FaSkull,
    FaTv,
    FaBolt,
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
    "/* FATAL ERROR: Memory corrupted */",
    "// SYSTEM FAILURE: Connection lost",
    "/* CORRUPTED DATA: Unable to restore */",
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
        text: "> WARNING: DATA CORRUPTION DETECTED",
        delay: 3300,
        class: "text-yellow-400 font-bold",
    },
    {
        text: "> CRITICAL ERROR: SYSTEM UNSTABLE",
        delay: 3600,
        class: "text-red-500 font-bold",
    },
    {
        text: "> suggesting alternative routes...",
        delay: 3900,
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
    const [tvStaticIntensity, setTvStaticIntensity] = useState(0.2);
    const [glitchIntensity, setGlitchIntensity] = useState(1);
    const [showVerticalHold, setShowVerticalHold] = useState(false);
    const [showColorDistortion, setShowColorDistortion] = useState(false);

    const clickSoundRef = useRef(null);
    const containerRef = useRef(null);
    const noiseRef = useRef(null);

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

        // Initialize TV static/noise effect
        const staticInterval = setInterval(() => {
            setTvStaticIntensity(Math.random() * 0.5 + 0.1);
        }, 500);

        // Random glitch intensity changes
        const glitchInterval = setInterval(() => {
            setGlitchIntensity(Math.random() * 2 + 0.5);

            // Random vertical hold issue (TV rolling effect)
            if (Math.random() > 0.7) {
                setShowVerticalHold(true);
                setTimeout(
                    () => setShowVerticalHold(false),
                    700 + Math.random() * 1000
                );
            }

            // Random color distortion
            if (Math.random() > 0.6) {
                setShowColorDistortion(true);
                setTimeout(
                    () => setShowColorDistortion(false),
                    300 + Math.random() * 500
                );
            }
        }, 2000);

        return () => {
            clearInterval(staticInterval);
            clearInterval(glitchInterval);
        };
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
        // Create 15-25 broken connection wires (increased from original)
        const wireCount = Math.floor(Math.random() * 10) + 15;
        const newWires = Array.from({ length: wireCount }).map((_, i) => ({
            id: `wire-${i}`,
            startX: Math.random() * 100,
            startY: Math.random() * 40 - 20,
            length: Math.random() * 30 + 20,
            width: Math.random() * 3 + 1, // Increased width
            rotation: Math.random() * 60 - 30,
            delay: Math.random() * 5,
            duration: Math.random() * 10 + 8,
            color:
                Math.random() > 0.6
                    ? "#3B82F6"
                    : Math.random() > 0.3
                    ? "#06B6D4"
                    : Math.random() > 0.5
                    ? "#EF4444"
                    : "#F59E0B",
            flickerRate: Math.random() > 0.5 ? "fast" : "slow",
        }));

        setBrokenWires(newWires);

        // Generate data fragments (packets of data falling)
        const fragmentCount = 50; // Increased from original
        const fragments = Array.from({ length: fragmentCount }).map((_, i) => ({
            id: `fragment-${i}`,
            x: Math.random() * 100,
            y: Math.random() * 30 - 50, // Start above the screen
            size: Math.floor(Math.random() * 4) + 1, // Increased size
            duration: Math.random() * 15 + 10,
            delay: Math.random() * 8,
            type:
                Math.random() > 0.6
                    ? "binary"
                    : Math.random() > 0.4
                    ? "code"
                    : Math.random() > 0.5
                    ? "package"
                    : "error",
            rotation: Math.random() * 360,
            opacity: Math.random() * 0.6 + 0.4, // Increased opacity
            glitchy: Math.random() > 0.7,
        }));

        setDataFragments(fragments);

        // Activate broken connection effect periodically
        const interval = setInterval(() => {
            setIsBrokenConnectionActive(true);
            setTimeout(() => {
                setIsBrokenConnectionActive(false);
            }, 1000);
        }, 4000);

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
        setTvStaticIntensity(0.8); // Increase static during "hacking"
        setGlitchIntensity(3); // Increase glitch during "hacking"
        setTimeout(() => {
            setIsHacking(false);
            setTvStaticIntensity(0.2);
            setGlitchIntensity(1);
        }, 3000);
    };

    // Membuat array dengan indeks unik untuk animasi kode jatuh
    const fallingCodeElements = Array.from({ length: 30 }).map((_, i) => ({
        id: `falling-code-${i}`,
        x: Math.random() * 100 - 50,
        y: -20,
        duration: Math.random() * 10 + 15,
        delay: Math.random() * 10,
        glitchy: Math.random() > 0.6,
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
                "FATAL",
                "ERROR",
                "</ERROR>",
                "0xDEAD",
            ];
            return codeBits[Math.floor(Math.random() * codeBits.length)];
        } else if (type === "error") {
            const errors = [
                "ERR!",
                "FAULT",
                "404",
                "CRASH",
                "BSOD",
                "x_x",
                "FAIL",
                "DEAD",
            ];
            return errors[Math.floor(Math.random() * errors.length)];
        } else {
            // Package emojis
            const emojis = [
                "📁",
                "📦",
                "🔗",
                "📎",
                "📑",
                "🧩",
                "⚠️",
                "🔥",
                "⛔",
                "💀",
            ];
            return emojis[Math.floor(Math.random() * emojis.length)];
        }
    };

    return (
        <div
            ref={containerRef}
            className={`fixed inset-0 z-50 bg-gray-900 text-white flex flex-col items-center justify-center p-6 overflow-hidden ${
                showVerticalHold ? "vertical-hold-effect" : ""
            } ${showColorDistortion ? "color-distortion" : ""}`}
        >
            <style jsx global>{`
                @keyframes noise {
                    0%,
                    100% {
                        background-position: 0 0;
                    }
                    10% {
                        background-position: -5% -10%;
                    }
                    20% {
                        background-position: -15% 5%;
                    }
                    30% {
                        background-position: 7% -25%;
                    }
                    40% {
                        background-position: 20% 25%;
                    }
                    50% {
                        background-position: -25% 10%;
                    }
                    60% {
                        background-position: 15% 5%;
                    }
                    70% {
                        background-position: 0% 15%;
                    }
                    80% {
                        background-position: 25% 35%;
                    }
                    90% {
                        background-position: -10% 10%;
                    }
                }

                @keyframes glitch-animation {
                    0% {
                        transform: translate(0);
                    }
                    20% {
                        transform: translate(-5px, 5px);
                    }
                    40% {
                        transform: translate(-5px, -5px);
                    }
                    60% {
                        transform: translate(5px, 5px);
                    }
                    80% {
                        transform: translate(5px, -5px);
                    }
                    100% {
                        transform: translate(0);
                    }
                }

                @keyframes hard-glitch {
                    0% {
                        transform: translate(0);
                        text-shadow: -2px 0 #ff0000;
                        clip-path: inset(0 0 0 0);
                    }
                    10% {
                        clip-path: inset(15% 0 25% 0);
                    }
                    20% {
                        clip-path: inset(35% 0 58% 0);
                        transform: translate(-7px, 2px);
                        text-shadow: 3px 0 #00ff00;
                    }
                    30% {
                        clip-path: inset(75% 0 5% 0);
                    }
                    40% {
                        transform: translate(4px, -2px);
                        text-shadow: -3px 0 #0000ff;
                        clip-path: inset(23% 0 62% 0);
                    }
                    50% {
                        transform: translate(-3px, 4px);
                        text-shadow: 2px 0 #ff00ff;
                        clip-path: inset(0 0 0 0);
                    }
                    60% {
                        clip-path: inset(45% 0 14% 0);
                    }
                    70% {
                        clip-path: inset(57% 0 28% 0);
                        transform: translate(6px, -4px);
                        text-shadow: -4px 0 #00ffff;
                    }
                    80% {
                        transform: translate(-5px, 5px);
                        text-shadow: 5px 0 #ffff00;
                        clip-path: inset(13% 0 75% 0);
                    }
                    90% {
                        clip-path: inset(42% 0 53% 0);
                    }
                    100% {
                        transform: translate(0);
                        text-shadow: -2px 0 #ff0000;
                        clip-path: inset(0 0 0 0);
                    }
                }

                @keyframes static-noise {
                    0% {
                        transform: translate(0, 0);
                    }
                    10% {
                        transform: translate(-1%, -1%);
                    }
                    20% {
                        transform: translate(-2%, 2%);
                    }
                    30% {
                        transform: translate(1%, -1%);
                    }
                    40% {
                        transform: translate(2%, 2%);
                    }
                    50% {
                        transform: translate(-1%, 1%);
                    }
                    60% {
                        transform: translate(-2%, -2%);
                    }
                    70% {
                        transform: translate(3%, -1%);
                    }
                    80% {
                        transform: translate(1%, 2%);
                    }
                    90% {
                        transform: translate(1%, -2%);
                    }
                    100% {
                        transform: translate(0, 0);
                    }
                }

                @keyframes vertical-hold {
                    0% {
                        transform: translateY(0);
                    }
                    25% {
                        transform: translateY(-20px);
                    }
                    50% {
                        transform: translateY(0);
                    }
                    75% {
                        transform: translateY(40px);
                    }
                    100% {
                        transform: translateY(0);
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

                @keyframes fastWireShort {
                    0% {
                        opacity: 1;
                        box-shadow: 0 0 12px currentColor;
                    }
                    25% {
                        opacity: 0.2;
                    }
                    50% {
                        opacity: 1;
                        box-shadow: 0 0 20px currentColor;
                    }
                    55% {
                        opacity: 0.4;
                    }
                    60% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 0.8;
                    }
                    91% {
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

                .noise-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    pointer-events: none;
                    z-index: 100;
                    overflow: hidden;
                }

                .noise-overlay {
                    position: absolute;
                    top: -100%;
                    left: -100%;
                    right: -100%;
                    bottom: -100%;
                    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAp4XiDAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAATcSURBVGhD7ZpNiFxVFMfPeTPl2DBtbJsahcEmghIMSEBBqKIbFUTc2Y0RXCgiBnHlRlyJrlxIQHEhblQUP1BD8ANEcFGJlGATbZqkxnymnek49vX3P/fcd9+b92beTBdJ4P3ht7vn3HfPu/e8c879mBl1dHR0dHR0bADG43Fun9ERGWQbjwExGo3yDt18Pk+apqleC8S1y3aSJDmez+cPYrvahWwXaCtwbXu02WwO4JzBseK8woM0TUc45pigbBDPiYsbsudYPiIHAQH0YJfLYGcwvAc8in09wSLB36EPeI9oEcF7cP4N4hGYjbj1QV5K0xlaAxIRSQzDB/VNgqK2Ccrp7XfhcxgxiegjJB+TtQ57Db6wJBnwNDY8EhHBuFskTbFJj6O5AvYqrEuSSzIfJ+lD2OvoL+XzmBj+R5aqeAM2FMHrKr3LNhPGzFPVFCzYEqXEGNqCcRu0PdoO2y1sW9nuYP0s6+fCfB0YE4wdot1H+3iapj0sXcULyXSt8lH2/Bmwgr/AFhhwGXvOULbK4Tc+gSU58BFrssLGhUEYa8BeKSdBux/7NLZDtM9ZSmKTwVYpJ3QQ16FbwLZDJoXsYj4O33NkOQf/H5PJJBOgDYlEBK4TuBk63Iu0CtjbsHeQHRf4nSbDITKM7UWR1YTf8q6jAvrW4O/wl1hm3EhRYXVCRF6Fs0hgrAt8zyXJqfQ3nDdBXb5yG7JnSK4j1yOLkNv7Vu/FtgvvUhrsGmrNDCIi78F3L6uFLpGh9rBHZuZvuS3Y3vEJgQ5kq+xCFIrb+xbFcRyN5BYCN5XLvXjYDPqEQYHwm8nQBnQu7qJ9J10u1K6qikhZhC7DWYphpHq6RGzEgvzT2HiSJOe1ZUK09w6FYTZG4Rm67aMVEwn9F8KAK8lykQzVmrUYEkBz5KGwpopIXnILntWLkKEuw8mXcL5L1ifJsqZGkHgJXuQvIaQLKdpYwl1kpCm5BV1CnXwh7HmNNBXJ2O1kO1Q7A/aQi/dFNGJdFgjHUK7PaK9hT1FgL9nUHSB9BtaTJZP1Yv1RxLpFgHocPtxRB1Mf7lVyD+AaRZYLZJi+X9vhgf9OcOdKbdYvApvv6CNRnm1LXgZqzJ4mCR3Uo6VcMh1jG5E8H+bGQGeCdBFPJOdZNBIReKnsEBXYKOp7cB52D0VEVJKxv8K5yMHH/w6rFnFd5RUF9FPsDvN5LrRZvwiKlRhZQUTe9+B8Ck0nz2vY0u5vFrBjMnvS2UQDEecIx93Yb3OBgc7gXGhFBMLJQ9e2LlC6L12G9/UZ9neSO0iOJMm+7uRDMlnM5aTuQO/lm1H4VhDRiYBiGYL74eReFdY/4D9LhrkbBWcH1/g5nH5nwf9Tbdnf9wL/Ae0Yyb7d84q5NxJI8CbOQaJ8g3aUdqAh+J/TkxfqEnKKuxb6rEzuC5xD9JXugDZ7L8jwDNp8L/VPMQg8B1M+PgPzkYo0EyLgfLJ8Buk6PAo/Wn+B+C1ZDtPexrZchPPRCrdMGVbrhb4nN9NMiCgxnfQ4fybnMMuaC4T+dfoepWvt9l6kcX0R8xEoI+I+WP+uSK6vIxIwIQKB/l+5jkgkoutuOZJnf9n/jI6Ojo6Ojo7rSDT6F+IM7K3pMSO5AAAAAElFTkSuQmCC");
                    opacity: 0.03;
                    transform: translateZ(0);
                    animation: noise 0.2s infinite;
                }

                .glitchy-text {
                    animation: hard-glitch 1s infinite;
                    display: inline-block;
                }

                .vertical-hold-effect {
                    animation: vertical-hold 0.5s infinite;
                }

                .color-distortion {
                    filter: hue-rotate(90deg) saturate(200%) contrast(150%);
                }

                .glitch {
                    position: relative;
                    font-size: 8rem;
                    font-weight: 700;
                    text-align: center;
                    color: #f56565;
                    letter-spacing: -0.02em;
                    animation: hard-glitch 0.5s infinite;
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
                    animation: glitch-animation 1s infinite linear
                        alternate-reverse;
                    clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
                }

                .glitch::after {
                    left: -2px;
                    text-shadow: 2px 0 #f56565;
                    animation: glitch-animation 2s infinite linear
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

                .broken-wire.fast-flicker {
                    animation: fastWireShort 1s infinite;
                }

                .broken-wire.slow-flicker {
                    animation: wireShort 2s infinite;
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

                .fragment-error {
                    font-family: monospace;
                    font-weight: bold;
                    color: #ff5555;
                    text-shadow: 0 0 5px #ff0000;
                }

                .fragment-package {
                    font-size: 1.2em;
                }

                .tv-static {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-image: url("data:image/png;base64,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");
                    background-position: 0 0;
                    background-size: 100px 100px;
                    z-index: 1000;
                    pointer-events: none;
                    opacity: 0.15;
                    animation: static-noise 0.1s infinite;
                }
            `}</style>

            {/* TV static overlay */}
            <div
                className="tv-static"
                style={{ opacity: tvStaticIntensity }}
                ref={noiseRef}
            ></div>

            {/* Horizontal scan lines */}
            <div className="noise-container">
                <div className="noise-overlay"></div>
            </div>

            {/* Broken connection wires */}
            {brokenWires.map((wire) => (
                <motion.div
                    key={`wire-${wire.id}`}
                    className={`absolute broken-wire ${
                        wire.flickerRate === "fast"
                            ? "fast-flicker"
                            : "slow-flicker"
                    }`}
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
                            : fragment.type === "error"
                            ? "fragment-error"
                            : "fragment-package"
                    } ${fragment.glitchy ? "glitchy-text" : ""}`}
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
                    className={`absolute text-blue-500 opacity-30 text-xs ${
                        item.glitchy ? "glitchy-text" : ""
                    }`}
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
                        [
                            "div",
                            "span",
                            "p",
                            "h1",
                            "a",
                            "code",
                            "img",
                            "error",
                            "crash",
                            "404",
                        ][Math.floor(Math.random() * 10)]
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
                        } glitchy-text`}
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
                animate={{
                    y: [
                        0,
                        showVerticalHold ? 20 : 0,
                        showVerticalHold ? -30 : 0,
                    ],
                    opacity: 1,
                    x: showColorDistortion ? [-5, 5, -7, 3] : 0,
                }}
                transition={{
                    duration: 0.5,
                    x: { duration: 0.2, repeat: showColorDistortion ? 3 : 0 },
                }}
                style={{
                    boxShadow: showColorDistortion
                        ? "0 0 15px rgba(255,0,0,0.8), 0 0 25px rgba(0,255,255,0.5)"
                        : "0 0 20px rgba(0,0,0,0.5)",
                }}
            >
                {/* Header seperti window browser */}
                <div className="bg-gray-900 px-4 py-2 flex items-center">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1 text-center text-sm text-gray-400">
                        <span
                            className={
                                showColorDistortion ? "glitchy-text" : ""
                            }
                        >
                            fatal_error.log
                        </span>
                    </div>
                </div>

                {/* 404 Section */}
                <div className="p-6 relative">
                    {/* Visual corruption artifacts */}
                    <div
                        className="absolute inset-0 pointer-events-none z-10"
                        style={{
                            backgroundImage:
                                "linear-gradient(transparent, rgba(255,0,0,0.03), transparent, rgba(0,255,255,0.03), transparent)",
                            backgroundSize: "100% 5px",
                            opacity: 0.7,
                        }}
                    ></div>

                    <div
                        className="glitch"
                        style={{
                            textShadow: `${glitchIntensity * 2}px 0 #ff0000, ${
                                -glitchIntensity * 2
                            }px 0 #00ffff`,
                            animationDuration: `${0.5 / glitchIntensity}s`,
                        }}
                    >
                        404
                    </div>

                    {/* Error message rotating */}
                    <div className="h-8 flex justify-center mb-8">
                        <motion.div
                            key={currentErrorMsg}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className={`text-green-400 font-mono text-sm ${
                                showColorDistortion ? "glitchy-text" : ""
                            }`}
                        >
                            {currentErrorMsg}
                        </motion.div>
                    </div>

                    {/* Terminal effect */}
                    <div className="bg-black p-4 rounded-md mb-6 font-mono text-sm">
                        <div className="flex items-center mb-2">
                            <span className="text-green-500">
                                user@corrupted-system
                            </span>
                            <span className="text-white">:</span>
                            <span className="text-blue-400">~/broken-data</span>
                            <span className="text-white">$ </span>
                            <FaTerminal className="ml-2 text-gray-400" />
                        </div>
                        {typedLines.map((line) => (
                            <motion.div
                                key={`terminal-line-${line.id}`}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`${line.class} ${
                                    line.id > 5 ? "glitchy-text" : ""
                                }`}
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
                    <FaSkull className="text-red-500" />
                    <span className={showColorDistortion ? "glitchy-text" : ""}>
                        Data corruption detected: URL tidak dapat di-resolve
                    </span>
                    <FaBolt className="text-yellow-500" />
                </p>
                <p className="mt-2 text-sm">
                    <span className="text-red-400">CRITICAL:</span> Error ID:{" "}
                    {Math.random().toString(36).substring(2, 10)}
                </p>
            </motion.div>
        </div>
    );
}
