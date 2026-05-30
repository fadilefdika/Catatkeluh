export default function ReportsPage() {
  return (
    <div className="px-4 md:px-8 py-6 max-w-content mx-auto w-full pb-20 flex-1">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-xl md:text-2xl text-on-surface font-bold">Riwayat Laporan</h2>
          <p className="text-sm text-on-surface-variant mt-1">Daftar semua keluhan medis yang pernah Anda rekam.</p>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 text-center mt-8">
        <span className="material-symbols-outlined text-[48px] text-outline mb-4 block">construction</span>
        <h3 className="text-lg font-bold text-on-surface">Sedang Dalam Pengembangan</h3>
        <p className="text-sm text-on-surface-variant mx-auto mt-2">Halaman ini nantinya akan menampilkan daftar lengkap laporan medis Anda dengan fitur filter dan pencarian.</p>
      </div>
    </div>
  );
}
