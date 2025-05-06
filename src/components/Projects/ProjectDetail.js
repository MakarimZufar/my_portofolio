import { useRef } from "react";
import { motion } from "framer-motion";
import { FaTimes, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import Image from "next/image";
import TechBadge from "@/components/TechBadge";
import ProjectTag from "@/components/ProjectTag";

const ProjectDetail = ({ project, onClose }) => {
    const modalRef = useRef(null);

    // Close when clicking outside the modal
    const handleBackdropClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    // Destruct project properties
    const {
        title,
        description,
        imageUrl,
        tags,
        technologies,
        emoji,
        githubUrl,
        demoUrl,
    } = project;

    return (
        <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
        >
            <motion.div
                ref={modalRef}
                className="relative bg-gradient-to-br from-gray-900 to-black border border-blue-500/20 rounded-2xl overflow-hidden w-full max-w-3xl max-h-[90vh] shadow-2xl"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25 }}
            >
                {/* Backdrop glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10 opacity-50 blur-2xl"></div>

                {/* Header Image */}
                <div className="relative h-60 sm:h-72 overflow-hidden">
                    <Image
                        src={imageUrl || "/projects/default-project.jpg"}
                        alt={title}
                        width={1200}
                        height={600}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full backdrop-blur-md hover:bg-red-500/80 transition-colors"
                    >
                        <FaTimes />
                    </button>

                    {/* Project Title & Emoji */}
                    <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center space-x-3 mb-2">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 text-2xl shadow-lg">
                                {emoji}
                            </div>
                            <h1 className="text-3xl font-bold text-white">
                                {title}
                            </h1>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5">
                            {tags.map((tag) => (
                                <ProjectTag key={tag} name={tag} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-18rem)]">
                    {/* Description */}
                    <div className="mb-6">
                        <h2 className="text-xl font-bold mb-3 text-blue-400">
                            Deskripsi Proyek
                        </h2>
                        <p className="text-gray-300">{description}</p>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-6">
                        <h2 className="text-xl font-bold mb-3 text-blue-400">
                            Teknologi
                        </h2>
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
                    <div className="flex flex-wrap gap-4">
                        {githubUrl && (
                            <motion.a
                                href={githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <FaGithub />
                                <span>Lihat Kode</span>
                            </motion.a>
                        )}

                        {demoUrl && (
                            <motion.a
                                href={demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-4 py-2 rounded-full transition-all shadow-lg hover:shadow-blue-500/40"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <FaExternalLinkAlt />
                                <span>Lihat Demo</span>
                            </motion.a>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ProjectDetail;
