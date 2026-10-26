/* LOKETSEHAT — logika papan. Semua data CONTOH fiktif. */
"use strict";

/* ---------- data ---------- */
const HARI = ["senin", "selasa", "rabu", "kamis", "jumat", "sabtu"];
const HARI_LABEL = { senin: "Senin", selasa: "Selasa", rabu: "Rabu", kamis: "Kamis", jumat: "Jumat", sabtu: "Sabtu", minggu: "Minggu" };

const POLI = [
  { id: "umum", nama: "Poli Umum", dokter: "dr. Ratna Wulandari", ikon: "stetoskop",
    jadwal: { senin: ["07.30–11.30", 60], selasa: ["07.30–11.30", 60], rabu: ["07.30–11.30", 60], kamis: ["07.30–11.30", 60], jumat: ["07.30–11.00", 50], sabtu: ["07.30–10.00", 30] },
    ket: "Demam, batuk-pilek, pusing, luka ringan, dan surat rujukan. Datang pagi, Nak, kuota cepat habis." },
  { id: "gigi", nama: "Poli Gigi", dokter: "drg. Budi Santoso", ikon: "gigi",
    jadwal: { senin: ["08.00–11.00", 25], rabu: ["08.00–11.00", 25], jumat: ["08.00–11.00", 25] },
    ket: "Cabut, tambal, dan bersihin karang gigi. Jangan makan dulu sejam sebelum dicabut, ya." },
  { id: "kia", nama: "Poli KIA & KB", dokter: "Bidan Sari Melati", ikon: "ibu",
    jadwal: { senin: ["08.00–11.30", 40], selasa: ["08.00–11.30", 40], rabu: ["08.00–11.30", 40], kamis: ["08.00–11.30", 40], jumat: ["08.00–11.00", 30] },
    ket: "Periksa kehamilan, KB, dan konsultasi ibu menyusui. Bawa buku KIA-nya, jangan ketinggalan." },
  { id: "lansia", nama: "Poli Lansia", dokter: "dr. Agus Prasetyo", ikon: "lansia",
    jadwal: { selasa: ["08.00–10.30", 30], kamis: ["08.00–10.30", 30] },
    ket: "Cek tensi, gula darah, dan obat rutin simbah. Dianter keluarga lebih baik, Nak." },
  { id: "imunisasi", nama: "Poli Imunisasi", dokter: "Bidan Dewi Lestari", ikon: "jarum",
    jadwal: { rabu: ["08.00–11.00", 50], sabtu: ["08.00–11.00", 50] },
    ket: "Imunisasi bayi dan anak sesuai buku KIA. Rabu dan Sabtu saja, jangan salah hari." },
];

const VAKSIN = [
  { nama: "HB-0", usia: "0–7 hari", bln: 0, ket: "Hepatitis B lahir. Diberikan sebelum bayi pulang dari tempat bersalin." },
  { nama: "BCG", usia: "1 bulan", bln: 1, ket: "Mencegah tuberkulosis berat. Bekas suntik di lengan atas boleh bernanah sedikit, itu wajar." },
  { nama: "Polio 1 + DPT-HB-Hib 1", usia: "2 bulan", bln: 2, ket: "Tetes polio dan suntik DPT pertama. Bayi mungkin demam ringan semalam." },
  { nama: "Polio 2 + DPT-HB-Hib 2", usia: "3 bulan", bln: 3, ket: "Lanjutan dosis kedua. Bawa buku KIA dan catat tanggalnya." },
  { nama: "Polio 3 + DPT-HB-Hib 3", usia: "4 bulan", bln: 4, ket: "Lanjutan dosis ketiga. Setelah ini jeda sampai 9 bulan." },
  { nama: "Polio 4 + IPV", usia: "4 bulan", bln: 4, ket: "Polio suntik (IPV) melengkapi polio tetes. Tanyakan ke bidan kalau ragu." },
  { nama: "Campak / MR", usia: "9 bulan", bln: 9, ket: "Campak dan rubela. Bayi sudah boleh makan pendamping, imunisasi tetap jalan." },
  { nama: "DPT-HB-Hib lanjutan", usia: "18 bulan", bln: 18, ket: "Booster balita. Jangan lupa juga vitamin A tiap Februari dan Agustus." },
];

