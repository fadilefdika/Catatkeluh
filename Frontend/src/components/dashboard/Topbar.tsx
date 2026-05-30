"use client";

import Link from 'next/link';

interface TopbarProps {
  activePath?: string;
}

export default function Topbar({ activePath = '/dashboard' }: TopbarProps) {
  // Safe notification click handler
  const handleNotification = () => {
    alert("Belum ada notifikasi baru.");
  };

  return (
    <header className="sticky top-0 w-full z-30 flex justify-between items-center px-4 md:px-8 py-3 bg-surface shadow-sm mx-auto">
      <div className="md:hidden">
        <h1 className="text-xl font-bold text-primary">Catatkeluh</h1>
      </div>
      <div className="hidden md:flex gap-6">
        <Link 
          href="/dashboard" 
          className={`text-sm transition-colors ${activePath === '/dashboard' ? 'text-primary font-bold border-b-2 border-primary' : 'text-on-surface-variant font-medium hover:text-primary'}`}
        >
          Dashboard
        </Link>
        <Link 
          href="/dashboard/reports" 
          className={`text-sm transition-colors ${activePath.includes('/report') ? 'text-primary font-bold border-b-2 border-primary' : 'text-on-surface-variant font-medium hover:text-primary'}`}
        >
          Reports
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <button 
          onClick={handleNotification}
          className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center w-8 h-8 rounded-full hover:bg-surface-variant"
        >
          <span className="material-symbols-outlined text-[20px]">notifications</span>
        </button>
        <Link href="/dashboard/profile" className="h-7 w-7 rounded-full bg-surface-container-highest overflow-hidden hover:opacity-80 transition-opacity">
          <img alt="User profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLyoSt5ITtJdPt6pFrk8_AAZHYcju6ryJQf4-oSRkc7WuhmGcWKhMCRQGR187Jy_SgA178BwMZpOJDfkWChQrp3WK2ezUez6GaWzeSxCaX8egxfK7Fu6EqT0z9YWi1NuxaI6nNkefDHl9KWzY7WcCkV_qI7IsXke7XgKPAXj9YteiVJuHZHhBOe24R_b95a8buQpZC2nk_taBiNimu6RebMP73a3PPcUtBk1DJRriCDdO1yqi2nEEotl2BitZ4Ri6CLg23eqU51nk"/>
        </Link>
      </div>
    </header>
  );
}
