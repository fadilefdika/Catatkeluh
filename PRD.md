# Perencanaan MVP: Sistem Intake Medis Terstruktur

---

## 1. NAMA SISTEM

### Rekomendasi Nama

| Nama             | Alasan                                                              |
| ---------------- | ------------------------------------------------------------------- |
| **Catatkeluh**   | Simpel, langsung, relatable. "Tempat cerita keluh kesah ke dokter." |
| **Cerita Sehat** | Lebih warm, approachable semua usia                                 |
| **Riang Sehat**  | Positif, tidak intimidating                                         |
| **Sampaikan**    | Verb-based, langsung menjelaskan fungsi: "sampaikan keluhanmu"      |
| **Curhat Sehat** | Familiar, casual tapi tetap purposeful                              |

**Rekomendasi utama: "Catatkeluh"**

Alasan:

- Dua suku kata, mudah diingat
- Langsung menjelaskan fungsi (tempat menyampaikan keluhan)
- Tidak terkesan "AI" atau "teknologi" — terasa personal
- Domain kemungkinan available (Catatkeluh.id / Catatkeluh.com)
- Bisa jadi tagline natural: "Catatkeluh — Bantu sampaikan keluhanmu ke dokter"

---

## 2. TECH STACK (REVISI)

### Frontend — Web Based

| Layer     | Teknologi                           | Alasan                              |
| --------- | ----------------------------------- | ----------------------------------- |
| Framework | **Next.js 14 (App Router)**         | SEO-friendly, fast, SSR/SSG support |
| Bahasa    | TypeScript                          | Type safety                         |
| Styling   | **Tailwind CSS + shadcn/ui**        | Clean, konsisten, cepat develop     |
| State     | Zustand (ringan) atau React Context | Simpel untuk scope MVP              |
| HTTP      | Fetch API native / Axios            | Komunikasi ke backend               |
| PDF       | html2pdf.js atau jsPDF              | Generate report PDF di client       |
| QR        | qrcode.react                        | Share link via QR                   |
| Hosting   | **Vercel**                          | Gratis tier, auto-deploy dari Git   |

### Backend

| Layer      | Teknologi                                   | Alasan                            |
| ---------- | ------------------------------------------- | --------------------------------- |
| Framework  | **FastAPI** (keep)                          | Async, cepat, Python ecosystem    |
| Auth       | **Supabase Auth** (keep)                    | Gratis, JWT-based, mudah          |
| Database   | **Supabase PostgreSQL** (keep, schema baru) | Gratis tier cukup untuk MVP       |
| AI/LLM     | **Lihat section 3**                         |                                   |
| PDF Backup | WeasyPrint atau FPDF                        | Generate PDF di server jika perlu |
| Hosting BE | **Railway** (keep)                          | Gratis tier, gampang deploy       |

### LLM / AI Engine (Section 3)

**Rekomendasi model gratis / sangat murah:**

| Model                           | Akses                             | Kelebihan                                      | Kekurangan                    |
| ------------------------------- | --------------------------------- | ---------------------------------------------- | ----------------------------- |
| **Groq (Llama 3.1 70B/8B)**     | API gratis (rate limited)         | Sangat cepat (inference), gratis, output bagus | Rate limit ketat di free tier |
| **Google Gemini 1.5 Flash**     | API gratis (15 RPM free tier)     | Gratis generous, context window besar          | Kadang verbose                |
| **Mistral (via La Plateforme)** | Free tier available               | Bagus untuk structured output                  | Lebih kecil dari GPT-4        |
| **OpenRouter**                  | Aggregator, beberapa model gratis | Bisa switch model tanpa ubah kode              | Tergantung availability       |
| **Ollama (self-hosted)**        | 100% gratis, lokal                | Tidak ada API cost, full control               | Butuh server/GPU sendiri      |

**Rekomendasi utama: Gemini 1.5 Flash (Primary) & Groq (Llama 3.1) (Fallback)**

Alasan:

- **Gemini Flash** sangat generous di free tier dan memiliki context window yang besar.
- Jika Gemini down atau mengalami rate limit, otomatis fallback ke **Groq (Llama 3.1 70B)** yang super cepat.

**Strategi:** Buat abstraction layer di backend sehingga model bisa di-swap kapan saja tanpa mengubah logic utama.

---

## 4. ARSITEKTUR SISTEM

