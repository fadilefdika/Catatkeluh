# Catatkeluh (AI Medical Intake System)

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi)
![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20Auth-3ECF8E?style=for-the-badge&logo=supabase)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge&logo=typescript)
![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=for-the-badge&logo=python)

Catatkeluh adalah asisten pintar berbasis AI yang dirancang untuk membantu pasien mengutarakan keluhan medis mereka secara terstruktur sebelum berkonsultasi dengan dokter. Aplikasi ini memandu pasien melalui serangkaian pertanyaan klinis standar dan menghasilkan laporan anamnesis ringkas (SOAP) yang dapat dibaca dokter dalam waktu kurang dari 30 detik.

> **Catatan Penting:** Sistem ini **bukan** pengganti dokter dan **tidak memberikan diagnosis medis**. Tujuannya murni untuk menjadi jembatan komunikasi yang efisien antara pasien dan tenaga medis profesional.

---

## 🛠️ Tech Stack

Aplikasi ini dibangun menggunakan arsitektur modern yang memisahkan *Frontend* dan *Backend* secara tegas:

### Frontend (Web)
*   **Framework:** Next.js 14 (App Router)
*   **Bahasa:** TypeScript
*   **Styling:** Tailwind CSS & shadcn/ui
*   **State Management:** Zustand
*   **Fitur Tambahan:** html2pdf.js (Export Laporan PDF)

### Backend (API)
*   **Framework:** FastAPI (Python)
*   **Database & Auth:** Supabase PostgreSQL & Supabase Auth
*   **AI Engine (Dual-Layer):** 
    *   **Primary:** Google Gemini 1.5 Flash (Context window besar, pemahaman instruksi)
    *   **Fallback:** Groq Llama 3.1 70B (Kecepatan inferensi tinggi & akurat)
*   **Hosting Target:** Railway (Backend) & Vercel (Frontend)

---

## ✨ Fitur Utama

1.  **Autentikasi Terintegrasi:** Registrasi dan login aman menggunakan infrastruktur Supabase Auth.
2.  **Guided Symptom Intake:** Obrolan interaktif di mana AI memandu percakapan secara klinis (menanyakan onset, tingkat keparahan, durasi, gejala penyerta, dsb).
3.  **Automatic Report Generation:** Mengekstrak percakapan bebas pasien menjadi laporan anamnesis terstruktur (Format SOAP / *History of Present Illness*).
4.  **Tautan Berbagi (Shareable Link):** Membuat tautan unik yang aman agar laporan medis dapat dibaca oleh dokter dari perangkat manapun tanpa perlu login.
5.  **Ekspor PDF:** Laporan medis dapat langsung diunduh secara instan dalam format PDF.

---

## 📂 Struktur Proyek

Proyek ini dirancang secara modular. Pemisahan komponen dilakukan mengikuti *best practice* Next.js.

```text
GarudaHacks/
│
├── frontend/                 # Aplikasi Web Next.js
│   ├── src/app/              # Halaman routing (Login, Register, Dashboard, Intake, dll)
│   ├── src/components/       # Komponen UI Reusable
│   │   ├── landing/          # Komponen modular khusus Landing Page (Navbar, Hero, dll)
│   │   └── ui/               # Base UI components (Button, Input, dll)
│   ├── src/store/            # Manajemen State menggunakan Zustand
│   └── src/lib/              # Utilitas & Konfigurasi klien
│
├── backend/                  # REST API FastAPI
│   ├── main.py               # Entry point dan definisi utama API / Swagger
│   ├── models/               # Skema validasi request/response (Pydantic)
│   ├── routers/              # Controller API modular (Auth, Intake, Report)
│   ├── services/             # Logika AI Engine & manipulasi Database
│   ├── prompts/              # System prompt untuk mengatur persona/perilaku AI
│   └── config/               # Konfigurasi koneksi eksternal (Supabase, API Keys)
│
└── database_schema.sql       # Skrip inisialisasi tabel & RLS di Supabase
```

---

## 📚 Dokumentasi API (Swagger)

Proyek ini mengadopsi standar **OpenAPI**. Backend dibangun menggunakan FastAPI yang secara otomatis menyediakan dokumentasi API interaktif yang sangat kaya. 

Untuk melihat, menguji, dan memahami seluruh fungsionalitas backend:
1. Jalankan server backend (lihat instruksi di bawah).
2. Buka *browser* dan arahkan ke: **`http://localhost:8000/docs`**
3. Anda akan melihat dokumentasi lengkap, *schema request/response*, dan Anda bisa langsung mengeksekusi API (Fitur "Try it out") dari halaman tersebut.

---

## 🚀 Cara Menjalankan Aplikasi di Lokal

### Prasyarat
Pastikan sistem Anda sudah menginstal:
*   [Node.js](https://nodejs.org/en/) (Disarankan versi LTS, misal 20.x)
*   [Python 3.9+](https://www.python.org/)
*   Akun [Supabase](https://supabase.com) untuk Database
*   API Key untuk [Gemini](https://aistudio.google.com/) dan [Groq](https://console.groq.com/)

### 1. Setup Database (Supabase)
1. Buat project baru di dasbor Supabase.
2. Buka menu **SQL Editor**.
3. Buka file `database_schema.sql` dari *root* direktori proyek ini.
4. Salin semua kodenya, lalu klik *Run* untuk men-generate tabel `profiles`, `intake_sessions`, `intake_messages`, dan `reports` beserta kebijakan *Row Level Security* (RLS).

### 2. Setup Backend (FastAPI)
Buka terminal dan arahkan ke folder `backend`:
```bash
cd backend
```
Buat Virtual Environment (opsional namun sangat disarankan) dan instal dependensi:
```bash
pip install -r requirements.txt
```
Buat file `.env` di dalam folder `backend/` dan konfigurasikan kunci API berikut:
```env
SUPABASE_URL=https://<your-project-id>.supabase.co
SUPABASE_KEY=<your-anon-key>
GEMINI_API_KEY=<your-gemini-key>
GROQ_API_KEY=<your-groq-key>
```
Jalankan server pengembangan FastAPI:
```bash
uvicorn main:app --reload
```
*Backend API (termasuk Swagger UI) berjalan di: `http://localhost:8000`*

### 3. Setup Frontend (Next.js)
Buka tab terminal baru dan arahkan ke folder `frontend`:
```bash
cd frontend
```
Instal seluruh *packages* NPM:
```bash
npm install
```
Buat file `.env.local` di dalam folder `frontend/` jika port backend Anda berbeda dari pengaturan *default*:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```
Jalankan aplikasi web Next.js:
```bash
npm run dev
```
*Aplikasi Catatkeluh siap diuji coba di: `http://localhost:3000`*

---

## 📝 Kontak & Lisensi

Proyek ini dibangun sebagai MVP untuk **GarudaHacks**. Kami berfokus merancang solusi nyata untuk mengefisienkan waktu dokter dan meningkatkan kualitas komunikasi medis di Indonesia.

Untuk informasi lebih lanjut, kolaborasi, atau pertanyaan seputar teknis sistem AI kami, silakan hubungi: **fadilefd1102@gmail.com**.
