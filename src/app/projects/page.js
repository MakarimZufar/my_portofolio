"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaFilter,
    FaTimes,
    FaSearch,
    FaGithub,
    FaExternalLinkAlt,
    FaRegLightbulb,
    FaStar,
    FaCode,
} from "react-icons/fa";
import Image from "next/image";
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

// Komponen ProjectCard dengan design baru
const ProjectCard = ({ project, index, onClick }) => {
    const { title, description, imageUrl, tags, technologies, emoji, featured } = project;
    
    return (
        <motion.div
            onClick={() => onClick(project)}
            className="group relative overflow-hidden rounded-2xl border border-blue-500/10 bg-gradient-to-br from-gray-900/90 to-gray-950/90 p-0.5 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/10"
            whileHover={{ 
                y: -5,
                boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.15)"
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
        >
            {/* Glowing Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-violet-600/20 to-cyan-600/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-xl"></div>
            
            {/* Card Content */}
            <div className="relative h-full rounded-2xl bg-gradient-to-br from-black/80 to-gray-900/90 p-5 backdrop-blur-md z-10 overflow-hidden">
                {/* Mesh Gradient Background */}
                <div className="absolute -inset-40 bg-mesh-gradient opacity-[0.03] z-0"></div>
                
                {/* Featured Badge */}
                {featured && (
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

                {/* Image Container */}
                <div className="overflow-hidden mb-4 relative aspect-video rounded-xl group-hover:shadow-lg transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                    
                    {/* Project Image */}
                    <Image 
                        src={imageUrl || "/projects/default-project.jpg"} 
                        alt={title}
                        width={600}
                        height={340}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                    
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
                </div>
                
                {/* Card Content */}
                <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100 group-hover:from-cyan-300 group-hover:to-white transition-all duration-300">{title}</h3>
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">{description}</p>
                    
                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {technologies.slice(0, 3).map((tech) => (
                            <TechBadge key={tech} name={tech} small={true} />
                        ))}
                        {technologies.length > 3 && (
                            <span className="text-[0.6rem] px-2 py-0.5 bg-gray-800 text-gray-400 rounded-full">
                                +{technologies.length - 3}
                            </span>
                        )}
                    </div>
                    
                    {/* View Project Button */}
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
                </div>
            </div>
        </motion.div>
    );
};

// Komponen ProjectDetail yang akan ditampilkan ketika proyek diklik
const ProjectDetail = ({ project, onClose }) => {
    const modalRef = useRef(null);
    
    // Close when clicking outside the modal
    const handleBackdropClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };
    
    // Destruct project properties
    const { 
        title, 
        description, 
        imageUrl, 
        tags, 
        technologies, 
        emoji, 
        githubUrl, 
        demoUrl 
    } = project;
    
    return (
        <motion.div 
            className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
        >
            <motion.div 
                ref={modalRef}
                className="relative bg-gradient-to-br from-gray-900 to-black border border-blue-500/20 rounded-2xl overflow-hidden w-full max-w-3xl max-h-[90vh] shadow-2xl"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25 }}
            >
                {/* Backdrop glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10 opacity-50 blur-2xl"></div>
                
                {/* Header Image */}
                <div className="relative h-60 sm:h-72 overflow-hidden">
                    <Image 
                        src={imageUrl || "/projects/default-project.jpg"} 
                        alt={title}
                        width={1200}
                        height={600}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
                    
                    {/* Close Button */}
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full backdrop-blur-md hover:bg-red-500/80 transition-colors"
                    >
                        <FaTimes />
                    </button>
                    
                    {/* Project Title & Emoji */}
                    <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center space-x-3 mb-2">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 text-2xl shadow-lg">
                                {emoji}
                            </div>
                            <h1 className="text-3xl font-bold text-white">{title}</h1>
                        </div>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5">
                            {tags.map(tag => (
                                <ProjectTag key={tag} name={tag} />
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-18rem)]">
                    {/* Description */}
                    <div className="mb-6">
                        <h2 className="text-xl font-bold mb-3 text-blue-400">Deskripsi Proyek</h2>
                        <p className="text-gray-300">{description}</p>
                    </div>
                    
                    {/* Tech Stack */}
                    <div className="mb-6">
                        <h2 className="text-xl font-bold mb-3 text-blue-400">Teknologi</h2>
                        <div className="flex flex-wrap gap-2">
                            {technologies.map(tech => (
                                <TechBadge key={tech} name={tech} isSelected={true} />
                            ))}
                        </div>
                    </div>
                    
                    {/* Links */}
                    <div className="flex flex-wrap gap-4">
                        {githubUrl && (
                            <motion.a 
                                href={githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <FaGithub />
                                <span>Lihat Kode</span>
                            </motion.a>
                        )}
                        
                        {demoUrl && (
                            <motion.a 
                                href={demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-4 py-2 rounded-full transition-all shadow-lg hover:shadow-blue-500/40"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <FaExternalLinkAlt />
                                <span>Lihat Demo</span>
                            </motion.a>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

// Komponen utama Projects Page
export default function ProjectsPage() {
    // State untuk filter dan pencarian
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredProjects, setFilteredProjects] = useState(allProjects);
    const [fadeIn, setFadeIn] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    // Animasi untuk orbs
    const [orbPositions, setOrbPositions] = useState([]);
    
    // Generate random positions for orbs
    useEffect(() => {
        const positions = Array(8).fill().map(() => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 200 + 100,
            opacity: Math.random() * 0.08 + 0.03,
            duration: Math.random() * 20 + 15,
        }));
        setOrbPositions(positions);
    }, []);

    // Filter proyek berdasarkan kriteria
    useEffect(() => {
        let filtered = allProjects;

        // Filter berdasarkan category
        if (selectedCategory !== "All") {
            filtered = filtered.filter((project) =>
                project.tags.includes(selectedCategory)
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
    }, [selectedCategory, searchQuery]);

    // Animasi saat halaman dimuat
    useEffect(() => {
        // Simulasi loading untuk efek visual
        setTimeout(() => {
            setIsLoading(false);
            setFadeIn(true);
        }, 800);
    }, []);

    // Handle category selection
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    // Clear all filters
    const clearAllFilters = () => {
        setSelectedCategory("All");
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
        <div className="min-h-screen pt-24 pb-16 px-4 md:px-10 lg:px-20 relative overflow-hidden">
            {/* Dynamic Animated Background - Ultra modern */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900 to-black animate-slow-pulse overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-blue-500/10 to-transparent"></div>
                <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-cyan-500/10 to-transparent"></div>

                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
                
                {/* Glass panels in background */}
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-500/5 backdrop-blur-3xl rounded-full"></div>
                <div className="absolute top-1/3 -right-20 w-80 h-80 bg-purple-500/5 backdrop-blur-3xl rounded-full"></div>
                <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-cyan-500/5 backdrop-blur-3xl rounded-full"></div>
            </div>

            {/* Floating Orbs positioned BEHIND content */}
            <div className="absolute inset-0 pointer-events-none -z-5">
                {orbPositions.map((orb, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-gradient-to-br from-cyan-300/20 to-blue-600/5 blur-xl"
                        initial={{
                            x: `${orb.x}%`,
                            y: `${orb.y}%`,
                            scale: Math.random() * 0.5 + 0.5,
                        }}
                        animate={{
                            x: [
                                `${orb.x}%`,
                                `${(orb.x + 30) % 100}%`,
                                `${(orb.x - 20) % 100}%`,
                            ],
                            y: [
                                `${orb.y}%`,
                                `${(orb.y - 20) % 100}%`,
                                `${(orb.y + 30) % 100}%`,
                            ],
                            scale: [
                                Math.random() * 0.5 + 0.5,
                                Math.random() * 0.7 + 0.3,
                                Math.random() * 0.5 + 0.5,
                            ],
                        }}
                        transition={{
                            duration: orb.duration,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                        style={{
                            width: `${orb.size}px`,
                            height: `${orb.size}px`,
                            opacity: orb.opacity,
                        }}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Page Loading Animation */}
                <AnimatePresence>
                    {isLoading && (
                        <motion.div
                            className="fixed inset-0 flex items-center justify-center z-50 bg-black/90 backdrop-blur-md"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.div className="relative">
                                {/* Pulsing rings */}
                                {[...Array(3)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute inset-0 rounded-full border-2 border-blue-500 opacity-0"
                                        initial={{ scale: 0.1, opacity: 0.8 }}
                                        animate={{ scale: 2.5, opacity: 0 }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            delay: i * 0.5,
                                        }}
                                    />
                                ))}
                                
                                {/* Inner spinning loader */}
                                <motion.div
                                    animate={{
                                        rotate: 360,
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                    className="w-20 h-20 border-4 border-t-blue-500 border-r-transparent border-b-cyan-500 border-l-transparent rounded-full"
                                />
                                
                                {/* Text */}
                                <motion.p 
                                    className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-blue-400 font-mono"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    Loading Projects...
                                </motion.p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Header Section with animation - FIXED AT TOP */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-8 z-20"
                >
                    <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-blue-500/10 shadow-xl p-6 relative overflow-hidden">
                        <div className="absolute inset-0 bg-mesh-gradient opacity-[0.03]"></div>
                        
                        {/* Animated Glow Effect */}
                        <motion.div 
                            className="absolute -inset-1 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl blur-xl"
                            animate={{ 
                                background: [
                                    "radial-gradient(circle, rgba(56,189,248,0.1) 0%, rgba(59,130,246,0.1) 50%, rgba(147,51,234,0.1) 100%)",
                                    "radial-gradient(circle, rgba(147,51,234,0.1) 0%, rgba(59,130,246,0.1) 50%, rgba(56,189,248,0.1) 100%)",
                                    "radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(147,51,234,0.1) 50%, rgba(56,189,248,0.1) 100%)"
                                ]
                            }}
                            transition={{ duration: 10, repeat: Infinity }}
                        ></motion.div>

                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center">
                            <div className="flex items-center gap-4 mb-4 md:mb-0">
                                {/* Logo animation */}
                                <div className="relative">
                                    <motion.div 
                                        className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-xl shadow-blue-500/20"
                                        whileHover={{ scale: 1.1 }}
                                        initial={{ rotate: -10 }}
                                        animate={{ rotate: 0 }}
                                        transition={{ type: "spring", stiffness: 200 }}
                                    >
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-0 rounded-xl border border-blue-400/30"
                                        />
                                        <FaCode className="text-white text-xl" />
                                    </motion.div>
                                </div>
                                
                                {/* Typewriter effect title */}
                                <div className="relative">
                                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 drop-shadow-lg">
                                        My Projects
                                    </h1>
                                    <motion.div
                                        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500"
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                    />
                                </div>
                            </div>

                            <p className="text-gray-300 text-center md:text-right">
                                <span className="text-blue-400">&#60;</span>
                                Explore my latest creations & development work
                                <span className="text-blue-400">&#47;&gt;</span>
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Search and Filter Section - REPOSITIONED WITH MORE SPACE */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mb-16 mt-16 relative"
                >
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-gray-900/70 to-black/70 backdrop-blur-lg border border-blue-500/10 shadow-xl relative overflow-hidden">
                        {/* Cyberpunk accent lines */}
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
                        <div className="absolute bottom-0 right-0 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                        
                        {/* Search section */}
                        <div className="relative w-full mb-6 max-w-md mx-auto">
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
                                        className="w-full pl-11 pr-10 py-3 bg-gray-900/80 backdrop-blur-sm border border-blue-500/30 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-200 focus:outline-none transition-all shadow-inner"
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery("")}
                                            className="absolute right-4 text-gray-400 hover:text-white transition-colors"
                                        >
                                            <FaTimes />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Kategori filter pills */}
                        <div className="flex flex-wrap justify-center gap-3 mb-2">
                            {/* "All" filter button */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleCategorySelect("All")}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                    selectedCategory === "All"
                                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/20 border border-cyan-400/30"
                                    : "bg-gray-900/60 text-gray-300 hover:bg-gray-800/80 border border-blue-500/20 hover:border-blue-500/40"
                                }`}
                            >
                                All
                            </motion.button>

                            {/* Category filter buttons */}
                            {allTags.map((tag) => (
                                <motion.button
                                    key={tag}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleCategorySelect(tag)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all                                         ${
                                        selectedCategory === tag
                                        ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/20 border border-cyan-400/30"
                                        : "bg-gray-900/60 text-gray-300 hover:bg-gray-800/80 border border-blue-500/20 hover:border-blue-500/40"
                                    }`}
                                >
                                    {tag}
                                </motion.button>
                            ))}
                        </div>

                        {/* Show active filter with clear button */}
                        {(selectedCategory !== "All" || searchQuery) && (
                            <div className="flex items-center justify-center mt-4">
                                <motion.button
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={clearAllFilters}
                                    className="px-4 py-1.5 bg-gray-800/80 text-gray-300 rounded-full border border-blue-500/20 hover:bg-gray-700 flex items-center gap-2 hover:text-white transition-colors text-xs"
                                >
                                    <FaTimes size={10} />
                                    <span>Clear Filters</span>
                                </motion.button>
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
                                <ProjectCard
                                    key={project.id || index}
                                    project={project}
                                    index={index}
                                    onClick={handleProjectClick}
                                />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-16 px-6 bg-gradient-to-br from-gray-900/70 to-black/80 backdrop-blur-lg rounded-2xl border border-blue-500/10 shadow-xl"
                        >
                            <div className="relative w-20 h-20 mx-auto mb-6">
                                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl"></div>
                                <div className="relative flex items-center justify-center h-full text-6xl">
                                    <span className="animate-bounce">🔍</span>
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-4">
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

            {/* CSS untuk background grid pattern dan animasi */}
            <style jsx global>{`
                .bg-grid-pattern {
                    background-image: linear-gradient(
                            rgba(56, 189, 248, 0.08) 1px,
                            transparent 1px
                        ),
                        linear-gradient(
                            90deg,
                            rgba(56, 189, 248, 0.08) 1px,
                            transparent 1px
                        );
                    background-size: 40px 40px;
                }

                @keyframes slow-pulse {
                    0%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.8;
                    }
                }

                .animate-slow-pulse {
                    animation: slow-pulse 8s ease-in-out infinite;
                }
                
                .bg-mesh-gradient {
                    background-image: 
                        radial-gradient(at 40% 20%, rgba(56, 189, 248, 0.1) 0px, transparent 50%),
                        radial-gradient(at 80% 0%, rgba(124, 58, 237, 0.1) 0px, transparent 50%),
                        radial-gradient(at 0% 50%, rgba(14, 165, 233, 0.1) 0px, transparent 50%),
                        radial-gradient(at 80% 50%, rgba(34, 211, 238, 0.1) 0px, transparent 50%),
                        radial-gradient(at 0% 100%, rgba(56, 189, 248, 0.1) 0px, transparent 50%),
                        radial-gradient(at 80% 100%, rgba(124, 58, 237, 0.1) 0px, transparent 50%);
                }
            `}</style>
        </div>
    );
}