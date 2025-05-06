// src/components/common/ProjectDetail.js
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
    FaGithub, 
    FaExternalLinkAlt, 
    FaRegLightbulb, 
    FaTimes 
} from "react-icons/fa";
import TechBadge from "@/components/TechBadge";
import ProjectTag from "@/components/ProjectTag";

/**
 * ProjectDetail Component - Unified version that works for both featured and regular projects
 * 
 * @param {Object} project - Project data object
 * @param {Function} onClose - Handler for closing the detail view
 * @param {Boolean} featured - Whether this is a featured project view (different styling)
 * @returns {JSX.Element}
 */
export default function ProjectDetail({ project, onClose, featured = false }) {
    if (!project) return null;

    const {
        title,
        description,
        imageUrl,
        tags,
        technologies,
        emoji,
        githubUrl,
        demoUrl,
        keyFeatures,
    } = project;

    // Backdrop variants for animation
    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    // Modal variants for animation
    const modalVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 },
    };

    return (
        <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
        >
            <motion.div
                className="bg-gray-900 w-full max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl border border-blue-500/20 relative"
                variants={modalVariants}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full z-10 backdrop-blur-sm transition-colors duration-300"
                    onClick={onClose}
                >
                    <FaTimes />
                </button>

                {/* Project header with image */}
                <div className="relative">
                    <div className="w-full h-60 md:h-80 relative overflow-hidden">
                        <Image
                            src={imageUrl || "/projects/default-project.jpg"}
                            alt={title}
                            className="w-full h-full object-cover"
                            width={1200}
                            height={600}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
                    </div>

                    {/* Project info overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-gray-800/80 backdrop-blur-sm w-16 h-16 flex items-center justify-center rounded-2xl text-3xl shadow-xl border border-blue-500/20">
                                {emoji}
                            </div>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                    {title}
                                </h2>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                            {tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 text-sm bg-gray-800/80 text-gray-300 rounded-full border border-gray-700/50"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Project details */}
                <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-20rem)]">
                    {/* Description */}
                    <div>
                        <h3 className="text-xl font-semibold text-gray-100 mb-3">
                            Description
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                            {description}
                        </p>
                    </div>

                    {/* Key features */}
                    {keyFeatures && keyFeatures.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-100 mb-3 flex items-center">
                                <FaRegLightbulb className="mr-2 text-yellow-400" />
                                Key Features
                            </h3>
                            <ul className="list-disc pl-6 text-gray-300 space-y-2">
                                {keyFeatures.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Technologies used */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-gray-100 mb-3">
                            Technologies Used
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {technologies.map((tech) => (
                                <TechBadge 
                                    key={tech} 
                                    name={tech} 
                                    isSelected={true}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-4 pt-2">
                        {githubUrl && (
                            <a
                                href={githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-md transition-colors"
                            >
                                <FaGithub size={20} />
                                <span>View Code</span>
                            </a>
                        )}
                        {demoUrl && (
                            <a
                                href={demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white py-2 px-4 rounded-md transition-colors shadow-lg hover:shadow-blue-500/20"
                            >
                                <FaExternalLinkAlt size={16} />
                                <span>Live Demo</span>
                            </a>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}