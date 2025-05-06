"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
    FaGithub,
    FaExternalLinkAlt,
    FaTimes,
    FaRegLightbulb,
} from "react-icons/fa";
import TechBadge from "@/components/TechBadge";

const ProjectDetail = ({ project, onClose }) => {
    const modalRef = useRef(null);

    // Handle ESC key to close modal
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    // Handle click outside to close modal
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    if (!project) return null;

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                ref={modalRef}
                className="bg-gray-900 border border-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-blue-900/20"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-700/70 rounded-full p-2 transition-colors z-10"
                >
                    <FaTimes size={18} />
                </button>

                {/* Project image */}
                <div className="relative w-full h-64 md:h-80">
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${project.imageUrl})`,
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 w-full p-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-3xl font-bold text-white">
                                {project.title}{" "}
                                <span
                                    className="ml-2"
                                    role="img"
                                    aria-label="Project emoji"
                                >
                                    {project.emoji}
                                </span>
                            </h2>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                            {project.tags.map((tag) => (
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
                <div className="p-6 space-y-6">
                    {/* Description */}
                    <div>
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
                                <FaExternalLinkAlt size={16} />
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
