"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { getAllProjects } from "@/data/projectsData";
import TechBadge from "@/components/home/TechBadge";

export default function ProjectsPage() {
    const allProjects = getAllProjects();
    const [filter, setFilter] = useState("all");

    // Filter untuk teknologi yang unik dari semua proyek
    const allTechnologies = [
        ...new Set(allProjects.flatMap((project) => project.technologies)),
    ];

    // Proyek yang difilter berdasarkan kategori
    const filteredProjects =
        filter === "all"
            ? allProjects
            : allProjects.filter((project) =>
                  project.technologies.includes(filter)
              );

    return (
        <main className="min-h-screen pt-32 pb-16 px-6 sm:px-20 bg-gradient-to-b from-indigo-900 via-black to-gray-900">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto"
            >
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                        Proyek Saya
                    </h1>
                    <p className="text-gray-300 max-w-3xl mx-auto mb-8">
                        Berikut adalah beberapa proyek yang telah saya kerjakan.
                        Mereka menunjukkan kemampuan dan keahlian saya dalam
                        pengembangan web.
                    </p>

                    {/* Filter */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        <button
                            onClick={() => setFilter("all")}
                            className={`px-4 py-2 rounded-full text-sm transition-all ${
                                filter === "all"
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                            }`}
                        >
                            Semua
                        </button>
                        {allTechnologies.map((tech) => (
                            <button
                                key={tech}
                                onClick={() => setFilter(tech)}
                                className={`px-4 py-2 rounded-full text-sm transition-all ${
                                    filter === tech
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                }`}
                            >
                                {tech}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Project Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                        />
                    ))}
                </div>

                {/* No Projects Found */}
                {filteredProjects.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-400 text-xl">
                            Tidak ada proyek dengan teknologi {filter}
                        </p>
                        <button
                            onClick={() => setFilter("all")}
                            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full"
                        >
                            Lihat Semua Proyek
                        </button>
                    </div>
                )}
            </motion.div>
        </main>
    );
}

function ProjectCard({ project, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-black/20 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 group hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-500"
        >
            {/* Project Image/Preview */}
            <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
                    <span className="text-white text-5xl opacity-20">
                        {index % 3 === 0 ? "💻" : index % 3 === 1 ? "📱" : "📊"}
                    </span>
                </div>

                {/* Overlay with buttons */}
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300 flex items-end justify-center p-4">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex gap-4">
                        {project.demoUrl && (
                            <a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition-colors"
                            >
                                Demo
                            </a>
                        )}
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-gray-800 text-white rounded-full text-sm hover:bg-gray-700 transition-colors"
                            >
                                GitHub
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Project Info */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white">
                        {project.title}
                    </h3>
                    {project.featured && (
                        <span className="bg-blue-600/20 text-blue-300 text-xs px-2 py-1 rounded-full">
                            Featured
                        </span>
                    )}
                </div>

                <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                    {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                        <TechBadge key={tech} name={tech} />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