const OBAT = [
  { nama: "Paracetamol 500 mg", dosis: "penurun panas & nyeri", stok: "tersedia" },
  { nama: "Amoxicillin 500 mg", dosis: "antibiotik, resep dokter", stok: "tersedia" },
  { nama: "CTM 4 mg", dosis: "alergi & gatal", stok: "menipis" },
  { nama: "ORS", dosis: "pengganti cairan diare", stok: "tersedia" },
  { nama: "Vitamin A 200.000 IU", dosis: "balita, Februari & Agustus", stok: "tersedia" },
  { nama: "Tablet Fe", dosis: "tambah darah ibu hamil", stok: "menipis" },
  { nama: "Amoxicillin sirup", dosis: "antibiotik anak", stok: "habis" },
  { nama: "Salep mata kloramfenikol", dosis: "infeksi mata ringan", stok: "tersedia" },
  { nama: "OBH sirup", dosis: "batuk berdahak", stok: "menipis" },
  { nama: "Zinc 20 mg", dosis: "pendamping diare anak", stok: "tersedia" },
];

const PENGUMUMAN = [
  { judul: "Posyandu tanggal 10", isi: "Timbang bayi & imunisasi di balai RW 03. Bawa buku KIA.", rot: -3, x: 3, y: 10 },
  { judul: "Bawa KTP & BPJS", isi: "Tanpa kartu, loket tidak bisa daftarin. Fotokopi juga boleh.", rot: 2, x: 50, y: 10 },
  { judul: "Imunisasi Rabu & Sabtu", isi: "Selain dua hari itu, bidan tidak di tempat. Catat baik-baik.", rot: -2, x: 3, y: 40 },
  { judul: "Parkir di sisi timur", isi: "Jangan halangi jalan ambulans. Motor dirapikan, ya, Nak.", rot: 3, x: 50, y: 40 },
  { judul: "Lansia diantar keluarga", isi: "Simbah yang datang sendiri dibantu petugas sampai loket.", rot: -4, x: 3, y: 70 },
  { judul: "Buang sampah di tempatnya", isi: "Masker bekas jangan berserakan. Ada tempat sampah medis.", rot: 2, x: 50, y: 70 },
];

const LOKET = {
  A: { nama: "Loket A — Umum", saat: 18, ambil: 24 },
  B: { nama: "Loket B — Gigi", saat: 9, ambil: 13 },
  C: { nama: "Loket C — KIA", saat: 12, ambil: 15 },
};

const MARQUEE_ATAS = "buka senin–sabtu 07.30–11.30 • bawa ktp & kartu bpjs • imunisasi rabu & sabtu • jangan lupa buku kia •";
const MARQUEE_BAWAH = "posyandu tanggal 10 • cek tensi gratis tiap selasa • vitamin a februari & agustus • antre dengan tertib •";

/* ---------- ikon pixel-art (SVG kotak 8-bit, digambar sendiri) ---------- */
const IKON = {
  stetoskop: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M9 2h6v6h6v6h-6v6H9v-6H3V8h6V2z"/></svg>',
  gigi: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 2h7v3h2V2h7v7c0 2-1 4-3 4-1 0-2-1-2-2l-1-3h-4l-1 3c0 1-1 2-2 2-2 0-3-2-3-4V2z"/></svg>',
  ibu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M9 2h6v3H9V2zM7 6h10v3l-2 2v9H9v-9L7 9V6zm9 0h3v9l-3 1V6z"/></svg>',
  lansia: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M10 2h4v4h-4V2zM8 7h8v3l-2 1v9H10v-9l-2-1V7zm-4 2h2v11H4V9zm14 0h2v11h-2V9z"/></svg>',
  jarum: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14 2l8 8-3 3-8-8 3-3zM11 6l3 3-8 8-3-3 8-8zM2 20l2-2 2 2-2 2-2-2zm5-3l2-2 2 2-2 2-2-2z"/></svg>',
  jam: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M5 2h14v2H5V2zm2 4h10v12H7V6zm4 3h2v4l3 2-1 2-4-3V9z"/></svg>',
  karcis: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M2 6h20v4h-3v4h3v4H2v-4h3v-4H2V6zm7 5h2v2H9v-2zm4 0h2v2h-2v-2z"/></svg>',
  lonceng: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M10 2h4v2h-4V2zM6 5h12l2 8v3H4v-3l2-8zm3 13h6v3H9v-3z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M9 2h6l3 6-6 14L6 8l3-6zm3 5h2v2h-2V7zm0 4h2v2h-2v-2z"/></svg>',
  pil: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 10l8-8 8 8-8 8-8-8zm3 0l5 5 5-5-5-5-5 5z"/></svg>',
  telepon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 2h6v4l-2 2 2 6 6 2 2-2h4v6l-2 2-14-4-2-2V2z"/></svg>',
  stempel: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M10 2h4v4h-4V2zM7 6h10v4l-2 2v6h4v4H5v-4h4v-6L7 10V6z"/></svg>',
};

