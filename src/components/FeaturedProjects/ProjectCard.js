// src/components/ProjectCard.js
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    FaChevronUp,
    FaExternalLinkAlt,
    FaGithub,
    FaStar,
} from "react-icons/fa";
import TechBadge from "@/components/TechBadge";
import ProjectTag from "@/components/ProjectTag";

export default function ProjectCard({ project, index, onClick }) {
    const [isHovered, setIsHovered] = useState(false);

    // Emoji berdasarkan data proyek atau default berdasarkan tag/kategori atau index jika tidak ada
    const getEmoji = () => {
        // Jika proyek memiliki emoji yang ditentukan, gunakan itu
        if (project.emoji) {
            return project.emoji;
        }

        // Jika tidak ada emoji, coba gunakan emoji berdasarkan tag pertama
        if (project.tags && project.tags.length > 0) {
            const tagEmojiMap = {
                Web: "💻",
                Frontend: "🎨",
                Backend: "⚙️",
                "Full Stack": "🚀",
                Mobile: "📱",
                UI: "🖌️",
                Game: "🎮",
                Data: "📊",
                AI: "🤖",
                IoT: "📟",
                DevOps: "🛠️",
            };

            const firstTag = project.tags[0];
            if (tagEmojiMap[firstTag]) {
                return tagEmojiMap[firstTag];
            }
        }

        // Fallback ke emoji default berdasarkan index
        const defaultEmojis = ["💻", "📱", "🚀", "📊", "🛠️", "🤖", "🎮", "🎨"];
        return defaultEmojis[index % defaultEmojis.length];
    };

    // Efek warna latar belakang berdasarkan index
    const getGradientByIndex = (index) => {
        const gradients = [
            "from-cyan-900/40 via-blue-800/30 to-indigo-900/40",
            "from-purple-900/40 via-indigo-800/30 to-blue-900/40",
            "from-blue-900/40 via-cyan-800/30 to-teal-900/40",
            "from-emerald-900/40 via-teal-800/30 to-cyan-900/40",
            "from-violet-900/40 via-purple-800/30 to-indigo-900/40",
            "from-amber-900/40 via-orange-800/30 to-rose-900/40",
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
            className="group relative w-full sm:w-[280px] md:w-[320px] h-[280px] rounded-xl overflow-hidden cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{
                y: -8,
                boxShadow: "0 20px 30px -10px rgba(6, 182, 212, 0.3)",
                transition: { duration: 0.3 },
            }}
            onClick={handleClick}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            {/* Card Container with Glow Effect */}
            <div className="absolute inset-0 rounded-xl bg-gray-950 overflow-hidden">
                {/* Animated Border */}
                <div
                    className="absolute -inset-px rounded-xl border border-transparent bg-gradient-to-br from-cyan-500/0 via-purple-500/0 to-blue-500/0 
                     group-hover:from-cyan-500/40 group-hover:via-purple-500/40 group-hover:to-blue-500/40 
                     transition-all duration-500 ease-out opacity-0 group-hover:opacity-100 z-10"
                ></div>

                {/* Project Image Background with Animated Gradient Overlay */}
                <div className="absolute inset-0 w-full h-full">
                    {project.imageUrl ? (
                        <Image
                            src={project.imageUrl}
                            alt={project.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                            className="object-cover opacity-40 group-hover:opacity-30 
                                      transition-all duration-500 ease-out 
                                      group-hover:scale-110"
                        />
                    ) : (
                        <div
                            className={`w-full h-full bg-gradient-to-br ${getGradientByIndex(
                                index
                            )}`}
                        />
                    )}
                    {/* Gradient Overlay */}
                    <div
                        className="absolute inset-0 bg-gradient-to-t 
                                  from-black via-black/80 to-black/30 
                                  group-hover:from-black group-hover:via-black/70 group-hover:to-black/20 
                                  transition-opacity duration-500"
                    />
                </div>
            </div>

            {/* Shimmer Effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 -skew-x-12"
                initial={{ x: "-100%" }}
                animate={isHovered ? { x: ["100%", "-100%"] } : { x: "-100%" }}
                transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 1.5,
                    ease: "easeInOut",
                }}
            />

            {/* Card Content Container */}
            <div className="relative h-full p-5 flex flex-col justify-between z-10">
                {/* Top Section with Emoji and Featured Badge */}
                <div className="flex justify-between items-start">
                    {/* Project Emoji */}
                    <motion.div
                        className="h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-br 
                                  from-gray-900 to-gray-800 text-2xl shadow-lg border border-gray-700/50"
                        whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                    >
                        {getEmoji()}
                    </motion.div>

                    {/* Featured Badge */}
                    {project.featured && (
                        <motion.div
                            className="relative"
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, 0, -5, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "loop",
                            }}
                        >
                            <div className="absolute inset-0 rounded-full bg-yellow-400/40 blur-[8px]"></div>
                            <div
                                className="relative px-3 py-1 flex items-center gap-1 bg-gradient-to-r from-yellow-500 to-amber-500 
                                          text-gray-900 text-xs font-bold rounded-full shadow-lg border border-yellow-300"
                            >
                                <FaStar size={10} />
                                <span>Unggulan</span>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Middle Section with Title and Description */}
                <div className="mt-4">
                    <h3
                        className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r 
                                  from-cyan-300 to-blue-300 pb-1"
                    >
                        {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2 mt-1 group-hover:text-gray-300 transition-colors">
                        {project.description}
                    </p>
                </div>

                {/* Bottom Section with Technologies */}
                <div className="mt-4">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                        {project.technologies.slice(0, 3).map((tech) => (
                            <TechBadge key={tech} name={tech} small />
                        ))}
                        {project.technologies.length > 3 && (
                            <motion.span
                                className="text-xs px-2 py-0.5 bg-gray-800/70 text-gray-400 rounded-full 
                                         border border-gray-700/50 hover:bg-gray-700/70 hover:text-gray-300"
                                whileHover={{ scale: 1.05 }}
                            >
                                +{project.technologies.length - 3}
                            </motion.span>
                        )}
                    </div>
                </div>

                {/* Hover Reveal Info - Enhanced with Button */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent 
                             opacity-0 group-hover:opacity-100 transition-all duration-300 
                             flex flex-col justify-end p-5 z-20"
                    initial={{ opacity: 0 }}
                    animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={
                            isHovered
                                ? { y: 0, opacity: 1 }
                                : { y: 20, opacity: 0 }
                        }
                        transition={{ delay: 0.1 }}
                        className="flex flex-col items-center gap-3"
                    >
                        <motion.button
                            className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 
                                     text-white font-semibold text-sm shadow-lg 
                                     border border-cyan-400/20 hover:shadow-cyan-500/30 
                                     transform transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Lihat Detail Proyek
                        </motion.button>

                        <div className="flex items-center gap-3 mt-2">
                            {project.githubUrl && (
                                <motion.a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center
                                              border border-gray-700 shadow-md hover:bg-gray-700"
                                    whileHover={{ y: -2, scale: 1.1 }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <FaGithub
                                        className="text-white"
                                        size={16}
                                    />
                                </motion.a>
                            )}

                            {project.liveUrl && (
                                <motion.a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center
                                              border border-blue-500 shadow-md hover:bg-blue-500"
                                    whileHover={{ y: -2, scale: 1.1 }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <FaExternalLinkAlt
                                        className="text-white"
                                        size={14}
                                    />
                                </motion.a>
                            )}
                        </div>

                        <motion.div
                            animate={{ y: [0, 5, 0] }}
                            transition={{
                                repeat: Infinity,
                                duration: 1.5,
                                ease: "easeInOut",
                            }}
                            className="text-cyan-400 mt-2 animate-pulse"
                        >
                            <FaChevronUp size={16} />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
}
