// src/components/TechBadge.js
"use client";
import React from "react";
import {
    SiReact,
    SiJavascript,
    SiTypescript,
    SiNextdotjs,
    SiTailwindcss,
    SiGit,
    SiFigma,
    SiPython,
    SiNodedotjs,
    SiMongodb,
    SiGithub,
    SiFirebase,
    SiUbuntu,
    SiVuedotjs,
    SiRedux,
    SiHtml5,
    SiCss3,
    SiPostgresql,
    SiDocker,
    SiKubernetes,
    SiAmazon,
    SiSelenium,
    SiLinux,
} from "react-icons/si";

// Pemetaan warna untuk setiap teknologi
const colorMap = {
    React: "text-blue-400",
    Tailwind: "text-cyan-400",
    "Node.js": "text-green-400",
    Firebase: "text-yellow-400",
    PostgreSQL: "text-blue-600",
    Git: "text-orange-500",
    Figma: "text-pink-400",
    JavaScript: "text-yellow-400",
    TypeScript: "text-blue-500",
    NextJS: "text-white",
    Python: "text-blue-400",
    MongoDB: "text-green-500",
    Docker: "text-blue-300",
    GitHub: "text-gray-300",
    Ubuntu: "text-orange-500",
    AWS: "text-yellow-500",
    Selenium: "text-green-500",
    Linux: "text-yellow-400",
    HTML5: "text-orange-500",
    CSS3: "text-blue-500",
    Redux: "text-purple-500",
    Kubernetes: "text-blue-400",
};

// Pemetaan ikon untuk setiap teknologi
const iconMap = {
    React: <SiReact />,
    Tailwind: <SiTailwindcss />,
    "Node.js": <SiNodedotjs />,
    Firebase: <SiFirebase />,
    PostgreSQL: <SiPostgresql />,
    Git: <SiGit />,
    Figma: <SiFigma />,
    JavaScript: <SiJavascript />,
    TypeScript: <SiTypescript />,
    NextJS: <SiNextdotjs />,
    Python: <SiPython />,
    MongoDB: <SiMongodb />,
    Docker: <SiDocker />,
    GitHub: <SiGithub />,
    Ubuntu: <SiUbuntu />,
    AWS: <SiAmazon />,
    Selenium: <SiSelenium />,
    Linux: <SiLinux />,
    HTML5: <SiHtml5 />,
    CSS3: <SiCss3 />,
    Redux: <SiRedux />,
    Kubernetes: <SiKubernetes />,
};

export default function TechBadge({ name, showIcon = true }) {
    const color = colorMap[name] || "text-white";
    const icon = iconMap[name];

    return (
        <span
            className={`text-xs bg-black/30 ${color} rounded-full px-2 py-1 flex items-center gap-1`}
        >
            {showIcon && icon && <span className="text-sm">{icon}</span>}
            {name}
        </span>
    );
}
