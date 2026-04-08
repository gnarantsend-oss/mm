export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-6xl font-bold text-netflix-red mb-4 tracking-tight">
        Nabo Stream
      </h1>
      <p className="text-xl text-gray-300 mb-8 text-center max-w-md">
        Next.js 16 болон Tailwind CSS v4 амжилттай суулаа! Одоо Cloudflare руу холбоход бэлэн боллоо. 🚀
      </p>
      <button className="px-8 py-3 bg-white text-black font-bold rounded hover:bg-gray-300 transition-colors duration-300">
        Кино үзэх
      </button>
    </main>
  );
}