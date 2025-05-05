"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaFilter,
    FaTimes,
    FaChevronDown,
    FaSearch,
    FaGithub,
    FaExternalLinkAlt,
    FaRegLightbulb,
} from "react-icons/fa";
import ProjectCard from "@/components/FeaturedProjects/ProjectCard";
import ProjectDetail from "@/components/FeaturedProjects/ProjectDetail";
import TechBadge from "@/components/TechBadge";
import ProjectTag from "@/components/ProjectTag";
import {
    getAllProjects,
    getAllTags,
    getAllTechnologies,
} from "@/data/projectsData";

// Import data proyek
const allProjects = getAllProjects();
const allTags = getAllTags();
const allTechnologies = getAllTechnologies();

// Komponen Filter Dropdown dengan desain yang lebih rapi
const FilterDropdown = ({
    title,
    options,
    selectedValues,
    onSelect,
    onClear,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Handle selection of option
    const handleSelect = (option) => {
        onSelect(option);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-4 py-2 text-sm rounded-full border transition-colors ${
                    selectedValues.length > 0
                        ? "bg-gradient-to-r from-blue-600 to-cyan-600 border-transparent text-white"
                        : "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                }`}
            >
                <span>{title}</span>
                {selectedValues.length > 0 && (
                    <span className="bg-white/20 text-white text-xs px-1.5 rounded-full">
                        {selectedValues.length}
                    </span>
                )}
                <FaChevronDown
                    className={`transition-transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                    size={12}
                />
            </button>

            {/* Dropdown content with animated appearance */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-30 mt-2 w-56 max-h-60 overflow-y-auto bg-gray-900 border border-gray-700 rounded-lg shadow-xl"
                    >
                        <div className="p-3 flex flex-wrap gap-1.5">
                            {options.map((option) => (
                                <span
                                    key={option}
                                    onClick={() => handleSelect(option)}
                                    className={`text-xs px-2 py-1 rounded-full cursor-pointer transition-colors ${
                                        selectedValues.includes(option)
                                            ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                                            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                    }`}
                                >
                                    {option}
                                </span>
                            ))}
                        </div>

                        {/* Tombol clear selection */}
                        {selectedValues.length > 0 && (
                            <div className="p-2 border-t border-gray-800">
                                <button
                                    onClick={onClear}
                                    className="w-full text-xs px-2 py-1 text-gray-400 hover:text-white"
                                >
                                    Hapus Semua
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Komponen utama Projects Page
export default function ProjectsPage() {
    // State untuk filter dan pencarian
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedTechs, setSelectedTechs] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isFilterExpanded, setIsFilterExpanded] = useState(false);
    const [filteredProjects, setFilteredProjects] = useState(allProjects);
    const [fadeIn, setFadeIn] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    // Filter proyek berdasarkan kriteria
    useEffect(() => {
        let filtered = allProjects;

        // Filter berdasarkan tag
        if (selectedTags.length > 0) {
            filtered = filtered.filter((project) =>
                selectedTags.some((tag) => project.tags.includes(tag))
            );
        }

        // Filter berdasarkan teknologi
        if (selectedTechs.length > 0) {
            filtered = filtered.filter((project) =>
                selectedTechs.some((tech) =>
                    project.technologies.includes(tech)
                )
            );
        }

        // Filter berdasarkan pencarian
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (project) =>
                    project.title.toLowerCase().includes(query) ||
                    project.description.toLowerCase().includes(query) ||
                    project.technologies.some((tech) =>
                        tech.toLowerCase().includes(query)
                    ) ||
                    project.tags.some((tag) =>
                        tag.toLowerCase().includes(query)
                    )
            );
        }

        // Animasi transisi saat hasil filter berubah
        setFadeIn(false);
        setTimeout(() => {
            setFilteredProjects(filtered);
            setFadeIn(true);
        }, 200);
    }, [selectedTags, selectedTechs, searchQuery]);

    // Animasi saat halaman dimuat
    useEffect(() => {
        setFadeIn(true);
    }, []);

    // Toggle tag selection
    const toggleTag = (tag) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    // Toggle technology selection
    const toggleTech = (tech) => {
        setSelectedTechs((prev) =>
            prev.includes(tech)
                ? prev.filter((t) => t !== tech)
                : [...prev, tech]
        );
    };

    // Clear all filters
    const clearAllFilters = () => {
        setSelectedTags([]);
        setSelectedTechs([]);
        setSearchQuery("");
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
        <div className="min-h-screen py-24 px-4 md:px-10 lg:px-20 bg-gradient-to-b from-gray-900 via-gray-900 to-black">
            <div className="max-w-7xl mx-auto">
                {/* Header Section with animation */}
                <div className="text-center mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
                    >
                        Proyek Saya
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="h-1 w-24 mx-auto bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mb-6"
                    />
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-gray-400 max-w-2xl mx-auto"
                    >
                        Kumpulan proyek terbaik yang telah saya kerjakan,
                        mencakup berbagai teknologi dan solusi untuk memecahkan
                        beragam masalah.
                    </motion.p>
                </div>

                {/* Search and Filter Section */}
                <div className="mb-12">
                    <div className="flex flex-col lg:flex-row justify-between gap-4 items-start lg:items-center mb-6">
                        {/* Search Input */}
                        <div className="relative w-full lg:w-1/3">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                                className="relative"
                            >
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    placeholder="Cari proyek..."
                                    className="w-full pl-10 pr-10 py-2.5 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-300 focus:outline-none transition-all"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                                    >
                                        <FaTimes />
                                    </button>
                                )}
                            </motion.div>
                        </div>

                        {/* Mobile Filter Button */}
                        <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                            onClick={() =>
                                setIsFilterExpanded(!isFilterExpanded)
                            }
                            className="lg:hidden px-4 py-2.5 bg-gray-800 rounded-full flex items-center gap-2 text-gray-300 border border-gray-700 shadow-lg"
                        >
                            <FaFilter />
                            <span>Filter</span>
                            {(selectedTags.length > 0 ||
                                selectedTechs.length > 0) && (
                                <span className="bg-cyan-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                                    {selectedTags.length + selectedTechs.length}
                                </span>
                            )}
                        </motion.button>

                        {/* Desktop Filters */}
                        <div className="hidden lg:flex gap-3">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.4 }}
                            >
                                <FilterDropdown
                                    title="Kategori"
                                    options={allTags}
                                    selectedValues={selectedTags}
                                    onSelect={toggleTag}
                                    onClear={() => setSelectedTags([])}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.5 }}
                            >
                                <FilterDropdown
                                    title="Teknologi"
                                    options={allTechnologies}
                                    selectedValues={selectedTechs}
                                    onSelect={toggleTech}
                                    onClear={() => setSelectedTechs([])}
                                />
                            </motion.div>

                            {(selectedTags.length > 0 ||
                                selectedTechs.length > 0) && (
                                <motion.button
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.6 }}
                                    onClick={clearAllFilters}
                                    className="px-4 py-2 text-sm bg-gray-800 text-gray-300 rounded-full border border-gray-700 hover:bg-gray-700 flex items-center gap-2"
                                >
                                    <FaTimes size={12} />
                                    <span>Hapus Semua Filter</span>
                                </motion.button>
                            )}
                        </div>
                    </div>

                    {/* Mobile Filters - Expandable */}
                    <AnimatePresence>
                        {isFilterExpanded && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="lg:hidden overflow-hidden mb-6"
                            >
                                <div className="p-5 bg-gray-900/70 backdrop-blur-sm rounded-xl border border-gray-800 shadow-xl">
                                    <div className="mb-4">
                                        <h3 className="text-sm font-semibold text-gray-300 mb-2">
                                            Kategori:
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {allTags.map((tag) => (
                                                <ProjectTag
                                                    key={tag}
                                                    tag={tag}
                                                    isSelected={selectedTags.includes(
                                                        tag
                                                    )}
                                                    onClick={() =>
                                                        toggleTag(tag)
                                                    }
                                                    selectable={true}
                                                    size="small"
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <h3 className="text-sm font-semibold text-gray-300 mb-2">
                                            Teknologi:
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {allTechnologies.map((tech) => (
                                                <TechBadge
                                                    key={tech}
                                                    tech={tech}
                                                    small={true}
                                                    isSelected={selectedTechs.includes(
                                                        tech
                                                    )}
                                                    onClick={() =>
                                                        toggleTech(tech)
                                                    }
                                                    selectable={true}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {(selectedTags.length > 0 ||
                                        selectedTechs.length > 0) && (
                                        <button
                                            onClick={clearAllFilters}
                                            className="w-full px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-full transition-colors"
                                        >
                                            Hapus Semua Filter
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Active Filters Display */}
                    {(selectedTags.length > 0 || selectedTechs.length > 0) && (
                        <div className="flex flex-wrap gap-2 mb-6">
                            <span className="text-sm text-gray-400">
                                Filter Aktif:
                            </span>

                            {selectedTags.map((tag) => (
                                <motion.div
                                    key={tag}
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    className="flex items-center"
                                >
                                    <ProjectTag
                                        tag={tag}
                                        isSelected={true}
                                        onClick={() => toggleTag(tag)}
                                        selectable={true}
                                        size="small"
                                    />
                                </motion.div>
                            ))}

                            {selectedTechs.map((tech) => (
                                <motion.div
                                    key={tech}
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    className="flex items-center"
                                >
                                    <TechBadge
                                        tech={tech}
                                        small={true}
                                        isSelected={true}
                                        onClick={() => toggleTech(tech)}
                                        selectable={true}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Projects Grid with Animation */}
                <motion.div
                    animate={{ opacity: fadeIn ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {filteredProjects.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProjects.map((project, index) => (
                                <ProjectCard
                                    key={project.id || index}
                                    project={project}
                                    index={index}
                                    onClick={() => handleProjectClick(project)}
                                />
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-16 px-4 bg-gray-900/30 backdrop-blur-sm rounded-xl border border-gray-800"
                        >
                            <div className="text-7xl mb-4 opacity-60">😕</div>
                            <h3 className="text-xl font-bold text-gray-300 mb-3">
                                Tidak Ada Proyek yang Ditemukan
                            </h3>
                            <p className="text-gray-400 max-w-md mx-auto mb-6">
                                Tidak ada proyek yang cocok dengan filter atau
                                kata kunci yang Anda pilih. Coba ubah kriteria
                                pencarian Anda.
                            </p>
                            <button
                                onClick={clearAllFilters}
                                className="px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-full transition-colors shadow-lg hover:shadow-cyan-500/20"
                            >
                                Hapus Semua Filter
                            </button>
                        </motion.div>
                    )}
                </motion.div>
            </div>

            {/* Project Detail Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectDetail
                        project={selectedProject}
                        onClose={closeProjectDetail}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
