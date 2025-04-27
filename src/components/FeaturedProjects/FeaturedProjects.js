import Link from "next/link";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { getFeaturedProjects } from "@/data/projectsData";
import styles from "./FeaturedProjects.module.css";

export default function FeaturedProjects() {
    const featuredProjects = getFeaturedProjects();

    return (
        <section className="px-6 sm:px-20 py-20 w-full flex flex-col items-center">
            <div className={styles.container}>
                <div className={styles.innerContainer}>
                    {/* Title */}
                    <div className="text-center mb-10">
                        <h2 className={styles.sectionTitle}>
                            Featured Projects
                        </h2>
                        <p className="text-gray-400 max-w-xl mx-auto">
                            Check out some of my recent work. These projects
                            showcase my skills and expertise in web development.
                        </p>
                    </div>

                    {/* Project Cards */}
                    <div className={styles.projectGrid}>
                        {featuredProjects.map((project, i) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={i}
                            />
                        ))}
                    </div>

                    {/* Button View All */}
                    <div className="text-center mt-8">
                        <Link href="/projects" className={styles.viewAllButton}>
                            <span>Lihat Semua Proyek</span>
                            <span>→</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
