"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-on-background p-4 text-center">
      <div className="w-20 h-20 bg-error-container text-on-error-container rounded-full flex items-center justify-center mb-6 shadow-sm">
        <span className="material-symbols-outlined text-[40px]">warning</span>
      </div>
      <h1 className="text-3xl font-bold mb-3 text-on-surface">Oops! Terjadi Kesalahan</h1>
      <p className="text-on-surface-variant max-w-md mb-8">
        Maaf, sistem mengalami kesalahan tidak terduga saat memproses permintaan Anda. Tim kami telah diberitahu mengenai masalah ini.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-sm hover:opacity-90 transition-opacity active:scale-95"
        >
          Coba Lagi
        </button>
        <Link 
          href="/"
          className="px-6 py-3 border-2 border-outline-variant text-on-surface rounded-xl font-bold hover:bg-surface-variant transition-colors"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
