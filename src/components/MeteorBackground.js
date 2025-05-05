"use client";
import React, { useEffect, useRef } from "react";

const MeteorBackground = () => {
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

        // Array untuk menyimpan meteor dan bintang
        const meteors = [];
        const stars = [];
        const meteorCount = 30; // Jumlah meteor yang akan dibuat
        const starCount = 150; // Jumlah bintang latar di background

        // Parameter mouse untuk interaktivitas
        let mouse = {
            x: undefined,
            y: undefined,
            radius: 100, // Radius interaksi dengan mouse
        };

        window.addEventListener("mousemove", (event) => {
            mouse.x = event.x;
            mouse.y = event.y;
        });

        // Kelas untuk bintang di background
        class Star {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2;
                this.twinkleSpeed = 0.01 + Math.random() * 0.05;
                this.alpha = Math.random();
                this.alphaDirection = Math.random() > 0.5 ? 1 : -1;
            }

            update() {
                // Efek berkelap-kelip
                this.alpha += this.twinkleSpeed * this.alphaDirection;

                if (this.alpha >= 1 || this.alpha <= 0.3) {
                    this.alphaDirection *= -1;
                }

                this.draw();
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
                ctx.fill();
            }
        }

        // Kelas Meteor yang ditingkatkan
        class Meteor {
            constructor() {
                this.reset();
                // Saat inisialisasi, posisikan meteor secara acak
                this.y = Math.random() * canvas.height;
            }

            reset() {
                // Posisi awal - di luar layar bagian atas
                this.x =
                    Math.random() * canvas.width * 1.5 - canvas.width * 0.25;
                this.y = -100;

                // Kecepatan dan ukuran
                this.baseSpeed = 1 + Math.random() * 7;
                this.speed = this.baseSpeed;
                this.size = 1 + Math.random() * 3;

                // Arah jatuh
                const angle = Math.PI / 4 + (Math.random() * Math.PI) / 4; // Antara 45-90 derajat
                this.speedX = Math.cos(angle) * this.speed;
                this.speedY = Math.sin(angle) * this.speed;

                // Warna dan ekor
                this.brightness = 0.5 + Math.random() * 0.5;
                this.color = this.getRandomColor();
                this.tailLength = 15 + Math.random() * 35;
                this.history = [];

                // Partikel kecil yang mengikuti meteor
                this.particles = [];
                this.particleCount = Math.floor(5 + Math.random() * 8);

                // Menambahkan efek "flare" secara acak
                this.hasFlare = Math.random() > 0.7;
                this.flareSize = this.size * (2 + Math.random() * 2);
                this.flareIntensity = 0.4 + Math.random() * 0.4;
            }

            getRandomColor() {
                // Array warna untuk meteor
                const colors = [
                    `rgba(255, 255, 255, ${this.brightness})`, // Putih
                    `rgba(255, 220, 100, ${this.brightness})`, // Kuning keemasan
                    `rgba(255, 150, 50, ${this.brightness})`, // Oranye
                    `rgba(220, 220, 255, ${this.brightness})`, // Biru muda
                    `rgba(200, 255, 255, ${this.brightness * 0.8})`, // Cyan
                    `rgba(255, 120, 80, ${this.brightness})`, // Merah oranye
                ];
                return colors[Math.floor(Math.random() * colors.length)];
            }

            createParticles() {
                // Buat partikel kecil yang mengikuti meteor
                if (
                    Math.random() > 0.7 &&
                    this.particles.length < this.particleCount
                ) {
                    this.particles.push({
                        x: this.x,
                        y: this.y,
                        size: 0.5 + Math.random() * 1,
                        speedX: (Math.random() - 0.5) * 2,
                        speedY: (Math.random() - 0.5) * 2,
                        life: 30 + Math.random() * 20,
                        maxLife: 50,
                        color: this.color,
                    });
                }

                // Update partikel
                for (let i = 0; i < this.particles.length; i++) {
                    const p = this.particles[i];
                    p.x += p.speedX;
                    p.y += p.speedY;
                    p.life--;

                    // Gambar partikel
                    if (p.life > 0) {
                        ctx.beginPath();
                        ctx.arc(
                            p.x,
                            p.y,
                            p.size * (p.life / p.maxLife),
                            0,
                            Math.PI * 2
                        );
                        // Fix: Properly modify alpha value instead of appending a new one
                        ctx.fillStyle = p.color.replace(
                            /rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d\.]+\)/,
                            (match, r, g, b) =>
                                `rgba(${r}, ${g}, ${b}, ${p.life / p.maxLife})`
                        );
                        ctx.fill();
                    }
                }

                // Hapus partikel yang sudah habis masa hidupnya
                this.particles = this.particles.filter((p) => p.life > 0);
            }

            update() {
                // Check jika mendekati mouse
                if (mouse.x && mouse.y) {
                    const dx = this.x - mouse.x;
                    const dy = this.y - mouse.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouse.radius) {
                        // Sedikit berbelok menghindari mouse
                        const angle = Math.atan2(dy, dx);
                        const force = (mouse.radius - distance) / mouse.radius;
                        this.speedX += Math.cos(angle) * force * 0.2;
                        this.speedY += Math.sin(angle) * force * 0.2;
                    }
                }

                // Simpan posisi saat ini ke history untuk membuat ekor
                this.history.push({ x: this.x, y: this.y });

                // Batasi panjang history sesuai dengan panjang ekor yang diinginkan
                if (this.history.length > this.tailLength) {
                    this.history.shift();
                }

                // Perbarui posisi
                this.x += this.speedX;
                this.y += this.speedY;

                // Buat partikel
                this.createParticles();

                // Gambar meteor dan ekornya
                this.draw();

                // Reset meteor jika sudah keluar dari layar
                if (
                    this.y > canvas.height + 100 ||
                    this.x < -100 ||
                    this.x > canvas.width + 100
                ) {
                    this.reset();
                }
            }

            draw() {
                // Gambar ekor meteor
                if (this.history.length > 2) {
                    ctx.beginPath();

                    // Set gradien untuk ekor
                    const gradient = ctx.createLinearGradient(
                        this.history[0].x,
                        this.history[0].y,
                        this.x,
                        this.y
                    );

                    gradient.addColorStop(0, "rgba(255, 255, 255, 0)");

                    // Fix: Properly modify the rgba color for gradient
                    const tailColor = this.color.replace(
                        /rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d\.]+\)/,
                        (match, r, g, b) => `rgba(${r}, ${g}, ${b}, 0.2)`
                    );
                    gradient.addColorStop(0.4, tailColor);
                    gradient.addColorStop(1, this.color);

                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = this.size;
                    ctx.lineCap = "round";

                    // Mulai dari ujung ekor
                    ctx.moveTo(this.history[0].x, this.history[0].y);

                    // Buat kurva melalui titik-titik history
                    for (let i = 1; i < this.history.length; i++) {
                        const xc =
                            (this.history[i].x + this.history[i - 1].x) / 2;
                        const yc =
                            (this.history[i].y + this.history[i - 1].y) / 2;
                        ctx.quadraticCurveTo(
                            this.history[i - 1].x,
                            this.history[i - 1].y,
                            xc,
                            yc
                        );
                    }

                    // Hubungkan ke posisi saat ini
                    ctx.lineTo(this.x, this.y);
                    ctx.stroke();
                }

                // Gambar flare (efek kilau) jika meteor memiliki flare
                if (this.hasFlare) {
                    ctx.beginPath();
                    const flareGradient = ctx.createRadialGradient(
                        this.x,
                        this.y,
                        0,
                        this.x,
                        this.y,
                        this.flareSize
                    );
                    flareGradient.addColorStop(
                        0,
                        `rgba(255, 255, 255, ${this.flareIntensity})`
                    );
                    flareGradient.addColorStop(
                        0.5,
                        `rgba(255, 200, 50, ${this.flareIntensity * 0.5})`
                    );
                    flareGradient.addColorStop(1, "rgba(255, 100, 50, 0)");

                    ctx.arc(this.x, this.y, this.flareSize, 0, Math.PI * 2);
                    ctx.fillStyle = flareGradient;
                    ctx.fill();
                }

                // Gambar kepala meteor
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();

                // Tambah kilau di kepala meteor
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 1.5, 0, Math.PI * 2);
                const headGlow = ctx.createRadialGradient(
                    this.x,
                    this.y,
                    this.size * 0.5,
                    this.x,
                    this.y,
                    this.size * 1.5
                );
                headGlow.addColorStop(0, this.color);
                headGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
                ctx.fillStyle = headGlow;
                ctx.fill();
            }
        }

        // Inisialisasi bintang dan meteor
        const init = () => {
            // Buat bintang
            for (let i = 0; i < starCount; i++) {
                stars.push(new Star());
            }

            // Buat meteor
            for (let i = 0; i < meteorCount; i++) {
                const meteor = new Meteor();
                // Posisikan meteor secara acak untuk awal animasi
                meteor.y = Math.random() * canvas.height;
                meteor.x = Math.random() * canvas.width;

                // Isi history agar ekor terbentuk sejak awal
                for (let j = 0; j < 10; j++) {
                    meteor.history.push({
                        x: meteor.x - meteor.speedX * j,
                        y: meteor.y - meteor.speedY * j,
                    });
                }

                meteors.push(meteor);
            }
        };

        // Connect stars with lines if they are close, similar to InteractiveBackground
        const connectStars = () => {
            let opacityValue = 1;
            for (let a = 0; a < stars.length; a++) {
                for (let b = a; b < stars.length; b++) {
                    let dx = stars[a].x - stars[b].x;
                    let dy = stars[a].y - stars[b].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    // Only connect stars that are within a certain distance
                    if (distance < 100) {
                        opacityValue = 1 - distance / 100;
                        ctx.strokeStyle = `rgba(255, 255, 255, ${
                            opacityValue * 0.2
                        })`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(stars[a].x, stars[a].y);
                        ctx.lineTo(stars[b].x, stars[b].y);
                        ctx.stroke();
                    }
                }
            }
        };

        // Loop animasi
        const animate = () => {
            // Bersihkan canvas dengan transparansi untuk efek trailing
            ctx.fillStyle = "rgba(10, 10, 30, 0.1)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Update dan gambar bintang
            stars.forEach((star) => {
                star.update();
            });

            // Connect close stars with lines, similar to InteractiveBackground
            connectStars();

            // Update dan gambar semua meteor
            meteors.forEach((meteor) => {
                meteor.update();
            });

            // Tambahkan efek overlay untuk memberikan tampilan yang lebih kaya
            const overlay = ctx.createRadialGradient(
                canvas.width / 2,
                canvas.height / 2,
                0,
                canvas.width / 2,
                canvas.height / 2,
                canvas.width
            );

            overlay.addColorStop(0, "rgba(10, 10, 30, 0)");
            overlay.addColorStop(1, "rgba(10, 10, 30, 0.1)");

            ctx.fillStyle = overlay;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            animationFrameId = requestAnimationFrame(animate);
        };

        // Mulai animasi
        init();
        animate();

        // Cleanup function
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
            style={{ opacity: 0.8 }}
        />
    );
};

export default MeteorBackground;
