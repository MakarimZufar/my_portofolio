// src/app/projects/page.js
"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFilter, FaTimes, FaChevronDown, FaSearch, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { getAllProjects, getAllTags, getAllTechnologies } from "@/data/projectsData";
import Image from "next/image";

// Import data proyek dari projectsData.js
const allProjects = getAllProjects();

// Komponen Badge Teknologi
const TechBadge = ({ name, isSelected = false, onClick = null, selectable = false }) => {
    // Warna untuk badge berdasarkan teknologi
    const getBadgeColor = (techName) => {
        const colors = {
            React: "from-blue-500 to-cyan-500",
            "Next.js": "from-black to-gray-700",
            "Tailwind CSS": "from-cyan-500 to-blue-400",
            JavaScript: "from-yellow-400 to-yellow-500",
            "Node.js": "from-green-500 to-green-600",
            MongoDB: "from-green-600 to-green-700",
            Firebase: "from-yellow-500 to-orange-500",
            Redux: "from-purple-600 to-indigo-600",
            "Material UI": "from-blue-400 to-indigo-500",
            Express: "from-gray-600 to-gray-700",
            HTML: "from-orange-500 to-red-500",
            CSS: "from-blue-400 to-blue-500",
            "Framer Motion": "from-purple-500 to-pink-500",
            "OpenWeather API": "from-cyan-600 to-blue-600",
            "NextAuth.js": "from-indigo-500 to-purple-500",
        };

        return colors[techName] || "from-gray-500 to-gray-600";
    };

    const badgeClasses = `
        text-xs px-2 py-1 
        ${selectable ? 'cursor-pointer transform transition-transform hover:scale-105' : ''} 
        ${isSelected 
            ? `bg-gradient-to-r ${getBadgeColor(name)} text-white ring-2 ring-white/30 shadow-lg shadow-${getBadgeColor(name).split(' ')[0]}/20` 
            : 'bg-gray-800 text-gray-300'} 
        rounded-full font-medium
    `;

    return (
        <span
            className={badgeClasses}
            onClick={onClick}
        >
            {name}
            {isSelected && selectable && (
                <span className="ml-1 inline-block">&times;</span>
            )}
        </span>
    );
};

// Komponen Project Tag
const ProjectTag = ({ name, isSelected = false, onClick = null, selectable = false }) => {
    // Warna untuk tag berdasarkan kategori
    const getTagColor = (tagName) => {
        const colors = {
            Web: "bg-blue-600",
            Mobile: "bg-green-600",
            "Full Stack": "bg-purple-600",
            Frontend: "bg-cyan-600",
            Backend: "bg-amber-600",
            UI: "bg-pink-600",
        };

        return colors[tagName] || "bg-gray-600";
    };

    const tagClasses = `
        text-xs px-2 py-1
        ${selectable ? 'cursor-pointer transform transition-transform hover:scale-105' : ''} 
        ${isSelected 
            ? `${getTagColor(name)} text-white ring-2 ring-white/30` 
            : 'bg-gray-800 text-gray-300'} 
        rounded-md font-medium
    `;

    return (
        <span
            className={tagClasses}
            onClick={onClick}
        >
            {name}
            {isSelected && selectable && (
                <span className="ml-1 inline-block">&times;</span>
            )}
        </span>
    );
};