┌─────────────────────────────────────────────────────┐
│ FRONTEND (Next.js) │
│ Hosted: Vercel │
├─────────────────────────────────────────────────────┤
│ Landing Page → Auth → Intake Chat → Report Viewer │
│ │
│ Components: │
│ - ChatInterface (guided) │
│ - ProgressBar (intake progress) │
│ - ReportCard (preview) │
│ - ReportFull (detail + share/download) │
│ - ProfilePage │
└──────────────────────┬──────────────────────────────┘
│ HTTPS (REST API)
▼
┌─────────────────────────────────────────────────────┐
│ BACKEND (FastAPI) │
│ Hosted: Railway │
├─────────────────────────────────────────────────────┤
│ Routers: │
│ - /auth (login, register, profile) │
│ - /intake (start, respond, status) │
│ - /report (generate, get, list, share) │
│ │
│ Services: │
│ - IntakeService (manage conversation state) │
│ - AIService (abstraction layer untuk LLM) │
│ - ReportService (generate structured report) │
│ │
│ Middleware: │
│ - AuthGuard (verify JWT) │
│ - RateLimiter (prevent abuse) │
└──────────────────────┬──────────────────────────────┘
│
┌────────────┼────────────┐
▼ ▼ ▼
┌──────────────┐ ┌──────────┐ ┌──────────────┐
│ Supabase │ │ Groq │ │ (Optional) │
│ PostgreSQL │ │ LLM API │ │ File Store │
│ + Auth │ │ │ │ (PDF) │
└──────────────┘ └──────────┘ └──────────────┘

---

## 5. DATABASE SCHEMA (Supabase PostgreSQL)

### Tabel: users (managed by Supabase Auth + custom fields)

-- Supabase Auth handles email/password
-- Tambahan di public schema:
CREATE TABLE profiles (
id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
full_name TEXT NOT NULL,
date_of_birth DATE,
gender TEXT CHECK (gender IN ('male', 'female', 'other')),
phone TEXT,
created_at TIMESTAMPTZ DEFAULT NOW(),
updated_at TIMESTAMPTZ DEFAULT NOW()
);

### Tabel: intake_sessions

CREATE TABLE intake_sessions (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
status TEXT NOT NULL DEFAULT 'in_progress'
CHECK (status IN ('in_progress', 'completed', 'abandoned')),
chief_complaint TEXT, -- keluhan utama (diisi setelah pertanyaan pertama)
questions_answered INT DEFAULT 0,
total_questions_planned INT DEFAULT 8,
started_at TIMESTAMPTZ DEFAULT NOW(),
completed_at TIMESTAMPTZ,
created_at TIMESTAMPTZ DEFAULT NOW()
);

### Tabel: intake_messages

CREATE TABLE intake_messages (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
session_id UUID REFERENCES intake_sessions(id) ON DELETE CASCADE,
role TEXT NOT NULL CHECK (role IN ('assistant', 'user')),
content TEXT NOT NULL,
question_category TEXT, -- 'chief_complaint', 'onset', 'severity', 'location', 'aggravating', 'relieving', 'associated', 'history'
message_order INT NOT NULL,
created_at TIMESTAMPTZ DEFAULT NOW()
);

### Tabel: reports

CREATE TABLE reports (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
session_id UUID REFERENCES intake_sessions(id) ON DELETE CASCADE,
user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,

    -- Structured content
    content_json JSONB NOT NULL, -- full structured report data
    summary_text TEXT, -- plain text summary

    -- Sharing
    share_token TEXT UNIQUE DEFAULT encode(gen_random_bytes(16), 'hex'),
    is_shared BOOLEAN DEFAULT FALSE,
    shared_at TIMESTAMPTZ,

    -- Metadata
    generated_at TIMESTAMPTZ DEFAULT NOW(),
    pdf_url TEXT, -- optional, jika generate PDF
    created_at TIMESTAMPTZ DEFAULT NOW()

);

### Tabel: report_feedback (nice-to-have)

CREATE TABLE report_feedback (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
helpful BOOLEAN,
feedback_text TEXT,
feedback_by TEXT CHECK (feedback_by IN ('patient', 'doctor')),
created_at TIMESTAMPTZ DEFAULT NOW()
);

### content_json structure (di dalam reports):

