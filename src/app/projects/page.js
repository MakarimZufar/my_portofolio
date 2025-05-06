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
    FaStar,
    FaCode,
} from "react-icons/fa";
import Image from "next/image";
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

// Komponen Filter Dropdown dengan desain yang lebih rapi dan label yang terlihat
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
                className={`flex items-center gap-2 px-4 py-2.5 text-sm rounded-full border transition-colors ${
                    selectedValues.length > 0
                        ? "bg-gradient-to-r from-blue-600 to-cyan-600 border-transparent text-white font-medium shadow-lg shadow-blue-500/20"
                        : "bg-gray-800/80 border-gray-700 text-white hover:bg-gray-700"
                }`}
            >
                <span className="font-medium">{title}</span>
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
                        className="absolute z-50 mt-2 w-56 max-h-60 overflow-y-auto bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-lg shadow-xl"
                    >
                        <div className="p-3 flex flex-wrap gap-1.5">
                            {options.map((option) =>
                                title === "Category" ? (
                                    <ProjectTag
                                        key={option}
                                        name={option}
                                        isSelected={selectedValues.includes(
                                            option
                                        )}
                                        onClick={() => handleSelect(option)}
                                        selectable={true}
                                        size="small"
                                    />
                                ) : (
                                    <TechBadge
                                        key={option}
                                        name={option}
                                        small={true}
                                        isSelected={selectedValues.includes(
                                            option
                                        )}
                                        onClick={() => handleSelect(option)}
                                        selectable={true}
                                    />
                                )
                            )}
                        </div>

                        {/* Tombol clear selection */}
                        {selectedValues.length > 0 && (
                            <div className="p-2 border-t border-gray-800">
                                <button
                                    onClick={onClear}
                                    className="w-full text-xs px-2 py-1 text-gray-400 hover:text-white flex items-center justify-center gap-1"
                                >
                                    <FaTimes size={10} />
                                    <span>Clear All</span>
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
    const [isLoading, setIsLoading] = useState(true);

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
        // Simulasi loading untuk efek visual
        setTimeout(() => {
            setIsLoading(false);
            setFadeIn(true);
        }, 800);
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
        <div className="min-h-screen pt-30 pb-16 px-4 md:px-10 lg:px-20 relative">
            {/* Dynamic Animated Background */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-gray-900 to-black animate-slow-pulse overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-blue-500/10 to-transparent"></div>
                <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-purple-500/10 to-transparent"></div>

                {/* Floating Orbs */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-gradient-to-br from-cyan-300/20 to-blue-600/5 blur-xl"
                        initial={{
                            x: Math.random() * 100 - 50 + "%",
                            y: Math.random() * 100 + "%",
                            scale: Math.random() * 0.5 + 0.5,
                        }}
                        animate={{
                            x: [
                                Math.random() * 100 + "%",
                                Math.random() * 100 + "%",
                                Math.random() * 100 + "%",
                            ],
                            y: [
                                Math.random() * 100 + "%",
                                Math.random() * 100 + "%",
                                Math.random() * 100 + "%",
                            ],
                            scale: [
                                Math.random() * 0.5 + 0.5,
                                Math.random() * 0.7 + 0.3,
                                Math.random() * 0.5 + 0.5,
                            ],
                        }}
                        transition={{
                            duration: Math.random() * 20 + 15,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                        style={{
                            width: `${Math.random() * 300 + 100}px`,
                            height: `${Math.random() * 300 + 100}px`,
                            opacity: Math.random() * 0.12 + 0.03,
                        }}
                    />
                ))}

                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Page Loading Animation */}
                <AnimatePresence>
                    {isLoading && (
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center z-50 bg-gray-900/80 backdrop-blur-sm"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 180, 360],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="w-16 h-16 border-4 border-t-cyan-500 border-r-blue-500 border-b-indigo-500 border-l-purple-500 rounded-full"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Header Section with animation - FIXED AT TOP */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-10 sticky top-0 pt-4 pb-4 z-20"
                >
                    <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl border border-gray-800/50 shadow-xl p-6 relative overflow-hidden">
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-xl rounded-3xl"></div>

                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center">
                            <div className="flex items-center gap-4 mb-4 md:mb-0">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                                    <FaCode className="text-white text-xl" />
                                </div>
                                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 drop-shadow-lg">
                                    My Projects
                                </h1>
                            </div>

                            <p className="text-gray-300 text-sm md:text-base max-w-2xl md:text-right">
                                A collection of my best projects showcasing
                                various technologies and solutions for solving
                                diverse problems.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Search and Filter Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mb-12 relative"
                >
                    <div className="p-6 rounded-2xl bg-gray-900/40 backdrop-blur-md border border-gray-800/50 shadow-xl">
                        <div className="flex flex-col lg:flex-row justify-between gap-5 items-start lg:items-center mb-6">
                            {/* Search Input with enhanced design */}
                            <div className="relative w-full lg:w-1/3">
                                <div className="relative group">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-30 group-hover:opacity-100 blur group-focus-within:opacity-100 transition duration-300"></div>
                                    <div className="relative flex items-center">
                                        <FaSearch className="absolute left-4 text-blue-400" />
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) =>
                                                setSearchQuery(e.target.value)
                                            }
                                            placeholder="Search projects..."
                                            className="w-full pl-11 pr-10 py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-200 focus:outline-none transition-all shadow-inner"
                                        />
                                        {searchQuery && (
                                            <button
                                                onClick={() =>
                                                    setSearchQuery("")
                                                }
                                                className="absolute right-4 text-gray-400 hover:text-white transition-colors"
                                            >
                                                <FaTimes />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Filter Button with improved design */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() =>
                                    setIsFilterExpanded(!isFilterExpanded)
                                }
                                className="lg:hidden px-5 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center gap-2 text-white shadow-lg shadow-blue-500/20 border border-blue-500/20 w-full justify-center"
                            >
                                <FaFilter />
                                <span className="font-medium">
                                    Filter Projects
                                </span>
                                {(selectedTags.length > 0 ||
                                    selectedTechs.length > 0) && (
                                    <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full ml-1">
                                        {selectedTags.length +
                                            selectedTechs.length}
                                    </span>
                                )}
                            </motion.button>

                            {/* Desktop Filters with improved layout */}
                            <div className="hidden lg:flex gap-4">
                                <FilterDropdown
                                    title="Category"
                                    options={allTags}
                                    selectedValues={selectedTags}
                                    onSelect={toggleTag}
                                    onClear={() => setSelectedTags([])}
                                />

                                <FilterDropdown
                                    title="Technology"
                                    options={allTechnologies}
                                    selectedValues={selectedTechs}
                                    onSelect={toggleTech}
                                    onClear={() => setSelectedTechs([])}
                                />

                                {(selectedTags.length > 0 ||
                                    selectedTechs.length > 0) && (
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={clearAllFilters}
                                        className="px-4 py-2.5 text-sm bg-gray-800/80 text-gray-300 rounded-full border border-gray-700 hover:bg-gray-700 flex items-center gap-2 hover:text-white transition-colors"
                                    >
                                        <FaTimes size={12} />
                                        <span>Clear All Filters</span>
                                    </motion.button>
                                )}
                            </div>
                        </div>

                        {/* Mobile Filters - Expandable with enhanced styling */}
                        <AnimatePresence>
                            {isFilterExpanded && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="lg:hidden overflow-hidden mb-4"
                                >
                                    <div className="p-5 bg-gray-800/60 backdrop-blur-md rounded-xl border border-gray-700/50 shadow-inner">
                                        <div className="mb-5">
                                            <h3 className="text-sm font-semibold text-blue-400 mb-3 flex items-center gap-2">
                                                <span className="bg-blue-500/20 p-1 rounded">
                                                    <FaStar size={12} />
                                                </span>
                                                Category:
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {allTags.map((tag) => (
                                                    <ProjectTag
                                                        key={tag}
                                                        name={tag}
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

                                        <div className="mb-5">
                                            <h3 className="text-sm font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                                                <span className="bg-cyan-500/20 p-1 rounded">
                                                    <FaRegLightbulb size={12} />
                                                </span>
                                                Technology:
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {allTechnologies.map((tech) => (
                                                    <TechBadge
                                                        key={tech}
                                                        name={tech}
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
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={clearAllFilters}
                                                className="w-full px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-full transition-colors shadow-lg shadow-blue-500/20 font-medium"
                                            >
                                                Clear All Filters
                                            </motion.button>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Active Filters Display with animation */}
                        {(selectedTags.length > 0 ||
                            selectedTechs.length > 0) && (
                            <div className="flex flex-wrap items-center gap-2 mt-2">
                                <span className="text-sm text-blue-300 font-medium px-2">
                                    Active Filters:
                                </span>

                                {selectedTags.map((tag) => (
                                    <motion.div
                                        key={tag}
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.8, opacity: 0 }}
                                    >
                                        <ProjectTag
                                            name={tag}
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
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.8, opacity: 0 }}
                                    >
                                        <TechBadge
                                            name={tech}
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
                </motion.div>

                {/* Projects Grid with Animation */}
                <motion.div
                    animate={{ opacity: fadeIn ? 1 : 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {filteredProjects.length > 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                staggerChildren: 0.1,
                                delayChildren: 0.2,
                            }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.id || index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                    }}
                                >
                                    <ProjectCard
                                        project={project}
                                        index={index}
                                        onClick={() =>
                                            handleProjectClick(project)
                                        }
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-16 px-6 bg-gray-900/40 backdrop-blur-md rounded-2xl border border-gray-800/50 shadow-xl"
                        >
                            <div className="relative w-20 h-20 mx-auto mb-6">
                                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl"></div>
                                <div className="relative flex items-center justify-center h-full text-6xl">
                                    <span className="animate-bounce">🔍</span>
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                No Projects Found
                            </h3>

                            <p className="text-gray-300 max-w-md mx-auto mb-8 text-lg">
                                No projects match your filter criteria or search
                                keywords. Try changing your search parameters.
                            </p>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={clearAllFilters}
                                className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-full transition-all shadow-lg hover:shadow-blue-500/30 font-medium"
                            >
                                Clear All Filters
                            </motion.button>
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

            {/* CSS untuk background grid pattern */}
            <style jsx global>{`
                .bg-grid-pattern {
                    background-image: linear-gradient(
                            rgba(255, 255, 255, 0.1) 1px,
                            transparent 1px
                        ),
                        linear-gradient(
                            90deg,
                            rgba(255, 255, 255, 0.1) 1px,
                            transparent 1px
                        );
                    background-size: 40px 40px;
                }

                @keyframes slow-pulse {
                    0%,
                    100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.8;
                    }
                }

                .animate-slow-pulse {
                    animation: slow-pulse 8s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
