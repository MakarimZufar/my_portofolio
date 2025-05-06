import React from "react";
import { motion } from "framer-motion";
import { getExperienceDescription } from "@/data/technologiesData";

const TechInfoModal = ({ tech, onClose }) => {
    if (!tech) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-30"
            onClick={onClose}
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
                            backgroundColor: tech.bgColor,
                        }}
                    >
                        <div
                            style={{
                                color: tech.color,
                            }}
                        >
                            {tech.icon}
                        </div>
                    </div>
                    <div>
                        <h3
                            className="text-2xl font-bold"
                            style={{
                                color: tech.color,
                            }}
                        >
                            {tech.name}
                        </h3>
                        <p className="text-gray-400">{tech.description}</p>
                    </div>
                </div>
                <div className="space-y-4">
                    <p className="text-gray-300">
                        {getExperienceDescription(tech.name)}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {tech.category &&
                            tech.category.map((cat) => (
                                <span
                                    key={cat}
                                    className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-300"
                                >
                                    {cat}
                                </span>
                            ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default TechInfoModal;
