// src/components/common/ProjectCard.js
"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    FaChevronLeft,
    FaChevronRight,
    FaExternalLinkAlt,
    FaGithub,
    FaStar,
    FaPause,
    FaPlay,
} from "react-icons/fa";
import TechBadge from "@/components/TechBadge";
import ProjectTag from "@/components/ProjectTag";

/**
 * ProjectCard Component - Unified version that works for both featured and regular projects
 *
 * @param {Object} project - Project data object
 * @param {Number} index - Index for animation sequencing
 * @param {Function} onClick - Click handler for project details
 * @param {Boolean} featured - Whether this is a featured project display (different styling)
 * @returns {JSX.Element}
 */
export default function ProjectCard({
    project,
    index,
    onClick,
    featured = false,
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [isPaused, setIsPaused] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const autoPlayIntervalRef = useRef(null);

    const {
        title,
        description,
        imageUrls, // Changed from imageUrl to imageUrls (array)
        tags,
        technologies,
        emoji,
        githubUrl,
        demoUrl,
    } = project;

    // Handle single image or array of images
    const images = Array.isArray(imageUrls)
        ? imageUrls
        : imageUrls
        ? [imageUrls]
        : ["/projects/default-project.jpg"];

    // Function to go to next image
    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    // Function to go to previous image
    const prevImage = () => {
        setCurrentImageIndex(
            (prev) => (prev - 1 + images.length) % images.length
        );
    };

    // Auto-play carousel
    useEffect(() => {
        // Don't auto-play if there's only one image
        if (images.length <= 1) return;

        // Setup auto-play functionality
        const startAutoPlay = () => {
            if (isAutoPlaying && !isPaused) {
                autoPlayIntervalRef.current = setInterval(
                    () => {
                        nextImage();
                    },
                    featured ? 4000 : 5000
                ); // Different timing for featured vs regular cards
            }
        };

        // Clear existing interval before setting a new one
        if (autoPlayIntervalRef.current) {
            clearInterval(autoPlayIntervalRef.current);
        }

        startAutoPlay();

        // Cleanup function
        return () => {
            if (autoPlayIntervalRef.current) {
                clearInterval(autoPlayIntervalRef.current);
            }
        };
    }, [isAutoPlaying, isPaused, images.length, featured]);

    // Reset pause state after some inactivity
    useEffect(() => {
        if (isPaused) {
            const pauseTimeout = setTimeout(() => {
                setIsPaused(false);
            }, 8000); // Resume auto-play after 8 seconds of inactivity

            return () => clearTimeout(pauseTimeout);
        }
    }, [isPaused]);

    // Show controls when hovered
    useEffect(() => {
        if (isHovered) {
            setShowControls(true);
        } else {
            // Add a small delay before hiding controls
            const hideTimeout = setTimeout(() => {
                setShowControls(false);
            }, 1000);

            return () => clearTimeout(hideTimeout);
        }
    }, [isHovered]);

    // Toggle auto-play
    const toggleAutoPlay = (e) => {
        e.stopPropagation();
        setIsAutoPlaying(!isAutoPlaying);
        setIsPaused(false);
    };

    // Go to specific image
    const goToImage = (idx, e) => {
        if (e) e.stopPropagation();
        setCurrentImageIndex(idx);
        setIsPaused(true);
    };

    // Conditional styling based on whether this is a featured project or in the projects grid
    const cardStyle = featured
        ? "group bg-gradient-to-b from-gray-900 to-gray-950 rounded-xl overflow-hidden shadow-xl shadow-blue-900/10 relative"
        : "group relative overflow-hidden rounded-2xl border border-blue-500/10 bg-gradient-to-br from-gray-900/90 to-gray-950/90 p-0.5 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/10";

    return (
        <motion.div
            className={cardStyle}
            initial={{ opacity: 0, y: featured ? 50 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={
                featured
                    ? { y: -5 }
                    : {
                          y: -5,
                          boxShadow:
                              "0 25px 50px -12px rgba(59, 130, 246, 0.15)",
                      }
            }
            onClick={() => onClick && onClick(project)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Glowing Effect for non-featured cards */}
            {!featured && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-violet-600/20 to-cyan-600/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-xl"></div>
            )}

            {/* Card Content Container */}
            <div
                className={
                    featured
                        ? "cursor-pointer"
                        : "relative h-full rounded-2xl bg-gradient-to-br from-black/80 to-gray-900/90 p-5 backdrop-blur-md z-10 overflow-hidden"
                }
            >
                {/* Image Container */}
                <div
                    className={
                        featured
                            ? "relative w-full h-48 sm:h-56"
                            : "overflow-hidden mb-4 relative aspect-video rounded-xl group-hover:shadow-lg transition-all duration-300"
                    }
                >
                    <div
                        className={
                            featured
                                ? "absolute inset-0 overflow-hidden"
                                : "relative w-full h-full"
                        }
                    >
                        {/* Carousel Implementation */}
                        <div className="relative w-full h-full overflow-hidden">
                            <div
                                className="flex transition-transform duration-500 h-full"
                                style={{
                                    width: `${images.length * 100}%`,
                                    transform: `translateX(-${
                                        (currentImageIndex * 100) /
                                        images.length
                                    }%)`,
                                }}
                            >
                                {images.map((img, idx) => (
                                    <div
                                        key={idx}
                                        className="relative"
                                        style={{
                                            width: `${100 / images.length}%`,
                                        }}
                                    >
                                        <Image
                                            src={img}
                                            alt={`${title} - image ${idx + 1}`}
                                            className="object-cover w-full h-full transform transition-transform duration-500 ease-out group-hover:scale-110"
                                            width={500}
                                            height={300}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Gradient overlay for image */}
                        <div
                            className={
                                featured
                                    ? "absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30 group-hover:from-black group-hover:via-black/70 group-hover:to-black/20 transition-opacity duration-500"
                                    : "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"
                            }
                        />

                        {/* Image Navigation Controls - Only show when multiple images and controls should be visible */}
                        {images.length > 1 && (showControls || isHovered) && (
                            <>
                                <button
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2 z-20 text-white backdrop-blur-sm transition-all duration-200 transform hover:scale-110"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        prevImage();
                                        setIsPaused(true);
                                    }}
                                >
                                    <FaChevronLeft size={12} />
                                </button>
                                <button
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2 z-20 text-white backdrop-blur-sm transition-all duration-200 transform hover:scale-110"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        nextImage();
                                        setIsPaused(true);
                                    }}
                                >
                                    <FaChevronRight size={12} />
                                </button>

                                {/* Play/Pause Button */}
                                <button
                                    className="absolute top-2 right-2 bg-black/60 hover:bg-black/70 rounded-full p-1.5 z-20 text-white backdrop-blur-sm transition-all duration-200 transform hover:scale-110"
                                    onClick={toggleAutoPlay}
                                >
                                    {isAutoPlaying && !isPaused ? (
                                        <FaPause size={10} />
                                    ) : (
                                        <FaPlay size={10} />
                                    )}
                                </button>

                                {/* Image indicator dots */}
                                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-20">
                                    {images.map((_, idx) => (
                                        <button
                                            key={idx}
                                            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                                currentImageIndex === idx
                                                    ? "bg-white w-3"
                                                    : "bg-white/50 hover:bg-white/70"
                                            }`}
                                            onClick={(e) => goToImage(idx, e)}
                                            aria-label={`Go to image ${
                                                idx + 1
                                            }`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Project Tags */}
                    <div className="absolute bottom-3 left-3 z-20 flex flex-wrap gap-1.5">
                        {tags.slice(0, 2).map((tag) => (
                            <ProjectTag key={tag} name={tag} size="small" />
                        ))}
                        {tags.length > 2 && (
                            <span className="text-xs text-gray-300 px-1.5 py-0.5 bg-black/50 backdrop-blur-sm rounded-md">
                                +{tags.length - 2}
                            </span>
                        )}
                    </div>

                    {/* Project Emoji */}
                    <div className="absolute top-3 left-3 z-20">
                        <motion.div
                            className="flex items-center justify-center w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm text-xl shadow-xl"
                            initial={{ scale: 0, rotate: -30 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.3, type: "spring" }}
                        >
                            {emoji}
                        </motion.div>
                    </div>

                    {/* Featured Badge */}
                    {project.featured && (
                        <div className="absolute top-3 right-3 z-20">
                            <motion.div
                                className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-600 px-2 py-1 rounded-full text-xs font-semibold text-white shadow-lg"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <FaStar className="text-yellow-300" />
                                <span>Featured</span>
                            </motion.div>
                        </div>
                    )}
                </div>

                {/* Shimmer Effect for featured cards */}
                {featured && (
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 -skew-x-12"
                        initial={{ x: "-100%" }}
                        animate={
                            isHovered
                                ? { x: ["100%", "-100%"] }
                                : { x: "-100%" }
                        }
                        transition={{
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 1.5,
                            ease: "easeInOut",
                        }}
                    />
                )}

                {/* Card Content */}
                <div
                    className={
                        featured
                            ? "relative h-full p-5 flex flex-col justify-between z-10"
                            : "relative z-10"
                    }
                >
                    {/* Project Title */}
                    {featured ? (
                        <div className="flex items-start justify-between mb-2">
                            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                                {title}
                            </h3>
                            <span
                                className="text-xl"
                                role="img"
                                aria-label="Project emoji"
                            >
                                {emoji}
                            </span>
                        </div>
                    ) : (
                        <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100 group-hover:from-cyan-300 group-hover:to-white transition-all duration-300">
                            {title}
                        </h3>
                    )}

                    {/* Description */}
                    <p
                        className={
                            featured
                                ? "text-gray-400 text-sm line-clamp-2 mt-1 group-hover:text-gray-300 transition-colors"
                                : "text-gray-400 text-sm mb-4 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300"
                        }
                    >
                        {description}
                    </p>

                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                        {technologies.slice(0, 3).map((tech) => (
                            <TechBadge key={tech} name={tech} small={true} />
                        ))}
                        {technologies.length > 3 && (
                            <motion.span
                                className="text-xs px-2 py-0.5 bg-gray-800/70 text-gray-400 rounded-full 
                                        border border-gray-700/50 hover:bg-gray-700/70 hover:text-gray-300"
                                whileHover={{ scale: 1.05 }}
                            >
                                +{technologies.length - 3}
                            </motion.span>
                        )}
                    </div>

                    {/* View Project Button - only for non-featured cards */}
                    {!featured && (
                        <div className="absolute bottom-0 left-0 right-0 py-3 opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
                            <div className="flex justify-center">
                                <motion.button
                                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 px-4 py-1.5 rounded-full text-white text-sm font-medium shadow-lg hover:shadow-blue-500/40 flex items-center gap-1.5"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span>View Project</span>
                                    <FaExternalLinkAlt size={10} />
                                </motion.button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Links (GitHub & Demo) - only for featured cards */}
                {featured && (
                    <div className="pt-4 pb-2 px-5 flex justify-between items-center border-t border-gray-800/70 bg-gray-900/70">
                        <a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 text-sm"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <FaGithub className="text-lg" />
                            <span>Code</span>
                        </a>

                        <a
                            href={demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 text-sm"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <span>Live Demo</span>
                            <FaExternalLinkAlt className="text-xs" />
                        </a>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