{
"patient_name": "John Doe",
"generated_at": "2026-05-25T10:00:00Z",
"chief_complaint": "Sakit kepala",
"history_of_present_illness": {
"onset": "3 hari yang lalu",
"location": "Bagian belakang kepala",
"duration": "Terus-menerus, memburuk sore hari",
"severity": "7/10",
"quality": "Berdenyut",
"aggravating_factors": ["Cahaya terang", "Kurang tidur"],
"relieving_factors": ["Istirahat di ruang gelap"],
"associated_symptoms": ["Mual ringan", "Leher kaku"]
},
"past_medical_history": "Tidak ada riwayat migrain",
"current_medications": "Paracetamol 500mg (kadang-kadang)",
"allergies": "Tidak ada alergi obat yang diketahui",
"additional_notes": "Pasien bekerja di depan komputer 10+ jam/hari"
}

---

## 6. API SPECIFICATION

### Auth Routes

POST /auth/register → Register user baru
POST /auth/login → Login, return JWT
GET /auth/profile → Get profile (auth required)
PUT /auth/profile → Update profile (auth required)

### Intake Routes

POST /intake/start → Mulai sesi intake baru
Request: { }
Response: { session_id, first_question }

POST /intake/respond → Kirim jawaban, dapat pertanyaan berikutnya
Request: { session_id, message }
Response: {
next_question,
progress: { answered: 3, total: 8 },
is_complete: false
}

GET /intake/session/{id} → Get detail sesi (history messages)
GET /intake/sessions → List semua sesi user

### Report Routes

POST /report/generate → Generate report dari sesi yang completed
Request: { session_id }
Response: { report_id, content_json, share_url }

GET /report/{id} → Get report detail (auth required)
GET /reports → List semua report user
GET /report/shared/{token} → Get report via share link (NO AUTH - public)
GET /report/{id}/pdf → Download PDF version

---

## 7. PROMPT ENGINEERING — Guided Intake AI

### System Prompt (Core)

Kamu adalah asisten intake medis bernama "Catatkeluh". Tugasmu adalah membantu pasien menyampaikan keluhan mereka secara terstruktur.

ATURAN UTAMA:

1. Kamu BUKAN dokter. Kamu TIDAK memberikan diagnosa, saran medis, atau rekomendasi obat.
2. Tugasmu HANYA mengumpulkan informasi keluhan pasien melalui pertanyaan terstruktur.
3. Ajukan SATU pertanyaan pada satu waktu. Jangan bertanya lebih dari satu hal sekaligus.
4. Gunakan bahasa Indonesia yang sederhana dan ramah. Hindari jargon medis kecuali pasien yang menyebutkan duluan.
5. Tunjukkan empati singkat sebelum pertanyaan berikutnya (tapi jangan berlebihan).
6. Jika pasien bertanya tentang diagnosa atau obat, tolak dengan sopan dan ingatkan bahwa tugasmu hanya membantu menyusun laporan untuk dokter.

ALUR PERTANYAAN (ikuti urutan ini):

1. Keluhan utama — "Apa keluhan utama yang kamu rasakan?"
2. Lokasi — "Di bagian mana tubuh kamu merasakan [keluhan]?"
3. Onset — "Sudah berapa lama [keluhan] ini berlangsung?"
4. Severity — "Dari skala 1-10, seberapa mengganggu [keluhan] ini?"
5. Quality — "Bisa deskripsikan rasanya seperti apa? (nyeri tajam/tumpul/berdenyut/dll)"
6. Aggravating — "Apa yang membuat [keluhan] ini memburuk?"
7. Relieving — "Apa yang membuat [keluhan] ini membaik?"
8. Associated symptoms — "Apakah ada keluhan lain yang menyertai?"
9. Medical history — "Apakah kamu punya riwayat penyakit atau sedang minum obat tertentu?"
10. Additional — "Ada hal lain yang ingin kamu sampaikan ke dokter?"

ADAPTASI:

- Jika jawaban pasien sudah mencakup beberapa pertanyaan sekaligus, skip pertanyaan yang sudah terjawab.
- Jika jawaban ambigu, tanya follow-up untuk klarifikasi sebelum lanjut.
- Jika pasien terlihat cemas, berikan reassurance singkat bahwa ini hanya untuk membantu komunikasi dengan dokter.

