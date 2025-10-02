import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">歡迎來到首頁</h1>

        <Link
          href="/dashboard"
          className="inline-block bg-blue-300 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300 hover:bg-blue-400"
        >
          前往儀表板
        </Link>
      </main>
    </div>
  );
}
