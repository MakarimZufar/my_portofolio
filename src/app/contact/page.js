export default function ContactPage() {
    return (
        <main className="max-w-xl mx-auto px-6 py-20">
            <h1 className="text-3xl font-bold mb-6 text-center">
                Hubungi Saya
            </h1>
            <p className="text-center text-gray-700 mb-8">
                Kirimkan pesan langsung ke email saya lewat form di bawah ini.
            </p>

            {/* FORM KONTAK */}
            <form
                action="https://formsubmit.co/381995bdbef10eea6fb5b9fdf7bec572 "
                method="POST"
                className="flex flex-col gap-4 bg-black p-6 rounded-lg shadow-md"
            >
                {/* Redirect setelah submit */}
                <input
                    type="hidden"
                    name="_next"
                    value="http://localhost:3000/thank-you"
                />

                {/* Honeypot anti spam */}
                <input type="text" name="_honey" style={{ display: "none" }} />

                <input
                    type="text"
                    name="name"
                    placeholder="Nama Kamu"
                    required
                    className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email Kamu"
                    required
                    className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                    name="message"
                    placeholder="Pesan Kamu"
                    required
                    className="border border-gray-300 rounded px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Kirim Pesan
                </button>
            </form>
        </main>
    );
}
