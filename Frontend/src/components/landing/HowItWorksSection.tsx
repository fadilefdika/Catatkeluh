import Link from 'next/link';
import Image from 'next/image';

export default function HowItWorksSection() {
  return (
    <section className="py-12 px-4 md:px-8 bg-surface-container-low relative overflow-hidden">
      <div className="abstract-pattern absolute inset-0 opacity-40"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold text-on-surface mb-2">Bagaimana Catatkeluh Membantumu?</h2>
            <p className="text-sm text-on-surface-variant">Proses sederhana dalam 3 langkah untuk mendapatkan hasil konsultasi dokter yang lebih maksimal.</p>
          </div>
          <div className="hidden md:block">
            <Link href="#" className="flex items-center space-x-1.5 text-primary text-sm font-bold hover:underline">
              <span>Lihat panduan lengkap</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-5">
          {/* Step 1 */}
          <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/30 flex flex-col h-full shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center text-lg font-bold">1</div>
              <span className="material-symbols-outlined text-outline-variant text-[20px]">chat_bubble</span>
            </div>
            <h4 className="text-base font-bold mb-1.5">Cerita Keluhan</h4>
            <p className="text-xs text-on-surface-variant mb-4 flex-grow">
              Bicarakan apa yang kamu rasakan secara bebas seperti mengobrol dengan teman. AI kami akan memberikan pertanyaan lanjutan untuk melengkapi detail kronologis dan intensitas keluhan.
            </p>
            <div className="relative w-full h-32 rounded-lg bg-surface-variant overflow-hidden">
              <Image alt="Cerita Keluhan" className="object-cover" src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80" fill sizes="(max-width: 768px) 100vw, 33vw" unoptimized />
            </div>
          </div>
          {/* Step 2 */}
          <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/30 flex flex-col h-full shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center text-lg font-bold">2</div>
              <span className="material-symbols-outlined text-outline-variant text-[20px]">psychology</span>
            </div>
            <h4 className="text-base font-bold mb-1.5">AI Menyusun Laporan</h4>
            <p className="text-xs text-on-surface-variant mb-4 flex-grow">Dalam hitungan detik, AI mengolah percakapanmu menjadi laporan medis yang ringkas, kronologis, dan profesional menggunakan format SOAP yang disukai dokter.</p>
            <div className="relative w-full h-32 rounded-lg bg-surface-variant overflow-hidden">
              <Image alt="AI Menyusun Laporan" className="object-cover" src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80" fill sizes="(max-width: 768px) 100vw, 33vw" unoptimized />
            </div>
          </div>
          {/* Step 3 */}
          <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/30 flex flex-col h-full shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-lg font-bold">3</div>
              <span className="material-symbols-outlined text-outline-variant text-[20px]">assignment_turned_in</span>
            </div>
            <h4 className="text-base font-bold mb-1.5">Tunjukkan ke Dokter</h4>
            <p className="text-xs text-on-surface-variant mb-4 flex-grow">Bawa laporan digital atau cetak saat konsultasi. Dokter dapat mendiagnosis lebih cepat dan akurat karena semua informasi vital sudah tersedia di satu halaman.</p>
            <div className="relative w-full h-32 rounded-lg bg-surface-variant overflow-hidden">
              <Image alt="Tunjukkan ke Dokter" className="object-cover" src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80" fill sizes="(max-width: 768px) 100vw, 33vw" unoptimized />
            </div>
          </div>
        </div>
        <div className="mt-10 text-center">
          <Link href="/register" className="inline-block px-8 py-3 bg-primary text-on-primary rounded-lg font-bold text-base shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
            Coba Sekarang — Gratis
          </Link>
        </div>
      </div>
    </section>
  );
}
