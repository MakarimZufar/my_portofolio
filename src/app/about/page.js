export default function AboutPage() {
    return (
        <main className="pt-30 flex flex-col items-center min-h-screen px-6 sm:px-20 py-16 gap-6 text-center bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
            <h1 className="text-3xl font-bold mb-4 text-center">
                Tentang Saya
            </h1>
            <p className="text-lg leading-relaxed">
                Halo! Saya adalah seorang pengembang web yang suka eksplorasi
                teknologi baru. Proyek ini adalah portofolio pribadi saya yang
                dibuat sambil belajar Next.js dan Tailwind CSS.
            </p>
        </main>
    );
}
