"use client";

import { usePathname } from 'next/navigation';
import Sidebar from '@/components/dashboard/Sidebar';
import Topbar from '@/components/dashboard/Topbar';
import MobileNav from '@/components/dashboard/MobileNav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="bg-background text-on-background min-h-screen flex w-full">
      <Sidebar activePath={pathname} />

      <main className="flex-1 flex flex-col min-w-0 max-w-full">
        <Topbar activePath={pathname} />

        {children}

        {/* Footer */}
        <footer className="w-full py-6 px-4 md:px-8 mt-auto bg-surface-container-highest">
          <div className="max-w-content mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col items-center md:items-start">
              <p className="text-sm font-bold text-primary">Catatkeluh</p>
              <p className="text-[11px] text-on-surface-variant mt-1">© 2024 Catatkeluh. Not a medical substitute.</p>
            </div>
            <div className="flex gap-4">
              <span className="text-[11px] text-on-surface-variant hover:text-primary transition-colors cursor-pointer">Privacy Policy</span>
              <span className="text-[11px] text-on-surface-variant hover:text-primary transition-colors cursor-pointer">Terms of Service</span>
            </div>
          </div>
        </footer>
      </main>

      <MobileNav activePath={pathname} />
    </div>
  );
}
