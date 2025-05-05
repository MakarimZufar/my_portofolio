const projects = [
    {
        id: "lorem-ipsum1",
        title: "lorem ipsum dolor sit amet",
        description:
            "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        imageUrl: "/projects/weather-app.jpg",
        tags: ["Web", "Frontend"],
        technologies: [
            "React",
            "OpenWeather API",
            "Tailwind CSS",
            "Framer Motion",
        ],
        featured: true,
        githubUrl: "https://github.com/MakarimZufar/weather-app",
        demoUrl: "https://weather-app-makarim.vercel.app",
    },
    {
        id: "my_portfolio",
        title: "My Portfolio Website",
        description:
            "Website portofolio pribadi yang dibangun dengan Next.js dan Tailwind CSS, menampilkan proyek-proyek dan kemampuan teknis secara interaktif.",
        imageUrl: "/projects/portfolio.jpg",
        tags: ["Web", "Frontend", "UI"],
        technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "React"],
        featured: true,
        githubUrl:
            "https://github.com/MakarimZufar/my_portofolio",
        demoUrl: "https://makarimzufar.vercel.app",
    },
    {
        id: "",
        title: "Platform Blog",
        description:
            "Platform blog dengan fitur autentikasi, editor teks kaya, komentar, dan analitik. Mendukung markdown dan penyimpanan gambar.",
        imageUrl: "/projects/blog-platform.jpg",
        tags: ["Web", "Full Stack"],
        technologies: ["Next.js", "MongoDB", "Tailwind CSS", "NextAuth.js"],
        featured: true,
        githubUrl: "https://github.com/MakarimZufar/blog-platform",
        demoUrl: "https://blog-platform-demo.vercel.app",
    },
    {
        id: "task-manager",
        title: "Aplikasi Manajemen Tugas",
        description:
            "Aplikasi manajemen tugas dan produktivitas dengan fitur kategori, prioritas, notifikasi, dan integrasi kalender.",
        imageUrl: "/projects/task-manager.jpg",
        tags: ["Web", "Full Stack"],
        technologies: ["React", "Firebase", "Tailwind CSS", "Redux"],
        featured: false,
        githubUrl: "https://github.com/MakarimZufar/task-manager",
        demoUrl: "https://task-manager-zufar.vercel.app",
    },
    {
        id: "e-commerce",
        title: "Platform E-Commerce",
        description:
            "Platform e-commerce dengan sistem keranjang, checkout, pembayaran, dan manajemen produk untuk berbagai kategori barang.",
        imageUrl: "/projects/e-commerce.jpg",
        tags: ["Web", "Full Stack"],
        technologies: ["Next.js", "Node.js", "MongoDB", "Stripe API"],
        featured: false,
        githubUrl: "https://github.com/MakarimZufar/e-commerce",
        demoUrl: "https://e-commerce-zufar.vercel.app",
    },
    {
        id: "chat-app",
        title: "Aplikasi Chat Realtime",
        description:
            "Aplikasi chat realtime dengan fitur grup, obrolan pribadi, berbagi file, dan notifikasi push.",
        imageUrl: "/projects/chat-app.jpg",
        tags: ["Web", "Mobile", "Full Stack"],
        technologies: ["React", "Firebase", "WebSockets", "Redux"],
        featured: false,
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

// Fungsi untuk mendapatkan semua teknologi unik
export const getAllTechnologies = () => {
    const allTechnologies = projects.flatMap((project) => project.technologies);
    return [...new Set(allTechnologies)];
};
