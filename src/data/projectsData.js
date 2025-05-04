const projects = [
    {
        id: "portfolio",
        title: "Portfolio Website",
        description:
            "Website portofolio personal dengan Next.js dan Tailwind CSS. Fitur animasi halus dengan Framer Motion dan tampilan responsif untuk berbagai perangkat.",
        technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
        tags: ["Web", "Frontend"],
        imageUrl: "/projects/portfolio.png",
        demoUrl: "https://makarimzufar.vercel.app",
        githubUrl: "https://github.com/MakarimZufar/portfolio",
        featured: true,
    },
    {
        id: "ecommerce",
        title: "E-Commerce Dashboard",
        description:
            "Dashboard admin komprehensif untuk platform e-commerce dengan analitik real-time dan manajemen inventori. Mendukung berbagai peran pengguna dengan tingkat akses berbeda.",
        technologies: ["React", "Material UI", "Node.js", "MongoDB", "Express"],
        tags: ["Web", "Full Stack"],
        imageUrl: "/projects/ecommerce.png",
        demoUrl: "https://demo-ecommerce.example.com",
        githubUrl: "https://github.com/MakarimZufar/ecommerce-dashboard",
        featured: true,
    },
    {
        id: "task-app",
        title: "Task Management App",
        description:
            "Aplikasi manajemen tugas dengan otentikasi pengguna dan update real-time. Fitur drag-and-drop untuk mengelola tugas, notifikasi, dan kolaborasi tim.",
        technologies: ["React", "Firebase", "Tailwind CSS", "Redux"],
        tags: ["Mobile", "Web", "Full Stack"],
        imageUrl: "/projects/taskapp.png",
        demoUrl: "https://taskapp-demo.example.com",
        githubUrl: "https://github.com/MakarimZufar/task-app",
        featured: true,
    },
    {
        id: "weather",
        title: "Weather Application",
        description:
            "Aplikasi perkiraan cuaca real-time dengan layanan lokasi. Mendukung pencarian, simpan lokasi favorit, dan notifikasi kondisi cuaca ekstrem.",
        technologies: ["JavaScript", "OpenWeather API", "HTML", "CSS"],
        tags: ["Web", "Frontend"],
        imageUrl: "/projects/weather.png",
        demoUrl: "https://weather-app.example.com",
        githubUrl: "https://github.com/MakarimZufar/weather-app",
        featured: false,
    },
    {
        id: "blog",
        title: "Blog Platform",
        description:
            "Sistem manajemen konten untuk blogger dengan dukungan markdown, komentar, dan analitik. Termasuk editor visual WYSIWYG dan SEO tools.",
        technologies: ["Next.js", "MongoDB", "Tailwind CSS", "NextAuth.js"],
        tags: ["Web", "Full Stack"],
        imageUrl: "/projects/blog.png",
        demoUrl: "https://blog-platform.example.com",
        githubUrl: "https://github.com/MakarimZufar/blog-platform",
        featured: false,
    },
    {
        id: "mobile-app",
        title: "Fitness Tracker",
        description:
            "Aplikasi mobile untuk melacak aktivitas fitness, diet, dan rutinitas olahraga. Menyediakan visualisasi data dan rekomendasi personalisasi.",
        technologies: ["React Native", "Firebase", "Redux", "Expo"],
        tags: ["Mobile", "Frontend"],
        imageUrl: "/projects/fitness.png",
        demoUrl: "https://fitness-app.example.com",
        githubUrl: "https://github.com/MakarimZufar/fitness-app",
        featured: false,
    },
    {
        id: "chat-app",
        title: "Real-time Chat App",
        description:
            "Aplikasi chatting real-time dengan fitur pengiriman pesan, notifikasi, dan berbagi file. Mendukung chat grup dan pesan pribadi.",
        technologies: ["React", "Socket.io", "Node.js", "Express", "MongoDB"],
        tags: ["Web", "Full Stack"],
        imageUrl: "/projects/chat.png",
        demoUrl: "https://chat-app.example.com",
        githubUrl: "https://github.com/MakarimZufar/chat-app",
        featured: false,
    },
    {
        id: "food-delivery",
        title: "Food Delivery Platform",
        description:
            "Platform pengiriman makanan dengan integrasi peta real-time, sistem pemesanan, dan manajemen restoran. Mendukung multiple payment gateway.",
        technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe API"],
        tags: ["Web", "Mobile", "Full Stack"],
        imageUrl: "/projects/food.png",
        demoUrl: "https://food-delivery.example.com",
        githubUrl: "https://github.com/MakarimZufar/food-delivery",
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

export function getProjectsByTag(tag) {
    return projects.filter((project) => project.tags.includes(tag));
}

export function getProjectsByTech(tech) {
    return projects.filter((project) => project.technologies.includes(tech));
}

export function getAllTags() {
    const tags = new Set();
    projects.forEach((project) => {
        project.tags.forEach((tag) => tags.add(tag));
    });
    return [...tags];
}

export function getAllTechnologies() {
    const techs = new Set();
    projects.forEach((project) => {
        project.technologies.forEach((tech) => techs.add(tech));
    });
    return [...techs];
}
