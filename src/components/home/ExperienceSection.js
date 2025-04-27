// src/components/home/ExperienceSection.js
"use client";
import { motion } from "framer-motion";
import styles from "@/styles/Experience.module.css";

const educations = [
    {
        institution: "Universitas Indonesia",
        years: "2020 - 2024",
        major: "Ilmu Komputer",
        description:
            "Fokus pada pengembangan aplikasi web dan mobile. IPK 3.8/4.0.",
    },
    {
        institution: "SMA Negeri 1 Jakarta",
        years: "2017 - 2020",
        major: "MIPA",
        description:
            "Juara lomba informatika tingkat provinsi. Anggota klub pemrograman.",
    },
];

const experiences = [
    {
        company: "PT Teknologi Indonesia",
        years: "2023 - Sekarang",
        position: "Frontend Developer (Part-time)",
        description:
            "Mengembangkan aplikasi web menggunakan React.js dan Next.js. Mengoptimalkan performa aplikasi dengan mengurangi waktu loading sebesar 40%.",
    },
    {
        company: "Startup Lokal",
        years: "2022 - 2023",
        position: "Web Developer (Internship)",
        description:
            "Membangun dan memelihara website perusahaan menggunakan HTML, CSS, dan JavaScript. Berkolaborasi dengan tim desain untuk implementasi UI/UX.",
    },
    {
        company: "Freelance",
        years: "2021 - 2022",
        position: "UI/UX Designer",
        description:
            "Merancang antarmuka untuk beberapa aplikasi mobile dan website. Menerapkan prinsip desain yang responsif dan user-friendly.",
    },
];

const ExperienceSection = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    };

    return (
        <section className="w-full py-24 px-6 sm:px-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl font-bold text-white mb-3">
                    Pengalaman
                </h2>
                <p className="text-white/60 max-w-xl mx-auto">
                    Perjalanan karir dan pendidikan yang telah membentuk
                    keahlian dan perspektif saya dalam dunia pengembangan web.
                </p>
            </motion.div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Pendidikan */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-col gap-6"
                >
                    <h3 className="text-2xl font-bold text-[#00c6ff] mb-6 flex items-center">
                        <span className="w-8 h-8 bg-[#00c6ff]/20 rounded-lg flex items-center justify-center mr-3">
                            🎓
                        </span>
                        Pendidikan
                    </h3>

                    <div className="relative border-l-2 border-[#00c6ff]/30 pl-8 space-y-10">
                        {educations.map((education, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="relative"
                            >
                                <div
                                    className={`absolute -left-10 top-0 w-5 h-5 rounded-full bg-[#00c6ff] ${styles["glow-blue-pulse"]}`}
                                />

                                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-[#00c6ff]/30 transition-all duration-300 group">
                                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-[#00c6ff] transition-colors">
                                        {education.institution}
                                    </h4>

                                    <div className="flex flex-wrap items-center gap-2 mb-3">
                                        <span className="px-3 py-1 bg-[#00c6ff]/10 text-[#00c6ff] text-xs rounded-full">
                                            {education.years}
                                        </span>
                                        <span className="px-3 py-1 bg-[#7928ca]/10 text-[#7928ca]/90 text-xs rounded-full">
                                            {education.major}
                                        </span>
                                    </div>

                                    <p className="text-white/70">
                                        {education.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Pengalaman Kerja */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-col gap-6"
                >
                    <h3 className="text-2xl font-bold text-[#7928ca] mb-6 flex items-center">
                        <span className="w-8 h-8 bg-[#7928ca]/20 rounded-lg flex items-center justify-center mr-3">
                            💼
                        </span>
                        Pekerjaan
                    </h3>

                    <div className="relative border-l-2 border-[#7928ca]/30 pl-8 space-y-10">
                        {experiences.map((experience, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="relative"
                            >
                                <div
                                    className={`absolute -left-10 top-0 w-5 h-5 rounded-full bg-[#7928ca] ${styles["glow-purple-pulse"]}`}
                                />

                                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-[#7928ca]/30 transition-all duration-300 group">
                                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-[#7928ca] transition-colors">
                                        {experience.company}
                                    </h4>

                                    <div className="flex flex-wrap items-center gap-2 mb-3">
                                        <span className="px-3 py-1 bg-[#7928ca]/10 text-[#7928ca]/90 text-xs rounded-full">
                                            {experience.years}
                                        </span>
                                        <span className="px-3 py-1 bg-[#ff0080]/10 text-[#ff0080]/90 text-xs rounded-full">
                                            {experience.position}
                                        </span>
                                    </div>

                                    <p className="text-white/70">
                                        {experience.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ExperienceSection;