FORMAT RESPONSE:
Selalu respond dalam JSON:
{
"empathy": "kalimat empati singkat (opsional, boleh null)",
"message": "pertanyaan atau response ke pasien",
"question_category": "chief_complaint|location|onset|severity|quality|aggravating|relieving|associated|history|additional|clarification",
"progress": { "current": 1, "total": 10 },
"is_complete": false,
"extracted_data": { ... data yang sudah terkumpul sejauh ini ... }
}

Jika semua pertanyaan sudah terjawab:
{
"message": "Terima kasih! Saya sudah punya informasi yang cukup untuk menyusun laporan keluhanmu. Klik tombol 'Buat Laporan' untuk generate laporan yang bisa kamu berikan ke dokter.",
"is_complete": true,
"extracted_data": { ... semua data final ... }
}

### Report Generation Prompt

Berdasarkan data intake berikut, buatkan laporan keluhan pasien dalam format terstruktur.

DATA INTAKE:
{extracted_data}

ATURAN:

1. JANGAN menulis diagnosa atau kemungkinan penyakit
2. JANGAN merekomendasikan obat atau tindakan medis
3. Tulis HANYA deskripsi keluhan pasien secara objektif dan terstruktur
4. Gunakan bahasa yang bisa dipahami dokter (boleh pakai istilah medis standar)
5. Format harus mengikuti struktur anamnesis standar

OUTPUT FORMAT (JSON):
{
"chief_complaint": "...",
"history_of_present_illness": {
"onset": "...",
"location": "...",
"duration": "...",
"severity": ".../10",
"quality": "...",
"aggravating_factors": [...],
"relieving_factors": [...],
"associated_symptoms": [...]
},
"past_medical_history": "...",
"current_medications": "...",
"allergies": "...",
"additional_notes": "..."
}

---

## 8. UI/UX DESIGN — Web Based

### Halaman-halaman

/ (Landing Page)
├── /login
├── /register
├── /dashboard (home setelah login)
│ ├── Tombol "Mulai Keluhan Baru"
│ └── List report sebelumnya
├── /intake/{session_id} (guided chat)
├── /report/{report_id} (view report)
├── /report/shared/{token} (public view)
└── /profile

### Design Principles

1. **Minimalis & Calming** — warna soft (biru muda, putih, abu-abu hangat). Orang yang sakit tidak mau UI yang berisik.
2. **Mobile-first responsive** — mayoritas user akses dari HP.
3. **Large text & clear buttons** — aksesibel untuk semua usia.
4. **Progress indicator** — user tahu mereka di step berapa.
5. **Tidak ada visual medis yang menakutkan** — no stethoscope icons, no red crosses. Keep it neutral & warm.

### Color Palette

Primary: #2563EB (blue-600) — trust, calm
Secondary: #0F766E (teal-700) — health, natural
Background: #F8FAFC (slate-50) — clean, light
Surface: #FFFFFF
Text: #1E293B (slate-800)
Text Muted: #64748B (slate-500)
Success: #16A34A (green-600)
Warning: #D97706 (amber-600)

### Typography

Headings: Inter (bold)
Body: Inter (regular)
Sizes:

- Mobile body: 16px (jangan lebih kecil)
- Desktop body: 16-18px
- Headings: 24-32px

### Wireframe: Intake Chat Page

┌─────────────────────────────────────┐
│ ← Kembali Catatkeluh │
├─────────────────────────────────────┤
│ │
│ ┌─────────────────────────────┐ │
│ │ Progress: ████████░░ 6/10 │ │
│ └─────────────────────────────┘ │
│ │
│ ┌─────────────────────────────┐ │
│ │ 🤖 AI: │ │
│ │ "Dari skala 1-10, seberapa │ │
│ │ mengganggu sakit kepalanya?"│ │
│ └─────────────────────────────┘ │
│ │
│ ┌─────────────────────────┐ │
│ │ User: │ │
│ │ "Sekitar 7, cukup │ │
│ │ mengganggu aktivitas" │ │
│ └─────────────────────────┘ │
│ │
│ ┌─────────────────────────────┐ │
│ │ 🤖 AI: │ │
│ │ "Baik, cukup berat ya. │ │
│ │ Bisa deskripsikan rasanya │ │
│ │ seperti apa?" │ │
│ └─────────────────────────────┘ │
│ │
│ │
├─────────────────────────────────────┤
│ ┌─────────────────────────┐ [Send] │
│ │ Ketik jawaban... │ │
│ └─────────────────────────┘ │
└─────────────────────────────────────┘

