import Link from "next/link";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { getFeaturedProjects } from "@/data/projectsData";
import styles from "./FeaturedProjects.module.css";

export default function FeaturedProjects() {
    const featuredProjects = getFeaturedProjects();

    return (
        <section className="px-6 sm:px-20 py-20 w-full flex flex-col items-center">
            <motion.div
                className={styles.container}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
            >
                <div className={styles.innerContainer}>
                    {/* Title with enhanced styling */}
                    <motion.div
                        className="text-center mb-14" // Increased bottom margin for more space
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <h2 className={styles.sectionTitle}>
                            Featured Projects
                        </h2>
                        <p className="text-gray-400 max-w-xl mx-auto relative">
                            Check out some of my recent work. These projects
                            showcase my skills and expertise in web development.
                            <motion.span
                                className="absolute -inset-1 bg-blue-500/10 blur-xl rounded-full"
                                animate={{
                                    opacity: [0.2, 0.4, 0.2],
                                    scale: [1, 1.2, 1],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                }}
                            />
                        </p>
                    </motion.div>

                    {/* Project Cards with better container */}
                    <div className="flex justify-center flex-wrap gap-10">
                        {featuredProjects.map((project, i) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.6,
                                    delay: i * 0.15,
                                }}
                            >
                                <ProjectCard project={project} index={i} />
                            </motion.div>
                        ))}
                    </div>

                    {/* Enhanced "View All" Button */}
                    <motion.div
                        className="text-center mt-16" // Increased top margin
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <Link href="/projects" className={styles.viewAllButton}>
                            <span>Lihat Semua Proyek</span>
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    repeatType: "loop",
                                }}
                            >
                                →
                            </motion.span>
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
