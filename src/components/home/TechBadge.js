// src/components/home/TechBadge.js
import React from "react";

export default function TechBadge({ name }) {
    const getBadgeColor = (tech) => {
        const colors = {
            React: "bg-blue-500/20 text-blue-300 border-blue-500/50",
            "Next.js": "bg-black/30 text-gray-300 border-gray-600/50",
            "Tailwind CSS": "bg-sky-500/20 text-sky-300 border-sky-500/50",
            JavaScript: "bg-yellow-500/20 text-yellow-300 border-yellow-500/50",
            TypeScript: "bg-blue-600/20 text-blue-300 border-blue-600/50",
            "Node.js": "bg-green-500/20 text-green-300 border-green-500/50",
            MongoDB: "bg-green-600/20 text-green-300 border-green-600/50",
            Express: "bg-gray-600/20 text-gray-300 border-gray-600/50",
            Firebase: "bg-yellow-600/20 text-yellow-300 border-yellow-600/50",
            Redux: "bg-purple-500/20 text-purple-300 border-purple-500/50",
            "Material UI": "bg-blue-400/20 text-blue-300 border-blue-400/50",
            HTML: "bg-orange-500/20 text-orange-300 border-orange-500/50",
            CSS: "bg-blue-500/20 text-blue-300 border-blue-500/50",
            "Framer Motion":
                "bg-purple-500/20 text-purple-300 border-purple-500/50",
            "NextAuth.js":
                "bg-indigo-500/20 text-indigo-300 border-indigo-500/50",
            "OpenWeather API":
                "bg-orange-400/20 text-orange-300 border-orange-400/50",
        };

        return (
            colors[tech] || "bg-gray-700/30 text-gray-300 border-gray-600/50"
        );
    };

    return (
        <span
            className={`text-xs inline-flex items-center px-2.5 py-0.5 rounded-full border ${getBadgeColor(
                name
            )}`}
        >
            {name}
        </span>
    );
}
