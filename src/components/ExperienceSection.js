"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import styles from "@/styles/Experience.module.css";

// Data untuk timeline - diurutkan secara kronologis
const timelineData = [
    // Pendidikan
    {
        id: "edu-1",
        title: "SMA Negeri 1 Jakarta",
        category: "education",
        years: "2017 - 2020",
        tag: "MIPA",
        description:
            "Juara lomba informatika tingkat provinsi. Anggota klub pemrograman.",
        icon: "🎓",
        color: "#00c6ff",
    },
    {
        id: "edu-2",
        title: "Universitas Indonesia",
        category: "education",
        years: "2020 - 2024",
        tag: "Ilmu Komputer",
        description:
            "Fokus pada pengembangan aplikasi web dan mobile. IPK 3.8/4.0.",
        icon: "🎓",
        color: "#00c6ff",
    },
    // Pekerjaan
    {
        id: "work-1",
        title: "Freelance",
        category: "work",
        years: "2021 - 2022",
        tag: "UI/UX Designer",
        description:
            "Merancang antarmuka untuk beberapa aplikasi mobile dan website. Menerapkan prinsip desain yang responsif dan user-friendly.",
        icon: "💼",
        color: "#7928ca",
    },
    {
        id: "work-2",
        title: "Startup Lokal",
        category: "work",
        years: "2022 - 2023",
        tag: "Web Developer (Internship)",
        description:
            "Membangun dan memelihara website perusahaan menggunakan HTML, CSS, dan JavaScript. Berkolaborasi dengan tim desain untuk implementasi UI/UX.",
        icon: "💼",
        color: "#7928ca",
    },
    {
        id: "work-3",
        title: "PT Teknologi Indonesia",
        category: "work",
        years: "2023 - Sekarang",
        tag: "Frontend Developer (Part-time)",
        description:
            "Mengembangkan aplikasi web menggunakan React.js dan Next.js. Mengoptimalkan performa aplikasi dengan mengurangi waktu loading sebesar 40%.",
        icon: "💼",
        color: "#7928ca",
    },
];

// Komponen untuk tali yang menghubungkan dua card
const Rope = ({ startX, startY, endX, endY, tension, color, isActive }) => {
    const springConfig = { stiffness: 100, damping: 30 };
    const midX = useSpring(startX + (endX - startX) / 2, springConfig);
    const midY = useSpring(
        startY + (endY - startY) / 3 + tension,
        springConfig
    );

    useEffect(() => {
        midX.set(startX + (endX - startX) / 2);
        midY.set(startY + (endY - startY) / 3 + tension);
    }, [startX, startY, endX, endY, tension, midX, midY]);

    const path = `M ${startX} ${startY} Q ${midX.get()} ${midY.get()} ${endX} ${endY}`;

    return (
        <motion.path
            d={path}
            stroke={color}
            strokeWidth={3}
            fill="transparent"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
                pathLength: 1,
                opacity: 1,
                d: path,
            }}
            transition={{
                duration: 2,
                ease: "easeInOut",
            }}
            className={isActive ? "filter-shadow" : ""}
        />
    );
};

// Komponen timeline item yang bisa ditarik
const TimelineItem = ({
    item,
    index,
    isActive,
    onActivate,
    updatePosition,
}) => {
    const itemRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Efek scale saat ditarik
    const scale = useTransform(
        x,
        [-100, 0, 100],
        isActive ? [0.95, 1.05, 0.95] : [0.97, 1, 0.97]
    );

    // Update posisi saat drag
    const handleDrag = (event, info) => {
        if (itemRef.current) {
            const rect = itemRef.current.getBoundingClientRect();
            updatePosition(item.id, rect.x + rect.width / 2, rect.y);
        }
    };

    // Update posisi awal setelah rendering
    useEffect(() => {
        const updateItemPosition = () => {
            if (itemRef.current) {
                const rect = itemRef.current.getBoundingClientRect();
                updatePosition(item.id, rect.x + rect.width / 2, rect.y);
            }
        };

        updateItemPosition();
        window.addEventListener("resize", updateItemPosition);

        return () => {
            window.removeEventListener("resize", updateItemPosition);
        };
    }, [item.id, updatePosition]);

    return (
        <motion.div
            ref={itemRef}
            className={`${styles.timelineCard} relative ml-8 mb-16`}
            drag
            dragConstraints={{
                left: -50,
                right: 50,
                top: -20,
                bottom: 20,
            }}
            dragElastic={0.1}
            dragTransition={{ bounceStiffness: 500, bounceDamping: 20 }}
            whileDrag={{ scale: 1.05, zIndex: 10 }}
            onDrag={handleDrag}
            onDragEnd={handleDrag}
            onClick={() => onActivate(item.id)}
            style={{ x, y, scale }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
            }}
        >
            {/* Marker untuk timeline */}
            <div
                className={`absolute -left-9 w-7 h-7 rounded-full bg-[${
                    item.color
                }] flex items-center justify-center z-10 shadow-lg ${
                    item.category === "education"
                        ? styles["glow-blue-pulse"]
                        : styles["glow-purple-pulse"]
                }`}
            >
                <span className="text-xs text-white">{item.icon}</span>
            </div>

            {/* Indikator drag */}
            <div className={styles.dragIndicator}>↔️ Tarik</div>

            {/* Card content */}
            <motion.div
                className={`${styles.cardContent} bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-[${item.color}]/30 transition-all duration-300 group shadow-xl`}
                whileHover={{ y: -5 }}
                animate={{
                    boxShadow: isActive
                        ? `0 0 25px 5px ${item.color}30`
                        : `0 5px 15px 0px rgba(0,0,0,0.1)`,
                }}
            >
                <h4
                    className={`text-xl font-bold text-white mb-2 group-hover:text-[${item.color}] transition-colors`}
                >
                    {item.title}
                </h4>

                <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span
                        className={`px-3 py-1 bg-[${item.color}]/10 text-[${item.color}]/90 text-xs rounded-full`}
                    >
                        {item.years}
                    </span>
                    <span className="px-3 py-1 bg-[#ff0080]/10 text-[#ff0080]/90 text-xs rounded-full">
                        {item.tag}
                    </span>
                </div>

                <p className="text-white/70">{item.description}</p>

                <div className="absolute inset-0 -z-10 rounded-xl opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/5 to-transparent blur-xl transition-opacity" />
            </motion.div>
        </motion.div>
    );
};

