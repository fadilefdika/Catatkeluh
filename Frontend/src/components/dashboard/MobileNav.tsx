import Link from 'next/link';

interface MobileNavProps {
  activePath?: string;
}

export default function MobileNav({ activePath = '/dashboard' }: MobileNavProps) {
  const items = [
    { name: 'Home', path: '/dashboard', icon: 'home' },
    { name: 'Laporan', path: '/dashboard/reports', icon: 'description' },
  ];
  
  const rightItems = [
    { name: 'Profil', path: '/dashboard/profile', icon: 'person' },
    { name: 'Pengaturan', path: '/dashboard/settings', icon: 'settings' },
  ];

  const renderItem = (item: any) => {
    const isActive = activePath === item.path || (item.path !== '/dashboard' && activePath.startsWith(item.path));
    return (
      <Link key={item.path} href={item.path} className={`flex flex-col items-center gap-1 p-2 ${isActive ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`}>
        <span className="material-symbols-outlined" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>{item.icon}</span>
        <span className={`text-[10px] ${isActive ? 'font-bold' : ''}`}>{item.name}</span>
      </Link>
    );
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface shadow-[0_-2px_10px_rgba(0,0,0,0.05)] flex justify-around items-center py-3 px-2 z-50">
      {items.map(renderItem)}
      
      <div className="-mt-8 z-50">
        <Link href="/intake" className="bg-primary text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all hover:bg-primary/90">
          <span className="material-symbols-outlined text-[32px]">add</span>
        </Link>
      </div>
      
      {rightItems.map(renderItem)}
    </nav>
  );
}
