import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="bg-background text-on-background min-h-screen flex w-full">
      {/* SideNavBar Component */}
      <aside className="hidden md:flex flex-col h-screen w-64 bg-surface-container-low border-r border-outline-variant p-4 space-y-2 sticky top-0 shrink-0">
        <div className="px-3 py-4 mb-2">
          <h1 className="text-xl font-bold text-primary">Catatkeluh</h1>
          <p className="text-xs text-on-surface-variant mt-1">Medical Intake Assistant</p>
        </div>
        <nav className="flex-1 space-y-1">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 bg-primary-container text-on-primary-container font-bold rounded-lg transition-all active:scale-95">
            <span className="material-symbols-outlined text-[20px]">home</span>
            <span className="text-sm">Home</span>
          </Link>
          <Link href="/dashboard/reports" className="flex items-center gap-3 px-3 py-2.5 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all">
            <span className="material-symbols-outlined text-[20px]">description</span>
            <span className="text-sm">Riwayat Laporan</span>
          </Link>
          <Link href="/dashboard/profile" className="flex items-center gap-3 px-3 py-2.5 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all">
            <span className="material-symbols-outlined text-[20px]">person</span>
            <span className="text-sm">Profil</span>
          </Link>
          <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2.5 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all">
            <span className="material-symbols-outlined text-[20px]">settings</span>
            <span className="text-sm">Pengaturan</span>
          </Link>
        </nav>
        <div className="mt-auto pt-4 border-t border-outline-variant">
          <Link href="/intake" className="w-full flex items-center justify-center gap-2 px-3 py-3 bg-primary text-white rounded-lg font-bold shadow-sm hover:opacity-90 transition-all">
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span className="text-sm">New Intake</span>
          </Link>
          <Link href="/help" className="flex items-center gap-3 px-3 py-2.5 mt-2 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all">
            <span className="material-symbols-outlined text-[20px]">help_outline</span>
            <span className="text-sm">Help Center</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 max-w-full">
        {/* TopNavBar Component */}
        <header className="sticky top-0 w-full z-50 flex justify-between items-center px-4 md:px-8 py-3 bg-surface shadow-sm max-w-content mx-auto">
          <div className="md:hidden">
            <h1 className="text-xl font-bold text-primary">Catatkeluh</h1>
          </div>
          <div className="hidden md:flex gap-6">
            <span className="text-primary font-bold border-b-2 border-primary text-sm">Dashboard</span>
            <Link href="/dashboard/reports" className="text-on-surface-variant font-medium hover:text-primary transition-colors text-sm">Reports</Link>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
            </button>
            <div className="h-7 w-7 rounded-full bg-surface-container-highest overflow-hidden">
              <img alt="User profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLyoSt5ITtJdPt6pFrk8_AAZHYcju6ryJQf4-oSRkc7WuhmGcWKhMCRQGR187Jy_SgA178BwMZpOJDfkWChQrp3WK2ezUez6GaWzeSxCaX8egxfK7Fu6EqT0z9YWi1NuxaI6nNkefDHl9KWzY7WcCkV_qI7IsXke7XgKPAXj9YteiVJuHZHhBOe24R_b95a8buQpZC2nk_taBiNimu6RebMP73a3PPcUtBk1DJRriCDdO1yqi2nEEotl2BitZ4Ri6CLg23eqU51nk"/>
            </div>
          </div>
        </header>

        {/* Page Canvas */}
        <div className="px-4 md:px-8 py-6 max-w-content mx-auto w-full pb-20">
          {/* Welcome Banner */}
          <section className="mb-6">
            <h2 className="text-xl md:text-2xl text-on-surface font-bold">Halo, Pengguna.</h2>
            <p className="text-sm text-on-surface-variant mt-1">Ada keluhan apa hari ini?</p>
          </section>

          {/* Quick Action: Bento Grid Style */}
          <section className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Main CTA */}
              <Link href="/intake" className="group relative overflow-hidden bg-primary-container text-on-primary-container p-6 rounded-2xl flex flex-col justify-between items-start text-left transition-all hover:-translate-y-1 hover:shadow-md active:scale-95 min-h-[160px]">
                <div className="bg-white/20 p-2 rounded-full mb-3">
                  <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 600" }}>add</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Mulai Keluhan Baru</h3>
                  <p className="text-xs opacity-90">Ceritakan gejala yang Anda rasakan untuk dokumentasi medis yang akurat.</p>
                </div>
                {/* Abstract Background Decoration */}
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-all duration-500"></div>
              </Link>

              {/* Secondary Metric/Info */}
              <div className="grid grid-rows-2 gap-4">
                <div className="bg-surface-container-low border border-outline-variant p-4 rounded-2xl flex items-center gap-3 hover:-translate-y-1 transition-all hover:shadow-sm">
                  <div className="bg-secondary-container text-on-secondary-container p-2 rounded-full">
                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                  </div>
                  <div>
                    <p className="text-[11px] text-on-surface-variant font-medium">Laporan Selesai</p>
                    <p className="text-sm font-bold mt-0.5">12 Laporan</p>
                  </div>
                </div>
                <div className="bg-tertiary-fixed text-on-tertiary-fixed-variant p-4 rounded-2xl flex items-center gap-3 hover:-translate-y-1 transition-all hover:shadow-sm">
                  <div className="bg-white/40 p-2 rounded-full">
                    <span className="material-symbols-outlined text-[20px]">schedule</span>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium">Update Terakhir</p>
                    <p className="text-sm font-bold mt-0.5">2 Jam yang lalu</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Reports */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-on-surface">Riwayat Laporan</h3>
              <Link href="/dashboard/reports" className="text-primary font-bold text-xs hover:underline">Lihat Semua</Link>
            </div>
            <div className="space-y-3">
              {/* Report Card 1 */}
              <Link href="/report/demo-1" className="group bg-surface-container-lowest border border-outline-variant p-4 rounded-xl flex items-center justify-between hover:shadow-sm hover:-translate-y-[2px] transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[20px]">skull</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-on-surface">Sakit Kepala</h4>
                    <p className="text-xs text-on-surface-variant mt-0.5">24 Oktober 2023 • 14:20</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 bg-secondary-container text-on-secondary-container rounded-md text-[10px] font-bold">Selesai</span>
                  <span className="material-symbols-outlined text-outline text-[20px] group-hover:text-primary transition-colors">chevron_right</span>
                </div>
              </Link>

              {/* Report Card 2 */}
              <Link href="/report/demo-2" className="group bg-surface-container-lowest border border-outline-variant p-4 rounded-xl flex items-center justify-between hover:shadow-sm hover:-translate-y-[2px] transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[20px]">back_hand</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-on-surface">Nyeri Punggung</h4>
                    <p className="text-xs text-on-surface-variant mt-0.5">12 Oktober 2023 • 09:15</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 bg-secondary-container text-on-secondary-container rounded-md text-[10px] font-bold">Selesai</span>
                  <span className="material-symbols-outlined text-outline text-[20px] group-hover:text-primary transition-colors">chevron_right</span>
                </div>
              </Link>

              {/* Report Card 3 */}
              <Link href="/report/demo-3" className="group bg-surface-container-lowest border border-outline-variant p-4 rounded-xl flex items-center justify-between hover:shadow-sm hover:-translate-y-[2px] transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[20px]">thermostat</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-on-surface">Demam Tinggi</h4>
                    <p className="text-xs text-on-surface-variant mt-0.5">05 Oktober 2023 • 18:45</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 bg-secondary-container text-on-secondary-container rounded-md text-[10px] font-bold">Selesai</span>
                  <span className="material-symbols-outlined text-outline text-[20px] group-hover:text-primary transition-colors">chevron_right</span>
                </div>
              </Link>
            </div>
          </section>
        </div>

        {/* Footer Component */}
        <footer className="w-full py-6 px-4 md:px-8 mt-8 bg-surface-container-highest">
          <div className="max-w-content mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col items-center md:items-start">
              <p className="text-sm font-bold text-primary">Catatkeluh</p>
              <p className="text-[11px] text-on-surface-variant mt-1">© 2024 Catatkeluh. Not a medical substitute.</p>
            </div>
            <div className="flex gap-4">
              <Link href="/privacy" className="text-[11px] text-on-surface-variant hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-[11px] text-on-surface-variant hover:text-primary transition-colors">Terms of Service</Link>
            </div>
          </div>
        </footer>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface shadow-[0_-2px_10px_rgba(0,0,0,0.05)] flex justify-around items-center py-3 px-2 z-50">
        <Link href="/dashboard" className="flex flex-col items-center gap-1 text-primary">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span className="text-[10px] font-bold">Home</span>
        </Link>
        <Link href="/dashboard/reports" className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary">
          <span className="material-symbols-outlined">description</span>
          <span className="text-[10px]">Laporan</span>
        </Link>
        <div className="-mt-8">
          <Link href="/intake" className="bg-primary text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all hover:bg-primary/90">
            <span className="material-symbols-outlined text-[32px]">add</span>
          </Link>
        </div>
        <Link href="/dashboard/profile" className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px]">Profil</span>
        </Link>
        <Link href="/dashboard/settings" className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary">
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[10px]">Pengaturan</span>
        </Link>
      </nav>
    </div>
  );
}
