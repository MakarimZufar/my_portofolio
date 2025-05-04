// components/ProjectTag.js
"use client";
import { motion } from "framer-motion";

export default function ProjectTag({
    name,
    isSelected = false,
    onClick = null,
    selectable = false,
    size = "default", // "small", "default", "large"
}) {
    // Warna untuk tag berdasarkan kategori
    const getTagColor = (tagName) => {
        const colors = {
            Web: "bg-blue-600",
            Mobile: "bg-green-600",
            "Full Stack": "bg-purple-600",
            Frontend: "bg-cyan-600",
            Backend: "bg-amber-600",
            UI: "bg-pink-600",
            Design: "bg-indigo-600",
            Game: "bg-red-600",
            IoT: "bg-emerald-600",
            API: "bg-fuchsia-600",
            AI: "bg-violet-600",
        };

        return colors[tagName] || "bg-gray-600";
    };

    // Icon untuk kategori
    const getTagIcon = (tagName) => {
        const icons = {
            Web: "🌐",
            Mobile: "📱",
            "Full Stack": "⚙️",
            Frontend: "💻",
            Backend: "🖥️",
            UI: "🎨",
            Design: "✏️",
            Game: "🎮",
            IoT: "📡",
            API: "🔌",
            AI: "🧠",
        };

        return icons[tagName] || "";
    };

    // Size class berdasarkan ukuran yang diminta
    const getSizeClass = (size) => {
        const sizes = {
            small: "text-[0.6rem] px-1.5 py-0.5",
            default: "text-xs px-2 py-1",
            large: "text-sm px-3 py-1.5",
        };

        return sizes[size] || sizes.default;
    };

    const tagClasses = `
        ${getSizeClass(size)}
        ${selectable ? "cursor-pointer" : ""}
        ${
            isSelected
                ? `${getTagColor(name)} text-white ring-1 ring-white/30`
                : `bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700/50`
        } 
        rounded-md font-medium inline-flex items-center gap-1
    `;

    return (
        <motion.span
            className={tagClasses}
            onClick={onClick}
            whileHover={selectable ? { scale: 1.05 } : {}}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
        >
            <span>{getTagIcon(name)}</span>
            <span>{name}</span>
            {isSelected && selectable && (
                <span className="ml-1 inline-block">&times;</span>
            )}
        </motion.span>
    );
}
