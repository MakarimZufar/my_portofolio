// HomePage with Flip Card and Tech Stack Carousel
"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import TechLayeredCarousel from "@/components/TechStackCarousel";
import TechBadge from "@/components/TechBadge";

const helloGreetings = [
    "Hello.",
    "Bonjour.",
    "こんにちは.",
    "Hola.",
    "안녕하세요.",
    "Ciao.",
    "Hallo.",
    "Salam.",
];
const roles = [
    "Full Stack Developer",
    "Web Developer",
    "Software Engineer",
    "UI/UX Enthusiast",
];
const contactMessages = [
    "✉️ Contact Me",
    "🚀 Let's Collaborate",
    "💡 Build a Project Together",
    "☕ Let's Connect",
    "⚒️ Work With Me",
];

export default function HomePage() {
    const [helloText, setHelloText] = useState("");
    const [helloIndex, setHelloIndex] = useState(0);
    const [isDeletingHello, setIsDeletingHello] = useState(false);
    const [typedRole, setTypedRole] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [roleIndex, setRoleIndex] = useState(0);
    const [messageIndex, setMessageIndex] = useState(0);
    const [cardState, setCardState] = useState("front");
    const cardRef = useRef(null);

    useEffect(() => {
        if (cardState !== "front") return;
        const current = helloGreetings[helloIndex];
        const speed = isDeletingHello ? 80 : 150;
        const timeout = setTimeout(() => {
            setHelloText((prev) =>
                isDeletingHello
                    ? current.substring(0, prev.length - 1)
                    : current.substring(0, prev.length + 1)
            );
            if (!isDeletingHello && helloText === current)
                setTimeout(() => setIsDeletingHello(true), 1000);
            else if (isDeletingHello && helloText === "") {
                setIsDeletingHello(false);
                setHelloIndex((prev) => (prev + 1) % helloGreetings.length);
            }
        }, speed);
        return () => clearTimeout(timeout);
    }, [helloText, isDeletingHello, helloIndex, cardState]);

    useEffect(() => {
        const current = roles[roleIndex];
        const speed = isDeleting ? 50 : 100;
        const timeout = setTimeout(() => {
            setTypedRole((prev) =>
                isDeleting
                    ? current.substring(0, prev.length - 1)
                    : current.substring(0, prev.length + 1)
            );
            if (!isDeleting && typedRole === current)
                setTimeout(() => setIsDeleting(true), 1000);
            else if (isDeleting && typedRole === "") {
                setIsDeleting(false);
                setRoleIndex((prev) => (prev + 1) % roles.length);
            }
        }, speed);
        return () => clearTimeout(timeout);
    }, [typedRole, isDeleting, roleIndex]);

    useEffect(() => {
        const interval = setInterval(
            () =>
                setMessageIndex((prev) => (prev + 1) % contactMessages.length),
            3000
        );
        return () => clearInterval(interval);
    }, []);

    const handleCardHover = () => cardState === "front" && setCardState("back");
    const handleCardLeave = () =>
        cardState !== "buttonHover" && setCardState("front");
    const handleButtonHover = () => setCardState("buttonHover");
    const handleButtonLeave = () => {
        if (cardRef.current) {
            const { left, right, top, bottom } =
                cardRef.current.getBoundingClientRect();
            const { clientX, clientY } = window.event;
            if (
                clientX >= left &&
                clientX <= right &&
                clientY >= top &&
                clientY <= bottom
            )
                setCardState("back");
            else setCardState("front");
        }
    };

    return (
        <main className="text-white overflow-x-hidden">
            <section className="relative h-screen flex flex-col items-center justify-center px-6 sm:px-20">
                <div className="absolute inset-0 -z-10 animate-futuristic-background" />
                <div className="absolute inset-0 -z-20 bg-gradient-to-tr from-[#0f0c29]/40 via-[#302b63]/30 to-[#24243e]/40" />
                <div
                    ref={cardRef}
                    className="relative w-full max-w-4xl aspect-[4/3]"
                    onMouseLeave={handleCardLeave}
                >
                    <div
                        className={`absolute top-0 left-0 right-0 h-full z-20 ${
                            cardState !== "front" ? "pointer-events-none" : ""
                        }`}
                        onMouseEnter={handleCardHover}
                    ></div>
                    <div
                        className={`w-full h-full transition-transform duration-[1800ms] ease-[cubic-bezier(0.77,0,0.175,1)] [transform-style:preserve-3d] rounded-3xl ${
                            cardState !== "front"
                                ? "[transform:rotateY(180deg)_scale(1.05)]"
                                : ""
                        }`}
                    >
                        <div className="absolute inset-0 bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl ring-1 ring-white/10 rounded-3xl flex flex-col items-center justify-center [backface-visibility:hidden]">
                            <motion.h1 className="text-6xl sm:text-7xl font-bold text-white font-[Pacifico] text-center">
                                {helloText}
                                <span className="animate-pulse">|</span>
                            </motion.h1>
                        </div>
                        <div className="absolute inset-0 bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl ring-1 ring-white/10 rounded-3xl p-8 flex flex-col items-center justify-center gap-6 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                            <div className="p-1 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-600 animate-pulse shadow-lg">
                                <Image
                                    src="/profile_image/boy_profile.png"
                                    alt="My Photo"
                                    width={150}
                                    height={150}
                                    className="rounded-full border-4 border-white dark:border-gray-700 shadow-xl"
                                />
                            </div>
                            <motion.h2
                                className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 drop-shadow-xl tracking-wide text-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={
                                    cardState !== "front"
                                        ? { opacity: 1, scale: 1 }
                                        : {}
                                }
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                Makarim Zufar Prambudyo
                            </motion.h2>
                            <motion.h3
                                className="text-lg sm:text-xl font-mono text-cyan-400 h-6 min-h-[1.5rem]"
                                initial={{ opacity: 0, x: -30 }}
                                animate={
                                    cardState !== "front"
                                        ? { opacity: 1, x: 0 }
                                        : {}
                                }
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                I&apos;m a {typedRole}
                                <span className="animate-ping ml-1">|</span>
                            </motion.h3>
                            <p className="text-base sm:text-lg text-gray-300 max-w-xl text-center">
                                I&apos;m passionate Computer Science student at
                                the University of Indonesia, with a strong
                                interest in both frontend and backend
                                development. I enjoy crafting seamless user
                                experiences, building scalable backend systems,
                                and continuously learning modern web
                                technologies to stay ahead in the tech industry.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4 mt-4">
                                <Link
                                    href="/projects"
                                    className="px-6 py-2 rounded-full bg-blue-600 text-white shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-[0_10px_20px_rgba(0,132,255,0.6)]"
                                    onMouseEnter={handleButtonHover}
                                    onMouseLeave={handleButtonLeave}
                                >
                                    🚀 View Projects
                                </Link>
                                <Link
                                    href="/contact"
                                    className="relative group px-6 py-2 rounded-full border border-blue-500 text-white bg-transparent shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-[0_10px_20px_rgba(0,255,255,0.5)]"
                                    onMouseEnter={handleButtonHover}
                                    onMouseLeave={handleButtonLeave}
                                >
                                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition duration-500 blur-sm rounded-full"></span>
                                    <span className="relative z-10 font-medium inline-block">
                                        {contactMessages[messageIndex]}
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
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
                <TechLayeredCarousel />
            </section>

            <section className="px-6 sm:px-20 py-20">
                <div className="max-w-7xl mx-auto bg-black/80 rounded-3xl shadow-2xl border border-white/10 p-8 sm:p-14">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-4">
                            Featured Projects
                        </h2>
                        <p className="text-gray-400 max-w-xl mx-auto">
                            Check out some of my recent work. These projects
                            showcase my skills and expertise in web development.
                        </p>
                    </div>

                    <div className="flex overflow-x-auto p-8 md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 scrollbar-hide snap-x snap-mandatory">
                        {["My-Portofolio", "Roso Jogja", "Soon Maybe"].map(
                            (title, i) => (
                                <motion.div
                                    key={title}
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
                                            {title}
                                        </h3>
                                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                            {i === 0
                                                ? "Portofolio pertama ku untuk menampilkan perjalanan, kemampuan, dan proyek-proyek yang telah saya buat. Dibangun dengan Next.js dan Tailwind CSS."
                                                : i === 1
                                                ? "RosoJogja adalah aplikasi kuliner yang dirancang khusus untuk membantu Anda menemukan dan memesan makanan atau minuman dari berbagai restoran dan tempat makan di Yogyakarta."
                                                : "Lorem ipsum dolor sit amet consectetur adipisicing elit."}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <TechBadge name="React" />
                                            <TechBadge
                                                name={
                                                    i === 1
                                                        ? "Node.js"
                                                        : "Firebase"
                                                }
                                            />
                                            <TechBadge name="Tailwind" />
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        )}
                    </div>

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
            </section>

            <style jsx>{`
                @import url("https://fonts.googleapis.com/css2?family=Pacifico&display=swap");

                @keyframes futuristicBackground {
                    0% {
                        background: linear-gradient(
                            135deg,
                            #0f0c29,
                            #302b63,
                            #24243e
                        );
                    }
                    50% {
                        background: linear-gradient(
                            135deg,
                            #1a1a2e,
                            #16213e,
                            #0f3460
                        );
                    }
                    100% {
                        background: linear-gradient(
                            135deg,
                            #0f0c29,
                            #302b63,
                            #24243e
                        );
                    }
                }

                .animate-futuristic-background {
                    animation: futuristicBackground 40s ease infinite;
                    background-size: 400% 400%;
                    background-position: center;
                }

                /* Hide scrollbar untuk Chrome, Safari dan Opera */
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }

                /* Hide scrollbar untuk IE, Edge dan Firefox */
                .scrollbar-hide {
                    -ms-overflow-style: none; /* IE and Edge */
                    scrollbar-width: none; /* Firefox */
                }
            `}</style>
        </main>
    );
}
