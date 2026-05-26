import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full py-8 px-4 md:px-8 bg-surface-container-highest border-t border-outline-variant/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="col-span-1 md:col-span-2">
            <span className="text-lg font-bold text-primary">Catatkeluh</span>
            <p className="text-xs text-on-surface-variant mt-2 max-w-xs">Membantu pasien menyampaikan keluhan dengan cara yang lebih baik untuk hasil kesehatan yang lebih optimal.</p>
          </div>
          <div>
            <h5 className="text-sm font-bold text-on-surface mb-3">Tautan Cepat</h5>
            <ul className="space-y-2 text-xs text-on-surface-variant">
              <li>
                <Link className="hover:text-primary" href="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary" href="#">
                  Cara Kerja
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary" href="#">
                  FAQ
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary" href="#">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-sm font-bold text-on-surface mb-3">Legal</h5>
            <ul className="space-y-2 text-xs text-on-surface-variant">
              <li>
                <Link className="hover:text-primary" href="#">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary" href="#">
                  Syarat & Ketentuan
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary" href="#">
                  Keamanan Data
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-6 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-[11px] text-on-surface-variant">© 2024 Catatkeluh. Bukan pengganti saran medis profesional.</p>
          <div className="flex space-x-4">
            <Link className="text-on-surface-variant hover:text-primary transition-colors" href="#">
              <span className="material-symbols-outlined text-[18px]">language</span>
            </Link>
            <Link className="text-on-surface-variant hover:text-primary transition-colors" href="#">
              <span className="material-symbols-outlined text-[18px]">mail</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
