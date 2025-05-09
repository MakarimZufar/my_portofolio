"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import TechLayeredCarousel from "@/components/TechStack/TechStackCarousel";
import { FeaturedProjects } from "@/components/FeaturedProjects"; // Perbarui import dari index.js
import IntroCard from "@/components/IntroCard/IntroCard";
import ExperienceSection from "@/components/experience/ExperienceSection";
import ScrollIndicator from "@/components/ScrollIndicator";
import { FaArrowDown } from "react-icons/fa";
import MeteorBackground from "@/components/MeteorBackground";

export default function HomePage() {
    useEffect(() => {
        // Function to adjust section heights based on viewport height
        const adjustSectionHeight = () => {
            const sections = document.querySelectorAll("section[id]");
            const viewportHeight = window.innerHeight;

            sections.forEach((section) => {
                // Ensure each section has at least viewport height
                if (section.id === "hero") {
                    section.style.minHeight = `${viewportHeight}px`;
                } else {
                    section.style.minHeight = `${viewportHeight}px`;
                }
            });
        };

        // Fix for scroll behavior when clicking scroll indicator
        const fixScrollingBehavior = () => {
            document.documentElement.style.overflowY = "auto";
            document.body.style.overflowY = "auto";
        };

        adjustSectionHeight();
        fixScrollingBehavior();
        window.addEventListener("resize", adjustSectionHeight);
        return () => window.removeEventListener("resize", adjustSectionHeight);
    }, []);

    return (
        <main className="text-white overflow-x-hidden overflow-y-hidden bg-gradient-to-b from-[#050515] via-[#0a0a1a] to-[#05051F] min-h-screen relative">
            {/* Efek meteor sebagai latar belakang utama */}
            <MeteorBackground />
            {/* Interactive particle background sebagai overlay */}

            {/* Hero Section with IntroCard */}
            <section
                id="hero"
                className="relative min-h-screen flex flex-col items-center justify-center px-6 sm:px-20 z-10"
            >
                <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-[#0f0c29]/60 via-[#302b63]/40 to-[#24243e]/60" />

                {/* Intro Card Component */}
                <IntroCard />

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-8 flex flex-col items-center gap-2 cursor-pointer"
                    onClick={() => {
                        document.getElementById("skills").scrollIntoView({
                            behavior: "smooth",
                        });
                    }}
                >
                    <span className="text-gray-400 text-sm">
                        Scroll to see more
                    </span>
                    <FaArrowDown className="text-cyan-400 animate-bounce" />
                </motion.div>
            </section>

            {/* Tech Stack Section */}
            <section
                id="skills"
                className="pt-24 pb-32 px-6 sm:px-20 flex flex-col items-center gap-24 relative z-10"
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                        Technical Skills
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Some technologies that I am proficient in and use for
                        project development
                    </p>
                </motion.div>

                {/* Tech carousel component */}
                <TechLayeredCarousel />
            </section>

            {/* Experience Component */}
            <section id="experience" className="relative z-10">
                <ExperienceSection />
            </section>

            {/* Featured Projects Component */}
            <section id="projects" className="relative z-10">
                <FeaturedProjects />
            </section>

            {/* Page Scroll Indicator */}
            <ScrollIndicator />
        </main>
    );
}
