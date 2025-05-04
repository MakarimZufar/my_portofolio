import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaGithub,
    FaExternalLinkAlt,
    FaInfoCircle,
    FaTimes,
    FaChevronDown,
} from "react-icons/fa";

// Komponen Badge Teknologi
const TechBadge = ({ name, small }) => {
    // Warna untuk badge berdasarkan teknologi
    const getBadgeColor = (techName) => {
        const colors = {
            React: "from-blue-500 to-cyan-500",
            "Next.js": "from-black to-gray-700",
            "Tailwind CSS": "from-cyan-500 to-blue-400",
            JavaScript: "from-yellow-400 to-yellow-500",
            "Node.js": "from-green-500 to-green-600",
            MongoDB: "from-green-600 to-green-700",
            Firebase: "from-yellow-500 to-orange-500",
            Redux: "from-purple-600 to-indigo-600",
            "Material UI": "from-blue-400 to-indigo-500",
            Express: "from-gray-600 to-gray-700",
            HTML: "from-orange-500 to-red-500",
            CSS: "from-blue-400 to-blue-500",
            "NextAuth.js": "from-indigo-500 to-purple-500",
        };

        return colors[techName] || "from-gray-500 to-gray-600";
    };

    return (
        <div
            className={`
            ${small ? "text-[0.6rem] px-2 py-0.5" : "text-xs px-2.5 py-1"} 
            bg-gradient-to-r ${getBadgeColor(name)} text-white rounded-full 
            font-medium shadow-sm flex items-center justify-center
            border border-white/10
        `}
        >
            {name}
        </div>
    );
};

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
            className={`group relative w-64 h-60 md:w-full bg-gradient-to-br ${getGradientByIndex(
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
                            className="text-cyan-400"
                        >
                            <FaChevronDown />
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
                                Unggulan
                            </span>
                        </motion.div>
                    </div>
                )}
            </div>
            {/* Expanding View With Modal Animation */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={(e) => {
                            // Tutup modal jika klik di luar konten
                            if (e.target === e.currentTarget)
                                setIsExpanded(false);
                        }}
                    >
                        <motion.div
                            className="relative bg-gradient-to-br from-gray-900 to-black p-1 rounded-xl w-full max-w-md overflow-hidden"
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            transition={{
                                type: "spring",
                                damping: 25,
                                stiffness: 300,
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Gradient border */}
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-purple-500 to-blue-500 rounded-xl p-[1px]" />

                            {/* Content container */}
                            <div className="bg-gray-900 rounded-xl p-5 relative z-10">
                                {/* Close button */}
                                <button
                                    onClick={() => setIsExpanded(false)}
                                    className="absolute top-3 right-3 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 p-1.5 rounded-full transition-colors z-20"
                                    aria-label="Close details"
                                >
                                    <FaTimes size={16} />
                                </button>

                                {/* Project title with animated underline */}
                                <div className="mb-4 relative">
                                    <motion.h3
                                        className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300"
                                        initial={{ y: -20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        {project.title}
                                    </motion.h3>
                                    <motion.div
                                        className="h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                                        initial={{ width: 0, opacity: 0 }}
                                        animate={{ width: "50%", opacity: 1 }}
                                        transition={{
                                            delay: 0.3,
                                            duration: 0.5,
                                        }}
                                    />
                                </div>

                                {/* Project image (can be mocked if no real images) */}
                                <motion.div
                                    className="mb-4 h-40 relative bg-gray-800 rounded-lg overflow-hidden"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    {project.imageUrl ? (
                                        <Image
                                            src={project.imageUrl}
                                            alt={project.title}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                                            <span className="text-5xl filter drop-shadow-lg">
                                                {getEmoji(index)}
                                            </span>
                                        </div>
                                    )}
                                </motion.div>

                                {/* Project description */}
                                <motion.p
                                    className="text-gray-300 text-sm mb-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    {project.description}
                                </motion.p>

                                {/* Technologies */}
                                <motion.div
                                    className="mb-6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <h4 className="text-gray-400 text-xs mb-2 uppercase tracking-wider">
                                        Teknologi
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map(
                                            (tech, idx) => (
                                                <motion.div
                                                    key={tech}
                                                    initial={{
                                                        opacity: 0,
                                                        y: 10,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    transition={{
                                                        delay: 0.4 + idx * 0.05,
                                                    }}
                                                >
                                                    <TechBadge name={tech} />
                                                </motion.div>
                                            )
                                        )}
                                    </div>
                                </motion.div>

                                {/* Action buttons */}
                                <motion.div
                                    className="flex justify-center gap-4"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    {project.githubUrl && (
                                        <motion.a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
                                            whileHover={{
                                                y: -2,
                                                boxShadow:
                                                    "0 5px 10px rgba(0,0,0,0.2)",
                                            }}
                                            initial={{ scale: 0.9 }}
                                            animate={{ scale: 1 }}
                                            transition={{
                                                delay: 0.6,
                                                type: "spring",
                                            }}
                                        >
                                            <FaGithub />
                                            <span>GitHub</span>
                                        </motion.a>
                                    )}

                                    {project.demoUrl && (
                                        <motion.a
                                            href={project.demoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300"
                                            whileHover={{
                                                y: -2,
                                                boxShadow:
                                                    "0 5px 15px rgba(6, 182, 212, 0.3)",
                                            }}
                                            initial={{ scale: 0.9 }}
                                            animate={{ scale: 1 }}
                                            transition={{
                                                delay: 0.7,
                                                type: "spring",
                                            }}
                                        >
                                            <FaExternalLinkAlt />
                                            <span>Demo</span>
                                        </motion.a>
                                    )}

                                    <motion.div
                                        initial={{ scale: 0.9 }}
                                        animate={{ scale: 1 }}
                                        transition={{
                                            delay: 0.8,
                                            type: "spring",
                                        }}
                                    >
                                        <Link
                                            href={`/projects/${project.id}`}
                                            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                        >
                                            <FaInfoCircle />
                                            <span>Detail</span>
                                        </Link>
                                    </motion.div>
                                </motion.div>
                            </div>

                            {/* Decorative animated corner elements */}
                            <motion.div
                                className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan-500"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                            />
                            <motion.div
                                className="absolute top-0 right-0 w-3 h-3 border-t border-r border-purple-500"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.9 }}
                            />
                            <motion.div
                                className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-purple-500"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                            />
                            <motion.div
                                className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan-500"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.1 }}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
