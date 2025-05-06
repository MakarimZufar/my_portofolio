// components/TechBadge.js
"use client";
import { motion } from "framer-motion";
import { getBadgeColor, getTechIcon } from "@/data/technologiesData";

export default function TechBadge({
    name,
    small = false,
    isSelected = false,
    onClick = null,
    selectable = false,
    showIcon = true,
}) {
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
