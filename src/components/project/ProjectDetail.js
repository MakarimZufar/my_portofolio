// src/components/project/ProjectDetail.js
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
    FaGithub,
    FaExternalLinkAlt,
    FaRegLightbulb,
    FaTimes,
    FaChevronLeft,
    FaChevronRight,
    FaPause,
    FaPlay,
} from "react-icons/fa";
import TechBadge from "@/components/TechBadge";

/**
 * ProjectDetail Component - Unified version that works for both featured and regular projects
 *
 * @param {Object} project - Project data object
 * @param {Function} onClose - Handler for closing the detail view
 * @param {Boolean} featured - Whether this is a featured project view (different styling)
 * @returns {JSX.Element}
 */
export default function ProjectDetail({ project, onClose, featured = false }) {
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [isPaused, setIsPaused] = useState(false);

    // Animation variants
    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const modalVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 },
    };

    // Extract project data if available, or use defaults
    const title = project?.title || '';
    const description = project?.description || '';
    const imageUrls = project?.imageUrls || [];
    const tags = project?.tags || [];
    const technologies = project?.technologies || [];
    const emoji = project?.emoji || '';
    const githubUrl = project?.githubUrl || '';
    const demoUrl = project?.demoUrl || '';
    const keyFeatures = project?.keyFeatures || [];

    // Handle media array (images and videos)
    const media = React.useMemo(() => {
        if (!project) return ["/projects/default-project.jpg"];
        return Array.isArray(imageUrls)
            ? imageUrls
            : imageUrls
            ? [imageUrls]
            : ["/projects/default-project.jpg"];
    }, [project, imageUrls]);

    // Navigation functions
    const nextMedia = () => {
        setCurrentMediaIndex((prev) => (prev + 1) % media.length);
        setIsPaused(true);
    };

    const prevMedia = () => {
        setCurrentMediaIndex(
            (prev) => (prev - 1 + media.length) % media.length
        );
        setIsPaused(true);
    };

    // Toggle auto-play
    const toggleAutoPlay = () => {
        setIsAutoPlaying(!isAutoPlaying);
        setIsPaused(false);
    };

    // Auto-play functionality
    useEffect(() => {
        // Don't auto-play if there's only one media item or no project
        if (!project || media.length <= 1 || !isAutoPlaying || isPaused) return;

        const interval = setInterval(() => {
            setCurrentMediaIndex((prev) => (prev + 1) % media.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, isPaused, media.length, project]);

    // Reset pause state after inactivity
    useEffect(() => {
        if (isPaused) {
            const timeout = setTimeout(() => {
                setIsPaused(false);
            }, 10000);

            return () => clearTimeout(timeout);
        }
    }, [isPaused]);

    // Function to render media (image or video)
    const renderMedia = (mediaUrl) => {
        if (!mediaUrl) return (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                Image not available
            </div>
        );

        if (
            typeof mediaUrl === "string" &&
            (mediaUrl.includes("youtube.com") || mediaUrl.includes("youtu.be"))
        ) {
            const videoId = mediaUrl.includes("v=")
                ? mediaUrl.split("v=")[1]?.split("&")[0]
                : mediaUrl.split("youtu.be/")[1];

            if (!videoId)
                return (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        Invalid YouTube URL
                    </div>
                );

            return (
                <div className="relative w-full h-full">
                    {/* Custom overlay to prevent YouTube title from showing */}
                    <div
                        className="absolute inset-0 z-10"
                        style={{ pointerEvents: "none" }}
                    ></div>
                    <iframe
                        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&modestbranding=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&origin=${encodeURIComponent(
                            typeof window !== "undefined"
                                ? window.location.origin
                                : ""
                        )}&enablejsapi=1&version=3&playerapiid=ytplayer`}
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        className="w-full h-full rounded-lg"
                    ></iframe>
                </div>
            );
        }

        try {
            return (
                <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                        src={mediaUrl}
                        alt={title || "Project image"}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: "contain" }}
                        priority
                    />
                </div>
            );
        } catch (error) {
            console.error("Error rendering image:", error);
            return (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    Image not available
                </div>
            );
        }
    };

    // If no project, don't render anything
    if (!project) return null;

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
                    className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full z-20 backdrop-blur-sm transition-colors duration-300"
                    onClick={onClose}
                >
                    <FaTimes />
                </button>

                {/* Project header with media carousel */}
                <div className="relative">
                    <div className="w-full h-60 md:h-80 relative overflow-hidden">
                        {/* Media Carousel */}
                        <div className="relative w-full h-full">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentMediaIndex}
                                    className="absolute inset-0"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {renderMedia(media[currentMediaIndex])}
                                </motion.div>
                            </AnimatePresence>

                            {/* Media controls */}
                            {media.length > 1 && (
                                <>
                                    {/* Navigation arrows */}
                                    <button
                                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-20 backdrop-blur-sm"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            prevMedia();
                                        }}
                                    >
                                        <FaChevronLeft />
                                    </button>

                                    <button
                                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-20 backdrop-blur-sm"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            nextMedia();
                                        }}
                                    >
                                        <FaChevronRight />
                                    </button>

                                    {/* Play/Pause button */}
                                    <button
                                        className="absolute top-4 left-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-20 backdrop-blur-sm"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleAutoPlay();
                                        }}
                                    >
                                        {isAutoPlaying && !isPaused ? (
                                            <FaPause size={14} />
                                        ) : (
                                            <FaPlay size={14} />
                                        )}
                                    </button>

                                    {/* Indicators dots */}
                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                                        {media.map((_, idx) => (
                                            <button
                                                key={idx}
                                                className={`w-2.5 h-2.5 rounded-full transition-all ${
                                                    currentMediaIndex === idx
                                                        ? "bg-white w-5"
                                                        : "bg-white/50 hover:bg-white/70"
                                                }`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setCurrentMediaIndex(idx);
                                                    setIsPaused(true);
                                                }}
                                                aria-label={`Go to media ${
                                                    idx + 1
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}

                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent z-10"></div>
                        </div>
                    </div>

                    {/* Project info overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                        <div className="flex items-start gap-4">
                            {emoji && (
                                <div className="bg-gray-800/80 backdrop-blur-sm w-16 h-16 flex items-center justify-center rounded-2xl text-3xl shadow-xl border border-blue-500/20">
                                    {emoji}
                                </div>
                            )}
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                    {title}
                                </h2>
                            </div>
                        </div>

                        {tags.length > 0 && (
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
                        )}
                    </div>
                </div>

                {/* Project details */}
                <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-20rem)]">
                    {/* Description */}
                    {description && (
                        <div>
                            <h3 className="text-xl font-semibold text-gray-100 mb-3">
                                Description
                            </h3>
                            <p className="text-gray-300 leading-relaxed">
                                {description}
                            </p>
                        </div>
                    )}

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
                    {technologies && technologies.length > 0 && (
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
                    )}

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
