'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full py-8 px-4 md:px-8 bg-surface-container-highest border-t border-outline-variant/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="col-span-1 md:col-span-2">
            <span className="text-lg font-bold text-primary">Catatkeluh</span>
            <p className="text-xs text-on-surface-variant mt-2">Membantu pasien menyampaikan keluhan dengan cara yang lebih baik untuk hasil kesehatan yang lebih optimal.</p>
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
                <button type="button" onClick={() => alert('Halaman ini sedang dalam pengembangan.')} className="hover:text-primary transition-colors text-left">
                  Cara Kerja
                </button>
              </li>
              <li>
                <button type="button" onClick={() => alert('Halaman ini sedang dalam pengembangan.')} className="hover:text-primary transition-colors text-left">
                  FAQ
                </button>
              </li>
              <li>
                <button type="button" onClick={() => alert('Halaman ini sedang dalam pengembangan.')} className="hover:text-primary transition-colors text-left">
                  Blog
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-sm font-bold text-on-surface mb-3">Legal</h5>
            <ul className="space-y-2 text-xs text-on-surface-variant">
              <li>
                <button type="button" onClick={() => alert('Halaman ini sedang dalam pengembangan.')} className="hover:text-primary transition-colors text-left">
                  Kebijakan Privasi
                </button>
              </li>
              <li>
                <button type="button" onClick={() => alert('Halaman ini sedang dalam pengembangan.')} className="hover:text-primary transition-colors text-left">
                  Syarat & Ketentuan
                </button>
              </li>
              <li>
                <button type="button" onClick={() => alert('Halaman ini sedang dalam pengembangan.')} className="hover:text-primary transition-colors text-left">
                  Keamanan Data
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-6 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-[11px] text-on-surface-variant">© 2024 Catatkeluh. Bukan pengganti saran medis profesional.</p>
          <div className="flex space-x-4">
            <button type="button" onClick={() => alert('Fitur bahasa sedang dalam pengembangan.')} className="text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[18px]">language</span>
            </button>
            <button type="button" onClick={() => alert('Fitur kontak sedang dalam pengembangan.')} className="text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[18px]">mail</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
