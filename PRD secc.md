# Product Requirements Document (PRD)

## AI Medical Intake System — GarudaHacks MVP

**Document Version:** 1.0 (Final MVP)  
**Status:** Approved

---

### 1. Product Overview

- **Product Name:** Doctor-AI Intake Assistant _(temporary working title)_
- **Product Vision:** Membantu pasien menyampaikan keluhan medis secara terstruktur agar dokter dapat memahami kondisi pasien lebih cepat dan efisien.
- **Product Positioning:** Produk ini **bukan** alat diagnosis medis. Produk ini adalah _AI-powered medical intake assistant_ yang membantu menyusun laporan keluhan pasien secara terstruktur sebelum sesi konsultasi dimulai.

#### Core Value Proposition

- Membantu pasien menjelaskan keluhan dengan lebih jelas dan sistematis.
- Mengurangi risiko informasi klinis penting yang terlewat saat konsultasi.
- Mempercepat dokter dalam memahami konteks dan anamnesis awal pasien.
- Menghasilkan laporan keluhan yang dapat dibaca dan dipahami dokter dalam waktu `< 30 detik`.

---

### 2. Problem Statement

Banyak pasien mengalami kesulitan signifikan ketika harus menjelaskan kronologi keluhan, tingkat keparahan, faktor pemicu, dan gejala terkait secara verbal saat konsultasi. Akibat dari kendala komunikasi ini meliputi:

- Konsultasi tatap muka menjadi tidak efisien akibat keterbatasan waktu.
- Dokter harus menggali informasi dasar secara berulang dari awal.
- Informasi klinis penting sering kali terlewat atau tidak tersampaikan oleh pasien.

Di sisi lain, solusi _chatbot_ medis tradisional yang ada di pasar saat ini memiliki kelemahan utama:

- Terlalu cepat memberikan diagnosis spekulatif yang berpotensi membahayakan pasien.
- Alur percakapan tidak terstruktur dan bertele-tele.
- Output data akhir tidak ringkas (_usable_) untuk kebutuhan klinis dokter.

---

### 3. Goals & Objectives

- **Primary Goal:** Membuat sebuah sistem berbasis AI yang dapat memandu pasien menjawab pertanyaan medis dasar secara mandiri, mengumpulkan informasi secara terstruktur, dan menghasilkan laporan keluhan pasien (_intake report_) yang siap pakai bagi dokter.

#### Success Metrics (MVP)

| Metric                                  | Target            |
| :-------------------------------------- | :---------------- |
| Completion rate intake                  | > 70%             |
| Average report generation time          | < 5 menit         |
| User successfully download/share report | > 60%             |
| Average AI intake turns                 | 6 – 12 pertanyaan |
| Crash-free sessions                     | > 95%             |

---

### 4. Target Users

- **Primary Users (Patients):** Orang yang berencana melakukan konsultasi ke dokter, memiliki kesulitan dalam mengartikulasikan gejala medisnya secara terstruktur, atau ingin mencatat kronologi keluhannya secara akurat sebelum bertemu tenaga medis.
- **Secondary Users (Doctors - Indirect Users):** Dokter spesialis maupun umum yang menerima laporan hasil asupan digital (_intake report_). _Catatan:_ Dokter tidak diwajibkan untuk mengunduh atau menggunakan aplikasi secara langsung, melainkan cukup membaca laporan yang dibagikan oleh pasien.

---

### 5. Product Scope

#### 5.1 MVP Scope (Must Have)

1.  **Authentication:** User dapat melakukan registrasi, login, dan logout. Fitur ini menggunakan infrastruktur yang sudah ada (_existing feature to keep_).
2.  **Guided Symptom Intake:** AI memimpin percakapan secara interaktif dan terstruktur dengan mencakup kategori anamnesis utama: _Chief complaint, Onset, Duration, Severity, Location, Aggravating factors, Relieving factors, Associated symptoms,_ dan _Relevant history._ AI akan bertanya satu per satu, memahami jawaban user, menentukan pertanyaan berikutnya, dan mendeteksi kapan data sudah cukup.
3.  **Report Generation:** Sistem otomatis menghasilkan laporan anamnesis sederhana berbasis teks yang mudah dibaca, terstruktur, non-diagnostik, dan dilengkapi _disclaimer_ medis yang jelas.
4.  **Report History:** User dapat melihat daftar riwayat laporan yang pernah dibuat sebelumnya dan membuka kembali detail laporan lama kapan saja.
5.  **Share Report:** User dapat mengunduh laporan dalam format PDF atau menyalin tautan berbagi unik (_shareable link_) untuk dikirim ke dokter.

#### 5.2 Nice to Have (Post-MVP Roadmap)

- **Body Map Visual:** User dapat memilih atau mengetuk area tubuh yang sakit melalui visualisasi peta tubuh (_body map_).
- **Multi-language Support:** Sistem mendukung lokalisasi penuh ke dalam Bahasa Indonesia dan English.
- **QR Code Sharing:** Pembuatan kode QR instan di layar aplikasi agar dokter dapat langsung memindai untuk membuka tautan laporan.

#### 5.3 Out of Scope (Killed Features)

Fitur-fitur berikut ini secara tegas dihapus dari cakupan MVP untuk menjaga fokus pengembangan:

- _Flashcards_ edukasi kesehatan.
- _Doctor directory_ (Daftar direktori dokter dan faskes).
- _General AI health chat_ (Konsultasi AI umum di luar format asupan medis).
- _Medical diagnosis engine_ (Pemberian vonis penyakit otomatis).
- _Prescription recommendation_ (Rekomendasi obat atau resep).
- _Appointment booking_ (Sistem reservasi jadwal klinik/rumah sakit).

---

### 6. User Flow (Main User Journey)
