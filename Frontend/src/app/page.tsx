import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-content mx-auto bg-surface shadow-sm">
        <div className="text-headline-md font-bold text-primary">Catatkeluh</div>
        <div className="hidden md:flex items-center space-x-md">
          <Link className="text-primary font-bold border-b-2 border-primary text-label-md" href="/dashboard">Dashboard</Link>
        </div>
        <div className="flex items-center space-x-sm">
          <Link href="/login" className="px-sm py-2 text-label-md font-bold text-primary hover:bg-surface-container rounded-lg transition-colors">
            Masuk
          </Link>
          <Link href="/register" className="px-sm py-2 text-label-md font-bold bg-primary text-white rounded-lg shadow-sm hover:bg-primary/90 transition-colors">
            Daftar
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative overflow-hidden pt-12 pb-8 px-margin-mobile md:px-margin-desktop text-center max-w-content mx-auto">
        <div className="gradient-blur w-48 h-48 bg-primary-container/20 top-0 left-0"></div>
        <div className="gradient-blur w-48 h-48 bg-secondary-container/20 bottom-0 right-0"></div>
        <h1 className="text-2xl md:text-4xl mb-4 text-on-surface font-bold">
          Sampaikan Keluhanmu ke Dokter dengan Lengkap
        </h1>
        <p className="text-sm md:text-base text-on-surface-variant mb-6 max-w-2xl mx-auto">
          Asisten intake medis berbasis AI yang membantu kamu menyusun laporan keluhan terstruktur sebelum bertemu dokter.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-3">
          <Link href="/register" className="px-6 py-2.5 bg-primary-container text-on-primary-container rounded-lg font-bold text-sm transition-all active:scale-95 shadow-sm hover:shadow-md text-center">
            Mulai Sekarang
          </Link>
          <button className="px-6 py-2.5 border border-outline-variant text-primary rounded-lg font-bold text-sm hover:bg-surface-container-low transition-all">
            Pelajari Lebih Lanjut
          </button>
        </div>

        <div className="mt-8 relative rounded-xl overflow-hidden shadow-sm glass-card p-2 hover:border-primary/30 transition-colors">
          <img 
            alt="Medical Assistant Interface" 
            className="w-full rounded-md" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBr3-yyyDOaEKZt-trxVOiXsgQQtMu4v9nuRbMul0pd1JN9TxKxDdKlSUzr69d_sEwylbo1QLgzsIsIWiJI4v_pClTq-4OV6JLuWZvcN2audVMS-LFF0cks6AYl9Scg-KzF4fRIuyiT0yOPSQWpuQ_h2tec4ABw19MlrLSNxwdgR0GO1qrcBv1iHQlAMU6AtE5ca3UXi-sDfzNmA9IArnEClL9C2tMpr_bcJXDjweyV1OjLIb6zA_T9zWgBUCo0K9W4Zgr9q7OqKkw" 
          />
        </div>
      </header>

      {/* Benefits Section */}
      <section className="py-10 px-margin-mobile md:px-margin-desktop max-w-content mx-auto abstract-pattern">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl text-on-surface font-bold">Mengapa Memilih Catatkeluh?</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {/* Card 1 */}
          <div className="glass-card p-5 rounded-xl transition-all hover:translate-y-[-4px] hover:border-primary/30">
            <div className="w-10 h-10 bg-secondary-container text-on-secondary-container rounded-md flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-lg">forum</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">AI-Guided Conversation</h3>
            <p className="text-sm text-on-surface-variant">Obrolan natural dengan AI yang dirancang khusus untuk memahami konteks keluhan medis secara mendalam.</p>
          </div>

          {/* Card 2 */}
          <div className="glass-card p-5 rounded-xl transition-all hover:translate-y-[-4px] hover:border-primary/30">
            <div className="w-10 h-10 bg-primary-container text-on-primary-container rounded-md flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-lg">description</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Structured for Doctors</h3>
            <p className="text-sm text-on-surface-variant">Hasil laporan disusun sesuai format standar medis, memudahkan dokter menangkap inti masalah dengan cepat.</p>
          </div>

          {/* Card 3 */}
          <div className="glass-card p-5 rounded-xl transition-all hover:translate-y-[-4px] hover:border-primary/30">
            <div className="w-10 h-10 bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-md flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-lg">encrypted</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">100% Privacy</h3>
            <p className="text-sm text-on-surface-variant">Data kesehatanmu bersifat rahasia dan dienkripsi penuh. Keamanan privasimu adalah prioritas utama kami.</p>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-10 px-margin-mobile md:px-margin-desktop bg-surface-container-low">
        <div className="max-w-content mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-8">Cara Kerja Kami</h2>
          <div className="space-y-6">
            
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center gap-6 bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/30">
              <div className="w-12 h-12 shrink-0 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold">1</div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold mb-1">Cerita Keluhan</h4>
                <p className="text-sm text-on-surface-variant">Bicarakan apa yang kamu rasakan secara bebas. AI kami akan memberikan pertanyaan lanjutan untuk melengkapi detailnya.</p>
              </div>
              <div className="w-full md:w-40 h-24 rounded-lg bg-surface-variant overflow-hidden">
                <img alt="Cerita Keluhan" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgxn4XUBjj4FwChiqSHwUd2tt7jMfZmrM3mKVPBWCd5EyRhwf2ZscOAl3lGm-V56cYCG8NCal3T54FLvwwdVteVf26dvob1Y3mFeo2ilqZDdDH1Tmkwc9T9Iuzo34mRkpaAld02KxoPrAJWKIKPog-gl2dVQb4zqVkE7kgLDY5YE84_oKGAPsxMFvMyS7pL-QKDMCK3rdAeEDNX1ERLX_NBP4Jed9cUZVivvCrpwTfpJnHNzpyqpemSiMr6JhgT6G4AMSjzukNVzw"/>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-6 bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/30">
              <div className="w-12 h-12 shrink-0 rounded-full bg-secondary text-on-secondary flex items-center justify-center text-lg font-bold">2</div>
              <div className="flex-1 text-left md:text-right">
                <h4 className="text-lg font-semibold mb-1">AI Menyusun Laporan</h4>
                <p className="text-sm text-on-surface-variant">Dalam hitungan detik, AI mengolah percakapanmu menjadi laporan medis yang ringkas, kronologis, dan profesional.</p>
              </div>
              <div className="w-full md:w-40 h-24 rounded-lg bg-surface-variant overflow-hidden">
                <img alt="AI Menyusun Laporan" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgd5d_p-_yQZC065Bhf3WYUylF4EowptIYf6_XIBK9olU-r8Hew1deigTVIULXChVLP9VE4hWQUvSucjRdpGGz3nGRL7fTQqH5hdUHBBtLXWGdp1oFld8ETRnEMdgYSAEtdnu_DAwgIId5QNtjG9ovKrmwb-lZQX9zUgPxDI62zOMx_aGbxa7SnKiL3l9JEUjwrhiDSPtBd40Qlg9ALgqqGCuXJSJ2bn9BIiR_4wjgAynH77-QSwPcCobXTH3fgQ9jIUtON-LG2IU"/>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center gap-6 bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/30">
              <div className="w-12 h-12 shrink-0 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-lg font-bold">3</div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold mb-1">Tunjukkan ke Dokter</h4>
                <p className="text-sm text-on-surface-variant">Bawa laporan tersebut saat konsultasi. Dokter dapat mendiagnosis lebih cepat dan akurat karena informasi sudah lengkap.</p>
              </div>
              <div className="w-full md:w-40 h-24 rounded-lg bg-surface-variant overflow-hidden">
                <img alt="Tunjukkan ke Dokter" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA16LqDoUoDEhTMVRv9yM9ANPrlBKZtSF9ImRsXI4PvoGEvtZOBnKR7PHP996QkK889LxlabGuLNIirO-ajKEcPPmg9u_2cj9XKSLMzCuFBr_8KJJhBHc_TiTEc0OAb7MvEEJInu8R0LDE8n92Xv_aHwxGULHaXNezk-C3K3CyNxswqt8o05rvV1u8tLkXqw6WgOnW8W09bXZh25rp4UAcqf82je1g4kqfuAtjlcwckyX-mvktr5AlX1JEb0qklX3rvjY2d61NqJxI"/>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 px-margin-desktop mt-8 bg-surface-container-highest dark:bg-inverse-surface">
        <div className="max-w-content mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-sm font-bold text-primary">Catatkeluh</span>
            <p className="text-[11px] text-on-surface-variant mt-1">© 2024 Catatkeluh. Not a medical substitute.</p>
          </div>
          <div className="flex space-x-4">
            <a className="text-[11px] text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="text-[11px] text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="text-[11px] text-on-surface-variant hover:text-primary transition-colors" href="#">Contact Support</a>
          </div>
        </div>
      </footer>

      {/* FAB for quick access */}
      <Link href="/intake" className="fixed bottom-margin-mobile right-margin-mobile w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-transform md:hidden z-50">
        <span className="material-symbols-outlined">add</span>
      </Link>
    </div>
  );
}
