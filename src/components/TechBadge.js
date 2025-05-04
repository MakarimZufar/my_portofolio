// components/TechBadge.js
"use client";
import { motion } from "framer-motion";

export default function TechBadge({
    name,
    small = false,
    isSelected = false,
    onClick = null,
    selectable = false,
    showIcon = true,
}) {
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
            TypeScript: "from-blue-600 to-blue-700",
            "NextAuth.js": "from-indigo-500 to-purple-500",
            "OpenWeather API": "from-cyan-600 to-blue-600",
        };

        return colors[techName] || "from-gray-500 to-gray-600";
    };

    // Icon untuk badge
    const getTechIcon = (techName) => {
        const icons = {
            React: "⚛️",
            "Next.js": "▲",
            "Tailwind CSS": "🌊",
            JavaScript: "JS",
            TypeScript: "TS",
            "Node.js": "🟢",
            MongoDB: "🍃",
            Firebase: "🔥",
            Redux: "↺",
            "Material UI": "UI",
            Express: "🚂",
            HTML: "🌐",
            CSS: "🎨",
            "Framer Motion": "🔄",
            "NextAuth.js": "🔒",
            "OpenWeather API": "☁️",
        };

        return icons[techName] || "";
    };

    const badgeClasses = `
        ${small ? "text-[0.6rem] px-2 py-0.5" : "text-xs px-2.5 py-1"} 
        ${
            selectable
                ? "cursor-pointer transform transition-transform hover:scale-105"
                : ""
        } 
        ${
            isSelected
                ? `bg-gradient-to-r ${getBadgeColor(
                      name
                  )} text-white ring-2 ring-white/30 shadow-lg shadow-${
                      getBadgeColor(name).split(" ")[0]
                  }/20`
                : `bg-gray-800 text-gray-300 border border-gray-700/50 ${
                      selectable ? "hover:bg-gray-700" : ""
                  }`
        } 
        rounded-full font-medium shadow-sm flex items-center justify-center
        ${selectable ? "cursor-pointer" : ""}
    `;

    return (
        <motion.span
            className={badgeClasses}
            onClick={onClick}
            whileHover={selectable ? { scale: 1.05 } : {}}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
        >
            {showIcon && getTechIcon(name) && (
                <span className="mr-1 text-xs">{getTechIcon(name)}</span>
            )}
            <span>{name}</span>
            {isSelected && selectable && (
                <span className="ml-1 inline-block">&times;</span>
            )}
        </motion.span>
    );
}
