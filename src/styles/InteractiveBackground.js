"use client";
import React, { useEffect, useRef } from "react";

const InteractiveBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let animationFrameId;

        // Set canvas ukuran penuh
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        // Parameter untuk particle
        const particlesArray = [];
        const numberOfParticles = 100;

        // Mouse position untuk interaktivitas
        let mouse = {
            x: null,
            y: null,
            radius: 150,
        };

        window.addEventListener("mousemove", (event) => {
            mouse.x = event.x;
            mouse.y = event.y;
        });

        // Class untuk particle
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = Math.random() * 20 + 1;
                this.opacity = Math.random() * 0.5 + 0.2;
                this.color = this.getRandomColor();
            }

            getRandomColor() {
                const colors = [
                    "rgba(78, 84, 200, 0.6)", // Indigo
                    "rgba(72, 149, 239, 0.6)", // Blue
                    "rgba(86, 204, 242, 0.6)", // Cyan
                    "rgba(111, 85, 219, 0.6)", // Purple
                ];
                return colors[Math.floor(Math.random() * colors.length)];
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity;
                ctx.fill();
            }

            update() {
                // Periksa jarak dari mouse
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;

                // Max distance, past that the force will be 0
                const maxDistance = 150;
                let force = (maxDistance - distance) / maxDistance;

                // Jika di luar radius, force menjadi 0
                if (force < 0) force = 0;

                // Movement based on mouse position
                let directionX = forceDirectionX * force * this.density * 0.9;
                let directionY = forceDirectionY * force * this.density * 0.9;

                if (distance < mouse.radius + this.size) {
                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    if (this.x !== this.baseX) {
                        let dx = this.x - this.baseX;
                        this.x -= dx / 10;
                    }
                    if (this.y !== this.baseY) {
                        let dy = this.y - this.baseY;
                        this.y -= dy / 10;
                    }
                }

                this.draw();
            }
        }

        // Init particles
        const init = () => {
            particlesArray.length = 0;
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        };

        init();

        // Animation
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Connect close particles with lines
            connectParticles();

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        // Connect particles with lines if they are close
        const connectParticles = () => {
            let opacityValue = 1;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let dx = particlesArray[a].x - particlesArray[b].x;
                    let dy = particlesArray[a].y - particlesArray[b].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        opacityValue = 1 - distance / 120;
                        ctx.strokeStyle = `rgba(90, 90, 150, ${
                            opacityValue * 0.4
                        })`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        };

        animate();

        // Cleanup
        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", null);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
            style={{ opacity: 0.7 }}
        />
    );
};

export default InteractiveBackground;
