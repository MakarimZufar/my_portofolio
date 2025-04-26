import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TechRow from "./TechRow";
import TechInfoModal from "./TechInfoModal";
import { techRows } from "@/data/techStackData";
import styles from "./TechStack.module.css";

const TechStackCarousel = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [selectedTech, setSelectedTech] = useState(null);
    const containerRef = useRef(null);
    const glowRef = useRef(null);

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

    const handleTechSelect = (tech) => {
        setSelectedTech(tech);
    };

    const handleCloseModal = () => {
        setSelectedTech(null);
    };

    return (
        <div className="px-6 sm:px-20 w-full flex flex-col items-center">
            <div
                className={styles.container}
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
                <div className={styles.header}>
                    <div className={styles.headerDots}>
                        <span
                            className={`${styles.dot} ${styles.redDot}`}
                        ></span>
                        <span
                            className={`${styles.dot} ${styles.yellowDot}`}
                        ></span>
                        <span
                            className={`${styles.dot} ${styles.greenDot}`}
                        ></span>
                    </div>
                    <h3 className={styles.title}>
                        <motion.span
                            initial={{ backgroundPosition: "0% 0%" }}
                            animate={{ backgroundPosition: "100% 100%" }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                repeatType: "reverse",
                            }}
                            className={styles.gradientText}
                        >
                            My tech stack & tools
                        </motion.span>
                    </h3>
                </div>

                <div className={styles.rowContainer}>
                    {techRows.map((row, rowIndex) => (
                        <TechRow
                            key={rowIndex}
                            rowIndex={rowIndex}
                            rowData={row}
                            isHovered={isHovered}
                            onTechSelect={handleTechSelect}
                        />
                    ))}
                </div>

                {/* Tech info modal */}
                <AnimatePresence>
                    {selectedTech && (
                        <TechInfoModal
                            tech={selectedTech}
                            onClose={handleCloseModal}
                        />
                    )}
                </AnimatePresence>

                {/* Bottom message */}
                <motion.div
                    className={styles.bottomMessage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <p className={styles.messageText}>
                        <span className={styles.emphasis}>Relentless</span> in
                        pursuit of{" "}
                        <span className={styles.emphasis}>
                            peak performance
                        </span>
                        , I pour unwavering{" "}
                        <motion.span
                            className={styles.gradientBlue}
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
                            className={styles.gradientPink}
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
