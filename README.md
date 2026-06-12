# Website Paroki Santo Petrus Sambiroto

Website resmi untuk Paroki Santo Petrus Sambiroto, dibangun dengan fitur profil paroki, informasi jadwal misa, berita, kegiatan, dan panel admin (Content Management System) terintegrasi.

## Teknologi yang Digunakan
- **Frontend**: Next.js 15, React 19, Tailwind CSS v4
- **Backend**: Next.js App Router (API Routes)
- **Database**: MySQL
- **Autentikasi**: JWT (JSON Web Tokens) menggunakan `jose` & `bcryptjs`
- **UI Components**: `lucide-react`, komponen kustom berbasis Tailwind.

## Fitur Utama
- **Halaman Publik Modern**: Desain responsif dan estetis menggunakan tema monokrom (hitam, putih, charcoal).
- **Halaman Admin Khusus**: Sistem manajemen konten (CMS) untuk mengelola data website.
- **Pengelolaan Data Dinamis**:
  - Daftar Romo
  - Jadwal Misa
  - Berita & Pengumuman (dengan fitur upload gambar)
  - Agenda/Kegiatan
  - Statistik Paroki
  - Daftar Organisasi/Kelompok
  - Daftar Sakramen
  - Data Kontak Paroki

## Cara Menjalankan Secara Lokal (Development)

### Persyaratan Sistem
- Node.js (versi 18.x atau terbaru)
- MySQL Server (bisa menggunakan Laragon, XAMPP, atau MySQL mandiri)

### Langkah-langkah Instalasi

1. **Clone repositori ini** (atau letakkan folder proyek di komputer Anda).
   ```bash
   git clone <url-repo-anda>
   cd parokisambiroto
   ```

2. **Install dependensi**
   Anda bisa menggunakan `npm`, `pnpm`, atau `yarn`.
   ```bash
   npm install
   ```

3. **Pengaturan Variabel Lingkungan**
   Pastikan terdapat file `.env.local` di folder utama proyek (root). Jika belum ada, buat file `.env.local` dan isi dengan konfigurasi berikut:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=paroki_sambiroto
   JWT_SECRET=rahasia-jwt-paroki-sambiroto-ganti-ini
   ```
   *(Sesuaikan `DB_USER` dan `DB_PASSWORD` dengan konfigurasi MySQL lokal Anda).*

4. **Inisialisasi Database**
   Buat database baru menggunakan script SQL yang telah disediakan di `db/schema.sql`.
   Jika menggunakan terminal Windows (PowerShell):
   ```powershell
   Get-Content db/schema.sql | mysql -u root
   ```
   *(Atau Anda bisa mengimpor file `db/schema.sql` melalui antarmuka seperti phpMyAdmin atau HeidiSQL).*

5. **Jalankan Server Development**
   ```bash
   npm run dev
   ```

6. **Akses Website**
   - Halaman Publik: [http://localhost:3000](http://localhost:3000)
   - Halaman Admin: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
     - *Catatan: Anda juga bisa mengakses halaman login admin dengan mengklik Logo Paroki di sudut kiri atas pada navbar halaman publik.*

### Kredensial Default Admin
Saat database pertama kali diinisialisasi, sistem akan membuat satu akun admin default:
- **Username:** `admin`
- **Password:** `admin123`

---

*Dibuat untuk pelayanan umat Paroki Santo Petrus Sambiroto.*
