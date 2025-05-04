import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaGithub,
    FaExternalLinkAlt,
    FaInfoCircle,
    FaTimes,
} from "react-icons/fa";
import TechBadge from "@/components/TechBadge";

export default function ProjectCard({ project, index }) {
    const [isExpanded, setIsExpanded] = useState(false);

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

    return (
        <motion.div
            className={`group relative w-64 h-60 bg-gradient-to-br ${getGradientByIndex(
                index
            )} rounded-lg overflow-hidden`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(6, 182, 212, 0.5)",
                transition: { duration: 0.3 },
            }}
            onClick={() => setIsExpanded(!isExpanded)}
        >
            {/* Shimmer Effect */}
            <motion.div
                className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 -skew-x-12 translate-x-full"
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

            {/* Gradient Border Effect */}
            <div className="absolute inset-0 rounded-lg p-[1px] bg-gradient-to-br from-cyan-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Card Content */}
            <div className="relative h-full p-4 bg-gray-900/70 backdrop-blur-md rounded-lg border border-gray-800/70 flex flex-col justify-between z-10">
                {/* Expanded View - Shows when clicked */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            className="absolute inset-0 bg-gray-900/95 backdrop-blur-md z-20 flex flex-col p-4 rounded-lg overflow-y-auto"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                        >
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="h-full flex flex-col"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <motion.h3
                                        className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300"
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        {project.title}
                                    </motion.h3>
                                    <motion.button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsExpanded(false);
                                        }}
                                        className="text-gray-400 hover:text-white bg-gray-800/80 hover:bg-gray-700 p-1 rounded-full transition-colors"
                                        whileHover={{ rotate: 90 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <FaTimes size={14} />
                                    </motion.button>
                                </div>

                                <motion.p
                                    className="text-gray-300 text-sm mb-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    {project.description}
                                </motion.p>

                                <motion.div
                                    className="flex flex-wrap gap-2 mb-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    {project.technologies.map(
                                        (tech, techIndex) => (
                                            <motion.div
                                                key={tech}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    delay:
                                                        0.4 + techIndex * 0.05,
                                                }}
                                            >
                                                <TechBadge name={tech} small />
                                            </motion.div>
                                        )
                                    )}
                                </motion.div>

                                <div className="flex justify-center gap-3 mt-auto">
                                    {project.githubUrl && (
                                        <motion.a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition-all duration-300"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 400,
                                                delay: 0.5,
                                            }}
                                            whileHover={{
                                                y: -3,
                                                boxShadow:
                                                    "0 10px 15px -3px rgba(0, 0, 0, 0.4)",
                                            }}
                                        >
                                            <FaGithub size={18} />
                                        </motion.a>
                                    )}
                                    {project.demoUrl && (
                                        <motion.a
                                            href={project.demoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-2 rounded-full hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 400,
                                                delay: 0.6,
                                            }}
                                            whileHover={{
                                                y: -3,
                                                boxShadow:
                                                    "0 10px 15px -3px rgba(6, 182, 212, 0.4)",
                                            }}
                                        >
                                            <FaExternalLinkAlt size={16} />
                                        </motion.a>
                                    )}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            delay: 0.7,
                                        }}
                                    >
                                        <Link
                                            href={`/projects/${project.id}`}
                                            onClick={(e) => e.stopPropagation()}
                                            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-2 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 inline-block"
                                            whileHover={{
                                                y: -3,
                                                boxShadow:
                                                    "0 10px 15px -3px rgba(139, 92, 246, 0.4)",
                                            }}
                                        >
                                            <FaInfoCircle size={18} />
                                        </Link>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

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

                {/* Technologies - Menggunakan TechBadge yang ditingkatkan */}
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

                {/* Hover Reveal Info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-col items-center gap-1"
                    >
                        <span className="text-xs text-gray-300 bg-gray-800/80 px-3 py-1 rounded-full backdrop-blur-sm border border-gray-700/30">
                            Klik untuk detail
                        </span>
                        <motion.span
                            animate={{ y: [0, -3, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="text-cyan-400 text-xs"
                        >
                            ▲
                        </motion.span>
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
                                Featured
                            </span>
                        </motion.div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