/* ---------- util ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const el = (tag, cls, teks) => { const n = document.createElement(tag); if (cls) n.className = cls; if (teks != null) n.textContent = teks; return n; };
const fmtTanggal = new Intl.DateTimeFormat("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
const fmtJam = new Intl.DateTimeFormat("id-ID", { hour: "2-digit", minute: "2-digit" });
const hariIni = () => new Intl.DateTimeFormat("id-ID", { weekday: "long", timeZone: "Asia/Jakarta" }).format(new Date()).toLowerCase();
const jamWIB = () => { const p = new Intl.DateTimeFormat("id-ID", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Jakarta" }).format(new Date()); return p; };

const gerakAktif = () => !document.body.classList.contains("gerak-mati") && !matchMedia("(prefers-reduced-motion: reduce)").matches;
const LS_KEY = "loketsehat-v1";
function muatLS() {
  try { const d = JSON.parse(localStorage.getItem(LS_KEY) || "null"); if (d && d.version === 1 && Array.isArray(d.tiket)) return d; } catch (e) { /* rusak: reset */ }
  return { version: 1, tiket: [] };
}
function simpanLS(d) { try { localStorage.setItem(LS_KEY, JSON.stringify(d)); } catch (e) { /* penyimpanan penuh: abaikan */ } }

/* ---------- status buka & karcis hari ---------- */
function statusBuka() {
  const hari = hariIni();
  const elStatus = $("#status-buka");
  const jam = jamWIB().replace(".", ":");
  const [j, m] = jam.split(":").map(Number);
  const menit = j * 60 + m;
  const buka = menit >= 450 && menit < 690; // 07.30–11.30
  const tutupSabtu = hari === "sabtu" && menit >= 600;
  if (hari === "minggu") { elStatus.textContent = "Minggu: puskesmas tutup — sampai jumpa Senin, Nak."; elStatus.classList.add("tutup"); }
  else if (!buka || tutupSabtu) { elStatus.textContent = "Loket sedang tutup — buka 07.30–11.30, Senin–Sabtu."; elStatus.classList.add("tutup"); }
  else { elStatus.textContent = "Buka sekarang — " + HARI_LABEL[hari] + " " + jam + " WIB. Silakan antre, Nak."; elStatus.classList.remove("tutup"); }
  $("#tanggal-hari").textContent = fmtTanggal.format(new Date());
  const h = HARI.includes(hari) ? hari : "senin";
  $("#karcis-hari").textContent = HARI_LABEL[h];
  $("#karcis-jam").textContent = h === "sabtu" ? "07.30–10.00" : "07.30–11.30";
  const seed = [...(new Date().toISOString().slice(0, 10))].reduce((a, c) => a + c.charCodeAt(0), 0);
  $("#karcis-nomor").textContent = "LOKET-2026-" + String(100 + (seed % 900));
}

