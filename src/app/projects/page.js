"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SiGithub, SiGlobus } from "react-icons/si";
import TechBadge from "@/components/home/TechBadge";

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

export default function ProjectsPage() {
    const [filter, setFilter] = useState("all");
    const [activeProject, setActiveProject] = useState(null);

    // Filter proyek berdasarkan kategori
    const filteredProjects =
        filter === "all"
            ? projects
            : projects.filter((project) => project.category === filter);

    // Handler untuk membuka detail proyek
    const openProjectDetails = (project) => {
        setActiveProject(project);
        // Scroll ke atas halaman dengan animasi smooth
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Handler untuk menutup detail proyek
    const closeProjectDetails = () => {
        setActiveProject(null);
    };

    return (
        <main className="flex flex-col items-center justify-start min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white py-24 px-6 md:px-12">
            {/* Header */}
            <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Proyek Saya
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
                    Berikut adalah beberapa proyek yang telah saya kerjakan.
                    Setiap proyek merupakan kesempatan belajar dan berkembang
                    dalam kemampuan pengembangan software.
                </p>
            </motion.div>

            {/* Filter Kategori */}
            <div className="flex justify-center gap-4 mb-12">
                <button
                    className={`px-4 py-2 rounded-full transition-all ${
                        filter === "all"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                    onClick={() => setFilter("all")}
                >
                    Semua
                </button>
                <button
                    className={`px-4 py-2 rounded-full transition-all ${
                        filter === "web"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                    onClick={() => setFilter("web")}
                >
                    Web
                </button>
                <button
                    className={`px-4 py-2 rounded-full transition-all ${
                        filter === "app"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                    onClick={() => setFilter("app")}
                >
                    App
                </button>
            </div>

            {/* Detail Proyek (muncul ketika proyek dipilih) */}
            {activeProject && (
                <motion.div
                    className="w-full max-w-6xl bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-2xl mb-16"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="relative h-96 w-full bg-gray-300 dark:bg-gray-700">
                        <Image
                            src={activeProject.image}
                            alt={activeProject.title}
                            layout="fill"
                            objectFit="cover"
                            className="object-cover"
                        />
                    </div>
                    <div className="p-8">
                        <div className="flex justify-between items-start mb-6">
                            <h2 className="text-3xl font-bold">
                                {activeProject.title}
                            </h2>
                            <button
                                onClick={closeProjectDetails}
                                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            {activeProject.longDescription}
                        </p>

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">
                                Teknologi yang Digunakan:
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {activeProject.technologies.map((tech) => (
                                    <TechBadge key={tech} name={tech} />
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4">
                            {activeProject.demoUrl && (
                                <a
                                    href={activeProject.demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    <SiGlobus className="text-lg" />
                                    <span>Demo Live</span>
                                </a>
                            )}
                            {activeProject.githubUrl && (
                                <a
                                    href={activeProject.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors"
                                >
                                    <SiGithub className="text-lg" />
                                    <span>Kode Sumber</span>
                                </a>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Grid Proyek */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
                {filteredProjects.map((project) => (
                    <motion.div
                        key={project.id}
                        className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                        whileHover={{ y: -8 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        onClick={() => openProjectDetails(project)}
                    >
                        <div className="h-48 bg-gray-300 dark:bg-gray-700 relative">
                            <Image
                                src={project.image}
                                alt={project.title}
                                layout="fill"
                                objectFit="cover"
                                className="object-cover"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">
                                {project.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.technologies
                                    .slice(0, 3)
                                    .map((tech) => (
                                        <TechBadge key={tech} name={tech} />
                                    ))}
                                {project.technologies.length > 3 && (
                                    <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full px-2 py-1">
                                        +{project.technologies.length - 3}
                                    </span>
                                )}
                            </div>
                            <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 font-medium">
                                Lihat Detail
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Tampilkan pesan jika tidak ada proyek yang sesuai filter */}
            {filteredProjects.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400 text-lg">
                        Tidak ada proyek yang sesuai dengan filter yang dipilih.
                    </p>
                </div>
            )}

            {/* CTA Section */}
            <div className="mt-20 text-center">
                <h2 className="text-2xl font-bold mb-4">
                    Punya Proyek Menarik?
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl">
                    Saya selalu terbuka untuk diskusi dan kolaborasi pada
                    proyek-proyek baru. Jika Anda memiliki ide atau proyek yang
                    ingin dibahas, jangan ragu untuk menghubungi saya.
                </p>
                <Link
                    href="/contact"
                    className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                >
                    <span>Hubungi Saya</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </Link>
            </div>
        </main>
    );
}
