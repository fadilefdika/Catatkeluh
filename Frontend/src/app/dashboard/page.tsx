"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import api from "@/lib/api";

export default function DashboardPage() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user, profile, logout } = useAuthStore();

  useEffect(() => {
    // Redirect if not logged in
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/login");
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [sessRes, repRes] = await Promise.all([
        api.get("/intake/sessions"),
        api.get("/report/list")
      ]);
      setSessions(sessRes.data);
      setReports(repRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartSession = async () => {
    try {
      const res = await api.post("/intake/start");
      router.push(`/intake/${res.data.session_id}`);
    } catch (err) {
      alert("Gagal memulai sesi baru");
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Memuat...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Halo, {profile?.full_name || user?.email}</h1>
            <p className="text-slate-500">Selamat datang di Catatkeluh</p>
          </div>
          <button onClick={handleLogout} className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50">
            Keluar
          </button>
        </div>

        {/* Action */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">Riwayat Laporan</h2>
          <button onClick={handleStartSession} className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
            + Mulai Keluhan Baru
          </button>
        </div>

        {/* List Reports */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 divide-y">
          {reports.length === 0 ? (
            <div className="p-8 text-center text-slate-500">Belum ada laporan keluhan. Mulai buat laporan pertamamu!</div>
          ) : (
            reports.map((report) => (
              <div key={report.id} className="p-6 flex justify-between items-center hover:bg-slate-50 transition">
                <div>
                  <h3 className="font-semibold text-slate-800">{report.content_json?.chief_complaint || "Laporan Medis"}</h3>
                  <p className="text-sm text-slate-500">{new Date(report.created_at).toLocaleDateString("id-ID", { dateStyle: "long" })}</p>
                </div>
                <button 
                  onClick={() => router.push(`/report/${report.id}`)}
                  className="px-4 py-2 text-blue-600 font-medium hover:bg-blue-50 rounded-lg"
                >
                  Lihat Detail
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
