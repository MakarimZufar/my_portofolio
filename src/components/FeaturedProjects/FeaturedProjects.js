import Link from "next/link";
import { motion } from "framer-motion";
import { useRef } from "react";
import { HiArrowRight, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import ProjectCard from "./ProjectCard";
import { getFeaturedProjects } from "@/data/projectsData";

export default function UpdatedFeaturedProjects() {
    const featuredProjects = getFeaturedProjects();
    const containerRef = useRef(null);

    // Fungsi untuk scroll secara horizontal pada tampilan mobile
    const handleScroll = (direction) => {
        if (containerRef.current) {
            const scrollAmount = direction === "left" ? -300 : 300;
            containerRef.current.scrollBy({
                left: scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <section className="px-4 sm:px-10 md:px-20 py-20 w-full">
            <motion.div
                className="max-w-6xl mx-auto relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
            >
                {/* Section Background with Glassmorphism */}
                <div className="absolute inset-0 rounded-2xl p-[1px]">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-900/95 to-gray-950 rounded-2xl">
                        {/* Animated gradient lines */}
                        <div className="absolute inset-0 overflow-hidden rounded-2xl opacity-20">
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent transform -translate-x-full animate-[shimmer_4s_infinite]"></div>
                            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent transform translate-x-full animate-[shimmer_4s_infinite]"></div>
                            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent transform -translate-y-full animate-[shimmer_5s_infinite]"></div>
                            <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-500 to-transparent transform translate-y-full animate-[shimmer_5s_infinite]"></div>
                        </div>
                    </div>
                </div>

                {/* Content Container */}
                <div className="relative p-6 md:p-10 backdrop-blur-sm">
                    {/* Section Header */}
                    <div className="text-center mb-10">
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="relative inline-block"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-500 bg-clip-text text-transparent inline-block mb-2">
                                Proyek Unggulan
                            </h2>

                            {/* Decorative Underline */}
                            <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-500 rounded-full"></div>

                            {/* Glowing dots */}
                            <motion.div
                                className="absolute -left-3 -bottom-1 w-2 h-2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50"
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.7, 1, 0.7],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <motion.div
                                className="absolute -right-3 -bottom-1 w-2 h-2 rounded-full bg-blue-400 shadow-lg shadow-blue-400/50"
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.7, 1, 0.7],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: 1,
                                }}
                            />
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-gray-400 mt-4 max-w-2xl mx-auto"
                        >
                            Beberapa proyek terbaik yang saya kerjakan. Klik
                            pada kartu untuk melihat detail lebih lanjut.
                        </motion.p>
                    </div>

                    {/* Projects Grid with Scroll Controls for Mobile */}
                    <div className="relative mb-8">
                        {/* Scroll Controls for Mobile/Tablet */}
                        <motion.div
                            className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 md:hidden"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 }}
                        >
                            <button
                                onClick={() => handleScroll("left")}
                                className="w-8 h-8 bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-full flex items-center justify-center text-white shadow-lg hover:bg-gray-700 border border-gray-700/50"
                                aria-label="Scroll left"
                            >
                                <HiChevronLeft className="w-5 h-5" />
                            </button>
                        </motion.div>

                        <motion.div
                            className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 md:hidden"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 }}
                        >
                            <button
                                onClick={() => handleScroll("right")}
                                className="w-8 h-8 bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-full flex items-center justify-center text-white shadow-lg hover:bg-gray-700 border border-gray-700/50"
                                aria-label="Scroll right"
                            >
                                <HiChevronRight className="w-5 h-5" />
                            </button>
                        </motion.div>

                        {/* Scrollable Container for Mobile / Grid for Desktop */}
                        <div
                            ref={containerRef}
                            className="flex overflow-x-auto pb-4 md:pb-0 gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 hide-scrollbar"
                        >
                            {featuredProjects.map((project, i) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.6,
                                        delay: i * 0.15,
                                    }}
                                    className="flex-shrink-0 w-64 md:w-auto"
                                >
                                    <ProjectCard
                                        project={project}
                                        index={i}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* View All Projects Button */}
                    <motion.div
                        className="text-center mt-8"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full font-medium hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20 group"
                        >
                            <span>Lihat Semua Proyek</span>
                            <motion.span
                                animate={{ x: [0, 4, 0] }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    repeatType: "loop",
                                }}
                                className="group-hover:translate-x-1 transition-transform"
                            >
                                <HiArrowRight />
                            </motion.span>
                        </Link>
                    </motion.div>
                </div>
            </motion.div>

            {/* CSS untuk menghilangkan scrollbar namun tetap memungkinkan scroll */}
            <style jsx>{`
                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }
                .hide-scrollbar {
                    scrollbar-width: none; /* Firefox */
                    -ms-overflow-style: none; /* IE and Edge */
                }
                .hide-scrollbar::-webkit-scrollbar {
                    display: none; /* Chrome, Safari, Opera */
                }
            `}</style>
        </section>
    );
}
