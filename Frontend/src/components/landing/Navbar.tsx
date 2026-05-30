import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="sticky top-0 w-full z-50 flex justify-between items-center px-4 md:px-8 py-3 max-w-7xl mx-auto bg-surface/80 backdrop-blur-md border-b border-outline-variant/30">
      <div className="text-xl font-bold text-primary">Catatkeluh</div>
      <div className="hidden md:flex items-center space-x-6">
        <Link href="/dashboard" className="text-primary font-bold border-b-2 border-primary text-sm">
          Dashboard
        </Link>
        <Link href="/dashboard/reports" className="text-on-surface-variant font-medium hover:text-primary transition-colors text-sm">
          Laporan
        </Link>
        <Link href="#about" className="text-on-surface-variant font-medium hover:text-primary transition-colors text-sm">
          Tentang Kami
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center space-x-2 mr-2">
          <Link href="/login" className="px-4 py-2.5 text-sm font-bold text-primary hover:bg-surface-container rounded-lg transition-colors">
            Masuk
          </Link>
          <Link href="/register" className="px-4 py-2.5 text-sm font-bold bg-primary text-white rounded-lg shadow-sm hover:bg-primary/90 transition-colors">
            Daftar
          </Link>
        </div>
        <button onClick={() => alert("Belum ada notifikasi baru.")} className="p-2 text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-[20px]">notifications</span>
        </button>
        <div className="relative w-7 h-7 rounded-full bg-surface-container-highest overflow-hidden">
          <Image alt="User profile" className="object-cover" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" fill sizes="28px" unoptimized />
        </div>
      </div>
    </nav>
  );
}
