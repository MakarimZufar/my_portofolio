import React from "react";
import {
    FaReact,
    FaNodeJs,
    FaHtml5,
    FaCss3Alt,
    FaFigma,
    FaGitAlt,
    FaAws,
    FaDocker,
    FaDatabase,
    FaJs,
    FaCode,
    FaFire,
    FaServer,
} from "react-icons/fa";

// Konfigurasi warna dan ikon untuk setiap teknologi
const techConfig = {
    React: {
        bg: "bg-gradient-to-r from-cyan-900/50 to-cyan-700/30",
        text: "text-cyan-300",
        border: "border-cyan-500/40",
        icon: FaReact,
        iconColor: "text-cyan-400",
    },
    "Next.js": {
        bg: "bg-gradient-to-r from-gray-900/50 to-gray-800/30",
        text: "text-white",
        border: "border-white/30",
        icon: FaReact, // Menggunakan ikon React sebagai pengganti untuk Next.js
        iconColor: "text-white",
    },
    TypeScript: {
        bg: "bg-gradient-to-r from-blue-900/50 to-blue-700/30",
        text: "text-blue-300",
        border: "border-blue-500/40",
        icon: FaCode,
        iconColor: "text-blue-400",
    },
    JavaScript: {
        bg: "bg-gradient-to-r from-yellow-900/50 to-yellow-700/30",
        text: "text-yellow-300",
        border: "border-yellow-500/40",
        icon: FaJs,
        iconColor: "text-yellow-400",
    },
    "Node.js": {
        bg: "bg-gradient-to-r from-green-900/50 to-green-700/30",
        text: "text-green-300",
        border: "border-green-500/40",
        icon: FaNodeJs,
        iconColor: "text-green-400",
    },
    Express: {
        bg: "bg-gradient-to-r from-gray-900/50 to-gray-700/30",
        text: "text-gray-300",
        border: "border-gray-500/40",
        icon: FaServer,
        iconColor: "text-gray-400",
    },
    MongoDB: {
        bg: "bg-gradient-to-r from-green-900/50 to-green-700/30",
        text: "text-green-300",
        border: "border-green-500/40",
        icon: FaDatabase,
        iconColor: "text-green-400",
    },
    Firebase: {
        bg: "bg-gradient-to-r from-yellow-900/50 to-amber-700/30",
        text: "text-yellow-300",
        border: "border-yellow-500/40",
        icon: FaFire,
        iconColor: "text-yellow-400",
    },
    "Tailwind CSS": {
        bg: "bg-gradient-to-r from-cyan-900/50 to-blue-700/30",
        text: "text-cyan-300",
        border: "border-cyan-500/40",
        icon: FaCss3Alt,
        iconColor: "text-cyan-400",
    },
    HTML: {
        bg: "bg-gradient-to-r from-orange-900/50 to-orange-700/30",
        text: "text-orange-300",
        border: "border-orange-500/40",
        icon: FaHtml5,
        iconColor: "text-orange-400",
    },
    CSS: {
        bg: "bg-gradient-to-r from-blue-900/50 to-blue-700/30",
        text: "text-blue-300",
        border: "border-blue-500/40",
        icon: FaCss3Alt,
        iconColor: "text-blue-400",
    },
    "Material UI": {
        bg: "bg-gradient-to-r from-blue-900/50 to-indigo-700/30",
        text: "text-blue-300",
        border: "border-blue-500/40",
        icon: FaReact, // Menggunakan ikon React sebagai alternatif
        iconColor: "text-blue-400",
    },
    Redux: {
        bg: "bg-gradient-to-r from-purple-900/50 to-purple-700/30",
        text: "text-purple-300",
        border: "border-purple-500/40",
        icon: FaCode,
        iconColor: "text-purple-400",
    },
    PostgreSQL: {
        bg: "bg-gradient-to-r from-blue-900/50 to-cyan-700/30",
        text: "text-blue-300",
        border: "border-blue-500/40",
        icon: FaDatabase,
        iconColor: "text-blue-400",
    },
    GraphQL: {
        bg: "bg-gradient-to-r from-pink-900/50 to-pink-700/30",
        text: "text-pink-300",
        border: "border-pink-500/40",
        icon: FaCode,
        iconColor: "text-pink-400",
    },
    "Framer Motion": {
        bg: "bg-gradient-to-r from-purple-900/50 to-fuchsia-700/30",
        text: "text-purple-300",
        border: "border-purple-500/40",
        icon: FaCode,
        iconColor: "text-purple-400",
    },
    SASS: {
        bg: "bg-gradient-to-r from-pink-900/50 to-pink-700/30",
        text: "text-pink-300",
        border: "border-pink-500/40",
        icon: FaCss3Alt,
        iconColor: "text-pink-400",
    },
    Docker: {
        bg: "bg-gradient-to-r from-blue-900/50 to-cyan-700/30",
        text: "text-blue-300",
        border: "border-blue-500/40",
        icon: FaDocker,
        iconColor: "text-blue-400",
    },
    AWS: {
        bg: "bg-gradient-to-r from-yellow-900/50 to-orange-700/30",
        text: "text-yellow-300",
        border: "border-yellow-500/40",
        icon: FaAws,
        iconColor: "text-yellow-400",
    },
    Figma: {
        bg: "bg-gradient-to-r from-purple-900/50 to-pink-700/30",
        text: "text-purple-300",
        border: "border-purple-500/40",
        icon: FaFigma,
        iconColor: "text-purple-400",
    },
    Git: {
        bg: "bg-gradient-to-r from-orange-900/50 to-red-700/30",
        text: "text-orange-300",
        border: "border-orange-500/40",
        icon: FaGitAlt,
        iconColor: "text-orange-400",
    },
};

const getBadgeConfig = (tech) => {
    return (
        techConfig[tech] || {
            bg: "bg-gradient-to-r from-gray-800/50 to-gray-700/30",
            text: "text-gray-300",
            border: "border-gray-600/40",
            icon: FaCode,
            iconColor: "text-gray-400",
        }
    );
};

export default function TechBadge({ name, small = false }) {
    const { bg, text, border, icon: Icon, iconColor } = getBadgeConfig(name);

    return (
        <span
            className={`
        ${bg} ${text} ${border}
        ${small ? "text-[0.65rem] px-2 py-0.5" : "text-xs px-2.5 py-1"} 
        rounded-full border inline-flex items-center justify-center
        font-medium hover:scale-105 transition-transform duration-300
        shadow-sm hover:shadow-md backdrop-blur-sm
      `}
        >
            {Icon && (
                <span
                    className={`mr-1 ${iconColor} ${
                        small ? "text-xs" : "text-sm"
                    }`}
                >
                    <Icon />
                </span>
            )}
            {name}
        </span>
    );
}
