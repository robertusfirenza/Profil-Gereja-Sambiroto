-- =============================================
-- Database Schema: Paroki Santo Petrus Sambiroto
-- =============================================

CREATE DATABASE IF NOT EXISTS paroki_sambiroto
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE paroki_sambiroto;

-- =============================================
-- 1. Admin Users
-- =============================================
CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  display_name VARCHAR(100) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Default admin user: admin / admin123
-- Password hash will be inserted by the seed script

-- =============================================
-- 2. Priests (Daftar Romo)
-- =============================================
CREATE TABLE IF NOT EXISTS priests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  role VARCHAR(100) NOT NULL DEFAULT 'Pastor Rekan',
  is_head TINYINT(1) NOT NULL DEFAULT 0,
  photo VARCHAR(500) DEFAULT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- =============================================
-- 3. Mass Schedules (Jadwal Misa)
-- =============================================
CREATE TABLE IF NOT EXISTS mass_schedules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  day VARCHAR(50) NOT NULL,
  subtitle VARCHAR(150) DEFAULT NULL,
  times JSON NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- =============================================
-- 4. News (Berita)
-- =============================================
CREATE TABLE IF NOT EXISTS news (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(500) NOT NULL,
  excerpt TEXT DEFAULT NULL,
  content LONGTEXT DEFAULT NULL,
  category VARCHAR(100) DEFAULT NULL,
  image VARCHAR(500) DEFAULT NULL,
  published_date DATE DEFAULT NULL,
  is_published TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_slug (slug),
  INDEX idx_published (is_published, published_date)
) ENGINE=InnoDB;

-- =============================================
-- 5. Events (Agenda / Kegiatan)
-- =============================================
CREATE TABLE IF NOT EXISTS events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  event_date VARCHAR(50) NOT NULL,
  time VARCHAR(100) DEFAULT NULL,
  place VARCHAR(255) DEFAULT NULL,
  description TEXT DEFAULT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- =============================================