// Komponen Project Card
const ProjectCard = ({ project }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl overflow-hidden shadow-lg group hover:shadow-cyan-500/10 transition-all duration-300 border border-gray-800 h-full"
        >
                            {/* Project Image */}
            <div className="h-48 relative overflow-hidden">
                {/* Placeholder image atau image dari project */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-blue-500/20 z-0"></div>
                {project.imageUrl ? (
                    <div className="h-full w-full relative">
                        <Image 
                            src={project.imageUrl} 
                            alt={project.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-4xl">
                        {/* Placeholder emoji berdasarkan jenis proyek */}
                        {project.tags.includes("Web") && "🌐"}
                        {project.tags.includes("Mobile") && "📱"}
                        {!project.tags.includes("Web") && !project.tags.includes("Mobile") && "💻"}
                    </div>
                )}
                
                {/* Tags positioned at the top */}
                <div className="absolute top-2 left-2 flex flex-wrap gap-1 z-10">
                    {project.tags.map(tag => (
                        <ProjectTag key={tag} name={tag} />
                    ))}
                </div>
                
                {/* Featured badge if applicable */}
                {project.featured && (
                    <div className="absolute top-2 right-2 z-10">
                        <motion.div
                            animate={{ 
                                scale: [1, 1.1, 1],
                                rotate: [0, 2, 0, -2, 0]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs px-2 py-1 rounded-full font-semibold"
                        >
                            Unggulan
                        </motion.div>
                    </div>
                )}
            </div>
            
            {/* Project Content */}
            <div className="p-5 h-56 flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                        {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                        {project.description}
                    </p>
                </div>
                
                {/* Technologies */}
                <div>
                    <div className="text-xs text-gray-500 mb-2">Teknologi:</div>
                    <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 4).map(tech => (
                            <TechBadge key={tech} name={tech} />
                        ))}
                        {project.technologies.length > 4 && (
                            <span className="text-xs px-2 py-1 bg-gray-800 text-gray-400 rounded-full">
                                +{project.technologies.length - 4}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-between items-center p-5 border-t border-gray-800">
                <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white flex items-center gap-1.5 text-sm transition-colors"
                >
                    <FaGithub /> GitHub
                </a>
                <a 
                    href={project.demoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors"
                >
                    <FaExternalLinkAlt /> Demo
                </a>
            </div>
            
            {/* Hover Effect - glowing border */}
            <div className="absolute inset-0 rounded-xl p-0.5 bg-gradient-to-r from-cyan-500 via-transparent to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </motion.div>
    );
};

// Filter Dropdown Component
const FilterDropdown = ({ title, options, selectedValues, onSelect, onClear }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
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
                        ? "bg-cyan-600 border-cyan-500 text-white"
                        : "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                }`}
            >
                <span>{title}</span>
                {selectedValues.length > 0 && (
                    <span className="bg-white/20 text-white text-xs px-1.5 rounded-full">
                        {selectedValues.length}
                    </span>
                )}
                <FaChevronDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
            
            {/* Selected values display */}
            {selectedValues.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2 max-w-md">
                    {selectedValues.map(value => (
                        <motion.span
                            key={value}
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            className="text-xs flex items-center gap-1 px-2 py-1 rounded-full bg-cyan-600/50 text-white"
                        >
                            {value}
                            <button
                                onClick={() => onSelect(value)}
                                className="hover:text-cyan-300"
                            >
                                <FaTimes size={10} />
                            </button>
                        </motion.span>
                    ))}
                    
                    <button
                        onClick={onClear}
                        className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600"
                    >
                        Hapus Semua
                    </button>
                </div>
            )}
            
            {/* Dropdown content */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-30 mt-2 w-56 max-h-60 overflow-y-auto bg-gray-900 border border-gray-700 rounded-lg shadow-xl"
                    >
                        <div className="p-2 flex flex-wrap gap-1.5">
                            {options.map(option => (
                                <span
                                    key={option}
                                    onClick={() => handleSelect(option)}
                                    className={`text-xs px-2 py-1 rounded-full cursor-pointer ${
                                        selectedValues.includes(option)
                                            ? "bg-cyan-600 text-white"
                                            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                    }`}
                                >
                                    {option}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function ProjectsPage() {
    // Mendapatkan semua tag dan teknologi
    const allTags = getAllTags();
    const allTechnologies = getAllTechnologies();
    
    // State untuk filter dan pencarian
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedTechs, setSelectedTechs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFilterExpanded, setIsFilterExpanded] = useState(false);
    const [filteredProjects, setFilteredProjects] = useState(allProjects);
    
    // Filter proyek berdasarkan kriteria yang dipilih
    useEffect(() => {
        let filtered = allProjects;
        
        // Filter berdasarkan tag
        if (selectedTags.length > 0) {
            filtered = filtered.filter(project => 
                selectedTags.every(tag => project.tags.includes(tag))
            );
        }
        
        // Filter berdasarkan teknologi
        if (selectedTechs.length > 0) {
            filtered = filtered.filter(project => 
                selectedTechs.every(tech => project.technologies.includes(tech))
            );
        }
        
        // Filter berdasarkan pencarian
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(project => 
                project.title.toLowerCase().includes(query) || 
                project.description.toLowerCase().includes(query) || 
                project.technologies.some(tech => tech.toLowerCase().includes(query)) ||
                project.tags.some(tag => tag.toLowerCase().includes(query))
            );
        }
        
        setFilteredProjects(filtered);
    }, [selectedTags, selectedTechs, searchQuery]);
    
    // Toggle tag selection
    const toggleTag = (tag) => {
        setSelectedTags(prev => 
            prev.includes(tag) ? 
                prev.filter(t => t !== tag) : 
                [...prev, tag]
        );
    };
    
    // Toggle technology selection
    const toggleTech = (tech) => {
        setSelectedTechs(prev => 
            prev.includes(tech) ? 
                prev.filter(t => t !== tech) : 
                [...prev, tech]
        );
    };
    
    // Clear all filters
    const clearAllFilters = () => {
        setSelectedTags([]);
        setSelectedTechs([]);
        setSearchQuery('');
    };
    
    // Referensi untuk container filter untuk animasi
    const filterContainerRef = useRef(null);
    
    return (
        <main className="min-h-screen py-16 px-4 md:px-10 lg:px-20 bg-gradient-to-b from-gray-900 to-black">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl font-bold mb-4 text-cyan-400"
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
                        Kumpulan proyek yang telah saya kerjakan, mencakup berbagai teknologi dan
                        solusi inovatif untuk berbagai kebutuhan.
                    </motion.p>
                </div>
                
                {/* Search and Filter Section */}
                <div className="mb-10">
                    <div className="flex flex-col lg:flex-row justify-between gap-4 items-start lg:items-center mb-6">
                        {/* Pencarian */}
                        <div className="relative w-full lg:w-1/3">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari proyek..."
                                className="w-full px-10 py-2 bg-gray-900 border border-gray-700 rounded-full focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-300 focus:outline-none"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                                >
                                    <FaTimes />
                                </button>
                            )}
                        </div>
                        
                        {/* Filter Button (Mobile) */}
                        <button
                            onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                            className="lg:hidden px-4 py-2 bg-gray-800 rounded-full flex items-center gap-2 text-gray-300 border border-gray-700"
                        >
                            <FaFilter />
                            <span>Filter</span>
                            {(selectedTags.length > 0 || selectedTechs.length > 0) && (
                                <span className="bg-cyan-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                                    {selectedTags.length + selectedTechs.length}
                                </span>
                            )}
                        </button>
                        
                        {/* Desktop Filters */}
                        <div className="hidden lg:flex gap-3">
                            <FilterDropdown 
                                title="Kategori"
                                options={allTags}
                                selectedValues={selectedTags}
                                onSelect={toggleTag}
                                onClear={() => setSelectedTags([])}
                            />
                            
                            <FilterDropdown 
                                title="Teknologi"
                                options={allTechnologies}
                                selectedValues={selectedTechs}
                                onSelect={toggleTech}
                                onClear={() => setSelectedTechs([])}
                            />
                            
                            {(selectedTags.length > 0 || selectedTechs.length > 0) && (
                                <button
                                    onClick={clearAllFilters}
                                    className="px-4 py-2 text-sm bg-gray-800 text-gray-300 rounded-full border border-gray-700 hover:bg-gray-700"
                                >
                                    Hapus Semua Filter
                                </button>
                            )}
                        </div>
                    </div>
                    
                    {/* Mobile Filters - Expandable */}
                    <AnimatePresence>
                        {isFilterExpanded && (
                            <motion.div
                                ref={filterContainerRef}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="lg:hidden overflow-hidden"
                            >
                                <div className="p-4 bg-gray-900 rounded-xl border border-gray-800 mb-4">
                                    <div className="mb-4">
                                        <h3 className="text-sm font-semibold text-gray-300 mb-2">Kategori:</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {allTags.map(tag => (
                                                <span
                                                    key={tag}
                                                    onClick={() => toggleTag(tag)}
                                                    className={`text-xs px-2 py-1 rounded-full cursor-pointer ${
                                                        selectedTags.includes(tag)
                                                            ? "bg-cyan-600 text-white"
                                                            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                                    }`}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className="mb-4">
                                        <h3 className="text-sm font-semibold text-gray-300 mb-2">Teknologi:</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {allTechnologies.map(tech => (
                                                <span
                                                    key={tech}
                                                    onClick={() => toggleTech(tech)}
                                                    className={`text-xs px-2 py-1 rounded-full cursor-pointer ${
                                                        selectedTechs.includes(tech)
                                                            ? "bg-cyan-600 text-white"
                                                            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                                    }`}
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {(selectedTags.length > 0 || selectedTechs.length > 0) && (
                                        <button
                                            onClick={clearAllFilters}
                                            className="w-full px-4 py-2 bg-gray-800 text-gray-300 rounded-full hover:bg-gray-700"
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
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="text-sm text-gray-400">Filter Aktif:</span>
                            {selectedTags.map(tag => (
                                <motion.span
                                    key={tag}
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    className="text-xs flex items-center gap-1 px-2 py-1 rounded-full bg-cyan-600/50 text-white"
                                >
                                    {tag}
                                    <button
                                        onClick={() => toggleTag(tag)}
                                        className="hover:text-cyan-300"
                                    >
                                        <FaTimes size={10} />
                                    </button>
                                </motion.span>
                            ))}
                            
                            {selectedTechs.map(tech => (
                                <motion.span
                                    key={tech}
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    className="text-xs flex items-center gap-1 px-2 py-1 rounded-full bg-blue-600/50 text-white"
                                >
                                    {tech}
                                    <button
                                        onClick={() => toggleTech(tech)}
                                        className="hover:text-blue-300"
                                    >
                                        <FaTimes size={10} />
                                    </button>
                                </motion.span>
                            ))}
                        </div>
                    )}
                </div>
                
                {/* Project Grid with Animation */}
                <AnimatePresence>
                    {filteredProjects.length > 0 ? (
                        <motion.div 
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredProjects.map(project => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center py-10"
                        >
                            <div className="text-5xl mb-4">😕</div>
                            <h3 className="text-xl font-bold text-gray-300 mb-2">Tidak Ada Proyek yang Ditemukan</h3>
                            <p className="text-gray-400">
                                Tidak ada proyek yang cocok dengan filter yang Anda pilih.
                            </p>
                            <button
                                onClick={clearAllFilters}
                                className="mt-4 px-4 py-2 bg-cyan-600 text-white rounded-full hover:bg-cyan-500 transition-colors"
                            >
                                Hapus Semua Filter
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}