// src/data/projectsData.js

const projects = [
    {
        id: "project1",
        title: "Portfolio Website",
        description:
            "Personal portfolio website built with Next.js and Tailwind CSS. Features dynamic content and smooth animations.",
        technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
        imageUrl: "/projects/portfolio.png",
        demoUrl: "https://makarimzufar.vercel.app",
        githubUrl: "https://github.com/MakarimZufar/portfolio",
        featured: true,
    },
    {
        id: "project2",
        title: "E-Commerce Dashboard",
        description:
            "Comprehensive admin dashboard for e-commerce platforms with real-time analytics and inventory management.",
        technologies: ["React", "Material UI", "Node.js", "MongoDB", "Express"],
        imageUrl: "/projects/ecommerce.png",
        demoUrl: "https://demo-ecommerce.example.com",
        githubUrl: "https://github.com/MakarimZufar/ecommerce-dashboard",
        featured: true,
    },
    {
        id: "project3",
        title: "Task Management App",
        description:
            "A full-stack task management application with user authentication and real-time updates.",
        technologies: ["React", "Firebase", "Tailwind CSS", "Redux"],
        imageUrl: "/projects/taskapp.png",
        demoUrl: "https://taskapp-demo.example.com",
        githubUrl: "https://github.com/MakarimZufar/task-app",
        featured: true,
    },
    {
        id: "project4",
        title: "Weather Application",
        description:
            "Real-time weather forecasting app using weather API with location services.",
        technologies: ["JavaScript", "OpenWeather API", "HTML", "CSS"],
        imageUrl: "/projects/weather.png",
        demoUrl: "https://weather-app.example.com",
        githubUrl: "https://github.com/MakarimZufar/weather-app",
        featured: false,
    },
    {
        id: "project5",
        title: "Blog Platform",
        description:
            "A content management system for bloggers with markdown support and comment functionality.",
        technologies: ["Next.js", "MongoDB", "Tailwind CSS", "NextAuth.js"],
        imageUrl: "/projects/blog.png",
        demoUrl: "https://blog-platform.example.com",
        githubUrl: "https://github.com/MakarimZufar/blog-platform",
        featured: false,
    },
];

export function getAllProjects() {
    return projects;
}

export function getFeaturedProjects() {
    return projects.filter((project) => project.featured);
}

export function getProjectById(id) {
    return projects.find((project) => project.id === id);
}
