// src/components/FeaturedProjects/FeaturedProjects.js
"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaArrowRight } from "react-icons/fa";
import { getFeaturedProjects } from "@/data/projectsData"; // Import fungsi untuk mendapatkan proyek unggulan

// Menggunakan data dari projectsData.js
const featuredProjects = getFeaturedProjects();

// Import komponen TechBadge dan ProjectTag
import TechBadge from "@/components/TechBadge";
import ProjectTag from "@/components/ProjectTag";

// Project Card
const ProjectCard = ({ project, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-black p-1 h-full"
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
        >
            {/* Gradient Border */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Inner Content */}
            <div className="relative bg-gray-900 rounded-xl p-5 flex flex-col h-full z-10">
                {/* Project Title */}
                <h3 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                    {project.title}
                </h3>

                {/* Tags */}
                <div className="flex gap-2 mb-3 flex-wrap">
                    {project.tags.map((tag) => (
                        <ProjectTag key={tag} name={tag} />
                    ))}
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4 flex-grow">
                    {project.description}
                </p>

                {/* Technologies */}
                <div className="mb-4">
                    <div className="text-xs text-gray-500 mb-2">Teknologi:</div>
                    <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech) => (
                            <TechBadge key={tech} name={tech} />
                        ))}
                        {project.technologies.length > 3 && (
                            <span className="text-xs px-2 py-1 bg-gray-800 text-gray-400 rounded-full">
                                +{project.technologies.length - 3}
                            </span>
                        )}
                    </div>
                </div>

                {/* Links - becomes visible on hover */}
                <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2">
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        GitHub
                    </a>
                    <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full hover:from-cyan-600 hover:to-blue-600 transition-colors"
                    >
                        Lihat Demo
                    </a>
                </div>

                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100" />
            </div>
        </motion.div>
    );
};

export default function FeaturedProjects() {
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
                                <ProjectCard project={project} index={index} />
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
