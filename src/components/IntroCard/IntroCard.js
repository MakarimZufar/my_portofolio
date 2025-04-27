"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    helloGreetings,
    roles,
    contactMessages,
    personalInfo,
} from "@/data/homeData";
import styles from "./IntroCard.module.css";

export default function IntroCard() {
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
        <div
            ref={cardRef}
            className="relative w-full max-w-4xl aspect-[4/3]"
            onMouseLeave={handleCardLeave}
        >
            <div
                className="absolute top-0 left-0 right-0 h-full z-20"
                style={{
                    pointerEvents: cardState !== "front" ? "none" : "auto",
                }}
                onMouseEnter={handleCardHover}
            ></div>
            <div
                className={`${styles.flipCard} ${
                    cardState !== "front" ? styles.flipCardFlipped : ""
                } w-full h-full rounded-3xl`}
            >
                {/* Card Front Side */}
                <div className={`${styles.cardFace} ${styles.cardFront}`}>
                    <motion.h1 className="text-6xl sm:text-7xl font-bold text-white font-[Pacifico] text-center">
                        {helloText}
                        <span className="animate-pulse">|</span>
                    </motion.h1>
                </div>

                {/* Card Back Side */}
                <div className={`${styles.cardFace} ${styles.cardBack}`}>
                    <div className="p-1 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-600 animate-pulse shadow-lg">
                        <Image
                            src={personalInfo.profileImage}
                            alt={personalInfo.name}
                            width={150}
                            height={150}
                            className="rounded-full border-4 border-white dark:border-gray-700 shadow-xl"
                        />
                    </div>

                    <motion.h2
                        className={styles.nameTitle}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={
                            cardState !== "front"
                                ? { opacity: 1, scale: 1 }
                                : {}
                        }
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        {personalInfo.name}
                    </motion.h2>

                    <motion.h3
                        className="text-lg sm:text-xl font-mono text-cyan-400 h-6 min-h-[1.5rem]"
                        initial={{ opacity: 0, x: -30 }}
                        animate={
                            cardState !== "front" ? { opacity: 1, x: 0 } : {}
                        }
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        I&apos;m a {typedRole}
                        <span className="animate-ping ml-1">|</span>
                    </motion.h3>

                    <p className="text-base sm:text-lg text-gray-300 max-w-xl text-center">
                        {personalInfo.description}
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
    );
}
