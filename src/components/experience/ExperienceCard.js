import React from "react";
import { motion } from "framer-motion";

/**
 * Renders an individual experience card
 */
const ExperienceCard = ({ item, position, isActive, onClick, isOdd }) => {
    return (
        <motion.div
            className="experience-card"
            style={{
                position: "absolute",
                left: position.x,
                top: position.y,
                zIndex: isActive ? 50 : 10,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
                opacity: 1,
                scale: isActive ? 1.05 : 1,
                y: isActive ? -5 : 0,
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
            }}
            onClick={() => onClick(item.id)}
            whileHover={{
                y: -5,
                scale: 1.02,
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
            }}
        >
            {/* Card content */}
            <div
                className={`card-content relative w-72 p-5 rounded-xl backdrop-blur-md cursor-pointer ${
                    isActive ? "ring-2" : ""
                }`}
                style={{
                    backgroundColor: `${item.color}10`,
                    borderColor: isActive ? item.color : `${item.color}30`,
                    boxShadow: isActive
                        ? `0 0 20px ${item.color}40, 0 0 40px ${item.color}20`
                        : `0 4px 20px rgba(0, 0, 0, 0.15)`,
                    marginLeft: isOdd ? "10px" : "-280px", // Alternating pattern
                }}
            >
                {/* Category icon */}
                <div
                    className={`category-icon absolute -top-4 ${
                        isOdd ? "-left-4" : "-right-4"
                    } w-10 h-10 rounded-full flex items-center justify-center text-white`}
                    style={{
                        backgroundColor: item.color,
                        boxShadow: `0 0 10px ${item.color}60`,
                    }}
                >
                    <span className="text-lg">{item.icon}</span>
                </div>

                {/* Ongoing indicator */}
                {item.isOngoing && (
                    <div
                        className={`absolute ${
                            isOdd ? "right-3" : "left-3"
                        } -top-2.5 px-2 py-0.5 rounded-full text-xs font-semibold animate-pulse`}
                        style={{
                            backgroundColor: "#111",
                            color: item.color,
                            border: `1px solid ${item.color}`,
                        }}
                    >
                        ONGOING
                    </div>
                )}

                {/* Card info */}
                <div className={isOdd ? "ml-2" : "mr-2"}>
                    <h3 className="text-lg font-bold text-white">
                        {item.title}
                    </h3>
                    {item.company && (
                        <p className="text-sm text-white/80 mt-0.5">
                            {item.company}
                        </p>
                    )}

                    <div className="flex flex-wrap gap-2 mt-2 mb-3">
                        <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-white/20 text-white/90">
                            {item.years}
                        </span>
                        <span
                            className="px-2 py-0.5 text-xs rounded-full"
                            style={{
                                backgroundColor: `${item.color}20`,
                                color: item.color,
                            }}
                        >
                            {item.tag}
                        </span>
                    </div>

                    <p className="text-white/70 text-xs mt-2 leading-relaxed">
                        {item.description}
                    </p>

                    {/* Duration display */}
                    <div
                        className="mt-3 text-xs font-medium inline-block px-3 py-1 rounded"
                        style={{
                            backgroundColor: "#111",
                            color: item.color,
                            border: `1px solid ${item.color}40`,
                        }}
                    >
                        {item.duration}
                    </div>
                </div>

                {/* Active indicator */}
                {isActive && (
                    <div
                        className={`absolute ${
                            isOdd ? "-right-2" : "-left-2"
                        } -top-2 w-6 h-6 flex items-center justify-center bg-black text-white rounded-full border-2 z-20`}
                        style={{ borderColor: item.color }}
                    >
                        <span className="text-xs">✓</span>
                    </div>
                )}

                {/* Timeline marker */}
                <div
                    className={`absolute ${
                        isOdd ? "-right-3" : "-left-3"
                    } top-1/2 w-3 h-3 rounded-full transform -translate-y-1/2`}
                    style={{
                        backgroundColor: item.color,
                        boxShadow: `0 0 8px ${item.color}`,
                    }}
                ></div>
            </div>
        </motion.div>
    );
};

export default ExperienceCard;
