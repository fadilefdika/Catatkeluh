import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <header className="relative pt-12 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="gradient-blur w-72 h-72 bg-primary-container/10 absolute -top-16 -left-16"></div>
      <div className="gradient-blur w-72 h-72 bg-secondary-container/10 absolute -bottom-16 -right-16"></div>
      <div className="grid lg:grid-cols-2 gap-8 items-center relative z-10">
        <div className="text-left">
          <div className="inline-flex items-center space-x-1.5 bg-primary-fixed text-on-primary-fixed-variant px-3 py-1 rounded-full mb-4">
            <span className="material-symbols-outlined text-[16px]">verified_user</span>
            <span className="text-xs font-bold">Asisten Kesehatan Berbasis AI Terpercaya</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-on-surface leading-tight">
            Sampaikan Keluhanmu ke Dokter dengan <span className="text-primary">Lebih Lengkap</span>
          </h1>
          <p className="text-sm text-on-surface-variant mb-6">Asisten intake medis berbasis AI yang membantu kamu menyusun laporan keluhan terstruktur. Tak ada lagi gejala yang terlewat saat konsultasi dengan dokter.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/register" className="px-5 py-2.5 bg-primary text-on-primary rounded-lg font-bold text-sm transition-all active:scale-95 shadow-sm hover:shadow-primary/20 hover:shadow-md inline-block text-center">
              Mulai Sekarang
            </Link>
            <button type="button" onClick={() => alert("Fitur contoh laporan sedang dalam pengembangan.")} className="px-5 py-2.5 border border-outline text-primary rounded-lg font-bold text-sm hover:bg-surface-container-low transition-all inline-block text-center">
              Lihat Contoh Laporan
            </button>
          </div>
          <div className="mt-6 flex items-center space-x-3">
            <div className="flex -space-x-2">
              <div className="w-7 h-7 rounded-full border-2 border-surface bg-slate-200"></div>
              <div className="w-7 h-7 rounded-full border-2 border-surface bg-slate-300"></div>
              <div className="w-7 h-7 rounded-full border-2 border-surface bg-slate-400"></div>
            </div>
            <p className="text-xs text-on-surface-variant">
              Dipercaya oleh <span className="font-bold text-on-surface">2,000+</span> pengguna di Indonesia
            </p>
          </div>
        </div>
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-[240px] md:w-[280px] rounded-2xl overflow-hidden shadow-lg glass-card p-1.5 border border-outline-variant/30 hover:border-primary/40 transition-colors duration-300">
            <Image alt="Medical Assistant Interface" className="w-full h-auto rounded-xl object-cover aspect-[4/5]" src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80" width={400} height={500} priority unoptimized />
          </div>
          {/* Floating elements for visual interest */}
          <div className="absolute -bottom-3 -left-3 bg-white p-2 rounded-lg shadow-md border border-outline-variant/20 hidden md:block z-10">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
              </div>
              <div>
                <p className="text-[10px] font-bold leading-tight">Laporan Selesai</p>
                <p className="text-[8px] text-on-surface-variant leading-tight">Siap ke dokter</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
