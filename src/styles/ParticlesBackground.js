import React from "react";

/**
 * Renders decorative floating particles
 */
const ParticlesBackground = ({ count = 30 }) => {
    return (
        <div className="absolute inset-0 particles-container pointer-events-none">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="particle"
                    style={{
                        "--x": `${Math.random() * 100}%`,
                        "--y": `${Math.random() * 100}%`,
                        "--duration": `${10 + Math.random() * 30}s`,
                        "--delay": `${Math.random() * 5}s`,
                        "--size": `${2 + Math.random() * 3}px`,
                        "--color":
                            Math.random() > 0.6
                                ? "rgba(0, 198, 255, 0.6)"
                                : Math.random() > 0.3
                                ? "rgba(121, 40, 202, 0.6)"
                                : "rgba(255, 255, 255, 0.3)",
                    }}
                ></div>
            ))}
        </div>
    );
};

export default ParticlesBackground;
