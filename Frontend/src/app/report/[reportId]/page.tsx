"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import Link from "next/link";
// require html2pdf on client side
const html2pdf = typeof window !== "undefined" ? require("html2pdf.js") : null;

export default function ReportPage() {
  const { reportId } = useParams();
  const router = useRouter();
  
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSharing, setIsSharing] = useState(false);
  const [shareLink, setShareLink] = useState("");
  
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchReport();
  }, [reportId]);

  const fetchReport = async () => {
    try {
      const res = await api.get(`/report/detail/${reportId}`);
      setReport(res.data);
      if (res.data.is_shared) {
        setShareLink(`${window.location.origin}/report/shared/${res.data.share_token}`);
      }
    } catch (err) {
      console.error(err);
      alert("Laporan tidak ditemukan");
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (!report) return;
    try {
      setIsSharing(true);
      const res = await api.put(`/report/share/${report.id}?is_shared=true`);
      const link = `${window.location.origin}/report/shared/${res.data.share_token}`;
      setShareLink(link);
      navigator.clipboard.writeText(link);
      alert("Tautan berhasil disalin!");
    } catch (err) {
      alert("Gagal membagikan laporan");
    } finally {
      setIsSharing(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!reportRef.current || !html2pdf) return;
    
    const element = reportRef.current;
    const opt = {
      margin:       1,
      filename:     `Laporan-Medis-${report.id.substring(0,6)}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background text-on-surface">Memuat Laporan...</div>;
  if (!report) return null;

  const data = report.content_json;
  const dateFormatted = new Date(report.created_at).toLocaleDateString("id-ID", { year: 'numeric', month: 'long', day: 'numeric' });

  // Parsing severity if it's a number/string out of 10
  const parseSeverity = (sev: string) => {
    if (!sev) return { val: 0, text: "-" };
    const num = parseInt(sev.replace(/[^0-9]/g, ''));
    return { val: isNaN(num) ? 0 : num, text: sev };
  };
  const severity = parseSeverity(data?.history_of_present_illness?.severity);

  return (
    <div className="bg-background text-on-surface font-body-md antialiased min-h-screen flex">
      {/* Sidebar Navigation (Desktop) */}
      <aside className="hidden md:flex flex-col h-screen w-64 bg-surface-container-low border-r border-outline-variant p-4 space-y-2 sticky top-0 shrink-0">
        <div className="px-3 py-4 mb-2">
          <h1 className="text-xl font-bold text-primary">Catatkeluh</h1>
          <p className="text-xs text-on-surface-variant mt-1">Medical Intake Assistant</p>
        </div>
        <nav className="flex-1 space-y-1">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 text-on-surface-variant hover:bg-surface-variant transition-colors rounded-lg">
            <span className="material-symbols-outlined text-[20px]">home</span>
            <span className="text-sm">Home</span>
          </Link>
          <Link href="/dashboard/reports" className="flex items-center gap-3 px-3 py-2.5 bg-primary-container text-on-primary-container font-bold rounded-lg scale-95 transition-transform duration-150">
            <span className="material-symbols-outlined text-[20px]">description</span>
            <span className="text-sm">My Reports</span>
          </Link>
          <Link href="/dashboard/profile" className="flex items-center gap-3 px-3 py-2.5 text-on-surface-variant hover:bg-surface-variant transition-colors rounded-lg">
            <span className="material-symbols-outlined text-[20px]">person</span>
            <span className="text-sm">Medical Profile</span>
          </Link>
          <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2.5 text-on-surface-variant hover:bg-surface-variant transition-colors rounded-lg">
            <span className="material-symbols-outlined text-[20px]">settings</span>
            <span className="text-sm">Settings</span>
          </Link>
        </nav>
        <div className="mt-auto pt-4 border-t border-outline-variant">
          <Link href="/intake" className="w-full bg-primary text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span className="text-sm">New Intake</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="flex-1 max-w-full overflow-x-hidden">
        {/* Top App Bar */}
        <header className="sticky top-0 w-full z-50 flex justify-between items-center px-4 md:px-8 py-3 bg-surface shadow-sm max-w-content mx-auto">
          <div className="flex items-center gap-2">
            <button onClick={() => router.push("/dashboard")} className="md:hidden">
              <span className="material-symbols-outlined text-[20px] text-primary">arrow_back</span>
            </button>
            <h2 className="text-xl font-bold text-primary">Catatkeluh</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-6">
              <Link href="/dashboard" className="text-on-surface-variant font-medium hover:text-primary transition-colors text-sm">Dashboard</Link>
              <span className="text-primary font-bold border-b-2 border-primary text-sm">Reports</span>
            </div>
            <div className="flex items-center gap-3">
              <img alt="User profile" className="w-7 h-7 rounded-full border border-outline-variant" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLyoSt5ITtJdPt6pFrk8_AAZHYcju6ryJQf4-oSRkc7WuhmGcWKhMCRQGR187Jy_SgA178BwMZpOJDfkWChQrp3WK2ezUez6GaWzeSxCaX8egxfK7Fu6EqT0z9YWi1NuxaI6nNkefDHl9KWzY7WcCkV_qI7IsXke7XgKPAXj9YteiVJuHZHhBOe24R_b95a8buQpZC2nk_taBiNimu6RebMP73a3PPcUtBk1DJRriCDdO1yqi2nEEotl2BitZ4Ri6CLg23eqU51nk"/>
            </div>
          </div>
        </header>

        {/* Report Content */}
        <div className="max-w-content mx-auto px-4 md:px-8 py-6 pb-20">
          {shareLink && (
            <div className="mb-4 p-2.5 bg-secondary-container text-on-secondary-container border border-secondary rounded-lg text-xs flex justify-between items-center">
              <span>Tautan Publik: <a href={shareLink} target="_blank" rel="noreferrer" className="underline font-medium">{shareLink}</a></span>
            </div>
          )}

          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <h1 className="text-xl md:text-2xl mb-1 text-on-surface font-bold">Laporan Keluhan Pasien</h1>
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] text-outline uppercase tracking-wider font-medium">Tanggal</span>
                  <span className="text-sm text-on-surface font-medium">{dateFormatted}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 text-sm">
              <button 
                onClick={handleShare}
                disabled={isSharing}
                className="flex-1 md:flex-none border border-outline px-4 py-2 rounded-lg hover:bg-surface-container transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">share</span>
                Share
              </button>
              <button 
                onClick={handleDownloadPDF}
                className="flex-1 md:flex-none bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                Download PDF
              </button>
            </div>
          </div>

          <div ref={reportRef} className="bg-background">
            {/* Bento Layout Content */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              
              {/* Section 1: Keluhan Utama */}
              <section className="md:col-span-12 bg-white rounded-xl p-5 border border-outline-variant shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center gap-2 mb-3 text-primary">
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>healing</span>
                  <h3 className="text-lg font-bold">Keluhan Utama</h3>
                </div>
                <p className="text-xl md:text-2xl text-on-surface font-semibold">{data?.chief_complaint || "-"}</p>
              </section>

              {/* Section 2: Kronologi & Detail */}
              <section className="md:col-span-8 bg-white rounded-xl p-5 border border-outline-variant shadow-sm">
                <div className="flex items-center gap-2 mb-4 text-primary">
                  <span className="material-symbols-outlined text-[20px]">history</span>
                  <h3 className="text-lg font-bold">Kronologi & Detail</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] text-outline uppercase tracking-wider font-medium">Onset</span>
                    <p className="text-sm text-on-surface font-medium">{data?.history_of_present_illness?.onset || "-"}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-outline uppercase tracking-wider font-medium">Lokasi</span>
                    <p className="text-sm text-on-surface font-medium">{data?.history_of_present_illness?.location || "-"}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-outline uppercase tracking-wider font-medium">Kualitas</span>
                    <p className="text-sm text-on-surface font-medium">{data?.history_of_present_illness?.quality || "-"}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-outline uppercase tracking-wider font-medium">Tingkat Keparahan</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-lg font-bold text-error">{severity.val || "-"}</span>
                      <span className="text-xs text-outline">/ 10</span>
                      <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden ml-2">
                        <div className="h-full bg-error rounded-full" style={{ width: `${(severity.val / 10) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3: Faktor Pemberat & Peringan */}
              <section className="md:col-span-4 flex flex-col gap-4">
                <div className="bg-error-container/20 rounded-xl p-4 border border-error-container flex-1">
                  <div className="flex items-center gap-2 mb-2 text-error">
                    <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
                    <h3 className="text-[11px] font-bold uppercase tracking-wider">Memburuk</h3>
                  </div>
                  <ul className="space-y-1.5">
                    {data?.history_of_present_illness?.aggravating_factors?.length > 0 
                      ? data.history_of_present_illness.aggravating_factors.map((f: string, i: number) => (
                        <li key={i} className="flex items-start gap-1.5 text-on-surface">
                          <span className="w-1.5 h-1.5 rounded-full bg-error mt-1.5 shrink-0"></span>
                          <span className="text-xs">{f}</span>
                        </li>
                      ))
                      : <li className="text-xs text-on-surface-variant">-</li>
                    }
                  </ul>
                </div>

                <div className="bg-secondary-container/20 rounded-xl p-4 border border-secondary-container flex-1">
                  <div className="flex items-center gap-2 mb-2 text-on-secondary-container">
                    <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
                    <h3 className="text-[11px] font-bold uppercase tracking-wider">Memperingan</h3>
                  </div>
                  <ul className="space-y-1.5">
                    {data?.history_of_present_illness?.relieving_factors?.length > 0 
                      ? data.history_of_present_illness.relieving_factors.map((f: string, i: number) => (
                        <li key={i} className="flex items-start gap-1.5 text-on-surface">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0"></span>
                          <span className="text-xs">{f}</span>
                        </li>
                      ))
                      : <li className="text-xs text-on-surface-variant">-</li>
                    }
                  </ul>
                </div>
              </section>

              {/* Section 4: Gejala Penyerta */}
              <section className="md:col-span-6 bg-white rounded-xl p-5 border border-outline-variant shadow-sm">
                <div className="flex items-center gap-2 mb-3 text-primary">
                  <span className="material-symbols-outlined text-[20px]">list_alt</span>
                  <h3 className="text-lg font-bold">Gejala Penyerta</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {data?.history_of_present_illness?.associated_symptoms?.length > 0
                    ? data.history_of_present_illness.associated_symptoms.map((f: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-surface-container-high text-on-surface-variant rounded-full text-xs font-medium border border-outline-variant">
                        {f}
                      </span>
                    ))
                    : <span className="text-xs text-outline italic">Tidak ada gejala penyerta</span>
                  }
                </div>
              </section>

              {/* Section 5: Riwayat Medis & Alergi */}
              <section className="md:col-span-6 bg-white rounded-xl p-5 border border-outline-variant shadow-sm">
                <div className="flex items-center gap-2 mb-3 text-primary">
                  <span className="material-symbols-outlined text-[20px]">medical_information</span>
                  <h3 className="text-lg font-bold">Riwayat Medis & Alergi</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-[10px] text-outline uppercase font-medium">Riwayat Medis</h4>
                    <p className="text-sm text-on-surface font-medium">{data?.past_medical_history || "-"}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] text-outline uppercase font-medium">Alergi</h4>
                    <p className="text-sm text-on-surface font-medium">{data?.allergies || "-"}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] text-outline uppercase font-medium">Pengobatan Saat Ini</h4>
                    <p className="text-sm text-on-surface font-medium">{data?.current_medications || "-"}</p>
                  </div>
                </div>
              </section>

              {/* Section 6: Catatan Tambahan */}
              {data?.additional_notes && (
                <section className="md:col-span-12 bg-white rounded-xl p-5 border border-outline-variant shadow-sm">
                  <div className="flex items-center gap-2 mb-3 text-primary">
                    <span className="material-symbols-outlined text-[20px]">note</span>
                    <h3 className="text-lg font-bold">Catatan Tambahan</h3>
                  </div>
                  <p className="text-sm text-on-surface">{data?.additional_notes}</p>
                </section>
              )}

            </div>

            {/* Disclaimer Box */}
            <div className="mt-6 bg-surface-container-highest rounded-xl p-4 border-l-4 border-primary">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-[24px]">warning</span>
                <div>
                  <h4 className="text-xs font-bold text-on-surface mb-0.5 uppercase tracking-tight">Peringatan Penting</h4>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed">
                    Dokumen ini bukan diagnosa medis. Hanya catatan keluhan untuk membantu konsultasi dengan tenaga medis profesional. Harap diskusikan temuan ini dengan dokter Anda.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full py-6 px-4 md:px-8 mt-8 bg-surface-container-highest border-t border-outline-variant/30">
          <div className="max-w-content mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <span className="text-sm font-bold text-primary block mb-1">Catatkeluh</span>
              <p className="text-[11px] text-on-surface-variant">© 2024 Catatkeluh. Not a medical substitute.</p>
            </div>
          </div>
        </footer>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface shadow-[0_-2px_10px_rgba(0,0,0,0.05)] px-4 py-2 flex justify-around items-center z-50">
        <Link href="/dashboard" className="flex flex-col items-center p-2 text-on-surface-variant">
          <span className="material-symbols-outlined text-[20px]">home</span>
          <span className="text-[10px] font-medium mt-1">Home</span>
        </Link>
        <Link href="/dashboard/reports" className="flex flex-col items-center p-2 text-primary font-bold">
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
          <span className="text-[10px] mt-1">Reports</span>
        </Link>
      </nav>
    </div>
  );
}
