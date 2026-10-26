# LOKETSEHAT — Papan Pengumuman Puskesmas

Hari 17 — 30 Days of Code, 2026-10-26.

**Live:** https://kayzenn123.github.io/agent-loketsehat/

Seluruh situs adalah papan pengumuman puskesmas yang penuh stiker miring ala tiket bus antarkota: kertas hijau pucat, tinta hijau tua, stempel pink, dan stiker yang bisa diseret. Tanpa navbar, tanpa hero marketing — pengunjung langsung dilempar ke papan.

## Fitur (semua berfungsi, bukan mockup)

- **Jadwal poli** — 5 poli (Umum, Gigi, KIA & KB, Lansia, Imunisasi) × 6 hari, filter hari + cari poli/dokter, klik kartu → detail (clip-path reveal) + deep-link `?poli=&hari=`.
- **Loket antrean** — 3 loket (A Umum, B Gigi, C KIA), nomor berjalan + tombol panggil, AMBIL NOMOR → karcis bernomor + estimasi tunggu (7 mnt/orang) + stempel SAH, riwayat di localStorage (`loketsehat-v1`, berversi), salin pesan WA, ekspor JSON, deep-link `?loket=&nomor=`.
- **Imunisasi bayi** — 8 vaksin di garis usia 0–18 bulan, klik → detail usia pemberian.
- **Stok obat** — 10 obat esensial + status tersedia/menipis/habis.
- **Stiker pengumuman** — 6 stiker bisa diseret (drag + inertia, keyboard: Enter/Space memindah).
- **Easter egg** — ketik `sehat` → stempel SEHAT SELALU jatuh.
- **Status buka** — dihitung live dari jam WIB (buka Senin–Sabtu 07.30–11.30).
- **Aksesibilitas** — skip link, toggle Gerak, tombol jeda marquee, reduced-motion 0 animasi, keyboard penuh, mode ringan otomatis (CPU/RAM rendah, Save-Data, atau FPS < 40).

Semua nama, jadwal, dan stok di situs ini **CONTOH fiktif**, bukan data resmi puskesmas mana pun.

## Teknologi

- HTML + CSS + JS vanilla, GSAP 3.12.5 + ScrollTrigger (di-host lokal di `vendor/`).
- Font self-host: Teachers (variable wght 400–800), Biryani 400/700, Source Code Pro 400/700 — Fontsource, OFL, total ~78 KB.
- Ikon pixel-art digambar sendiri sebagai SVG inline. Tanpa gambar raster, tanpa shadow, tanpa gradient (sesuai constraint seed).

## Skor QA

- `tools/qa.js` (chromium): exit 0 — 4 viewport (360/390/768/1280), 0 overflow, 0 console issue, tap target ≥ 44px, 1 h1, lang=id. FPS CPU throttle 4x: **60,2**. Reduced-motion: 0 animasi berjalan.
- WebKit: gagal di VM (MiniBrowser kekurangan `libgstreamer-1.0.so.0` — environment, bukan salah situs).
- Lighthouse mobile/desktop: **belum terukur di VM** (chrome-launcher gagal, preseden 10-16 s.d. 10-25) — dicatat jujur, bukan angka karangan.
- Uji fungsi (Playwright, 27 cek): filter hari Rabu/Selasa/Sabtu benar, cari "gigi" = 1 kartu, detail poli, ambil nomor A-025 + localStorage, panggil A-018→A-019, deep-link `?poli=gigi&hari=rabu`, easter egg, riwayat bertahan setelah reload, empty state cari tanpa hasil. 0 pageerror.

## Cara jalanin

Buka `index.html` lewat server statis apa saja, misal `python3 -m http.server` di folder ini. Tidak ada build step.

## Seed

Base 2026-11-04 (pick-seed, 7 penolakan anti-seragam dari base 2026-10-26): domain antrean puskesmas · layout papan pengumuman penuh stiker · referensi tiket bus antarkota · constraint tanpa shadow dan gradient · gerak zoom-in-lalu-pan / marquee ikon+teks / variable font axis / cursor spotlight / curtain wipe · ikon pixel-art · font Teachers/Biryani/Source Code Pro · palet light/analogous hue 136.
