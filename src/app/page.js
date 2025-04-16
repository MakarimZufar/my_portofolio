import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen px-6 sm:px-20 py-16 gap-6 text-center">
            {/* Foto/Avatar */}
            <Image
                src="/boy_profile.png"
                alt="Foto saya"
                width={150}
                height={150}
                className="rounded-full border-4 border-white shadow-lg"
            />

            {/* Perkenalan */}
            <h1 className="text-3xl sm:text-4xl font-bold">
                Halo, saya Makarim Zufar Prambudyo 👋
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-xl">
                Saya adalah seorang pengembang web yang sedang belajar Next.js,
                Tailwind CSS, dan Git. Ini adalah proyek portofolio pribadi
                saya.
            </p>

            {/* Tombol navigasi */}
            <div className="flex flex-wrap justify-center gap-4 mt-6">
                <Link
                    href="/projects"
                    className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
                >
                    Lihat Proyek
                </Link>
                <Link
                    href="/contact"
                    className="border border-blue-600 text-blue-600 px-6 py-2 rounded-full hover:bg-blue-50 transition"
                >
                    Hubungi Saya
                </Link>
            </div>
        </main>
    );
}
