import { motion } from "framer-motion";
import { FaStar, FaExternalLinkAlt } from "react-icons/fa";
import Image from "next/image";
import TechBadge from "@/components/TechBadge";
import ProjectTag from "@/components/ProjectTag";

const ProjectCard = ({ project, index, onClick }) => {
    const {
        title,
        description,
        imageUrl,
        tags,
        technologies,
        emoji,
        featured,
    } = project;

    return (
        <motion.div
            onClick={() => onClick(project)}
            className="group relative overflow-hidden rounded-2xl border border-blue-500/10 bg-gradient-to-br from-gray-900/90 to-gray-950/90 p-0.5 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/10"
            whileHover={{
                y: -5,
                boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.15)",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
        >
            {/* Glowing Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-violet-600/20 to-cyan-600/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-xl"></div>

            {/* Card Content */}
            <div className="relative h-full rounded-2xl bg-gradient-to-br from-black/80 to-gray-900/90 p-5 backdrop-blur-md z-10 overflow-hidden">
                {/* Mesh Gradient Background */}
                <div className="absolute -inset-40 bg-mesh-gradient opacity-[0.03] z-0"></div>

                {/* Featured Badge */}
                {featured && (
                    <div className="absolute top-3 right-3 z-20">
                        <motion.div
                            className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-600 px-2 py-1 rounded-full text-xs font-semibold text-white shadow-lg"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <FaStar className="text-yellow-300" />
                            <span>Featured</span>
                        </motion.div>
                    </div>
                )}

                {/* Image Container */}
                <div className="overflow-hidden mb-4 relative aspect-video rounded-xl group-hover:shadow-lg transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>

                    {/* Project Image */}
                    <Image
                        src={imageUrl || "/projects/default-project.jpg"}
                        alt={title}
                        width={600}
                        height={340}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />

                    {/* Project Tags */}
                    <div className="absolute bottom-3 left-3 z-20 flex flex-wrap gap-1.5">
                        {tags.slice(0, 2).map((tag) => (
                            <ProjectTag key={tag} name={tag} size="small" />
                        ))}
                        {tags.length > 2 && (
                            <span className="text-xs text-gray-300 px-1.5 py-0.5 bg-black/50 backdrop-blur-sm rounded-md">
                                +{tags.length - 2}
                            </span>
                        )}
                    </div>

                    {/* Project Emoji */}
                    <div className="absolute top-3 left-3 z-20">
                        <motion.div
                            className="flex items-center justify-center w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm text-xl shadow-xl"
                            initial={{ scale: 0, rotate: -30 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.3, type: "spring" }}
                        >
                            {emoji}
                        </motion.div>
                    </div>
                </div>

                {/* Card Content */}
                <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100 group-hover:from-cyan-300 group-hover:to-white transition-all duration-300">
                        {title}
                    </h3>

                    <p className="text-gray-400 text-sm mb-4 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
                        {description}
                    </p>

                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {technologies.slice(0, 3).map((tech) => (
                            <TechBadge key={tech} name={tech} small={true} />
                        ))}
                        {technologies.length > 3 && (
                            <span className="text-[0.6rem] px-2 py-0.5 bg-gray-800 text-gray-400 rounded-full">
                                +{technologies.length - 3}
                            </span>
                        )}
                    </div>

                    {/* View Project Button */}
                    <div className="absolute bottom-0 left-0 right-0 py-3 opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
                        <div className="flex justify-center">
                            <motion.button
                                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 px-4 py-1.5 rounded-full text-white text-sm font-medium shadow-lg hover:shadow-blue-500/40 flex items-center gap-1.5"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span>View Project</span>
                                <FaExternalLinkAlt size={10} />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
