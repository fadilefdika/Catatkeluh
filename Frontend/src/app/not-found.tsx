import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-on-background p-4 text-center">
      <div className="text-[120px] font-black text-primary/10 leading-none select-none mb-2 relative">
        404
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-[64px]">explore_off</span>
        </div>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold mb-3 text-on-surface">Halaman Tidak Ditemukan</h1>
      <p className="text-on-surface-variant mb-8 text-sm md:text-base">Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan. Silakan periksa kembali tautan yang Anda masukkan.</p>
      <Link href="/" className="px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-sm hover:bg-primary/90 transition-all active:scale-95 flex items-center gap-2">
        <span className="material-symbols-outlined text-[20px]">home</span>
        Kembali ke Beranda
      </Link>
    </div>
  );
}
