// src/data/techStackData.js
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

// Define all tech stacks with their icons, colors, and descriptions
export const techRows = [
    [
        {
            icon: <FaReact size={42} />,
            name: "React",
            color: "#61DAFB",
            bgColor: "#282C34",
            description: "Component-based UI library",
        },
        {
            icon: <SiJavascript size={42} />,
            name: "JavaScript",
            color: "#F7DF1E",
            bgColor: "#000000",
            description: "Web programming language",
        },
        {
            icon: <SiTypescript size={42} />,
            name: "TypeScript",
            color: "#3178C6",
            bgColor: "#1A1A1A",
            description: "Static typed JavaScript",
        },
        {
            icon: <SiTailwindcss size={42} />,
            name: "Tailwind",
            color: "#06B6D4",
            bgColor: "#0F172A",
            description: "Utility-first CSS framework",
        },
        {
            icon: <SiNextdotjs size={42} />,
            name: "Next.js",
            color: "#FFFFFF",
            bgColor: "#000000",
            description: "React framework",
        },
        {
            icon: <FaNodeJs size={42} />,
            name: "Node.js",
            color: "#339933",
            bgColor: "#1A1A1A",
            description: "JavaScript runtime",
        },
        {
            icon: <SiRedux size={42} />,
            name: "Redux",
            color: "#764ABC",
            bgColor: "#1A1A1A",
            description: "State management library",
        },
        {
            icon: <FaVuejs size={42} />,
            name: "Vue.js",
            color: "#4FC08D",
            bgColor: "#35495E",
            description: "Progressive JavaScript framework",
        },
    ],
    [
        {
            icon: <SiFirebase size={42} />,
            name: "Firebase",
            color: "#FFCA28",
            bgColor: "#1A1A1A",
            description: "Backend-as-a-Service",
        },
        {
            icon: <SiMongodb size={42} />,
            name: "MongoDB",
            color: "#47A248",
            bgColor: "#1A1A1A",
            description: "NoSQL database",
        },
        {
            icon: <FaDocker size={42} />,
            name: "Docker",
            color: "#2496ED",
            bgColor: "#0F172A",
            description: "Containerization platform",
        },
        {
            icon: <FaGitAlt size={42} />,
            name: "Git",
            color: "#F05032",
            bgColor: "#1A1A1A",
            description: "Version control system",
        },
        {
            icon: <FaAws size={42} />,
            name: "AWS",
            color: "#FF9900",
            bgColor: "#1A1A1A",
            description: "Cloud services provider",
        },
        {
            icon: <SiGraphql size={42} />,
            name: "GraphQL",
            color: "#E10098",
            bgColor: "#1A1A1A",
            description: "API query language",
        },
        {
            icon: <SiVercel size={42} />,
            name: "Vercel",
            color: "#FFFFFF",
            bgColor: "#000000",
            description: "Deployment platform",
        },
        {
            icon: <SiPostgresql size={42} />,
            name: "PostgreSQL",
            color: "#4169E1",
            bgColor: "#1A1A1A",
            description: "Relational database",
        },
    ],
];

export function getExperienceDescription(techName) {
    const descriptions = {
        React: "Experienced with building complex applications using React hooks, context API, and integrating with various state management libraries.",
        JavaScript:
            "Strong expertise in modern JavaScript (ES6+) with focus on performance optimization and clean code principles.",
        TypeScript:
            "Proficient in implementing type-safe code, interfaces and generics for scalable applications.",
        Tailwind:
            "Skilled in rapidly building responsive interfaces with utility-first approach and custom configurations.",
        "Next.js":
            "Experienced in server-side rendering, static site generation, and API routes with focus on performance optimization.",
        "Node.js":
            "Built RESTful APIs, microservices, and server-side applications with focus on scalability and maintainability.",
        Redux: "Implemented complex state management solutions for large-scale applications.",
        "Vue.js":
            "Created interactive UIs with Vue.js and its ecosystem including Vuex and Vue Router.",
        Firebase:
            "Developed applications with Firestore, Authentication, Cloud Functions, and Hosting.",
        MongoDB:
            "Designed document-based data models and integrated with Node.js applications.",
        Docker: "Containerized applications for consistent development, testing, and production environments.",
        Git: "Strong version control workflow with branch management, merging strategies, and collaboration.",
        AWS: "Deployed and managed applications using EC2, S3, Lambda, and other AWS services.",
        GraphQL:
            "Created efficient APIs with focus on performance and client-specific data requirements.",
        Vercel: "Deployed applications with continuous integration and preview deployments.",
        PostgreSQL:
            "Designed relational databases with focus on performance and data integrity.",
    };

    return (
        descriptions[techName] ||
        `Experience with ${techName} includes building modern, efficient applications with focus on performance and scalability.`
    );
}
