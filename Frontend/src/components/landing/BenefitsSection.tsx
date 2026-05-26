export default function BenefitsSection() {
  return (
    <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-on-surface mb-2">Mengapa Memilih Catatkeluh?</h2>
        <p className="text-sm text-on-surface-variant max-w-2xl mx-auto">Kami mengombinasikan teknologi AI tercanggih dengan empati untuk memastikan kesehatanmu ditangani dengan informasi yang paling akurat.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Card 1 */}
        <div className="glass-card p-5 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md border border-outline-variant/20 hover:border-[rgba(0,74,198,0.4)]">
          <div className="w-10 h-10 bg-secondary-container text-on-secondary-container rounded-lg flex items-center justify-center mb-3">
            <span className="material-symbols-outlined text-[20px]">forum</span>
          </div>
          <h3 className="text-base font-bold mb-1.5">AI-Guided Conversation</h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Obrolan natural dengan AI yang dirancang khusus untuk memahami konteks keluhan medis. AI akan menanyakan detail yang mungkin kamu lupakan, seperti frekuensi atau pemicu gejala.
          </p>
        </div>
        {/* Card 2 */}
        <div className="glass-card p-5 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md border border-outline-variant/20 hover:border-[rgba(0,74,198,0.4)]">
          <div className="w-10 h-10 bg-primary-container text-on-primary-container rounded-lg flex items-center justify-center mb-3">
            <span className="material-symbols-outlined text-[20px]">description</span>
          </div>
          <h3 className="text-base font-bold mb-1.5">Structured for Doctors</h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Hasil laporan disusun menggunakan terminologi medis standar. Ini membantu dokter mendiagnosis lebih cepat tanpa harus mengulang pertanyaan dasar yang memakan waktu konsultasi.
          </p>
        </div>
        {/* Card 3 */}
        <div className="glass-card p-5 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md border border-outline-variant/20 hover:border-[rgba(0,74,198,0.4)]">
          <div className="w-10 h-10 bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-lg flex items-center justify-center mb-3">
            <span className="material-symbols-outlined text-[20px]">encrypted</span>
          </div>
          <h3 className="text-base font-bold mb-1.5">100% Privasi & Aman</h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Data kesehatanmu adalah privasi tertinggi. Kami menggunakan enkripsi end-to-end dan tidak membagikan data identitasmu kepada pihak ketiga mana pun tanpa izin eksplisit.
          </p>
        </div>
      </div>
    </section>
  );
}
