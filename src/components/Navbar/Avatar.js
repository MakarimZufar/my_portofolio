import { motion } from "framer-motion";
import Image from "next/image";

const Avatar = ({
    avatarIndex,
    pendingIndex,
    avatarIcon,
    lensActive,
    avatarImages,
    onAvatarClick,
}) => {
    return (
        <div className="relative w-[60px] h-[60px]">
            <motion.div
                key={avatarIndex}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full rounded-full overflow-hidden border-2 border-white shadow-md cursor-pointer hover:scale-110 transition-all bg-white relative z-10"
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
                    className="object-cover rounded-full transition-all duration-300"
                />
                {lensActive && (
                    <div className="absolute inset-0 z-20 spiral-in-mask"></div>
                )}
            </motion.div>
            <motion.span
                className="absolute -bottom-1.5 -right-1.5 text-2xl z-30 pointer-events-none drop-shadow-md"
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
