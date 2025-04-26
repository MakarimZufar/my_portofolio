// src/data/projectsData.js

// Data proyek
export const projects = [
    {
        id: "my-portfolio",
        title: "My-Portfolio",
        description:
            "Portofolio pertama saya untuk menampilkan perjalanan, kemampuan, dan proyek-proyek yang telah saya buat. Dibangun dengan Next.js dan Tailwind CSS.",
        longDescription:
            "Website portofolio ini dibuat untuk menunjukkan kemampuan teknis saya dalam pengembangan web. Menggunakan framework Next.js terbaru dengan App Router dan Tailwind CSS untuk styling, website ini menampilkan informasi personal, keterampilan, proyek yang telah saya kerjakan, serta cara menghubungi saya.",
        image: "/project-portfolio-thumb.jpg", // Gambar placeholder, bisa diganti dengan screenshot portofolio
        technologies: ["React", "NextJS", "Tailwind", "JavaScript"],
        demoUrl: "https://makarimzufar.vercel.app",
        githubUrl: "https://github.com/MakarimZufar/my-portofolio",
        featured: true,
        category: "web",
    },
    {
        id: "rosojogja",
        title: "Roso Jogja",
        description:
            "Aplikasi kuliner yang dirancang khusus untuk membantu menemukan dan memesan makanan dari berbagai restoran di Yogyakarta.",
        longDescription:
            "RosoJogja adalah platform kuliner digital yang menghubungkan pengguna dengan restoran lokal di Yogyakarta. Aplikasi ini menyediakan fitur pencarian berdasarkan kategori makanan, lokasi, dan rating. Pengguna dapat melihat menu, memesan makanan, dan melacak pesanan secara real-time.",
        image: "/project-rosojogja-thumb.jpg", // Gambar placeholder
        technologies: ["React", "Firebase", "Node.js", "JavaScript"],
        demoUrl: "https://rosojogja.web.app",
        githubUrl: "https://github.com/MakarimZufar/rosojogja",
        featured: true,
        category: "app",
    },
    {
        id: "otwcuy",
        title: "OTW CUY",
        description:
            "Aplikasi pencarian dan pemesanan transportasi umum yang menghubungkan penumpang dengan supir di seluruh Yogyakarta.",
        longDescription:
            "OTW CUY adalah solusi transportasi on-demand yang menyediakan layanan ojek online, taksi, dan pengiriman barang. Aplikasi ini dilengkapi dengan fitur pelacakan real-time, estimasi waktu dan biaya, serta sistem pembayaran terpadu yang aman.",
        image: "/project-otwcuy-thumb.jpg", // Gambar placeholder
        technologies: ["React", "Firebase", "Tailwind", "JavaScript"],
        demoUrl: "https://otwcuy.web.app",
        githubUrl: "https://github.com/MakarimZufar/otwcuy",
        featured: false,
        category: "app",
    },
    // Tambahkan proyek lain di sini
];

// Fungsi untuk mendapatkan proyek yang memiliki featured: true
export function getFeaturedProjects() {
    return projects.filter((project) => project.featured);
}

// Fungsi untuk mendapatkan proyek berdasarkan kategori
export function getProjectsByCategory(category) {
    return category === "all"
        ? projects
        : projects.filter((project) => project.category === category);
}

// Fungsi untuk mendapatkan proyek berdasarkan ID
export function getProjectById(id) {
    return projects.find((project) => project.id === id);
}
