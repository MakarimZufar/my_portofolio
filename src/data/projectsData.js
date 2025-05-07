// src/data/projectsData.js
import { technologies, getTechnology } from "./technologiesData";

const projects = [
    {
        id: "weather-app",
        title: "Weather App",
        description:
            "Aplikasi cuaca yang menampilkan ramalan real-time dengan antarmuka yang responsif dan animasi transisi cuaca yang menarik.",
        imageUrls: [
            "/projects/weather-app.jpg",
            "/projects/weather-app-2.jpg",
            "/projects/weather-app-3.jpg",
        ],
        tags: ["Web", "Frontend"],
        technologies: [
            "React",
            "OpenWeather API",
            "Tailwind CSS",
            "Framer Motion",
        ],
        featured: true,
        emoji: "🌦️", // Emoji kustom untuk proyek ini
        githubUrl: "https://github.com/MakarimZufar/weather-app",
        demoUrl: "https://weather-app-makarim.vercel.app",
    },
    {
        id: "my_portfolio",
        title: "My Portfolio Website",
        description:
            "Website portofolio pribadi yang dibangun dengan Next.js dan Tailwind CSS, menampilkan proyek-proyek dan kemampuan teknis secara interaktif.",
        imageUrls: ["/projects/portfolio.jpg", "/projects/portfolio-2.jpg"],
        tags: ["Web", "Frontend", "UI"],
        technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "React"],
        featured: true,
        emoji: "👨‍💻", // Emoji kustom untuk proyek ini
        githubUrl: "https://github.com/MakarimZufar/my_portofolio",
        demoUrl: "https://makarimzufar.vercel.app",
    },
    {
        id: "blog-platform",
        title: "Platform Blog",
        description:
            "Platform blog dengan fitur autentikasi, editor teks kaya, komentar, dan analitik. Mendukung markdown dan penyimpanan gambar.",
        imageUrls: [
            "/projects/blog-platform.jpg",
            "/projects/blog-platform-2.jpg",
            "/projects/blog-platform-3.jpg",
        ],
        tags: ["Web", "Full Stack"],
        technologies: ["Next.js", "MongoDB", "Tailwind CSS", "NextAuth.js"],
        featured: true,
        emoji: "✍️", // Emoji kustom untuk proyek ini
        githubUrl: "https://github.com/MakarimZufar/blog-platform",
        demoUrl: "https://blog-platform-demo.vercel.app",
    },
    {
        id: "task-manager",
        title: "Aplikasi Manajemen Tugas",
        description:
            "Aplikasi manajemen tugas dan produktivitas dengan fitur kategori, prioritas, notifikasi, dan integrasi kalender.",
        imageUrls: ["/projects/task-manager.jpg"],
        tags: ["Web", "Full Stack"],
        technologies: ["React", "Firebase", "Tailwind CSS", "Redux"],
        featured: false,
        // Tidak ada emoji kustom, akan menggunakan emoji berdasarkan tag
        githubUrl: "https://github.com/MakarimZufar/task-manager",
        demoUrl: "https://task-manager-zufar.vercel.app",
    },
    {
        id: "e-commerce",
        title: "Platform E-Commerce",
        description:
            "Platform e-commerce dengan sistem keranjang, checkout, pembayaran, dan manajemen produk untuk berbagai kategori barang.",
        imageUrls: ["/projects/e-commerce.jpg", "/projects/e-commerce-2.jpg"],
        tags: ["Web", "Full Stack"],
        technologies: ["Next.js", "Node.js", "MongoDB", "Stripe API"],
        featured: false,
        emoji: "🛒", // Emoji kustom untuk proyek ini
        githubUrl: "https://github.com/MakarimZufar/e-commerce",
        demoUrl: "https://e-commerce-zufar.vercel.app",
    },
    {
        id: "chat-app",
        title: "Aplikasi Chat Realtime",
        description:
            "Aplikasi chat realtime dengan fitur grup, obrolan pribadi, berbagi file, dan notifikasi push.",
        imageUrls: ["/projects/chat-app.jpg", "/projects/chat-app-2.jpg"],
        tags: ["Web", "Mobile", "Full Stack"],
        technologies: ["React", "Firebase", "WebSockets", "Redux"],
        featured: false,
        emoji: "💬", // Emoji kustom untuk proyek ini
        githubUrl: "https://github.com/MakarimZufar/chat-app",
        demoUrl: "https://chat-app-zufar.vercel.app",
    },
];

// Fungsi untuk mendapatkan semua proyek
export const getAllProjects = () => projects;

// Fungsi untuk mendapatkan proyek tertentu berdasarkan ID
export const getProjectById = (id) =>
    projects.find((project) => project.id === id);

// Fungsi untuk mendapatkan proyek-proyek unggulan
export const getFeaturedProjects = () =>
    projects.filter((project) => project.featured);

// Fungsi untuk mendapatkan semua tags unik
export const getAllTags = () => {
    const allTags = projects.flatMap((project) => project.tags);
    return [...new Set(allTags)];
};

// Fungsi untuk mendapatkan semua teknologi unik dari proyek-proyek
export const getAllTechnologies = () => {
    const allTechnologies = projects.flatMap((project) => project.technologies);
    return [...new Set(allTechnologies)];
};

// Fungsi untuk memeriksa apakah teknologi ada dalam file technologiesData
export const validateTechnology = (techName) => {
    return Boolean(getTechnology(techName));
};

// Fungsi untuk mendapatkan detail teknologi untuk sebuah proyek
export const getProjectTechnologies = (project) => {
    return project.technologies.map((techName) => getTechnology(techName));
};

// Pemetaan emoji default berdasarkan tag
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
