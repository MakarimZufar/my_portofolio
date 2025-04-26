// src/components/Navbar/Avatar.js
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./Navbar.module.css";

const Avatar = ({
    avatarIndex,
    pendingIndex,
    avatarIcon,
    lensActive,
    avatarImages,
    onAvatarClick,
}) => {
    return (
        <div className={styles.avatarContainer}>
            <motion.div
                key={avatarIndex}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4 }}
                className={styles.avatarWrapper}
                onClick={onAvatarClick}
            >
                <Image
                    src={
                        avatarImages[
                            pendingIndex !== null ? pendingIndex : avatarIndex
                        ]
                    }
                    alt="Avatar"
                    fill
                    className={styles.avatarImage}
                />
                {lensActive && <div className={styles.spiralMask}></div>}
            </motion.div>
            <motion.span
                className={styles.avatarEmoji}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    delay: 2,
                }}
            >
                {avatarIcon}
            </motion.span>
        </div>
    );
};

export default Avatar;
