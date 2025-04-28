// src/components/experience/ExperienceSection.js
import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

// Import components and utilities
import ExperienceCard from "./ExperienceCard";
import VerticalTimeline from "./VerticalTimeline";
import ParticlesBackground from "../../styles/ParticlesBackground";
import ExperienceStyles from "../../styles/ExperienceStyles";
import experienceData from "../../data/experienceData";
import { processTimelineData } from "./utils";

/**
 * Main Experience Section Component
 */
const ExperienceSection = () => {
    // Process timeline data using useMemo to prevent unnecessary recalculations
    const timelineData = useMemo(() => processTimelineData(experienceData), []);

    // State
    const [activeCard, setActiveCard] = useState(null);
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const [cardPositions, setCardPositions] = useState({});

    // Ref for container
    const containerRef = useRef(null);

    // Initialize card positions and update on window resize
    useEffect(() => {
        const updateCardPositions = () => {
            if (!containerRef.current) return;

            const { width, height } =
                containerRef.current.getBoundingClientRect();
            setContainerSize({ width, height });

            // Setup card positions
            const positions = {};
            const centerX = width / 2;

            // Determine card spacing
            const cardHeight = 190; // estimated card height
            const cardGap = 60; // gap between cards

            // Calculate vertical positioning
            const totalItemsHeight =
                timelineData.length * cardHeight +
                (timelineData.length - 1) * cardGap;
            const startY =
                (height - totalItemsHeight) / 2 > 70
                    ? (height - totalItemsHeight) / 2
                    : 70;

            timelineData.forEach((item, index) => {
                // Position vertically with adequate spacing
                const itemY = startY + index * (cardHeight + cardGap);

                positions[item.id] = {
                    x: centerX,
                    y: itemY,
                };
            });

            setCardPositions(positions);
        };

        // Initialize positions
        updateCardPositions();

        // Add resize event listener
        window.addEventListener("resize", updateCardPositions);

        // Cleanup
        return () => window.removeEventListener("resize", updateCardPositions);
    }, []); // Empty dependency array - only run once on mount

    // Card click handler
    const handleCardClick = (id) => {
        setActiveCard(activeCard === id ? null : id);
    };

    // Render experience cards
    const renderExperienceCards = () => {
        return timelineData.map((item, index) => {
            const position = cardPositions[item.id] || { x: 0, y: 0 };
            const isActive = activeCard === item.id;
            const isOdd = index % 2 === 0; // Alternating pattern (left-right-left)

            return (
                <ExperienceCard
                    key={item.id}
                    item={item}
                    position={position}
                    isActive={isActive}
                    onClick={handleCardClick}
                    isOdd={isOdd}
                />
            );
        });
    };

    // Timeline height
    const timelineHeight = containerSize.height
        ? containerSize.height * 0.9
        : 0;

    return (
        <section className="py-20 px-8 relative overflow-hidden">
            {/* Enhanced background */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.1),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(124,58,237,0.1),transparent_50%)]"></div>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
            </div>

            <div className="relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-3xl md:text-4xl font-bold text-white mb-3"
                    >
                        Career & Education Journey
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-gray-400 max-w-2xl mx-auto"
                    >
                        Timeline of professional and academic experiences from
                        latest to earliest.
                        <br />
                        <span className="text-sm italic text-gray-500">
                            Click on cards to see more details
                        </span>
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="flex justify-center gap-6 mt-5"
                    >
                        <div className="flex items-center gap-2">
                            <span
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: "#00c6ff" }}
                            ></span>
                            <span className="text-gray-300 text-sm">
                                Education
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: "#7928ca" }}
                            ></span>
                            <span className="text-gray-300 text-sm">Work</span>
                        </div>
                    </motion.div>
                </div>

                <div
                    ref={containerRef}
                    className="relative w-full h-[900px] md:h-[1000px] max-w-6xl mx-auto rounded-2xl border border-white/5 bg-black/40 backdrop-blur-sm overflow-hidden"
                    style={{
                        boxShadow: "0 10px 50px -10px rgba(0, 0, 0, 0.5)",
                    }}
                >
                    {/* Subtle grid background */}
                    <div className="absolute inset-0 grid-bg opacity-30"></div>

                    {/* Glass reflection effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-20"></div>

                    {/* Vertical timeline */}
                    <VerticalTimeline height={timelineHeight} />

                    {/* Experience cards */}
                    {renderExperienceCards()}

                    {/* Decorative particles */}
                    <ParticlesBackground count={30} />

                    {/* Subtle glow spots */}
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl"></div>
                    <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl"></div>
                </div>
            </div>

            {/* Global styles */}
            <ExperienceStyles />
        </section>
    );
};

export default ExperienceSection;
