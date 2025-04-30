// src/components/Navbar/styles.js
export const navbarStyles = `
    @keyframes ripple {
        0% {
            transform: scale(1);
            opacity: 0.4;
        }
        100% {
            transform: scale(2.5);
            opacity: 0;
        }
    }
    .animate-ripple {
        animation: ripple 1.2s ease-out infinite;
    }
    
    @keyframes pulse-slow {
        0%, 100% {
            opacity: 0.2;
        }
        50% {
            opacity: 0.5;
        }
    }
    .animate-pulse-slow {
        animation: pulse-slow 2s ease-in-out infinite;
    }
    
    @keyframes glow {
        0%, 100% {
            opacity: 0.3;
            transform: scale(1);
        }
        50% {
            opacity: 0.8;
            transform: scale(1.05);
        }
    }
    .animate-glow {
        animation: glow 2s ease-in-out infinite;
    }
    
    @keyframes spiralInCover {
        0% {
            transform: rotate(0deg) scale(1);
            clip-path: circle(100%);
        }
        100% {
            transform: rotate(1080deg) scale(0);
            clip-path: circle(0%);
        }
    }
    
    .spiral-in-mask {
        background: conic-gradient(black 0deg, black 360deg);
        animation: spiralInCover 0.8s ease-in-out forwards;
        clip-path: circle(100%);
    }
    
    .pulse-overlay {
        background: radial-gradient(
            circle at center,
            rgba(255, 255, 255, 0.3) 40%,
            transparent 70%
        );
        border-radius: 9999px;
        padding: 4px;
    }
    
    /* Animasi untuk item navigasi saat avatar diklik */
    @keyframes itemGlow {
        0% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
        }
        50% {
            box-shadow: 0 0 10px 2px rgba(59, 130, 246, 0.7);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
        }
    }
    
    .nav-item-glow {
        animation: itemGlow 0.6s ease-in-out;
    }
    
    /* Circular animation for secret mode */
    @keyframes circleMove {
        0% {
            transform: rotate(calc(var(--circle-offset))) translateX(20px) rotate(calc(-1 * var(--circle-offset)));
        }
        100% {
            transform: rotate(calc(var(--circle-offset) + 360deg)) translateX(20px) rotate(calc(-1 * var(--circle-offset) - 360deg));
        }
    }
    
    .nav-item-circle {
        animation: circleMove 8s calc(var(--animation-delay)) infinite linear;
        transform-origin: center;
    }
    
    /* Efek partikel */
    @keyframes particleMove {
        0% {
            transform: translateY(0) rotate(0);
            opacity: 0;
        }
        20% {
            opacity: 1;
        }
        100% {
            transform: translateY(-40px) rotate(360deg);
            opacity: 0;
        }
    }
    
    /* Secret mode animations */
    @keyframes rotate360 {
        0% {
            transform: translateX(-50%) rotate(0deg);
        }
        100% {
            transform: translateX(-50%) rotate(360deg);
        }
    }
    
    .rotate-360 {
        animation: rotate360 1s ease-in-out;
    }
    
    @keyframes rainbowBorder {
        0% { border-color: rgba(239, 68, 68, 0.5); }
        16.6% { border-color: rgba(249, 115, 22, 0.5); }
        33.3% { border-color: rgba(234, 179, 8, 0.5); }
        50% { border-color: rgba(34, 197, 94, 0.5); }
        66.6% { border-color: rgba(59, 130, 246, 0.5); }
        83.3% { border-color: rgba(168, 85, 247, 0.5); }
        100% { border-color: rgba(239, 68, 68, 0.5); }
    }
    
    .rainbow-border {
        animation: rainbowBorder 3s linear infinite;
        border-width: 2px;
        border-style: solid;
    }
    
    /* Shimmer effect */
    @keyframes shimmer {
        0% {
            background-position: -100% 0;
        }
        100% {
            background-position: 100% 0;
        }
    }
    
    .shimmer-bg {
        background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.2) 25%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0) 100%
        );
        background-size: 200% 100%;
        animation: shimmer 2s infinite;
    }
`;
