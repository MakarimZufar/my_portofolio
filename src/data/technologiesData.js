// src/data/technologiesData.js
import React from "react";
import {
    FaReact,
    FaNodeJs,
    FaVuejs,
    FaPython,
    FaDocker,
    FaGitAlt,
    FaAws,
    FaJava,
    FaFigma,
} from "react-icons/fa";
import {
    SiJavascript,
    SiTypescript,
    SiTailwindcss,
    SiNextdotjs,
    SiMongodb,
    SiFirebase,
    SiPostgresql,
    SiDjango,
    SiRedux,
    SiGraphql,
    SiVercel,
} from "react-icons/si";
import { TbBrandCpp, TbBrandGolang } from "react-icons/tb";

// Definisi lengkap semua teknologi dengan properti yang konsisten
export const technologies = {
    React: {
        icon: <FaReact size={42} />,
        name: "React",
        color: "#61DAFB",
        bgColor: "#282C34",
        description: "Component-based UI library",
        category: ["Frontend", "UI"],
        emoji: "⚛️",
        experience: "Experienced with building complex applications using React hooks, context API, and integrating with various state management libraries."
    },
    JavaScript: {
        icon: <SiJavascript size={42} />,
        name: "JavaScript",
        color: "#F7DF1E",
        bgColor: "#000000",
        description: "Web programming language",
        category: ["Frontend", "Backend"],
        emoji: "JS",
        experience: "Strong expertise in modern JavaScript (ES6+) with focus on performance optimization and clean code principles."
    },
    TypeScript: {
        icon: <SiTypescript size={42} />,
        name: "TypeScript",
        color: "#3178C6",
        bgColor: "#1A1A1A",
        description: "Static typed JavaScript",
        category: ["Frontend", "Backend"],
        emoji: "TS",
        experience: "Proficient in implementing type-safe code, interfaces and generics for scalable applications."
    },
    Tailwind: {
        icon: <SiTailwindcss size={42} />,
        name: "Tailwind",
        color: "#06B6D4",
        bgColor: "#0F172A",
        description: "Utility-first CSS framework",
        category: ["Frontend", "UI"],
        emoji: "🌊",
        experience: "Skilled in rapidly building responsive interfaces with utility-first approach and custom configurations."
    },
    "Next.js": {
        icon: <SiNextdotjs size={42} />,
        name: "Next.js",
        color: "#FFFFFF",
        bgColor: "#000000",
        description: "React framework",
        category: ["Frontend", "Full Stack"],
        emoji: "▲",
        experience: "Experienced in server-side rendering, static site generation, and API routes with focus on performance optimization."
    },
    "Node.js": {
        icon: <FaNodeJs size={42} />,
        name: "Node.js",
        color: "#339933",
        bgColor: "#1A1A1A",
        description: "JavaScript runtime",
        category: ["Backend"],
        emoji: "🟢",
        experience: "Built RESTful APIs, microservices, and server-side applications with focus on scalability and maintainability."
    },
    Redux: {
        icon: <SiRedux size={42} />,
        name: "Redux",
        color: "#764ABC",
        bgColor: "#1A1A1A",
        description: "State management library",
        category: ["Frontend"],
        emoji: "↺",
        experience: "Implemented complex state management solutions for large-scale applications."
    },
    "Vue.js": {
        icon: <FaVuejs size={42} />,
        name: "Vue.js",
        color: "#4FC08D",
        bgColor: "#35495E",
        description: "Progressive JavaScript framework",
        category: ["Frontend", "UI"],
        emoji: "🟩",
        experience: "Created interactive UIs with Vue.js and its ecosystem including Vuex and Vue Router."
    },
    Firebase: {
        icon: <SiFirebase size={42} />,
        name: "Firebase",
        color: "#FFCA28",
        bgColor: "#1A1A1A",
        description: "Backend-as-a-Service",
        category: ["Backend", "Database"],
        emoji: "🔥",
        experience: "Developed applications with Firestore, Authentication, Cloud Functions, and Hosting."
    },
    MongoDB: {
        icon: <SiMongodb size={42} />,
        name: "MongoDB",
        color: "#47A248",
        bgColor: "#1A1A1A",
        description: "NoSQL database",
        category: ["Backend", "Database"],
        emoji: "🍃",
        experience: "Designed document-based data models and integrated with Node.js applications."
    },
    Docker: {
        icon: <FaDocker size={42} />,
        name: "Docker",
        color: "#2496ED",
        bgColor: "#0F172A",
        description: "Containerization platform",
        category: ["DevOps"],
        emoji: "🐳",
        experience: "Containerized applications for consistent development, testing, and production environments."
    },
    Git: {
        icon: <FaGitAlt size={42} />,
        name: "Git",
        color: "#F05032",
        bgColor: "#1A1A1A",
        description: "Version control system",
        category: ["DevOps", "Tools"],
        emoji: "📊",
        experience: "Strong version control workflow with branch management, merging strategies, and collaboration."
    },
    AWS: {
        icon: <FaAws size={42} />,
        name: "AWS",
        color: "#FF9900",
        bgColor: "#1A1A1A",
        description: "Cloud services provider",
        category: ["DevOps", "Cloud"],
        emoji: "☁️",
        experience: "Deployed and managed applications using EC2, S3, Lambda, and other AWS services."
    },
    GraphQL: {
        icon: <SiGraphql size={42} />,
        name: "GraphQL",
        color: "#E10098",
        bgColor: "#1A1A1A",
        description: "API query language",
        category: ["Backend", "API"],
        emoji: "🔄",
        experience: "Created efficient APIs with focus on performance and client-specific data requirements."
    },
    Vercel: {
        icon: <SiVercel size={42} />,
        name: "Vercel",
        color: "#FFFFFF",
        bgColor: "#000000",
        description: "Deployment platform",
        category: ["DevOps", "Cloud"],
        emoji: "▲",
        experience: "Deployed applications with continuous integration and preview deployments."
    },
    PostgreSQL: {
        icon: <SiPostgresql size={42} />,
        name: "PostgreSQL",
        color: "#4169E1",
        bgColor: "#1A1A1A",
        description: "Relational database",
        category: ["Backend", "Database"],
        emoji: "🐘",
        experience: "Designed relational databases with focus on performance and data integrity."
    },
};

