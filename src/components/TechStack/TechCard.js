import React from "react";
import { motion } from "framer-motion";

const TechCard = ({ tech, onClick }) => {
    return (
        <div className="relative">
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
                onClick={() => onClick(tech)}
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
    );
};

export default TechCard;
