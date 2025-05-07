// src/components/FeaturedProjects/FeaturedProjects.js
"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    FaChevronLeft,
    FaChevronRight,
    FaArrowRight,
    FaPause,
    FaPlay,
} from "react-icons/fa";
import { getFeaturedProjects } from "@/data/projectsData"; // Import fungsi untuk mendapatkan proyek unggulan
import { ProjectCard, ProjectDetail } from "@/components/project"; // Import from project folder instead of common

// Menggunakan data dari projectsData.js
const featuredProjects = getFeaturedProjects();

export default function FeaturedProjects() {
    const [selectedProject, setSelectedProject] = useState(null);
    const scrollContainerRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoSliding, setIsAutoSliding] = useState(true);
    const [isPaused, setIsPaused] = useState(false);
    const autoSlideIntervalRef = useRef(null);

    // Mengecek apakah dapat scroll kiri/kanan
    const checkScrollability = () => {
        const el = scrollContainerRef.current;
        if (el) {
            setCanScrollLeft(el.scrollLeft > 0);
            setCanScrollRight(
                el.scrollLeft < el.scrollWidth - el.clientWidth - 10
            );
        }
    };

    // Inisialisasi check scrollability pada component mount dan resize
    useEffect(() => {
        checkScrollability();
        window.addEventListener("resize", checkScrollability);
        return () => window.removeEventListener("resize", checkScrollability);
    }, []);

    // Handler untuk tombol scroll
    const handleScroll = (direction) => {
        const el = scrollContainerRef.current;
        if (el) {
            // Pause auto-sliding when manually scrolling
            setIsPaused(true);

            const scrollAmount = direction === "left" ? -300 : 300;
            el.scrollBy({ left: scrollAmount, behavior: "smooth" });

            // Calculate the new current index
            if (
                direction === "right" &&
                currentIndex < featuredProjects.length - 1
            ) {
                setCurrentIndex((prevIndex) => prevIndex + 1);
            } else if (direction === "left" && currentIndex > 0) {
                setCurrentIndex((prevIndex) => prevIndex - 1);
            }

            // Update status setelah scroll
            setTimeout(checkScrollability, 300);
        }
    };

    // Auto-slide functionality
    useEffect(() => {
        const startAutoSlide = () => {
            if (isAutoSliding && !isPaused) {
                autoSlideIntervalRef.current = setInterval(() => {
                    const el = scrollContainerRef.current;
                    if (el) {
                        // If we can scroll right, scroll right, otherwise go back to start
                        if (canScrollRight) {
                            // Calculate width of one card + gap
                            const cardWidth =
                                el.scrollWidth / featuredProjects.length;
                            // Scroll to the next card
                            el.scrollBy({
                                left: cardWidth,
                                behavior: "smooth",
                            });
                            setCurrentIndex((prevIndex) =>
                                prevIndex < featuredProjects.length - 1
                                    ? prevIndex + 1
                                    : 0
                            );
                        } else {
                            // Reset to the beginning when we reach the end
                            el.scrollTo({ left: 0, behavior: "smooth" });
                            setCurrentIndex(0);
                        }

                        // Update scroll indicators
                        setTimeout(checkScrollability, 300);
                    }
                }, 5000); // Change slide every 5 seconds
            }
        };

        // Clear existing interval before setting a new one
        if (autoSlideIntervalRef.current) {
            clearInterval(autoSlideIntervalRef.current);
        }

        startAutoSlide();

        // Cleanup function
        return () => {
            if (autoSlideIntervalRef.current) {
                clearInterval(autoSlideIntervalRef.current);
            }
        };
    }, [isAutoSliding, isPaused, canScrollRight, featuredProjects.length]);

    // Reset pause state after 10 seconds of inactivity
    useEffect(() => {
        if (isPaused) {
            const resetPauseTimeout = setTimeout(() => {
                setIsPaused(false);
            }, 10000);

            return () => clearTimeout(resetPauseTimeout);
        }
    }, [isPaused]);

    // Toggle auto-sliding
    const toggleAutoSlide = () => {
        setIsAutoSliding(!isAutoSliding);
        setIsPaused(false);
    };

    // Handle project click to show details
    const handleProjectClick = (project) => {
        setSelectedProject(project);
        // Pause auto-sliding when viewing details
        setIsPaused(true);
        // Add a class to body to prevent scrolling when modal is open
        document.body.classList.add("overflow-hidden");
    };

    // Close project details modal
    const closeProjectDetail = () => {
        setSelectedProject(null);
        // Remove the class to re-enable scrolling
        document.body.classList.remove("overflow-hidden");
    };

    // Programmatically scroll to specific index
    const scrollToIndex = (index) => {
        const el = scrollContainerRef.current;
        if (el) {
            // Calculate the position to scroll to
            const cardWidth = el.scrollWidth / featuredProjects.length;
            const scrollPos = index * cardWidth;

            // Scroll to the position
            el.scrollTo({ left: scrollPos, behavior: "smooth" });

            // Update current index
            setCurrentIndex(index);
            // Temporarily pause auto-sliding
            setIsPaused(true);

            // Update scroll indicators
            setTimeout(checkScrollability, 300);
        }
    };

    return (
        <section className="py-16 px-4 md:px-10 lg:px-20">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-block"
                    >
                        <h2 className="text-3xl font-bold mb-2 text-cyan-400">
                            Proyek Unggulan
                        </h2>
                        <div className="h-1 w-24 mx-auto bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="mt-4 text-gray-400 max-w-2xl mx-auto"
                    >
                        Beberapa proyek terbaik yang telah saya kerjakan,
                        menggabungkan teknologi modern dan solusi inovatif.
                    </motion.p>
                </div>

                {/* Projects Container with Horizontal Scroll on Mobile/Tablet */}
                <div className="relative">
                    {/* Scroll Buttons (always visible now) */}
                    <button
                        onClick={() => handleScroll("left")}
                        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 backdrop-blur-sm p-2 rounded-full text-white shadow-lg border border-gray-700 transition-opacity duration-300 ${
                            !canScrollLeft
                                ? "opacity-50 cursor-not-allowed"
                                : "opacity-100 hover:bg-black/70"
                        }`}
                        aria-label="Scroll left"
                        disabled={!canScrollLeft}
                    >
                        <FaChevronLeft />
                    </button>

                    <button
                        onClick={() => handleScroll("right")}
                        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 backdrop-blur-sm p-2 rounded-full text-white shadow-lg border border-gray-700 transition-opacity duration-300 ${
                            !canScrollRight
                                ? "opacity-50 cursor-not-allowed"
                                : "opacity-100 hover:bg-black/70"
                        }`}
                        aria-label="Scroll right"
                        disabled={!canScrollRight}
                    >
                        <FaChevronRight />
                    </button>

                    {/* Play/Pause Button */}
                    <button
                        onClick={toggleAutoSlide}
                        className="absolute -bottom-12 right-0 z-10 bg-black/50 backdrop-blur-sm p-2 rounded-full text-white shadow-lg border border-gray-700 hover:bg-black/70"
                        aria-label={
                            isAutoSliding
                                ? "Pause auto-slide"
                                : "Play auto-slide"
                        }
                    >
                        {isAutoSliding ? (
                            <FaPause size={14} />
                        ) : (
                            <FaPlay size={14} />
                        )}
                    </button>

                    {/* Projects Grid for Desktop / Scrollable Container for Mobile */}
                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto gap-6 pb-6 lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible scrollbar-hide"
                        onScroll={checkScrollability}
                    >
                        {featuredProjects.map((project, index) => (
                            <div
                                key={project.id}
                                className="w-80 flex-shrink-0 lg:w-auto"
                            >
                                <ProjectCard
                                    project={project}
                                    index={index}
                                    onClick={handleProjectClick}
                                    featured={true}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Slide indicators/dots */}
                    <div className="flex justify-center mt-6 gap-2">
                        {featuredProjects.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => scrollToIndex(index)}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                                    currentIndex === index
                                        ? "bg-cyan-500 w-5"
                                        : "bg-gray-600 hover:bg-gray-500"
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* View All Projects Button */}
                <div className="text-center mt-12">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full font-medium hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20"
                    >
                        <span>Lihat Semua Proyek</span>
                        <FaArrowRight />
                    </Link>
                </div>
            </div>

            {/* Project Detail Modal */}
            {selectedProject && (
                <ProjectDetail
                    project={selectedProject}
                    onClose={closeProjectDetail}
                    featured={true}
                />
            )}

            {/* Styling untuk hide scrollbar tetapi tetap bisa scroll */}
            <style jsx>{`
                .scrollbar-hide {
                    -ms-overflow-style: none; /* IE and Edge */
                    scrollbar-width: none; /* Firefox */
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none; /* Chrome, Safari and Opera */
                }
            `}</style>
        </section>
    );
}
