// src/data/projectsData.js
import { technologies, getTechnology } from "./technologiesData";

const projects = [
    {
        id: "sijarta-app",
        title: "Sijarta App",
        description:
            "A web application for service bookings that I developed with my teammates as part of my Database course project.",
        imageUrls: [
            "/projects/sijarta1.jpg",
            "/projects/sijarta2.jpg",
            "/projects/sijarta3.jpg",
            "/projects/sijarta4.jpg",
            "/projects/sijarta5.jpg",
            "/projects/sijarta6.jpg",
            "/projects/sijarta7.jpg",
            "/projects/sijarta8.jpg",
        ],
        tags: ["Web", "Full Stack"],
        technologies: ["Django", "Tailwind CSS", "PostgreSQL"],
        featured: true,
        emoji: "🤝", // Handshake emoji representing service booking
        githubUrl: "https://github.com/MakarimZufar/BASDAT_SIJARTA",
        demoUrl: "https://sijarta-production.up.railway.app/",
    },
    {
        id: "my_portfolio",
        title: "My Portfolio Website",
        description:
            "Personal portfolio website built with Next.js and Tailwind CSS, showcasing projects and technical skills in an interactive way.",
        imageUrls: [
            "/projects/portfolio.jpg", 
            "/projects/portofolio2.jpg",
            "/projects/portofolio3.png",
        ],
        tags: ["Web", "Frontend", "UI"],
        technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "React"],
        featured: true,
        emoji: "👨‍💻", // Custom emoji for this project
        githubUrl: "https://github.com/MakarimZufar/my_portofolio",
        demoUrl: "https://makarimzufar.vercel.app",
    },
    {
        id: "roso-jogja",
        title: "Roso Jogja Web and Mobile",
        description:
            "RosoJogja is a culinary application specifically designed to help you find and order food or drinks from various restaurants in Yogyakarta. With an intuitive interface, RosoJogja makes it easy to search for restaurants, view menus, and order food or drinks.",
        imageUrls: [
            "https://www.youtube.com/watch?v=gvJ41rK6REs&ab_channel=AkhdanTaufiq",
        ],
        tags: ["Web", "Full Stack", "Mobile"],
        technologies: ["Tailwind CSS", "Django Rest Framework", "Flutter"],
        featured: true,
        emoji: "🍽️", // Food and dining emoji for culinary app
        githubUrl: "https://github.com/MakarimZufar/roso-jogja-mobile",
        demoUrl: "rosojogja.sijarta-ltb.site",
    },
];

// Function to get all projects
export const getAllProjects = () => projects;

// Function to get a specific project by ID
export const getProjectById = (id) =>
    projects.find((project) => project.id === id);

// Function to get featured projects
export const getFeaturedProjects = () =>
    projects.filter((project) => project.featured);

// Function to get all unique tags
export const getAllTags = () => {
    const allTags = projects.flatMap((project) => project.tags);
    return [...new Set(allTags)];
};

// Function to get all unique technologies from projects
export const getAllTechnologies = () => {
    const allTechnologies = projects.flatMap((project) => project.technologies);
    return [...new Set(allTechnologies)];
};

// Function to check if technology exists in technologiesData file
export const validateTechnology = (techName) => {
    return Boolean(getTechnology(techName));
};

// Function to get technology details for a project
export const getProjectTechnologies = (project) => {
    return project.technologies.map((techName) => getTechnology(techName));
};

// Default emoji mapping based on tag
export const tagEmojiMap = {
    Web: "💻",
    Frontend: "🎨",
    Backend: "⚙️",
    "Full Stack": "🚀",
    Mobile: "📱",
    UI: "🖌️",
    Game: "🎮",
    Data: "📊",
    AI: "🤖",
    IoT: "📟",
    DevOps: "🛠️",
};
