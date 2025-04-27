"use client";
import { motion } from "framer-motion";
import TechLayeredCarousel from "@/components/TechStack/TechStackCarousel";
import FeaturedProjects from "@/components/FeaturedProjects/FeaturedProjects";
import IntroCard from "@/components/IntroCard/IntroCard";
import styles from "@/styles/Home.module.css";
import ExperienceSection from "@/components/ExperienceSection";

export default function HomePage() {
    return (
        <main className="text-white overflow-x-hidden bg-gradient-to-b from-transparent via-[#0f0c29]/70 to-black min-h-screen">
            <section className="relative h-screen flex flex-col items-center justify-center px-6 sm:px-20">
                <div
                    className={`absolute inset-0 -z-10 ${styles.futuristicBackground}`}
                />
                <div className="absolute inset-0 -z-20 bg-gradient-to-tr from-[#0f0c29]/40 via-[#302b63]/30 to-[#24243e]/40" />

                {/* Komponen Kartu Intro */}
                <IntroCard />

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-8 text-white text-2xl animate-bounce"
                >
                    ↓ Scroll
                </motion.div>
            </section>

            <section className="pt-24 pb-32 px-6 sm:px-20 flex flex-col items-center gap-24">
                {/* komponen carousel tech */}
                <TechLayeredCarousel />
            </section>

            {/* Komponen Pengalaman */}
            <ExperienceSection />

            {/* Komponen Proyek Unggulan */}
            <FeaturedProjects />
        </main>
    );
}