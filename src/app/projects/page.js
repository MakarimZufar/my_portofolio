export default function ProjectsPage() {
    return (
        <main className="max-w-5xl mx-auto px-6 py-20">
            <h1 className="text-3xl font-bold mb-6 text-center">Proyek Saya</h1>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Proyek 1 */}
                <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                    <h2 className="text-xl font-semibold">LaperPool</h2>
                    <p className="text-sm text-gray-600 mb-3">
                        Aplikasi pemesanan makanan online dengan fitur manager &
                        customer.
                    </p>
                    <a
                        href="https://github.com/username/laperpool"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        Lihat di GitHub →
                    </a>
                </div>

                {/* Proyek 2 */}
                <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                    <h2 className="text-xl font-semibold">Lorem Ipsum</h2>
                    <p className="text-sm text-gray-600 mb-3">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    </p>
                    <a
                        href="https://github.com/username/lorem-ipsum"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        Lihat di GitHub →
                    </a>
                </div>
                
                {/* Proyek lain di sini */}
            </div>
        </main>
    );
}
