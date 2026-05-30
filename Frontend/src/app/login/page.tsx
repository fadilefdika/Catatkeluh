"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import api from "@/lib/api";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      setAuth(res.data.access_token, { id: res.data.user_id, email }, res.data.profile);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Terjadi kesalahan saat login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col font-body-md antialiased">
      <Navbar />

      {/* Main Content Canvas */}
      <main className="flex-grow flex items-center justify-center px-margin-mobile py-8 bg-[radial-gradient(circle_at_top_left,#ffffff_0%,#f3f3fe_100%)]">
        <div className="w-full max-w-[768px] animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {/* Auth Card */}
          <div className="bg-surface-container-lowest rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-outline-variant/30 overflow-hidden">
            <div className="p-5 md:p-6 flex flex-col gap-4">
              
              {/* Welcome Section */}
              <div className="text-center md:text-left">
                <h1 className="text-xl md:text-2xl text-on-surface mb-1 font-bold">Selamat Datang Kembali</h1>
                <p className="text-xs md:text-sm text-on-surface-variant">Silakan masuk untuk melanjutkan perjalanan pemulihan Anda dengan penuh perhatian.</p>
              </div>

              {/* Illustration */}
              <div className="w-full h-20 md:h-24 rounded-lg overflow-hidden relative">
                <img 
                  alt="Atmospheric professional medical environment" 
                  className="w-full h-full object-cover opacity-80 mix-blend-multiply" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-9mYYixuOezCLNDP1Q6mBomfPmYm3QZZvDzT_xQHXcq45MELSM81gPfVyzs2ZoP3qJIyQVX_SpKO47tXTGXWQfIU60NHlzqG2ZZTGrQ9XtyehGaO_T2V-41-tzxj5BvNR6U0gVY09MXtXXqlCyxYV8Ior-bcN6fxxVdmq07xgehQX2FQtxg3dnftTzMkuzEug2RbR1QZADVDNeU3GKk4DGyCuE7YoRT-pm0Wp9doM-83Qc8KUuxywtakO4aVDrCW9GMmWDTiqCfI"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
              </div>

              {error && (
                <div className="p-3 bg-error-container text-on-error-container border border-error/20 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleLogin} className="flex flex-col gap-3">
                
                {/* Email Input */}
                <div className="flex flex-col gap-1 group">
                  <label className="text-xs text-on-surface-variant px-1 font-medium" htmlFor="email">Email</label>
                  <div className="relative rounded-lg transition-all duration-200 focus-within:ring-[2px] focus-within:ring-white focus-within:ring-offset-[2px] focus-within:ring-offset-primary hover:scale-[1.01]">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">mail</span>
                    <input 
                      id="email" 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-9 bg-surface-container-low border border-outline-variant rounded-lg pl-9 pr-3 text-xs text-on-surface focus:outline-none focus:border-primary transition-colors placeholder:text-outline/50" 
                      placeholder="nama@email.com" 
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="flex flex-col gap-1 group">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-xs text-on-surface-variant font-medium" htmlFor="password">Kata Sandi</label>
                    <button type="button" onClick={() => alert("Fitur Lupa Kata Sandi sedang dalam pengembangan.")} className="text-[11px] text-primary hover:underline transition-all font-bold">Lupa Kata Sandi?</button>
                  </div>
                  <div className="relative rounded-lg transition-all duration-200 focus-within:ring-[2px] focus-within:ring-white focus-within:ring-offset-[2px] focus-within:ring-offset-primary hover:scale-[1.01]">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">lock</span>
                    <input 
                      id="password" 
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-9 bg-surface-container-low border border-outline-variant rounded-lg pl-9 pr-9 text-xs text-on-surface focus:outline-none focus:border-primary transition-colors placeholder:text-outline/50" 
                      placeholder="••••••••" 
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors focus:outline-none flex items-center justify-center"
                    >
                      <span className="material-symbols-outlined text-lg">{showPassword ? "visibility_off" : "visibility"}</span>
                    </button>
                  </div>
                </div>

                {/* Action Button */}
                <button 
                  type="submit" 
                  disabled={loading}
                  className="mt-1 w-full h-10 bg-primary text-white text-sm font-bold rounded-lg shadow-sm hover:opacity-90 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:active:scale-100"
                >
                  {loading ? "Memproses..." : "Masuk"}
                  {!loading && <span className="material-symbols-outlined text-base">login</span>}
                </button>
              </form>

              {/* Secondary Action */}
              <div className="text-center pt-3 border-t border-outline-variant/20">
                <p className="text-xs text-on-surface-variant">
                  Belum memiliki akun? 
                  <Link href="/register" className="text-primary font-bold hover:underline ml-1">Daftar di sini</Link>
                </p>
              </div>

            </div>
          </div>

          {/* Footer Compliance/Identity */}
          <footer className="mt-4 text-center">
            <p className="text-[11px] text-outline font-medium">© 2024 Catatkeluh. Kami menjaga privasi dan keamanan data medis Anda secara ketat.</p>
          </footer>
          
        </div>
      </main>
    </div>
  );
}