// Komponen utama ExperienceSection
const ExperienceSection = () => {
    const [activeItem, setActiveItem] = useState(null);
    const [positions, setPositions] = useState({});
    const svgRef = useRef(null);

    // Menangani aktivasi item
    const handleActivate = (id) => {
        setActiveItem(id === activeItem ? null : id);
    };

    // Update posisi item
    const updatePosition = (id, x, y) => {
        setPositions((prev) => ({
            ...prev,
            [id]: { x, y },
        }));
    };

    return (
        <section className="w-full py-16 md:py-24 px-6 sm:px-12 md:px-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl font-bold text-white mb-3">
                    Perjalanan Karir
                </h2>
                <p className="text-white/60 max-w-xl mx-auto">
                    Tarik card untuk melihat bagaimana tali bergerak,
                    menggambarkan perjalanan pendidikan dan karir saya.
                </p>
            </motion.div>

            <div
                className={`${styles.timelineContainer} max-w-5xl mx-auto relative`}
            >
                {/* SVG untuk tali-tali yang menghubungkan */}
                <svg
                    ref={svgRef}
                    width="100%"
                    height="100%"
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{ overflow: "visible" }}
                >
                    <defs>
                        {/* Filter untuk efek glow pada tali */}
                        <filter
                            id="glow"
                            x="-20%"
                            y="-20%"
                            width="140%"
                            height="140%"
                        >
                            <feGaussianBlur
                                stdDeviation="2.5"
                                result="coloredBlur"
                            />
                            <feFlood
                                floodColor="#00c6ff"
                                floodOpacity="0.5"
                                result="blue-glow"
                            />
                            <feComposite
                                in="blue-glow"
                                in2="coloredBlur"
                                operator="in"
                                result="blue-glow-blur"
                            />
                            <feFlood
                                floodColor="#7928ca"
                                floodOpacity="0.5"
                                result="purple-glow"
                            />
                            <feComposite
                                in="purple-glow"
                                in2="coloredBlur"
                                operator="in"
                                result="purple-glow-blur"
                            />
                            <feMerge>
                                <feMergeNode in="blue-glow-blur" />
                                <feMergeNode in="purple-glow-blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>

                        {/* Gradient untuk transisi pendidikan ke pekerjaan */}
                        <linearGradient
                            id="educationToWork"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                        >
                            <stop offset="0%" stopColor="#00c6ff" />
                            <stop offset="100%" stopColor="#7928ca" />
                        </linearGradient>
                    </defs>

                    {/* Menggambar tali yang menghubungkan antar item */}
                    {Object.keys(positions).length >= 2 &&
                        timelineData.slice(0, -1).map((item, i) => {
                            const currentId = item.id;
                            const nextId = timelineData[i + 1].id;

                            if (positions[currentId] && positions[nextId]) {
                                const startX = positions[currentId].x;
                                const startY = positions[currentId].y + 100; // Offset bawah card
                                const endX = positions[nextId].x;
                                const endY = positions[nextId].y; // Posisi atas card berikutnya

                                // Tension lebih besar jika item aktif
                                const tension =
                                    activeItem === currentId ||
                                    activeItem === nextId
                                        ? 50
                                        : 20;

                                // Menentukan warna tali berdasarkan transisi kategori
                                let ropeColor;
                                if (
                                    item.category ===
                                    timelineData[i + 1].category
                                ) {
                                    // Sama kategori, gunakan warna kategori
                                    ropeColor = item.color;
                                } else {
                                    // Beda kategori (transisi), gunakan gradient
                                    ropeColor = "url(#educationToWork)";
                                }

                                return (
                                    <Rope
                                        key={`rope-${i}`}
                                        startX={startX}
                                        startY={startY}
                                        endX={endX}
                                        endY={endY}
                                        tension={tension}
                                        color={ropeColor}
                                        isActive={
                                            activeItem === currentId ||
                                            activeItem === nextId
                                        }
                                    />
                                );
                            }
                            return null;
                        })}
                </svg>

                {/* Timeline items */}
                <div className="relative border-l-2 border-gray-800/50 ml-4 pl-4 pt-2">
                    {timelineData.map((item, index) => (
                        <TimelineItem
                            key={item.id}
                            item={item}
                            index={index}
                            isActive={activeItem === item.id}
                            onActivate={handleActivate}
                            updatePosition={updatePosition}
                        />
                    ))}
                </div>
            </div>

            {/* CSS untuk efek filter pada tali */}
            <style jsx global>{`
                .filter-shadow {
                    filter: url(#glow);
                }
            `}</style>
        </section>
    );
};

export default ExperienceSection;
