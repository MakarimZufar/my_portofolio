"use client";
import { useEffect, useState } from "react";

export default function ScrollIndicator() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeSection, setActiveSection] = useState("hero");
    const sections = ["hero", "skills", "experience", "projects"];
    const sectionNames = {
        hero: "Beranda",
        skills: "Kemampuan",
        experience: "Pengalaman",
        projects: "Proyek",
    };

    // Mengukur progress scroll
    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.body.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);

            // Menentukan section aktif
            const sectionsWithPosition = sections.map((id) => {
                const element = document.getElementById(id);
                if (!element) return { id, top: 0 };
                const rect = element.getBoundingClientRect();
                return {
                    id,
                    top: rect.top + window.scrollY,
                    bottom: rect.bottom + window.scrollY,
                };
            });

            // Set section aktif berdasarkan posisi scroll
            const currentPosition = window.scrollY + window.innerHeight / 2;

            for (let i = sectionsWithPosition.length - 1; i >= 0; i--) {
                if (currentPosition >= sectionsWithPosition[i].top) {
                    setActiveSection(sectionsWithPosition[i].id);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Scroll ke section yang dipilih
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
            <div className="flex flex-col items-center space-y-6">
                {/* Indikator progress scroll keseluruhan */}
                <div className="w-1 h-32 bg-white/10 rounded-full relative">
                    <div
                        className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-cyan-500 to-blue-400 rounded-full"
                        style={{ height: `${scrollProgress}%` }}
                    />
                </div>

                {/* Navigasi section */}
                <div className="flex flex-col space-y-4">
                    {sections.map((section) => (
                        <div
                            key={section}
                            className="group relative"
                            onClick={() => scrollToSection(section)}
                        >
                            <div
                                className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                                    activeSection === section
                                        ? "bg-cyan-400 scale-110"
                                        : "bg-white/30 hover:bg-white/60"
                                }`}
                            />

                            {/* Label section */}
                            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                <div className="bg-black/50 text-white text-xs py-1 px-2 rounded-md backdrop-blur-sm whitespace-nowrap">
                                    {sectionNames[section]}
                                </div>
                            </div>

                            {/* Koneksi ke label */}
                            <div className="absolute right-3 top-1/2 w-0 h-0.5 bg-white/30 group-hover:w-3 transform -translate-y-1/2 transition-all duration-300 origin-left opacity-0 group-hover:opacity-100" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
