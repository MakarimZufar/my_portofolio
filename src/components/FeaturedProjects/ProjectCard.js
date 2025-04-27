import Link from "next/link";
import { motion } from "framer-motion";
import TechBadge from "@/components/TechBadge";
import styles from "./FeaturedProjects.module.css";

export default function ProjectCard({ project, index }) {
    const getEmoji = (index) => {
        if (index === 0) return "💻";
        if (index === 1) return "📱";
        return "📊";
    };

    return (
        <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.5,
                delay: index * 0.1,
            }}
            whileHover={{ y: -5 }}
        >
            <div className="relative h-48 overflow-hidden">
                <div className={styles.cardBackground}>
                    <span className="text-white text-5xl opacity-20">
                        {getEmoji(index)}
                    </span>
                </div>
                <div className={styles.cardOverlay}>
                    <div className={styles.buttonWrapper}>
                        <Link href="/projects" className={styles.detailButton}>
                            Lihat Detail
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
                    {project.technologies.slice(0, 3).map((tech) => (
                        <TechBadge key={tech} name={tech} />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
