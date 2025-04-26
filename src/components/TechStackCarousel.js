import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaReact,
    FaNodeJs,
    FaVuejs,
    FaPython,
    FaDocker,
    FaGitAlt,
    FaAws,
    FaJava,
    FaFigma,
} from "react-icons/fa";
import {
    SiJavascript,
    SiTypescript,
    SiTailwindcss,
    SiNextdotjs,
    SiMongodb,
    SiFirebase,
    SiPostgresql,
    SiDjango,
    SiRedux,
    SiGraphql,
    SiVercel,
} from "react-icons/si";
import { TbBrandCpp, TbBrandGolang } from "react-icons/tb";

const TechStackCarousel = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [selectedTech, setSelectedTech] = useState(null);
    const containerRef = useRef(null);
    const glowRef = useRef(null);

    // Define all tech stacks with their icons, colors, and descriptions
    const techRows = [
        [
            {
                icon: <FaReact size={42} />,
                name: "React",
                color: "#61DAFB",
                bgColor: "#282C34",
                description: "Component-based UI library",
            },
            {
                icon: <SiJavascript size={42} />,
                name: "JavaScript",
                color: "#F7DF1E",
                bgColor: "#000000",
                description: "Web programming language",
            },
            {
                icon: <SiTypescript size={42} />,
                name: "TypeScript",
                color: "#3178C6",
                bgColor: "#1A1A1A",
                description: "Static typed JavaScript",
            },
            {
                icon: <SiTailwindcss size={42} />,
                name: "Tailwind",
                color: "#06B6D4",
                bgColor: "#0F172A",
                description: "Utility-first CSS framework",
            },
            {
                icon: <SiNextdotjs size={42} />,
                name: "Next.js",
                color: "#FFFFFF",
                bgColor: "#000000",
                description: "React framework",
            },
            {
                icon: <FaNodeJs size={42} />,
                name: "Node.js",
                color: "#339933",
                bgColor: "#1A1A1A",
                description: "JavaScript runtime",
            },
            {
                icon: <SiRedux size={42} />,
                name: "Redux",
                color: "#764ABC",
                bgColor: "#1A1A1A",
                description: "State management library",
            },
            {
                icon: <FaVuejs size={42} />,
                name: "Vue.js",
                color: "#4FC08D",
                bgColor: "#35495E",
                description: "Progressive JavaScript framework",
            },
        ],
        [
            {
                icon: <SiFirebase size={42} />,
                name: "Firebase",
                color: "#FFCA28",
                bgColor: "#1A1A1A",
                description: "Backend-as-a-Service",
            },
            {
                icon: <SiMongodb size={42} />,
                name: "MongoDB",
                color: "#47A248",
                bgColor: "#1A1A1A",
                description: "NoSQL database",
            },
            {
                icon: <FaDocker size={42} />,
                name: "Docker",
                color: "#2496ED",
                bgColor: "#0F172A",
                description: "Containerization platform",
            },
            {
                icon: <FaGitAlt size={42} />,
                name: "Git",
                color: "#F05032",
                bgColor: "#1A1A1A",
                description: "Version control system",
            },
            {
                icon: <FaAws size={42} />,
                name: "AWS",
                color: "#FF9900",
                bgColor: "#1A1A1A",
                description: "Cloud services provider",
            },
            {
                icon: <SiGraphql size={42} />,
                name: "GraphQL",
                color: "#E10098",
                bgColor: "#1A1A1A",
                description: "API query language",
            },
            {
                icon: <SiVercel size={42} />,
                name: "Vercel",
                color: "#FFFFFF",
                bgColor: "#000000",
                description: "Deployment platform",
            },
            {
                icon: <SiPostgresql size={42} />,
                name: "PostgreSQL",
                color: "#4169E1",
                bgColor: "#1A1A1A",
                description: "Relational database",
            },
        ],
    ];

    // Handle glow effect
    useEffect(() => {
        if (glowRef.current && containerRef.current) {
            const handleGlowEffect = (e) => {
                const rect = containerRef.current.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                glowRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(120, 120, 255, 0.15), transparent 50%)`;
            };

            const container = containerRef.current;
            container.addEventListener("mousemove", handleGlowEffect);

            return () => {
                container.removeEventListener("mousemove", handleGlowEffect);
            };
        }
    }, []);

    return (
        <div className="px-6 sm:px-20 w-full flex flex-col items-center">
            <div
                className="p-8 rounded-xl bg-gray-900 w-full max-w-5xl mx-auto overflow-hidden relative border border-gray-800"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                    setIsHovered(false);
                    setSelectedTech(null);
                }}
                ref={containerRef}
            >
                {/* Interactive glow effect */}
                <div
                    ref={glowRef}
                    className="absolute inset-0 pointer-events-none"
                />

                {/* Top dots and title with animated gradient */}
                <div className="mb-6 flex items-center space-x-3">
                    <div className="flex space-x-1">
                        <span className="w-3 h-3 rounded-full bg-red-500"></span>
                        <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    </div>
                    <h3 className="text-gray-300 font-mono text-sm">
                        <motion.span
                            initial={{ backgroundPosition: "0% 0%" }}
                            animate={{ backgroundPosition: "100% 100%" }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                repeatType: "reverse",
                            }}
                            className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text font-semibold"
                        >
                            My tech stack & tools
                        </motion.span>
                    </h3>
                </div>

                <div className="space-y-12">
                    {techRows.map((row, rowIndex) => (
                        <div
                            key={rowIndex}
                            className="relative overflow-hidden"
                        >
                            <motion.div
                                className="flex space-x-5"
                                animate={{
                                    x: isHovered
                                        ? 0
                                        : rowIndex % 2 === 0
                                        ? "-100%"
                                        : "0%",
                                }}
                                initial={{
                                    x: rowIndex % 2 === 0 ? "0%" : "-100%",
                                }}
                                transition={{
                                    x: {
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        duration: 25 - rowIndex * 5, // Different speeds for each row
                                        ease: "linear",
                                    },
                                }}
                            >
                                {/* First set of items */}
                                {row.map((tech, index) => (
                                    <div
                                        key={`${rowIndex}-${index}`}
                                        className="relative"
                                    >
                                        <motion.div
                                            className="flex-shrink-0 w-32 h-32 flex flex-col items-center justify-center rounded-xl cursor-pointer relative overflow-hidden"
                                            style={{
                                                backgroundColor: tech.bgColor,
                                            }}
                                            whileHover={{
                                                scale: 1.15,
                                                y: -8,
                                                boxShadow: `0 10px 25px -5px ${tech.color}40`,
                                            }}
                                            onClick={() =>
                                                setSelectedTech(tech)
                                            }
                                            transition={{
                                                scale: {
                                                    type: "spring",
                                                    stiffness: 400,
                                                    damping: 10,
                                                },
                                            }}
                                        >
                                            <motion.div
                                                className="absolute inset-0 opacity-0"
                                                initial={{
                                                    background: `radial-gradient(circle at center, ${tech.color}30 0%, transparent 70%)`,
                                                }}
                                                whileHover={{ opacity: 0.6 }}
                                            />

                                            <motion.div
                                                style={{ color: tech.color }}
                                                whileHover={{
                                                    scale: 1.2,
                                                    y: -5,
                                                }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 400,
                                                }}
                                            >
                                                {tech.icon}
                                            </motion.div>

                                            <motion.span
                                                className="mt-3 text-sm font-medium"
                                                style={{ color: tech.color }}
                                                initial={{ opacity: 0.7 }}
                                                whileHover={{ opacity: 1 }}
                                            >
                                                {tech.name}
                                            </motion.span>
                                        </motion.div>
                                    </div>
                                ))}

                                {/* Duplicated set for infinite scroll */}
                                {row.map((tech, index) => (
                                    <div
                                        key={`${rowIndex}-${index}-dup`}
                                        className="relative"
                                    >
                                        <motion.div
                                            className="flex-shrink-0 w-32 h-32 flex flex-col items-center justify-center rounded-xl cursor-pointer relative overflow-hidden"
                                            style={{
                                                backgroundColor: tech.bgColor,
                                            }}
                                            whileHover={{
                                                scale: 1.15,
                                                y: -8,
                                                boxShadow: `0 10px 25px -5px ${tech.color}40`,
                                            }}
                                            onClick={() =>
                                                setSelectedTech(tech)
                                            }
                                            transition={{
                                                scale: {
                                                    type: "spring",
                                                    stiffness: 400,
                                                    damping: 10,
                                                },
                                            }}
                                        >
                                            <motion.div
                                                className="absolute inset-0 opacity-0"
                                                initial={{
                                                    background: `radial-gradient(circle at center, ${tech.color}30 0%, transparent 70%)`,
                                                }}
                                                whileHover={{ opacity: 0.6 }}
                                            />

                                            <motion.div
                                                style={{ color: tech.color }}
                                                whileHover={{
                                                    scale: 1.2,
                                                    y: -5,
                                                }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 400,
                                                }}
                                            >
                                                {tech.icon}
                                            </motion.div>

                                            <motion.span
                                                className="mt-3 text-sm font-medium"
                                                style={{ color: tech.color }}
                                                initial={{ opacity: 0.7 }}
                                                whileHover={{ opacity: 1 }}
                                            >
                                                {tech.name}
                                            </motion.span>
                                        </motion.div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    ))}
                </div>

                {/* Tech info modal */}
                <AnimatePresence>
                    {selectedTech && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-30"
                            onClick={() => setSelectedTech(null)}
                        >
                            <motion.div
                                className="bg-gray-900 border border-gray-700 p-8 rounded-xl max-w-md"
                                initial={{ y: 50 }}
                                animate={{ y: 0 }}
                                exit={{ y: 50 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex items-center space-x-4 mb-4">
                                    <div
                                        className="w-16 h-16 rounded-lg flex items-center justify-center"
                                        style={{
                                            backgroundColor:
                                                selectedTech.bgColor,
                                        }}
                                    >
                                        <div
                                            style={{
                                                color: selectedTech.color,
                                            }}
                                        >
                                            {selectedTech.icon}
                                        </div>
                                    </div>
                                    <div>
                                        <h3
                                            className="text-2xl font-bold"
                                            style={{
                                                color: selectedTech.color,
                                            }}
                                        >
                                            {selectedTech.name}
                                        </h3>
                                        <p className="text-gray-400">
                                            {selectedTech.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-gray-300">
                                        Experience with {selectedTech.name}{" "}
                                        includes building modern, efficient
                                        applications with focus on performance
                                        and scalability.
                                    </p>
                                    <div className="flex space-x-3">
                                        <span className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-300">
                                            Web
                                        </span>
                                        <span className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-300">
                                            Development
                                        </span>
                                        <span className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-300">
                                            Frontend
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Bottom message */}
                <motion.div
                    className="mt-8 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <p className="text-gray-400 text-sm font-medium">
                        <span className="text-gray-200 font-semibold">
                            Relentless
                        </span>{" "}
                        in pursuit of{" "}
                        <span className="text-gray-200 font-semibold">
                            peak performance
                        </span>
                        , I pour unwavering{" "}
                        <motion.span
                            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text font-bold px-1.5"
                            initial={{ backgroundPosition: "0% 0%" }}
                            animate={{ backgroundPosition: "100% 100%" }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                repeatType: "reverse",
                            }}
                        >
                            attention to detail
                        </motion.span>{" "}
                        to craft{" "}
                        <motion.span
                            className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text font-bold px-1.5"
                            initial={{ backgroundPosition: "0% 0%" }}
                            animate={{ backgroundPosition: "100% 100%" }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                repeatType: "reverse",
                            }}
                        >
                            flawless results
                        </motion.span>
                        .
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default TechStackCarousel;