/* ---------- marquee ---------- */
function isiMarquee() {
  const seg = (teks, ikon) => `<span>${teks}</span>${IKON[ikon] || ""}`;
  const atas = (seg(MARQUEE_ATAS, "karcis") + seg(MARQUEE_ATAS, "jam")).repeat(2);
  const bawah = (seg(MARQUEE_BAWAH, "lonceng") + seg(MARQUEE_BAWAH, "pin")).repeat(2);
  $("#marquee-isi-atas").innerHTML = atas; $("#marquee-isi-atas-2").innerHTML = atas;
  $("#marquee-isi-bawah").innerHTML = bawah; $("#marquee-isi-bawah-2").innerHTML = bawah;
}
let marqueeJeda = false;
function putarMarquee() {
  const trek = $$(".marquee-track");
  let x = 0, lastY = window.scrollY, lastT = performance.now(), vel = 0;
  function frame(t) {
    if (!marqueeJeda && gerakAktif() && !document.hidden) {
      const dt = Math.min((t - lastT) / 1000, 0.05); lastT = t;
      const vy = (window.scrollY - lastY) / Math.max(dt, 0.001); lastY = window.scrollY;
      vel = vel * 0.9 + vy * 0.1;
      x -= (30 + Math.min(Math.abs(vel) * 0.06, 90)) * dt;
      const lebar = trek[0].scrollWidth / 2;
      if (Math.abs(x) >= lebar) x += lebar;
      trek.forEach(tr => {
        const dir = tr.dataset.kecepatan === "-1" ? -1 : 1;
        tr.style.transform = `translateX(${x * dir}px) skewX(${Math.max(-12, Math.min(12, vel * 0.01 * dir))}deg)`;
      });
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

/* ---------- stiker pengumuman (drag inertia) ---------- */
function bangunStiker() {
  const area = $("#stiker-area");
  PENGUMUMAN.forEach(p => {
    const s = el("article", "stiker");
    s.style.setProperty("--rot", p.rot + "deg");
    s.style.left = p.x + "%"; s.style.top = p.y + "%";
    s.setAttribute("tabindex", "0");
    s.setAttribute("role", "button");
    s.setAttribute("aria-label", p.judul + ": " + p.isi);
    const ik = el("span", "stiker-ikon"); ik.innerHTML = IKON.pin; s.append(ik);
    s.append(el("strong", null, p.judul), el("span", null, p.isi));
    area.append(s);
    let sx = 0, sy = 0, ox = 0, oy = 0, vx = 0, vy = 0, raf = 0, dragging = false;
    const pos = () => ({ x: parseFloat(s.style.left), y: parseFloat(s.style.top) });
    s.addEventListener("pointerdown", e => {
      dragging = true; s.setPointerCapture(e.pointerId);
      sx = e.clientX; sy = e.clientY; const p0 = pos(); ox = p0.x; oy = p0.y;
      cancelAnimationFrame(raf); vx = vy = 0;
    });
    s.addEventListener("pointermove", e => {
      if (!gerakAktif() || !dragging) return;
      const r = area.getBoundingClientRect();
      const nx = Math.max(0, Math.min(78, ox + (e.clientX - sx) / r.width * 100));
      const ny = Math.max(0, Math.min(72, oy + (e.clientY - sy) / r.height * 100));
      vx = nx - parseFloat(s.style.left); vy = ny - parseFloat(s.style.top);
      s.style.left = nx + "%"; s.style.top = ny + "%";
    });
    const lepas = () => {
      if (!dragging) return; dragging = false;
      const luncur = () => {
        vx *= 0.92; vy *= 0.92;
        if (Math.abs(vx) < 0.05 && Math.abs(vy) < 0.05) return;
        const r = area.getBoundingClientRect();
        s.style.left = Math.max(0, Math.min(78, parseFloat(s.style.left) + vx)) + "%";
        s.style.top = Math.max(0, Math.min(72, parseFloat(s.style.top) + vy)) + "%";
        raf = requestAnimationFrame(luncur);
      };
      if (gerakAktif()) raf = requestAnimationFrame(luncur);
    };
    s.addEventListener("pointerup", lepas);
    s.addEventListener("pointercancel", lepas);
    s.addEventListener("keydown", e => {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      const r = area.getBoundingClientRect();
      const acak = () => Math.floor(Math.random() * 60);
      s.style.left = acak() + "%"; s.style.top = acak() + "%";
    });
  });
}

/* ---------- jadwal poli ---------- */
let hariAktif = HARI.includes(hariIni()) ? hariIni() : "senin";
function bangunFilterHari() {
  const wadah = $("#filter-hari");
  HARI.forEach(h => {
    const b = el("button", null, HARI_LABEL[h]);
    b.type = "button"; b.setAttribute("aria-pressed", String(h === hariAktif));
    b.addEventListener("click", () => { hariAktif = h; $$("#filter-hari button").forEach(x => x.setAttribute("aria-pressed", "false")); b.setAttribute("aria-pressed", "true"); renderPoli(); });
    wadah.append(b);
  });
}
function renderPoli() {
  const q = ($("#cari-poli").value || "").trim().toLowerCase();
  const grid = $("#grid-poli");
  grid.innerHTML = "";
  let n = 0;
  POLI.forEach(p => {
    const j = p.jadwal[hariAktif];
    if (!j) return;
    if (q && !(p.nama + " " + p.dokter).toLowerCase().includes(q)) return;
    n++;
    const k = el("button", "kartu-poli");
    k.type = "button";
    k.setAttribute("aria-label", p.nama + ", " + p.dokter + ", " + HARI_LABEL[hariAktif] + " " + j[0]);
    const ik = el("span", "ikon-poli"); ik.innerHTML = IKON[p.ikon]; k.append(ik);
    k.append(el("h3", null, p.nama));
    k.append(el("span", "dokter", p.dokter));
    k.append(el("span", "jam", HARI_LABEL[hariAktif] + " · " + j[0]));
    k.append(el("span", "kuota", "kuota " + j[1] + " pasien / hari"));
    k.addEventListener("click", () => bukaDetailPoli(p));
    grid.append(k);
  });
  $("#empty-jadwal").hidden = n > 0;
}
function bukaDetailPoli(p) {
  const j = p.jadwal[hariAktif];
  const isi = $("#isi-detail");
  isi.innerHTML = "";
  isi.append(el("h3", null, p.nama));
  const dl = el("div");
  const baris = [
    ["Dokter / bidan", p.dokter],
    ["Hari ini", HARI_LABEL[hariAktif] + " · " + j[0]],
    ["Kuota", j[1] + " pasien"],
    ["Hari buka lain", Object.keys(p.jadwal).filter(h => h !== hariAktif).map(h => HARI_LABEL[h]).join(", ") || "—"],
    ["Catatan Bu Suster", p.ket],
  ];
  baris.forEach(([k, v]) => { const r = el("p"); const b = el("strong", null, k + ": "); r.append(b, document.createTextNode(v)); dl.append(r); });
  isi.append(dl);
  const d = $("#detail-poli");
  d.hidden = false;
  d.scrollIntoView({ behavior: gerakAktif() ? "smooth" : "auto", block: "nearest" });
  $("#tutup-detail").focus();
  const u = new URL(location.href);
  u.searchParams.set("poli", p.id); u.searchParams.set("hari", hariAktif);
  history.replaceState(null, "", u);
  if (gerakAktif() && window.gsap) gsap.fromTo(d, { clipPath: "circle(0% at 50% 0%)" }, { clipPath: "circle(150% at 50% 0%)", duration: 0.6, ease: "power2.out" });
}

/* ---------- antrean ---------- */
let dataLS = muatLS();
function renderLoket() {
  const row = $("#loket-row");
  row.innerHTML = "";
  Object.entries(LOKET).forEach(([huruf, l]) => {
    const d = el("article", "loket");
    const h = el("span", "huruf", huruf); d.append(h);
    d.append(el("h3", null, l.nama));
    const no = el("p", "nomor-besar", huruf + "-" + String(l.saat).padStart(3, "0"));
    no.id = "nomor-" + huruf; d.append(no);
    d.append(el("p", "estimasi", "sedang dilayani · ambil nomor untuk antre"));
    const aksi = el("div", "tombol-loket");
    const ambil = el("button", "tombol-ambil", "ambil nomor " + huruf);
    ambil.type = "button";
    ambil.addEventListener("click", () => ambilNomor(huruf));
    const panggil = el("button", null, "panggil ▶");
    panggil.type = "button";
    panggil.setAttribute("aria-label", "panggil nomor berikutnya loket " + huruf);
    panggil.addEventListener("click", () => panggilNomor(huruf));
    aksi.append(ambil, panggil);
    d.append(aksi);
    row.append(d);
  });
}
function panggilNomor(huruf) {
  LOKET[huruf].saat++;
  const no = $("#nomor-" + huruf);
  no.textContent = huruf + "-" + String(LOKET[huruf].saat).padStart(3, "0");
  if (gerakAktif() && window.gsap) gsap.fromTo(no, { scaleY: 0.2, opacity: 0.4 }, { scaleY: 1, opacity: 1, duration: 0.4 });
}
function ambilNomor(huruf) {
  const l = LOKET[huruf];
  l.ambil++;
  const nomor = huruf + "-" + String(l.ambil).padStart(3, "0");
  const tunggu = Math.max(0, (l.ambil - l.saat)) * 7;
  const tiket = { loket: huruf, nomor, poli: l.nama, tanggal: new Date().toISOString().slice(0, 10), jam: jamWIB(), estimasiMenit: tunggu };
  dataLS.tiket.unshift(tiket);
  dataLS.tiket = dataLS.tiket.slice(0, 20);
  simpanLS(dataLS);
  tampilTiket(tiket);
  renderRiwayat();
  const u = new URL(location.href);
  u.searchParams.set("loket", huruf); u.searchParams.set("nomor", nomor);
  history.replaceState(null, "", u);
  $("#tiket").scrollIntoView({ behavior: gerakAktif() ? "smooth" : "auto", block: "nearest" });
}
function tampilTiket(t) {
  const isi = $("#tiket-isi");
  isi.innerHTML = "";
  isi.append(el("span", "no-tiket", t.nomor));
  [["Loket", t.poli], ["Tanggal", t.tanggal], ["Jam ambil", t.jam + " WIB"], ["Estimasi tunggu", "±" + t.estimasiMenit + " menit (" + Math.max(0, t.estimasiMenit / 7) + " orang di depanmu)"]].forEach(([k, v]) => {
    const r = el("span"); const b = el("strong", null, k + ": "); r.append(b, document.createTextNode(v)); isi.append(r);
  });
  isi.append(el("span", "cap", "✓ sah — tunjukkan di loket"));
  $("#tiket").hidden = false;
  $("#tiket-pesan").textContent = "";
}
function renderRiwayat() {
  const ul = $("#daftar-riwayat");
  ul.innerHTML = "";
  $("#empty-riwayat").hidden = dataLS.tiket.length > 0;
  dataLS.tiket.forEach(t => {
    ul.append(el("li", null, t.nomor + " · " + t.poli + " · " + t.tanggal + " " + t.jam + " · ±" + t.estimasiMenit + " mnt"));
  });
}
async function salinTeks(teks, pesan) {
  try { await navigator.clipboard.writeText(teks); }
  catch (e) {
    const ta = document.createElement("textarea");
    ta.value = teks; document.body.append(ta); ta.select();
    try { document.execCommand("copy"); } catch (e2) { /* gagal: pengguna salin manual */ }
    ta.remove();
  }
  $("#tiket-pesan").textContent = pesan;
}

/* ---------- imunisasi & obat ---------- */
function renderVaksin() {
  const ol = $("#garis-usia");
  VAKSIN.forEach((v, i) => {
    const li = el("li");
    const b = el("button", "vaksin");
    b.type = "button";
    b.setAttribute("aria-label", v.nama + ", usia " + v.usia);
    b.append(el("span", "titik", String(i + 1)));
    const isi = el("span", "isi-vaksin");
    isi.append(el("strong", null, v.nama));
    isi.append(el("span", "usia", "usia " + v.usia));
    b.append(isi);
    b.addEventListener("click", () => {
      const d = $("#detail-vaksin"), isiD = $("#isi-vaksin");
      isiD.innerHTML = "";
      isiD.append(el("h3", null, v.nama));
      const p1 = el("p"); p1.append(el("strong", null, "Usia pemberian: "), document.createTextNode(v.usia)); isiD.append(p1);
      isiD.append(el("p", null, v.ket));
      d.hidden = false;
      d.scrollIntoView({ behavior: gerakAktif() ? "smooth" : "auto", block: "nearest" });
      $("#tutup-vaksin").focus();
    });
    li.append(b);
    ol.append(li);
  });
}
function renderObat() {
  const g = $("#grid-obat");
  OBAT.forEach(o => {
    const d = el("div", "obat");
    const kiri = el("div");
    kiri.append(el("strong", null, o.nama));
    kiri.append(el("span", "dosis", o.dosis));
    d.append(kiri);
    d.append(el("span", "status-obat " + o.stok, o.stok));
    g.append(d);
  });
}

/* ---------- gerak: GSAP zoom/pan/wght, curtain, spotlight, mode ringan ---------- */
function initGerak() {
  const ringan = (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4 || (navigator.connection && navigator.connection.saveData);
  if (ringan) document.body.classList.add("gerak-mati");
  if (!window.gsap || !gerakAktif()) return;
  gsap.registerPlugin(ScrollTrigger);
  // A: zoom-in hero saat scroll
  gsap.to("#hero-dalam", {
    scale: 1.15, transformOrigin: "50% 20%",
    scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true },
  });
  // C: variable font axis — judul menebal saat masuk viewport
  $$("[data-wght]").forEach(t => {
    gsap.fromTo(t, { "--wght": 400 }, {
      "--wght": 800,
      scrollTrigger: { trigger: t, start: "top 85%", end: "top 30%", scrub: true },
      onUpdate: function () {
        const w = Math.round(gsap.getProperty(t, "--wght") || 400);
        t.style.fontVariationSettings = '"wght" ' + w;
      },
    });
  });
  // A pan: loket menggeser kanan saat scroll (desktop, pin)
  const mm = gsap.matchMedia();
  mm.add("(min-width: 56.25rem)", () => {
    const row = $("#loket-row");
    const geser = () => Math.max(0, row.scrollWidth - row.clientWidth + 32);
    gsap.to(row, {
      x: () => -geser(),
      ease: "none",
      scrollTrigger: { trigger: "#antrean", start: "top top", end: "+=600", scrub: true, pin: true, invalidateOnRefresh: true },
    });
  });
  // E: curtain wipe saat section pertama kali masuk
  const tirai = $("#curtain");
  let pernah = new Set();
  const io = new IntersectionObserver(es => {
    es.forEach(e => {
      if (!e.isIntersecting || pernah.has(e.target.id)) return;
      pernah.add(e.target.id);
      gsap.timeline()
        .set(tirai, { transformOrigin: "top", scaleY: 0 })
        .to(tirai, { scaleY: 1, duration: 0.22, ease: "power2.in" })
        .set(tirai, { transformOrigin: "bottom" })
        .to(tirai, { scaleY: 0, duration: 0.22, ease: "power2.out" });
    });
  }, { threshold: 0.4 });
  ["jadwal", "imunisasi"].forEach(id => io.observe(document.getElementById(id)));
  // reveal
  const io2 = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("tampil"); io2.unobserve(e.target); } }), { threshold: 0.15 });
  $$(".kartu-poli, .loket, .obat, .vaksin .isi-vaksin").forEach(n => { n.classList.add("reveal"); io2.observe(n); });
}
function initSpotlight() {
  if (!matchMedia("(pointer: fine)").matches) return;
  addEventListener("pointermove", e => {
    if (!gerakAktif()) return;
    document.body.classList.add("spot-on");
    document.documentElement.style.setProperty("--mx", e.clientX + "px");
    document.documentElement.style.setProperty("--my", e.clientY + "px");
  }, { passive: true });
}
function initModeRingan() {
  // FPS watchdog: <40fps selama 2 detik -> mode ringan
  let frame = 0, mulai = performance.now();
  function ukur(t) {
    frame++;
    if (t - mulai >= 2000) {
      const fps = frame / ((t - mulai) / 1000);
      if (fps < 40 && !document.body.classList.contains("gerak-mati")) {
        document.body.classList.add("gerak-mati");
        if (window.gsap) ScrollTrigger.getAll().forEach(s => s.kill());
      }
      return;
    }
    requestAnimationFrame(ukur);
  }
  requestAnimationFrame(ukur);
}

