"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import {
    FaGithub,
    FaExternalLinkAlt,
    FaTimes,
    FaRegLightbulb,
} from "react-icons/fa";
import ProjectTag from "@/components/ProjectTag";
import TechBadge from "@/components/TechBadge";

const ProjectDetail = ({ project, onClose }) => {
    // Close modal when clicking outside
    const handleBackdropClick = (e) => {
        // Only close if clicking directly on the backdrop, not on the content
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Handle escape key press
    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            onClose();
        }
    };

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 py-6 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleBackdropClick}
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            <motion.div
                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 rounded-lg shadow-xl"
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                transition={{ duration: 0.3 }}
            >
                {/* Close button */}
                <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
                    onClick={onClose}
                    aria-label="Close dialog"
                >
                    <FaTimes size={24} />
                </button>

                {/* Project image */}
                <div className="relative w-full h-64 md:h-80 overflow-hidden">
                    {project.imageUrl ? (
                        <Image
                            src={project.imageUrl}
                            alt={project.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                            <span className="text-6xl">📊</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                        <h2 className="text-3xl font-bold text-white mb-2">
                            {project.title}
                        </h2>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags &&
                                project.tags.map((tag) => (
                                    <ProjectTag key={tag} name={tag} />
                                ))}
                        </div>
                    </div>
                </div>

                {/* Project details */}
                <div className="p-6">
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-gray-100 mb-3">
                            Description
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                            {project.description}
                        </p>
                    </div>

                    {/* Key features */}
                    {project.keyFeatures && project.keyFeatures.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-100 mb-3 flex items-center">
                                <FaRegLightbulb className="mr-2 text-yellow-400" />
                                Key Features
                            </h3>
                            <ul className="list-disc pl-6 text-gray-300 space-y-2">
                                {project.keyFeatures.map((feature, index) => (
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
                            {project.technologies &&
                                project.technologies.map((tech) => (
                                    <TechBadge key={tech} name={tech} />
                                ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-4 pt-2">
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-md transition-colors"
                            >
                                <FaGithub size={20} />
                                <span>View Code</span>
                            </a>
                        )}
                        {(project.liveDemo || project.demoUrl) && (
                            <a
                                href={project.liveDemo || project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-colors"
                            >
                                <FaExternalLinkAlt size={18} />
                                <span>Live Demo</span>
                            </a>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ProjectDetail;
