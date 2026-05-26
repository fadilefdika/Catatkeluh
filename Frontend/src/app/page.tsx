import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-800 tracking-tight">
          Sampaikan keluhanmu dengan <span className="text-blue-600">Catatkeluh</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500">
          Asisten AI yang membantu menyusun keluhan medismu secara terstruktur sebelum berkonsultasi dengan dokter. Cepat, akurat, dan mudah dipahami.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link href="/login" className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
            Mulai Sekarang
          </Link>
          <Link href="/register" className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg border border-blue-200 hover:bg-slate-50 transition">
            Daftar
          </Link>
        </div>
      </div>
    </div>
  );
}