/* ---------- easter egg ---------- */
function initEasterEgg() {
  let buf = "";
  addEventListener("keydown", e => {
    if (e.key.length !== 1) return;
    buf = (buf + e.key.toLowerCase()).slice(-5);
    if (buf === "sehat") {
      const s = $("#stempel-jatuh");
      s.classList.remove("jatuh"); void s.offsetWidth; s.classList.add("jatuh");
      $("#tiket-pesan").textContent = "Sehat selalu, Nak! Stempelnya sudah jatuh.";
      buf = "";
    }
  });
}

/* ---------- deep-link & wiring ---------- */
function terapkanDeepLink() {
  const q = new URLSearchParams(location.search);
  const poli = q.get("poli"), hari = q.get("hari"), loket = q.get("loket");
  if (hari && HARI.includes(hari)) {
    hariAktif = hari;
    $$("#filter-hari button").forEach((b, i) => b.setAttribute("aria-pressed", String(HARI[i] === hari)));
  }
  renderPoli();
  if (poli) { const p = POLI.find(x => x.id === poli); if (p && p.jadwal[hariAktif]) bukaDetailPoli(p); }
  if (loket && LOKET[loket]) document.getElementById("antrean").scrollIntoView();
}
function wiring() {
  $("#cari-poli").addEventListener("input", renderPoli);
  $("#tutup-detail").addEventListener("click", () => { $("#detail-poli").hidden = true; });
  $("#tutup-vaksin").addEventListener("click", () => { $("#detail-vaksin").hidden = true; });
  $("#tombol-jeda").addEventListener("click", e => {
    marqueeJeda = !marqueeJeda;
    e.currentTarget.setAttribute("aria-pressed", String(marqueeJeda));
    e.currentTarget.textContent = marqueeJeda ? "jalanin gerak" : "jeda gerak";
    $$(".marquee").forEach(m => m.classList.toggle("jeda", marqueeJeda));
  });
  $("#tombol-gerak").addEventListener("click", e => {
    const mati = document.body.classList.toggle("gerak-mati");
    e.currentTarget.setAttribute("aria-pressed", String(!mati));
    e.currentTarget.textContent = mati ? "gerak: mati" : "gerak: nyala";
    document.body.classList.toggle("spot-on", false);
    if (window.gsap) ScrollTrigger.getAll().forEach(s => mati ? s.disable() : s.enable());
  });
  $("#salin-wa").addEventListener("click", () => {
    const t = dataLS.tiket[0];
    if (!t) return;
    const pesan = "Halo, Bu Suster. Saya " + t.nomor + " (" + t.poli + "), ambil nomor " + t.tanggal + " jam " + t.jam + " WIB. Estimasi tunggu ±" + t.estimasiMenit + " menit. Terima kasih.";
    salinTeks(pesan, "Pesan WA tersalin — tinggal tempel di chat puskesmas, Nak.");
  });
  $("#ekspor-json").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(dataLS, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "loketsehat-riwayat.json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    $("#tiket-pesan").textContent = "Riwayat tersimpan sebagai JSON.";
  });
  $("#tiket-baru").addEventListener("click", () => { $("#tiket").hidden = true; document.getElementById("antrean").scrollIntoView({ behavior: gerakAktif() ? "smooth" : "auto" }); });
  $("#hapus-riwayat").addEventListener("click", () => {
    dataLS = { version: 1, tiket: [] };
    simpanLS(dataLS);
    renderRiwayat();
  });
  // auto-advance nomor tiap 45 detik saat tab terlihat
  setInterval(() => {
    if (document.hidden) return;
    const huruf = ["A", "B", "C"][Math.floor(Math.random() * 3)];
    if (LOKET[huruf].saat < LOKET[huruf].ambil) panggilNomor(huruf);
  }, 45000);
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.body.classList.add("gerak-mati");
    $("#tombol-gerak").textContent = "gerak: mati";
    $("#tombol-gerak").setAttribute("aria-pressed", "false");
  }
}

/* ---------- jalan ---------- */
statusBuka();
isiMarquee();
bangunStiker();
bangunFilterHari();
renderLoket();
renderVaksin();
renderObat();
renderRiwayat();
terapkanDeepLink();
wiring();
putarMarquee();
initSpotlight();
initGerak();
initModeRingan();
initEasterEgg();
