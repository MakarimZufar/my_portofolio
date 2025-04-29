"use client";
import { useEffect, useState } from "react";

export default function ScrollIndicator() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeSection, setActiveSection] = useState("hero");
    const [isVisible, setIsVisible] = useState(true);
    const sections = ["hero", "skills", "experience", "projects"];
    const sectionNames = {
        hero: "Main",
        skills: "Skills",
        experience: "Experience",
        projects: "Projects",
    };

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.body.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);

            for (const id of sections) {
                const element = document.getElementById(id);
                if (!element) continue;

                const rect = element.getBoundingClientRect();
                const topPos = rect.top;
                const threshold = window.innerHeight * 0.4; // 40% dari viewport

                if (topPos < threshold && topPos > -rect.height + threshold) {
                    setActiveSection(id);
                    break;
                }
            }
        };

        const checkScreenSize = () => {
            const viewportWidth = window.innerWidth;
            setIsVisible(viewportWidth >= 768); // Tampilkan pada ukuran medium (md) ke atas
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", checkScreenSize);

        handleScroll();
        checkScreenSize();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", checkScreenSize);
        };
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const offsetTop =
                element.getBoundingClientRect().top + window.pageYOffset;

            document.documentElement.style.overflowY = "auto";
            document.body.style.overflowY = "auto";

            window.scrollTo({
                top: offsetTop,
                behavior: "smooth",
            });

            setActiveSection(id);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 md:block">
            <div className="flex flex-col items-center space-y-6">
                {/* Indikator progress scroll keseluruhan */}
                <div className="w-1 h-32 bg-white/10 rounded-full relative">
                    <div
                        className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-cyan-500 to-blue-400 rounded-full transition-all duration-300"
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
                                        ? "bg-cyan-400 scale-110 shadow-lg shadow-cyan-400/50"
                                        : "bg-white/30 hover:bg-white/60"
                                }`}
                            />

                            {/* Label section */}
                            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                <div className="bg-black/70 text-white text-xs py-1 px-2 rounded-md backdrop-blur-sm whitespace-nowrap">
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
