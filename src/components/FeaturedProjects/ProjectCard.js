// src/components/ProjectCard.js
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import TechBadge from "@/components/TechBadge";
import ProjectTag from "@/components/ProjectTag";

export default function ProjectCard({ project, index, onClick }) {
    // Emoji berdasarkan index
    const getEmoji = (index) => {
        const emojis = ["💻", "📱", "🚀", "📊", "🛠️", "🤖"];
        return emojis[index % emojis.length];
    };

    // Efek warna latar belakang berdasarkan index
    const getGradientByIndex = (index) => {
        const gradients = [
            "from-cyan-900/40 to-blue-900/30",
            "from-purple-900/40 to-indigo-900/30",
            "from-blue-900/40 to-cyan-900/30",
            "from-emerald-900/40 to-teal-900/30",
            "from-violet-900/40 to-purple-900/30",
            "from-amber-900/40 to-orange-900/30",
        ];
        return gradients[index % gradients.length];
    };

    // Handle card click - call the onClick prop passed from the parent
    const handleClick = (event) => {
        event.stopPropagation();
        if (onClick) {
            onClick(project);
        }
    };

    return (
        <motion.div
            className="group relative w-64 h-60 md:w-full rounded-lg overflow-hidden cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{
                y: -5,
                boxShadow: "0 20px 30px -10px rgba(6, 182, 212, 0.3)",
                transition: { duration: 0.3 },
            }}
            onClick={handleClick}
        >
            {/* Project Image Background */}
            <div className="absolute inset-0 w-full h-full">
                {project.imageUrl ? (
                    <Image
                        src={project.imageUrl}
                        alt={project.title}
                        layout="fill"
                        objectFit="cover"
                        className="opacity-40 group-hover:opacity-30 transition-opacity duration-300"
                    />
                ) : (
                    <div
                        className={`w-full h-full bg-gradient-to-br ${getGradientByIndex(
                            index
                        )}`}
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
            </div>

            {/* Enhanced Gradient Border Effect */}
            <div className="absolute inset-0 rounded-lg border-2 border-transparent bg-gradient-to-br from-cyan-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-cyan-500/80 group-hover:via-purple-500/80 group-hover:to-blue-500/80 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100"></div>

            {/* Shimmer Effect */}
            <motion.div
                className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 -skew-x-12 translate-x-full"
                animate={{
                    x: ["-100%", "100%"],
                }}
                transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 2,
                    ease: "linear",
                    repeatDelay: 0.5,
                }}
            />

            {/* Card Content */}
            <div className="relative h-full p-4 bg-gray-900/40 backdrop-blur-md rounded-lg border border-gray-800/70 flex flex-col justify-between z-10">
                {/* Project Title and Emoji */}
                <div className="mb-1">
                    <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 truncate pr-2">
                            {project.title}
                        </h3>
                        <span className="text-2xl filter drop-shadow-lg">
                            {getEmoji(index)}
                        </span>
                    </div>
                    <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                        {project.description}
                    </p>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1 my-1">
                    {project.technologies.slice(0, 3).map((tech) => (
                        <TechBadge key={tech} name={tech} small />
                    ))}
                    {project.technologies.length > 3 && (
                        <span className="text-xs px-2 py-0.5 bg-gray-800/70 text-gray-400 rounded-full border border-gray-700/50">
                            +{project.technologies.length - 3}
                        </span>
                    )}
                </div>

                {/* Hover Reveal Info - Enhanced */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4 z-20">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-col items-center gap-2"
                    >
                        <span className="text-xs text-white bg-gradient-to-r from-cyan-500/80 to-purple-600/80 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/20 shadow-lg transform transition-all duration-300">
                            Klik untuk detail
                        </span>
                        <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{
                                repeat: Infinity,
                                duration: 1.5,
                                ease: "easeInOut",
                            }}
                            className="text-cyan-400 bg-gray-900/70 rounded-full w-8 h-8 flex items-center justify-center shadow-lg border border-cyan-500/30"
                        >
                            <FaChevronDown size={16} />
                        </motion.div>
                    </motion.div>
                </div>

                {/* Featured Badge if applicable */}
                {project.featured && (
                    <div className="absolute -top-2 -right-2 z-20">
                        <motion.div
                            className="relative"
                            animate={{
                                scale: [1, 1.05, 1],
                                rotate: [0, 3, 0, -3, 0],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                repeatType: "loop",
                            }}
                        >
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 blur-sm"></div>
                            <span className="relative bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs px-2 py-1 rounded-full font-medium border border-white/20">
                                Unggulan
                            </span>
                        </motion.div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
