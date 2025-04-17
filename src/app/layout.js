import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "My Porotofolio",
  description: "Created with Next.js + Tailwind",
};

export default function RootLayout({ children }) {
  return (
      <html lang="en">
          <body className="bg-white text-black dark:bg-gray-900 dark:text-white flex flex-col min-h-screen">
                  <Navbar />
                  <div className="flex-grow pt-16">
                      {children} 
                  </div>
                  <Footer /> 
          </body>
      </html>
  );
}
