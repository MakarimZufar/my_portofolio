import React from "react";

/**
 * Component for Experience Section global styles
 */
const ExperienceStyles = () => {
    return (
        <style jsx global>{`
            .grid-bg {
                background-image: linear-gradient(
                        rgba(255, 255, 255, 0.03) 1px,
                        transparent 1px
                    ),
                    linear-gradient(
                        90deg,
                        rgba(255, 255, 255, 0.03) 1px,
                        transparent 1px
                    );
                background-size: 30px 30px;
            }

            .experience-card {
                transform-origin: center;
                filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.2));
            }

            .card-content {
                transition: all 0.3s ease;
                border: 1px solid rgba(255, 255, 255, 0.05);
            }

            .particle {
                position: absolute;
                width: var(--size);
                height: var(--size);
                border-radius: 50%;
                background-color: var(--color);
                left: var(--x);
                top: var(--y);
                animation: float var(--duration) linear infinite;
                animation-delay: var(--delay);
                filter: blur(1px);
            }

            @keyframes float {
                0% {
                    transform: translate(0, 0);
                    opacity: 0;
                }
                10% {
                    opacity: 0.8;
                }
                90% {
                    opacity: 0.5;
                }
                100% {
                    transform: translate(
                        calc(50px - 100px * Math.random()),
                        calc(-150px - 30px * Math.random())
                    );
                    opacity: 0;
                }
            }
        `}</style>
    );
};

export default ExperienceStyles;
