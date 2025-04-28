"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import TechLayeredCarousel from "@/components/TechStack/TechStackCarousel";
import FeaturedProjects from "@/components/FeaturedProjects/FeaturedProjects";
import IntroCard from "@/components/IntroCard/IntroCard";
import ExperienceSection from "@/components/experience/ExperienceSection";
import InteractiveBackground from "@/styles/InteractiveBackground";
import ScrollIndicator from "@/components/ScrollIndicator";
import { FaArrowDown } from "react-icons/fa";

export default function HomePage() {
    // Menerapkan smooth scroll
    useEffect(() => {
        // Scroll halus ke bagian lain
        const handleScrollToElement = (e) => {
            const target = e.target.getAttribute("data-scroll-to");
            if (target) {
                e.preventDefault();
                const element = document.getElementById(target);
                if (element) {
                    element.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }
            }
        };

        document.addEventListener("click", handleScrollToElement);
        return () =>
            document.removeEventListener("click", handleScrollToElement);
    }, []);

    return (
        <main className="text-white overflow-x-hidden bg-gradient-to-b from-[#050515] via-[#0a0a1a] to-[#05051F] min-h-screen relative">
            {/* Background interaktif dengan partikel */}
            <InteractiveBackground />

            {/* Hero Section dengan IntroCard */}
            <section
                id="hero"
                className="relative h-screen flex flex-col items-center justify-center px-6 sm:px-20"
            >
                <div className="absolute inset-0 -z-20 bg-gradient-to-tr from-[#0f0c29]/60 via-[#302b63]/40 to-[#24243e]/60" />

                {/* Komponen Kartu Intro */}
                <IntroCard />

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-8 flex flex-col items-center gap-2"
                >
                    <span className="text-gray-400 text-sm">
                        Scroll untuk melihat lebih
                    </span>
                    <FaArrowDown className="text-cyan-400 animate-bounce" />
                </motion.div>
            </section>

            {/* Tech Stack Section */}
            <section
                id="skills"
                className="pt-24 pb-32 px-6 sm:px-20 flex flex-col items-center gap-24"
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                        Kemampuan Teknis
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Beberapa teknologi yang saya kuasai dan gunakan dalam
                        pengembangan proyek
                    </p>
                </motion.div>

                {/* Komponen carousel tech */}
                <TechLayeredCarousel />
            </section>

            {/* Komponen Pengalaman */}
            <ExperienceSection />

            {/* Komponen Proyek Unggulan */}
            <FeaturedProjects />

            {/* Scroll Indicator untuk halaman */}
            <ScrollIndicator />
        </main>
    );
}
