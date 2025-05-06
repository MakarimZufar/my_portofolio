// src/components/FeaturedProjects/FeaturedProjects.js
"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaArrowRight } from "react-icons/fa";
import { getFeaturedProjects } from "@/data/projectsData"; // Import fungsi untuk mendapatkan proyek unggulan
import { ProjectCard, ProjectDetail } from "@/components/project"; // Import from project folder instead of common

// Menggunakan data dari projectsData.js
const featuredProjects = getFeaturedProjects();

export default function FeaturedProjects() {
    const [selectedProject, setSelectedProject] = useState(null);
    const scrollContainerRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

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
            const scrollAmount = direction === "left" ? -300 : 300;
            el.scrollBy({ left: scrollAmount, behavior: "smooth" });

            // Update status setelah scroll
            setTimeout(checkScrollability, 300);
        }
    };

    // Handle project click to show details
    const handleProjectClick = (project) => {
        setSelectedProject(project);
        // Add a class to body to prevent scrolling when modal is open
        document.body.classList.add("overflow-hidden");
    };

    // Close project details modal
    const closeProjectDetail = () => {
        setSelectedProject(null);
        // Remove the class to re-enable scrolling
        document.body.classList.remove("overflow-hidden");
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
                    {/* Scroll Buttons (hanya muncul jika perlu) */}
                    {canScrollLeft && (
                        <button
                            onClick={() => handleScroll("left")}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 backdrop-blur-sm p-2 rounded-full text-white shadow-lg border border-gray-700 lg:hidden"
                            aria-label="Scroll left"
                        >
                            <FaChevronLeft />
                        </button>
                    )}

                    {canScrollRight && (
                        <button
                            onClick={() => handleScroll("right")}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 backdrop-blur-sm p-2 rounded-full text-white shadow-lg border border-gray-700 lg:hidden"
                            aria-label="Scroll right"
                        >
                            <FaChevronRight />
                        </button>
                    )}

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
