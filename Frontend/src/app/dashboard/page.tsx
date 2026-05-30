"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function Dashboard() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await api.get('/report/list');
      setReports(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getIconForSymptom = (complaint: string) => {
    const c = complaint.toLowerCase();
    if (c.includes('kepala') || c.includes('pusing')) return 'skull';
    if (c.includes('punggung') || c.includes('nyeri')) return 'back_hand';
    if (c.includes('demam') || c.includes('panas')) return 'thermostat';
    if (c.includes('perut') || c.includes('mual')) return 'sick';
    return 'healing';
  };

  return (
    <div className="px-4 md:px-8 py-6 max-w-content mx-auto w-full pb-20 flex-1">
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
                <p className="text-sm font-bold mt-0.5">{loading ? "..." : `${reports.length} Laporan`}</p>
              </div>
            </div>
            <div className="bg-tertiary-fixed text-on-tertiary-fixed-variant p-4 rounded-2xl flex items-center gap-3 hover:-translate-y-1 transition-all hover:shadow-sm">
              <div className="bg-white/40 p-2 rounded-full">
                <span className="material-symbols-outlined text-[20px]">schedule</span>
              </div>
              <div>
                <p className="text-[11px] font-medium">Update Terakhir</p>
                <p className="text-sm font-bold mt-0.5">Hari ini</p>
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
        
        {loading ? (
           <div className="text-sm text-on-surface-variant py-4">Memuat data...</div>
        ) : reports.length === 0 ? (
           <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 text-center">
             <span className="material-symbols-outlined text-[48px] text-outline mb-2">description</span>
             <p className="text-sm font-medium text-on-surface">Belum ada laporan.</p>
             <p className="text-xs text-on-surface-variant mt-1">Laporan baru akan muncul di sini setelah Anda menyelesaikan sesi intake.</p>
           </div>
        ) : (
          <div className="space-y-3">
            {reports.slice(0, 5).map((report) => (
              <Link key={report.id} href={`/report/${report.id}`} className="group bg-surface-container-lowest border border-outline-variant p-4 rounded-xl flex items-center justify-between hover:shadow-sm hover:-translate-y-[2px] transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[20px]">{getIconForSymptom(report.content_json?.chief_complaint || '')}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-on-surface capitalize">{(report.content_json?.chief_complaint || 'Keluhan Medis').substring(0, 40)}</h4>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      {new Date(report.created_at).toLocaleDateString("id-ID", { year: 'numeric', month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline-block px-2.5 py-1 bg-secondary-container text-on-secondary-container rounded-md text-[10px] font-bold">Selesai</span>
                  <span className="material-symbols-outlined text-outline text-[20px] group-hover:text-primary transition-colors">chevron_right</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
