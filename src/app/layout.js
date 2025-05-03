import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Pacifico } from "next/font/google";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const pacifico = Pacifico({
    weight: "400",
    variable: "--font-pacifico",
    subsets: ["latin"],
});

export const metadata = {
    title: "Makarim Zufar Portofolio",
    description: "Created with Next.js + Tailwind",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>{/* Next.js font optimization handles font loading */}</head>
            <body
                className={`bg-white text-black dark:bg-gray-900 dark:text-white flex flex-col min-h-screen ${geistSans.variable} ${geistMono.variable} ${pacifico.variable}`}
            >
                <Navbar />
                <div className="flex-grow pb-6">{children}</div>
                {/* Padding bawah untuk mencegah overlap dengan footer */}
                <Footer />
            </body>
        </html>
    );
}
