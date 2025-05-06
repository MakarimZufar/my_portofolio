// src/components/FeaturedProjects/ProjectCard.js
"use client";
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

    return (
        <motion.div
            className="group bg-gradient-to-b from-gray-900 to-gray-950 
                       rounded-xl overflow-hidden shadow-xl shadow-blue-900/10 
                       relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
        >
            {/* Click Handler Wrapper */}
            <div
                className="cursor-pointer"
                onClick={onClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Image Container */}
                <div className="relative w-full h-48 sm:h-56">
                    <div className="absolute inset-0 overflow-hidden">
                        <Image
                            src={project.imageUrl}
                            alt={project.title}
                            className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                            width={500}
                            height={300}
                        />
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
                    animate={
                        isHovered ? { x: ["100%", "-100%"] } : { x: "-100%" }
                    }
                    transition={{
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 1.5,
                        ease: "easeInOut",
                    }}
                />

                {/* Card Content Container */}
                <div className="relative h-full p-5 flex flex-col justify-between z-10">
                    {/* Project Title + Emoji */}
                    <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                            {project.title}
                        </h3>
                        <span
                            className="text-xl"
                            role="img"
                            aria-label="Project emoji"
                        >
                            {project.emoji}
                        </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                        {project.tags.slice(0, 3).map((tag) => (
                            <ProjectTag key={tag} name={tag} small />
                        ))}
                    </div>

                    {/* Description */}
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

                {/* Footer Links (GitHub & Demo) */}
                <div className="pt-4 pb-2 px-5 flex justify-between items-center border-t border-gray-800/70 bg-gray-900/70">
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 text-sm"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <FaGithub className="text-lg" />
                        <span>Code</span>
                    </a>

                    <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 text-sm"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <span>Live Demo</span>
                        <FaExternalLinkAlt className="text-xs" />
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
