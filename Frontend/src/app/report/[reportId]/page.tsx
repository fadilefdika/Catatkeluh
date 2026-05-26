"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
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

  if (loading) return <div className="min-h-screen flex items-center justify-center">Memuat Laporan...</div>;
  if (!report) return null;

  const data = report.content_json;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Actions */}
        <div className="flex justify-between items-center flex-wrap gap-4">
          <button onClick={() => router.push("/dashboard")} className="text-slate-600 hover:text-slate-900 font-medium">
            ← Kembali ke Dashboard
          </button>
          <div className="flex gap-2">
            <button 
              onClick={handleShare}
              disabled={isSharing}
              className="px-4 py-2 bg-white border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 transition"
            >
              {shareLink ? "Salin Ulang Tautan" : "Bagikan Laporan"}
            </button>
            <button 
              onClick={handleDownloadPDF}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Unduh PDF
            </button>
          </div>
        </div>

        {shareLink && (
          <div className="p-3 bg-green-50 text-green-700 border border-green-200 rounded-lg text-sm flex justify-between items-center">
            <span>Tautan Publik: <a href={shareLink} target="_blank" rel="noreferrer" className="underline font-medium">{shareLink}</a></span>
          </div>
        )}

        {/* Report Content */}
        <div ref={reportRef} className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-slate-200">
          <div className="text-center mb-8 border-b pb-6">
            <h1 className="text-2xl font-bold text-slate-800">LAPORAN KELUHAN PASIEN</h1>
            <p className="text-slate-500 mt-1">Dihasilkan pada: {new Date(report.created_at).toLocaleString("id-ID")}</p>
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Keluhan Utama</h2>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <p className="text-lg font-medium text-slate-800">{data?.chief_complaint || "-"}</p>
              </div>
            </section>

            <section>
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Riwayat Penyakit Sekarang (HPI)</h2>
              <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-left text-sm">
                  <tbody className="divide-y divide-slate-200">
                    <tr><th className="p-3 bg-slate-50 w-1/3">Onset / Sejak kapan</th><td className="p-3">{data?.history_of_present_illness?.onset || "-"}</td></tr>
                    <tr><th className="p-3 bg-slate-50">Lokasi</th><td className="p-3">{data?.history_of_present_illness?.location || "-"}</td></tr>
                    <tr><th className="p-3 bg-slate-50">Durasi / Pola</th><td className="p-3">{data?.history_of_present_illness?.duration || "-"}</td></tr>
                    <tr><th className="p-3 bg-slate-50">Tingkat Keparahan</th><td className="p-3">{data?.history_of_present_illness?.severity || "-"}</td></tr>
                    <tr><th className="p-3 bg-slate-50">Kualitas (Rasa sakit)</th><td className="p-3">{data?.history_of_present_illness?.quality || "-"}</td></tr>
                    <tr>
                      <th className="p-3 bg-slate-50 align-top">Faktor Memperburuk</th>
                      <td className="p-3">
                        <ul className="list-disc pl-4">
                          {data?.history_of_present_illness?.aggravating_factors?.map((f: string, i: number) => <li key={i}>{f}</li>) || "-"}
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <th className="p-3 bg-slate-50 align-top">Faktor Meringankan</th>
                      <td className="p-3">
                        <ul className="list-disc pl-4">
                          {data?.history_of_present_illness?.relieving_factors?.map((f: string, i: number) => <li key={i}>{f}</li>) || "-"}
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <th className="p-3 bg-slate-50 align-top">Gejala Penyerta</th>
                      <td className="p-3">
                        <ul className="list-disc pl-4">
                          {data?.history_of_present_illness?.associated_symptoms?.map((f: string, i: number) => <li key={i}>{f}</li>) || "-"}
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="grid md:grid-cols-2 gap-4">
              <div>
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Riwayat Medis Masa Lalu</h2>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 h-full">
                  <p className="text-slate-800 text-sm">{data?.past_medical_history || "-"}</p>
                </div>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Alergi</h2>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 h-full">
                  <p className="text-slate-800 text-sm">{data?.allergies || "-"}</p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Pengobatan Saat Ini</h2>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <p className="text-slate-800 text-sm">{data?.current_medications || "-"}</p>
              </div>
            </section>

            <section>
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Catatan Tambahan</h2>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <p className="text-slate-800 text-sm">{data?.additional_notes || "-"}</p>
              </div>
            </section>

          </div>

          <div className="mt-12 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <h3 className="text-amber-800 font-bold mb-1 flex items-center">
              <span className="mr-2">⚠️</span> Disclaimer
            </h3>
            <p className="text-sm text-amber-700">
              Dokumen ini dihasilkan oleh sistem AI berdasarkan jawaban pasien dan <strong>bukan merupakan diagnosis medis</strong>. 
              Laporan ini ditujukan hanya sebagai referensi awal untuk mempermudah komunikasi antara pasien dan tenaga medis profesional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
