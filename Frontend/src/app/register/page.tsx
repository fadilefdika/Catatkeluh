"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import api from "@/lib/api";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!acceptedTerms) {
      setError("Anda harus menyetujui Syarat & Ketentuan dan Kebijakan Privasi.");
      return;
    }

    setLoading(true);

    try {
      // 1. Register
      await api.post("/auth/register", { email, password, full_name: fullName });
      // 2. Auto Login
      const res = await api.post("/auth/login", { email, password });
      setAuth(res.data.access_token, { id: res.data.user_id, email }, res.data.profile);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Terjadi kesalahan saat mendaftar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background text-on-background font-body-md antialiased min-h-screen flex flex-col relative z-0">
      
      {/* Background Ornaments */}
      <div className="fixed bottom-0 right-0 -z-10 pointer-events-none opacity-20">
        <div className="w-96 h-96 bg-primary-fixed blur-3xl rounded-full translate-x-1/2 translate-y-1/2"></div>
      </div>
      <div className="fixed top-20 left-0 -z-10 pointer-events-none opacity-20">
        <div className="w-64 h-64 bg-secondary-fixed blur-3xl rounded-full -translate-x-1/2"></div>
      </div>

      {/* TopAppBar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-14 max-w-[768px] mx-auto bg-surface dark:bg-surface-dim">
        <Link href="/" className="font-headline-lg-mobile md:font-headline-lg text-primary dark:text-primary-fixed-dim tracking-tight font-bold">
          Catatkeluh
        </Link>
        <div className="flex items-center gap-4">
          <button className="text-on-surface-variant hover:opacity-80 transition-opacity active:scale-95 duration-100 flex items-center">
            <span className="material-symbols-outlined">help_outline</span>
          </button>
        </div>
      </header>

      {/* Main Content: Registration Canvas */}
      <main className="flex-grow flex items-center justify-center pt-16 pb-2 px-gutter">
        <div className="w-full max-w-[768px] flex flex-col items-center">
          
          {/* Registration Card */}
          <div className="w-full bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-[0_10px_40px_-10px_rgba(0,74,198,0.08)] overflow-hidden transition-all duration-300 hover:shadow-lg p-5 md:p-6">
            
            {/* Branding & Title */}
            <div className="mb-4 text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-fixed mb-2">
                <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
              </div>
              <h1 className="text-xl md:text-2xl text-on-surface mb-1 font-bold">
                Mulai Perjalanan Sehatmu
              </h1>
              <p className="text-sm text-on-surface-variant mx-auto ">
                Bergabunglah dengan Catatkeluh untuk mulai mendokumentasikan keluhan kesehatan Anda dengan tenang dan terstruktur.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-error-container text-on-error-container border border-error/20 rounded-lg text-sm text-center font-medium">
                {error}
              </div>
            )}

            {/* Form Fields */}
            <form className="space-y-3" onSubmit={handleRegister}>
              
              {/* Nama Lengkap */}
              <div className="space-y-1">
                <label className="block text-xs text-on-surface font-medium" htmlFor="full_name">Nama Lengkap</label>
                <div className="relative group">
                  <input 
                    id="full_name" 
                    type="text" 
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full h-9 bg-surface rounded-lg border border-outline-variant px-3 py-1.5 text-sm text-on-surface placeholder:text-outline transition-all duration-200 group-hover:border-primary focus:border-primary focus:shadow-[0_0_0_2px_white,0_0_0_3px_#004ac6] focus:outline-none" 
                    placeholder="Contoh: Budi Santoso"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="block text-xs text-on-surface font-medium" htmlFor="email">Email</label>
                <div className="relative group">
                  <input 
                    id="email" 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-9 bg-surface rounded-lg border border-outline-variant px-3 py-1.5 text-sm text-on-surface placeholder:text-outline transition-all duration-200 group-hover:border-primary focus:border-primary focus:shadow-[0_0_0_2px_white,0_0_0_3px_#004ac6] focus:outline-none" 
                    placeholder="nama@email.com"
                  />
                </div>
              </div>

              {/* Kata Sandi */}
              <div className="space-y-1">
                <label className="block text-xs text-on-surface font-medium" htmlFor="password">Kata Sandi</label>
                <div className="relative group">
                  <input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-9 bg-surface rounded-lg border border-outline-variant px-3 py-1.5 pr-10 text-sm text-on-surface placeholder:text-outline transition-all duration-200 group-hover:border-primary focus:border-primary focus:shadow-[0_0_0_2px_white,0_0_0_3px_#004ac6] focus:outline-none" 
                    placeholder="Min. 8 karakter"
                  />
                  <button 
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors focus:outline-none flex items-center justify-center" 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined text-[18px]">{showPassword ? "visibility_off" : "visibility"}</span>
                  </button>
                </div>
              </div>

              {/* Terms & Conditions Checkbox */}
              <div className="flex items-start gap-2 py-0.5">
                <div className="flex items-center h-4">
                  <input 
                    id="terms" 
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary focus:ring-offset-0 transition-all duration-200 cursor-pointer"
                  />
                </div>
                <label className="text-xs text-on-surface-variant cursor-pointer select-none leading-tight" htmlFor="terms">
                  Saya setuju dengan <Link href="/terms" className="text-primary font-bold hover:underline">Syarat & Ketentuan</Link> dan <Link href="/privacy" className="text-primary font-bold hover:underline">Kebijakan Privasi</Link> yang berlaku di Catatkeluh.
                </label>
              </div>

              {/* Action Button */}
              <button 
                type="submit" 
                disabled={loading}
                className="w-full h-10 bg-primary text-white text-sm font-medium rounded-lg hover:opacity-90 active:scale-[0.98] transition-all duration-200 shadow-md flex items-center justify-center gap-1.5 mt-1 disabled:opacity-50 disabled:active:scale-100"
              >
                <span>{loading ? "Memproses..." : "Daftar Sekarang"}</span>
                {!loading && <span className="material-symbols-outlined text-base">arrow_forward</span>}
              </button>
            </form>

            {/* Footer Link */}
            <div className="mt-5 pt-5 border-t border-outline-variant/30 text-center">
              <p className="text-xs text-on-surface-variant">
                Sudah punya akun? 
                <Link href="/login" className="text-primary font-bold hover:underline transition-all ml-1">Masuk di sini</Link>
              </p>
            </div>
          </div>

          {/* Social Proof / Trust Indicators */}
          <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">security</span>
              <span className="text-[11px] font-medium">Data Terenkripsi</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">verified_user</span>
              <span className="text-[11px] font-medium">Privasi Terjaga</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">cloud_done</span>
              <span className="text-[11px] font-medium">Sinkronisasi Real-time</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
