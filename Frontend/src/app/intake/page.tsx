"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function IntakeRedirectPage() {
  const router = useRouter();
  const initRef = useRef(false);

  useEffect(() => {
    // Gunakan useRef untuk mencegah double fire di StrictMode React 18+
    if (initRef.current) return;
    initRef.current = true;
    
    const startSession = async () => {
      try {
        const res = await api.post("/intake/start");
        const sessionId = res.data.id;
        if (sessionId) {
          router.replace(`/intake/${sessionId}`);
        } else {
          throw new Error("Invalid session ID");
        }
      } catch (err) {
        console.error("Gagal memulai sesi intake:", err);
        alert("Gagal memulai sesi baru. Silakan coba lagi nanti.");
        router.push("/dashboard");
      }
    };

    startSession();
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-on-surface">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
      <h2 className="text-xl font-bold text-primary">Menyiapkan Asisten Medis...</h2>
      <p className="text-on-surface-variant text-sm mt-2">Harap tunggu sebentar, kami sedang memulai sesi Anda.</p>
    </div>
  );
}