// Helper untuk mendapatkan data teknologi berdasarkan nama
export const getTechnology = (techName) => {
    return technologies[techName] || {
        name: techName,
        color: "#9CA3AF",
        bgColor: "#1F2937",
        description: "Technology",
        category: ["Other"],
        emoji: "🔧",
        experience: `Experience with ${techName} includes building modern, efficient applications with focus on performance and scalability.`
    };
};

// Format data untuk TechStack carousel
export const techRows = [
    [
        technologies.React,
        technologies.JavaScript,
        technologies.TypeScript,
        technologies.Tailwind,
        technologies["Next.js"],
        technologies["Node.js"],
        technologies.Redux,
        technologies["Vue.js"],
    ],
    [
        technologies.Firebase,
        technologies.MongoDB,
        technologies.Docker,
        technologies.Git,
        technologies.AWS,
        technologies.GraphQL,
        technologies.Vercel,
        technologies.PostgreSQL,
    ],
];

// Mendapatkan semua teknologi berdasarkan kategori
export const getTechnologiesByCategory = (category) => {
    return Object.values(technologies).filter(tech => 
        tech.category.includes(category)
    );
};

// Mendapatkan semua kategori teknologi unik
export const getAllCategories = () => {
    const categories = Object.values(technologies).flatMap(tech => tech.category);
    return [...new Set(categories)];
};

// Fungsi untuk mendapatkan deskripsi pengalaman berdasarkan nama teknologi
export function getExperienceDescription(techName) {
    const tech = technologies[techName];
    return tech ? tech.experience : `Experience with ${techName} includes building modern, efficient applications with focus on performance and scalability.`;
}

// Fungsi untuk mendapatkan warna badge berdasarkan teknologi
export const getBadgeColor = (techName) => {
    const tech = technologies[techName];
    if (tech && tech.color) {
        // Ekstrak warna untuk gradient
        const baseColor = tech.color.replace('#', '');
        // Buat variasi untuk gradient (slightly darker)
        return `from-[${tech.color}] to-[${tech.color}]/80`;
    }
    return "from-gray-500 to-gray-600"; // Default fallback
};

// Fungsi untuk mendapatkan icon berdasarkan teknologi
export const getTechIcon = (techName) => {
    const tech = technologies[techName];
    return tech ? tech.emoji : "";
};