### Wireframe: Report Page

┌─────────────────────────────────────┐
│ Catatkeluh [Share] [Download] │
├─────────────────────────────────────┤
│ │
│ LAPORAN KELUHAN PASIEN │
│ ───────────────────────── │
│ Dibuat: 25 Mei 2026, 10:30 │
│ │
│ ┌─────────────────────────────┐ │
│ │ Keluhan Utama │ │
│ │ Sakit kepala │ │
│ └─────────────────────────────┘ │
│ │
│ ┌─────────────────────────────┐ │
│ │ Kronologi & Detail │ │
│ │ │ │
│ │ Onset: 3 hari yang lalu │ │
│ │ Lokasi: Belakang kepala │ │
│ │ Severity: 7/10 │ │
│ │ Kualitas: Berdenyut │ │
│ │ │ │
│ │ Memperburuk: │ │
│ │ • Cahaya terang │ │
│ │ • Kurang tidur │ │
│ │ │ │
│ │ Memperingan: │ │
│ │ • Istirahat di ruang gelap │ │
│ └─────────────────────────────┘ │
│ │
│ ┌─────────────────────────────┐ │
│ │ Gejala Penyerta │ │
│ │ • Mual ringan │ │
│ │ • Leher kaku │ │
│ └─────────────────────────────┘ │
│ │
│ ┌─────────────────────────────┐ │
│ │ ⚠️ Disclaimer │ │
│ │ Dokumen ini bukan diagnosa │ │
│ │ medis. Hanya catatan keluhan │ │
│ │ untuk membantu konsultasi. │ │
│ └─────────────────────────────┘ │
│ │
└─────────────────────────────────────┘

---

## 9. FOLDER STRUCTURE

### Backend

backend/
├── main.py # FastAPI app entry point
├── requirements.txt
├── railway.json
├── .env.example
│
├── routers/
│ ├── **init**.py
│ ├── auth.py # /auth routes
│ ├── intake.py # /intake routes
│ └── report.py # /report routes
│
├── services/
│ ├── **init**.py
│ ├── ai_service.py # LLM abstraction (Groq/OpenAI/Gemini)
│ ├── intake_service.py # Intake logic & state management
│ └── report_service.py # Report generation & PDF
│
├── models/
│ ├── **init**.py
│ ├── intake.py # Pydantic models for intake
│ ├── report.py # Pydantic models for report
│ └── user.py # Pydantic models for user/auth
│
├── middleware/
│ ├── **init**.py
│ └── auth_guard.py # JWT verification via Supabase
│
├── prompts/
│ ├── intake_system.txt # System prompt untuk guided intake
│ └── report_generate.txt # Prompt untuk generate report
│
└── config/
├── **init**.py
├── settings.py # Environment variables
└── supabase_client.py # Supabase connection

### Frontend

frontend/
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── .env.local.example
│
├── app/
│ ├── layout.tsx # Root layout
│ ├── page.tsx # Landing page
│ ├── login/page.tsx
│ ├── register/page.tsx
│ ├── dashboard/page.tsx # Home (after login)
│ ├── intake/
│ │ └── [sessionId]/page.tsx # Chat interface
│ ├── report/
│ │ ├── [reportId]/page.tsx # Report detail (auth)
│ │ └── shared/[token]/page.tsx # Public shared report
│ └── profile/page.tsx
│
├── components/
│ ├── ui/ # shadcn components
│ ├── ChatBubble.tsx
│ ├── ProgressBar.tsx
│ ├── ReportCard.tsx # Preview card di dashboard
│ ├── ReportFull.tsx # Full report view
│ ├── Navbar.tsx
│ └── Footer.tsx
│
├── lib/
│ ├── api.ts # Axios instance + interceptors
│ ├── auth.ts # Auth helpers (token management)
│ └── types.ts # TypeScript interfaces
│
└── public/
├── logo.svg
└── og-image.png # Open graph image for sharing

---

## 10. IMPLEMENTATION TIMELINE

### Week 1: Foundation

