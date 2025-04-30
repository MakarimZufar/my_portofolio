import { FaHome, FaInfoCircle, FaEnvelope, FaSuitcase } from "react-icons/fa";

// Data untuk navbar
export const navItems = [
    { href: "/", icon: FaHome, label: "Home" },
    { href: "/achievements", icon: FaInfoCircle, label: "Achievements" },
    { href: "/projects", icon: FaSuitcase, label: "Projects" },
    { href: "/contact", icon: FaEnvelope, label: "Contact" },
];

// Data untuk avatar
export const avatarIcons = ["👨‍💻", "🚀", "😎", "☕", "🧠", "🔥"];
export const avatarImages = ["/profile-image/boy_profile.png", "/profile-image/boy_profile_2.png"];
export const navSound = "/navbar-sound/click.mp3";