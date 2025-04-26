// src/components/Navbar/NavItem.js
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./Navbar.module.css";

const NavItem = ({ href, Icon, label, isActive, onClick, index }) => {
    return (
        <motion.div
            key={href}
            layout
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ y: 60, scale: 0.95, opacity: 1 }}
            transition={{
                delay: index * 0.2,
                duration: 0.5,
                ease: "easeOut",
            }}
        >
            <Link
                href={href}
                onClick={(e) => {
                    e.preventDefault();
                    onClick(href);
                }}
                className="relative group"
            >
                <div
                    className={`${styles.navItemContainer} ${
                        isActive ? styles.navItemActive : styles.navItemInactive
                    }`}
                >
                    {isActive && (
                        <span
                            className={`${styles.activeGlow} ${styles.animateGlow}`}
                        />
                    )}
                    {isActive && (
                        <span
                            className={`${styles.activeRipple} ${styles.animateRipple}`}
                        />
                    )}
                    <motion.span
                        className={`${styles.iconWrapper} ${
                            isActive ? styles.iconActive : styles.iconInactive
                        }`}
                        animate={{
                            scale: isActive ? 1.3 : 1,
                            opacity: isActive ? 1 : 0.9,
                        }}
                        transition={{
                            repeat: Infinity,
                            repeatType: "mirror",
                            duration: 4,
                            ease: "easeInOut",
                        }}
                    >
                        <Icon size={22} />
                    </motion.span>
                    <span className={styles.navTooltip}>{label}</span>
                </div>
            </Link>
        </motion.div>
    );
};

export default NavItem;
