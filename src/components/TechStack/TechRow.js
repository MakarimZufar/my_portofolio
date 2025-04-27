import React from "react";
import { motion } from "framer-motion";
import TechCard from "./TechCard";

const TechRow = ({ rowIndex, rowData, isHovered, onTechSelect }) => {
    return (
        <div className="relative overflow-hidden">
            <motion.div
                className="flex space-x-5"
                animate={{
                    x: isHovered ? 0 : rowIndex % 2 === 0 ? "-100%" : "0%",
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
                {rowData.map((tech, index) => (
                    <TechCard
                        key={`${rowIndex}-${index}`}
                        tech={tech}
                        onClick={onTechSelect}
                    />
                ))}

                {/* Duplicated set for infinite scroll */}
                {rowData.map((tech, index) => (
                    <TechCard
                        key={`${rowIndex}-${index}-dup`}
                        tech={tech}
                        onClick={onTechSelect}
                    />
                ))}
            </motion.div>
        </div>
    );
};

export default TechRow;
