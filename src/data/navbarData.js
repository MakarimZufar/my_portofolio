// src/data/navbarData.js
import { FaHome, FaInfoCircle, FaEnvelope, FaSuitcase } from "react-icons/fa";

// Avatar emoticons (using unicode for emoji)
export const avatarIcons = [
    "\u{1F468}\u200D\u{1F4BB}", // 👨‍💻
    "\u{1F680}", // 🚀
    "\u{1F60E}", // 😎
    "\u{2615}", // ☕
    "\u{1F9E0}", // 🧠
    "\u{1F525}", // 🔥
];

// Profile images for avatar
export const avatarImages = [
    "/profile_image/boy_profile.png",
    "/profile_image/boy_profile_2.png",
];

// Navigation menu items
export const navItems = [
    { href: "/", icon: FaHome, label: "Home" },
    { href: "/about", icon: FaInfoCircle, label: "About" },
    { href: "/projects", icon: FaSuitcase, label: "Projects" },
    { href: "/contact", icon: FaEnvelope, label: "Contact" },
];
