export default function SettingsPage() {
  return (
    <div className="px-4 md:px-8 py-6 max-w-content mx-auto w-full pb-20 flex-1">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-xl md:text-2xl text-on-surface font-bold">Pengaturan Akun</h2>
          <p className="text-sm text-on-surface-variant mt-1">Sesuaikan preferensi aplikasi dan privasi Anda.</p>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 text-center mt-8">
        <span className="material-symbols-outlined text-[48px] text-outline mb-4 block">construction</span>
        <h3 className="text-lg font-bold text-on-surface">Sedang Dalam Pengembangan</h3>
        <p className="text-sm text-on-surface-variant mx-auto mt-2">Halaman ini nantinya akan menyediakan fitur ganti kata sandi, pengaturan notifikasi, dan pengelolaan sesi.</p>
      </div>
    </div>
  );
}
