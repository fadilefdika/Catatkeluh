import Link from 'next/link';

interface SidebarProps {
  activePath?: string;
}

export default function Sidebar({ activePath = '/dashboard' }: SidebarProps) {
  const navItems = [
    { name: 'Home', path: '/dashboard', icon: 'home' },
    { name: 'Riwayat Laporan', path: '/dashboard/reports', icon: 'description' },
    { name: 'Profil', path: '/dashboard/profile', icon: 'person' },
    { name: 'Pengaturan', path: '/dashboard/settings', icon: 'settings' },
  ];

  return (
    <aside className="hidden md:flex flex-col h-screen w-64 bg-surface-container-low border-r border-outline-variant p-4 space-y-2 sticky top-0 shrink-0 z-40">
      <div className="px-3 py-4 mb-2">
        <h1 className="text-xl font-bold text-primary">Catatkeluh</h1>
        <p className="text-xs text-on-surface-variant mt-1">Medical Intake Assistant</p>
      </div>
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = activePath === item.path || (item.path !== '/dashboard' && activePath.startsWith(item.path));
          return (
            <Link 
              key={item.path}
              href={item.path} 
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                isActive 
                  ? 'bg-primary-container text-on-primary-container font-bold active:scale-95' 
                  : 'text-on-surface-variant hover:bg-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto pt-4 border-t border-outline-variant">
        <Link href="/intake" className="w-full flex items-center justify-center gap-2 px-3 py-3 bg-primary text-white rounded-lg font-bold shadow-sm hover:opacity-90 transition-all active:scale-95">
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span className="text-sm">New Intake</span>
        </Link>
        <Link href="/help" className="flex items-center gap-3 px-3 py-2.5 mt-2 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all">
          <span className="material-symbols-outlined text-[20px]">help_outline</span>
          <span className="text-sm">Help Center</span>
        </Link>
      </div>
    </aside>
  );
}