-- 6. Stats (Statistik Paroki)
-- =============================================
CREATE TABLE IF NOT EXISTS stats (
  id INT AUTO_INCREMENT PRIMARY KEY,
  stat_key VARCHAR(50) NOT NULL UNIQUE,
  stat_value VARCHAR(100) NOT NULL,
  label VARCHAR(150) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- =============================================
-- 7. Ministries (Organisasi)
-- =============================================
CREATE TABLE IF NOT EXISTS ministries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT DEFAULT NULL,
  category VARCHAR(100) DEFAULT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- =============================================
-- 8. Sacraments (Sakramen)
-- =============================================
CREATE TABLE IF NOT EXISTS sacraments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT DEFAULT NULL,
  image VARCHAR(500) DEFAULT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- =============================================
-- 9. Parish Info (Data Kontak Paroki)
-- =============================================
CREATE TABLE IF NOT EXISTS parish_info (
  id INT AUTO_INCREMENT PRIMARY KEY,
  info_key VARCHAR(50) NOT NULL UNIQUE,
  info_value TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- =============================================
-- SEED DATA
-- =============================================

-- Admin user (password: admin123 - bcrypt hash)
INSERT INTO admin_users (username, password_hash, display_name) VALUES
('admin', '$2b$10$hRWWTsU3OmCCJEwAeAFYne9WWFW.5ImfZ6SacCW6nXBXJ7LqyLJ2G', 'Administrator')
ON DUPLICATE KEY UPDATE username=username;

-- Priests
INSERT INTO priests (name, role, is_head, sort_order) VALUES
('RD. Antonius Wijaya', 'Pastor Kepala', 1, 1),
('RD. Yohanes Baptista', 'Pastor Rekan', 0, 2)
ON DUPLICATE KEY UPDATE name=name;

-- Mass Schedules
INSERT INTO mass_schedules (day, subtitle, times, sort_order) VALUES
('Sabtu', 'Misa Sabtu Sore', '["17.00 WIB"]', 1),
('Minggu', 'Misa Hari Minggu', '["06.00 WIB", "08.00 WIB", "17.00 WIB"]', 2),
('Harian', 'Senin – Jumat', '["05.30 WIB"]', 3),
('Jumat Pertama', 'Devosi Hati Kudus', '["18.00 WIB"]', 4)
ON DUPLICATE KEY UPDATE day=day;

-- News
INSERT INTO news (slug, title, excerpt, content, category, image, published_date) VALUES
('perayaan-paskah-2026', 'Perayaan Tri Hari Suci dan Paskah 2026', 'Rangkaian ibadat Tri Hari Suci akan dilaksanakan mulai Kamis Putih hingga Malam Paskah. Simak jadwal lengkap dan persiapan liturginya.', 'Seluruh umat diundang untuk turut serta dalam kegiatan ini. Kehadiran dan partisipasi Anda menjadi tanda nyata persaudaraan dan semangat pelayanan yang menghidupi paroki kita.\n\nUntuk informasi lebih lanjut, silakan menghubungi sekretariat paroki pada jam pelayanan, atau menyimak pengumuman yang disampaikan setelah perayaan Ekaristi setiap hari Minggu.\n\nMari kita terus mendukung karya pelayanan paroki dengan doa, kehadiran, dan kebersamaan. Tuhan memberkati setiap niat baik dan pelayanan kita.', 'Liturgi', '/images/candles.png', '2026-04-02'),
('bakti-sosial-lingkungan', 'Bakti Sosial Paroki untuk Warga Sekitar', 'Seksi Sosial Paroki mengadakan pembagian sembako dan pemeriksaan kesehatan gratis bagi masyarakat di sekitar wilayah paroki.', 'Seluruh umat diundang untuk turut serta dalam kegiatan ini. Kehadiran dan partisipasi Anda menjadi tanda nyata persaudaraan dan semangat pelayanan yang menghidupi paroki kita.\n\nUntuk informasi lebih lanjut, silakan menghubungi sekretariat paroki pada jam pelayanan, atau menyimak pengumuman yang disampaikan setelah perayaan Ekaristi setiap hari Minggu.\n\nMari kita terus mendukung karya pelayanan paroki dengan doa, kehadiran, dan kebersamaan. Tuhan memberkati setiap niat baik dan pelayanan kita.', 'Karya Sosial', '/images/community.png', '2026-03-18'),
('pendaftaran-misdinar', 'Pendaftaran Misdinar Angkatan Baru Dibuka', 'Anak-anak dan remaja yang telah menerima Komuni Pertama diundang untuk bergabung menjadi putra-putri altar paroki.', 'Seluruh umat diundang untuk turut serta dalam kegiatan ini. Kehadiran dan partisipasi Anda menjadi tanda nyata persaudaraan dan semangat pelayanan yang menghidupi paroki kita.\n\nUntuk informasi lebih lanjut, silakan menghubungi sekretariat paroki pada jam pelayanan, atau menyimak pengumuman yang disampaikan setelah perayaan Ekaristi setiap hari Minggu.\n\nMari kita terus mendukung karya pelayanan paroki dengan doa, kehadiran, dan kebersamaan. Tuhan memberkati setiap niat baik dan pelayanan kita.', 'Pengumuman', '/images/choir.png', '2026-03-05')
ON DUPLICATE KEY UPDATE slug=slug;

-- Events
INSERT INTO events (title, event_date, time, place, sort_order) VALUES
('Rekoleksi Orang Muda Katolik', '12 Jun', '08.00 – 15.00 WIB', 'Aula Paroki', 1),
('Pertemuan Dewan Pastoral', '15 Jun', '19.00 WIB', 'Ruang Rapat', 2),
('Misa Syukur HUT Paroki', '22 Jun', '08.00 WIB', 'Gereja', 3),
('Pesta Santo Petrus & Paulus', '29 Jun', '17.00 WIB', 'Gereja', 4)
ON DUPLICATE KEY UPDATE title=title;

-- Stats
INSERT INTO stats (stat_key, stat_value, label, sort_order) VALUES
('umat', '12.400+', 'Umat Terdaftar', 1),
('lingkungan', '38', 'Lingkungan', 2),
('kelompok', '24', 'Kelompok Kategorial', 3),
('tahun', '75', 'Tahun Melayani', 4)
ON DUPLICATE KEY UPDATE stat_key=stat_key;

-- Ministries
INSERT INTO ministries (name, description, sort_order) VALUES
('Putra-Putri Altar', 'Pelayanan liturgi bagi anak dan remaja sebagai pelayan altar.', 1),
('Paduan Suara', 'Mengiringi perayaan Ekaristi dengan kidung pujian yang khusyuk.', 2),
('Orang Muda Katolik', 'Wadah pembinaan iman dan kegiatan kreatif kaum muda paroki.', 3),
('Wanita Katolik', 'Pemberdayaan dan pelayanan kasih oleh ibu-ibu paroki.', 4),
('Seksi Sosial', 'Karya kasih dan kepedulian bagi sesama yang membutuhkan.', 5),
('Prodiakon', 'Membantu pelayanan Komuni dalam perayaan Ekaristi.', 6)
ON DUPLICATE KEY UPDATE name=name;

-- Sacraments
INSERT INTO sacraments (name, description, image, sort_order) VALUES
('Baptis', 'Sakramen inisiasi yang menjadikan kita anak-anak Allah dan anggota Gereja.', '/images/baptism.png', 1),
('Ekaristi', 'Sumber dan puncak seluruh hidup Kristiani dalam Tubuh dan Darah Kristus.', NULL, 2),
('Penguatan (Krisma)', 'Sakramen pencurahan Roh Kudus yang menguatkan iman.', NULL, 3),
('Tobat', 'Sakramen rekonsiliasi dan pengampunan dosa.', NULL, 4),
('Perkawinan', 'Sakramen yang menguduskan janji cinta seumur hidup suami istri.', NULL, 5),
('Pengurapan Orang Sakit', 'Sakramen penghiburan dan kekuatan bagi yang sakit.', NULL, 6),
('Imamat', 'Sakramen pelayanan yang menguduskan para imam.', NULL, 7)
ON DUPLICATE KEY UPDATE name=name;

-- Parish Info
INSERT INTO parish_info (info_key, info_value) VALUES
('name', 'Paroki Santo Petrus'),
('location', 'Sambiroto'),
('full_name', 'Paroki Santo Petrus Sambiroto'),
('tagline', 'Tu es Petrus'),
('tagline_id', 'Engkaulah Petrus, dan di atas batu karang ini Aku akan mendirikan Gereja-Ku'),
('address', 'Jl. Arumsari A5, RT 011 / RW02, Sambiroto, Jawa Tengah 50239'),
('phone', '082231116700'),
('email', 'sekpar.sambiroto@kas.id'),
('diocese', 'Keuskupan Agung Semarang')
ON DUPLICATE KEY UPDATE info_key=info_key;
