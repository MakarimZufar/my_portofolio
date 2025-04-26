import Link from "next/link";
import { motion } from "framer-motion";
import TechBadge from "@/components/home/TechBadge";
import { projects } from "@/app/projects/page";

export default function FeaturedProjects() {
    const featuredProjects = projects.filter((project) => project.featured);

    return (
        <section className="px-6 sm:px-20 py-20 w-full flex flex-col items-center">
            <div className="p-8 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 shadow-lg w-full max-w-7xl">
                <div className="max-w-7xl mx-auto bg-black/80 rounded-3xl shadow-2xl border border-white/10 p-8 sm:p-14">
                    {/* Title */}
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-4">
                            Featured Projects
                        </h2>
                        <p className="text-gray-400 max-w-xl mx-auto">
                            Check out some of my recent work. These projects
                            showcase my skills and expertise in web development.
                        </p>
                    </div>

                    {/* Project Cards */}
                    <div className="flex overflow-x-auto p-8 md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 scrollbar-hide snap-x snap-mandatory">
                        {featuredProjects.map((project, i) => (
                            <motion.div
                                key={project.id}
                                className="min-w-[280px] w-80 md:w-auto flex-shrink-0 snap-center bg-white/5 backdrop-blur-md rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,255,255,0.2)] border border-cyan-500 group hover:shadow-[0_0_30px_rgba(0,255,255,0.8)] transition-shadow duration-500"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: i * 0.1,
                                }}
                                whileHover={{ y: -5 }}
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
                                        <span className="text-white text-5xl opacity-20">
                                            {i === 0
                                                ? "💻"
                                                : i === 1
                                                ? "📱"
                                                : "📊"}
                                        </span>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300 flex items-center justify-center">
                                        <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                                            <Link
                                                href="/projects"
                                                className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm inline-block"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h3 className="text-lg font-bold text-white mb-2">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies
                                            .slice(0, 3)
                                            .map((tech) => (
                                                <TechBadge
                                                    key={tech}
                                                    name={tech}
                                                />
                                            ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Button View All */}
                    <div className="text-center mt-8">
                        <Link
                            href="/projects"
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full inline-flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
                        >
                            <span>Lihat Semua Proyek</span>
                            <span>→</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