| Hari | Task                                                                    |
| ---- | ----------------------------------------------------------------------- |
| 1    | Setup repo, Supabase project, environment configs                       |
| 2    | Backend: Auth routes (register, login, profile) + auth_guard middleware |
| 3    | Backend: AI Service abstraction (Groq integration) + test prompt        |
| 4    | Frontend: Next.js setup, Tailwind, shadcn. Landing + Auth pages         |
| 5    | Integration: FE auth flow → BE → Supabase                               |

### Week 2: Core Feature

| Hari | Task                                                                |
| ---- | ------------------------------------------------------------------- |
| 6    | Backend: Intake routes (start, respond) + intake_service logic      |
| 7    | Backend: Prompt engineering fine-tuning + testing conversation flow |
| 8    | Frontend: Chat interface (intake page) + progress bar               |
| 9    | Frontend: Dashboard page (list sessions/reports)                    |
| 10   | Integration: Full intake flow end-to-end test                       |

### Week 3: Report & Polish

| Hari | Task                                                                  |
| ---- | --------------------------------------------------------------------- |
| 11   | Backend: Report generation (dari completed session → structured JSON) |
| 12   | Backend: Share token, public endpoint, PDF generation                 |
| 13   | Frontend: Report viewer page + shared report page                     |
| 14   | Frontend: Share button (copy link, QR) + Download PDF                 |
| 15   | Polish: Responsive design, error handling, loading states             |

### Week 4: Final

| Hari | Task                                           |
| ---- | ---------------------------------------------- |
| 16   | Testing: End-to-end semua flow                 |
| 17   | Deploy: BE ke Railway, FE ke Vercel            |
| 18   | Bug fixing, edge cases                         |
| 19   | README, dokumentasi, screenshot untuk LinkedIn |
| 20   | Launch + LinkedIn post                         |

---

## 11. LINKEDIN POST FRAMING

### Angle yang kuat:

> "Di Indonesia, rata-rata waktu konsultasi dokter hanya 7 menit. Banyak pasien keluar ruang praktik dan baru ingat: 'Oh iya, saya lupa bilang yang ini...'
>
> Di GarudaHacks, saya build Catatkeluh — sistem intake medis berbasis AI yang membantu pasien menyusun keluhan mereka secara terstruktur SEBELUM ketemu dokter.
>
> Bukan diagnosa. Bukan pengganti dokter. Tapi jembatan komunikasi yang membantu pasien menyampaikan keluhannya dengan lengkap.
>
> Output-nya: laporan terstruktur (format anamnesis) yang bisa langsung dibaca dokter dalam 30 detik.
>
> Tech: Next.js • FastAPI • Groq (Llama 3.1) • Supabase • Vercel
>
> Feedback welcome — especially dari teman-teman tenaga medis 🙏"

---

## 12. KEY DECISIONS SUMMARY

| Keputusan    | Pilihan                   | Reasoning                           |
| ------------ | ------------------------- | ----------------------------------- |
| Nama         | Catatkeluh                | Simpel, Indonesia, memorable        |
| Frontend     | Next.js (web)             | No install, accessible semua device |
| LLM Primary  | Gemini Flash              | Free tier besar, context panjang    |
| LLM Fallback | Groq (Llama 3.1 70B)      | Cepat, sebagai backup jika gagal    |
| Database     | Supabase PostgreSQL       | Keep, schema redesign               |
| Auth         | Supabase Auth             | Keep, sudah proven                  |
| Deploy FE    | Vercel                    | Gratis, auto-deploy                 |
| Deploy BE    | Railway                   | Gratis tier, Python support         |
| Styling      | Tailwind + shadcn/ui      | Clean, fast development             |
| PDF          | html2pdf.js (client-side) | Simpel, no server cost              |

---

## 13. RISIKO & MITIGASI (MVP SCOPE)

| Risiko                          | Mitigasi                                            |
| ------------------------------- | --------------------------------------------------- |
| Groq rate limit habis saat demo | Siapkan fallback ke Gemini Flash, switch di env var |
| AI hallucinate / kasih diagnosa | System prompt ketat + output validation di backend  |
| User abuse (spam intake)        | Rate limit: max 5 sessions/hari per user            |
| Report bocor (privacy)          | Share token hanya aktif jika user explicit share    |
| Supabase free tier limit        | Cukup untuk MVP (500MB DB, 50K auth users)          |

---

_Dokumen ini adalah single source of truth untuk development MVP Catatkeluh. Semua keputusan di atas bisa di-revisit setelah MVP live dan mendapat feedback dari user nyata._
