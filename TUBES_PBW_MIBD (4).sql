-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 27, 2022 at 02:31 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `TUBES_PBW_MIBD`
--

-- --------------------------------------------------------

--
-- Table structure for table `Admin`
--

CREATE TABLE `Admin` (
  `ID_U` int(11) NOT NULL,
  `nama` varchar(30) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(50) NOT NULL,
  `role` varchar(8) NOT NULL DEFAULT 'admin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Admin`
--

INSERT INTO `Admin` (`ID_U`, `nama`, `username`, `password`, `role`) VALUES
(1, 'Budi Budiman', 'Budi_2022@admin', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `daftar_emailOrtu`
--

CREATE TABLE `daftar_emailOrtu` (
  `ID_E` int(11) NOT NULL,
  `ID_U` int(11) NOT NULL,
  `email` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `daftar_emailOrtu`
--

INSERT INTO `daftar_emailOrtu` (`ID_E`, `ID_U`, `email`) VALUES
(50, 80, 'ortu@email(contoh)'),
(51, 81, 'ortu@email(contoh)'),
(52, 82, 'ortu@email(contoh)'),
(53, 83, 'ortu@email(contoh)'),
(54, 84, 'ortu@email(contoh)'),
(55, 85, 'ortu@email(contoh)'),
(56, 86, 'ortu@email(contoh)'),
(57, 87, 'ortu@email(contoh)');

-- --------------------------------------------------------

--
-- Table structure for table `daftar_namaOrtu`
--

CREATE TABLE `daftar_namaOrtu` (
  `ID_O` int(11) NOT NULL,
  `ID_U` int(11) NOT NULL,
  `nama` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `daftar_namaOrtu`
--

INSERT INTO `daftar_namaOrtu` (`ID_O`, `ID_U`, `nama`) VALUES
(95, 80, 'tina'),
(96, 80, 'Budi'),
(97, 81, 'tina'),
(98, 81, 'Budi'),
(99, 82, 'tina'),
(100, 82, 'Budi'),
(101, 83, 'tina'),
(102, 83, 'Budi'),
(103, 84, 'tina'),
(104, 84, 'Budi'),
(105, 85, 'tina'),
(106, 85, 'Budi'),
(107, 86, 'tina'),
(108, 86, 'Budi'),
(109, 87, 'tina'),
(110, 87, 'Budi');

-- --------------------------------------------------------

--
-- Table structure for table `Guru`
--

CREATE TABLE `Guru` (
  `ID_U` int(11) NOT NULL,
  `NIP` char(18) NOT NULL,
  `nama` varchar(30) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(50) NOT NULL,
  `role` varchar(8) NOT NULL DEFAULT 'guru',
  `kelas` char(2) NOT NULL,
  `kode_ruang` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Guru`
--

INSERT INTO `Guru` (`ID_U`, `NIP`, `nama`, `username`, `password`, `role`, `kelas`, `kode_ruang`) VALUES
(15, '198305164019211000', 'Irene', 'Irene@guru', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=', 'guru', '1A', '1'),
(16, '198305164019311001', 'Dedi', 'Dedi@guru', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=', 'guru', '1B', '2'),
(17, '198305164019311002', 'Gunardi', 'Gunardi@guru', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=', 'guru', '1C', '3'),
(18, '198305164019311003', 'Susan', 'Susan@guru', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=', 'guru', '2A', '4'),
(19, '198305164019311004', 'Tommy', 'Tommy@guru', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=', 'guru', '2B', '5'),
(20, '198305164019311005', 'Tony', 'Tony@guru', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=', 'guru', '2C', '6');

-- --------------------------------------------------------

--
-- Table structure for table `Kepala_Sekolah`
--

CREATE TABLE `Kepala_Sekolah` (
  `ID_U` int(11) NOT NULL,
  `nama` varchar(30) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(50) NOT NULL,
  `role` varchar(8) NOT NULL DEFAULT 'kepsek'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Kepala_Sekolah`
--

INSERT INTO `Kepala_Sekolah` (`ID_U`, `nama`, `username`, `password`, `role`) VALUES
(2, 'susi', 'susi@kepsek', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=', 'kepsek');

-- --------------------------------------------------------

--
-- Table structure for table `Periode`
--

CREATE TABLE `Periode` (
  `ID_P` int(11) NOT NULL,
  `tanggalMulai` date NOT NULL,
  `tanggalAkhir` date NOT NULL,
  `persentaseKapasitas` int(11) NOT NULL,
  `tanggalMulaiDaftar` date NOT NULL,
  `tanggalAkhirDaftar` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Periode`
--

INSERT INTO `Periode` (`ID_P`, `tanggalMulai`, `tanggalAkhir`, `persentaseKapasitas`, `tanggalMulaiDaftar`, `tanggalAkhirDaftar`) VALUES
(19, '2022-06-28', '2022-06-30', 10, '2022-06-27', '2022-06-27'),
(20, '2022-07-04', '2022-07-08', 10, '2022-06-28', '2022-06-28');

-- --------------------------------------------------------

--
-- Table structure for table `Ruangan`
--

CREATE TABLE `Ruangan` (
  `kode_ruangan` varchar(20) NOT NULL,
  `kapasitas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Ruangan`
--

INSERT INTO `Ruangan` (`kode_ruangan`, `kapasitas`) VALUES
('1', 50),
('2', 50),
('3', 50),
('4', 50),
('5', 50),
('6', 50);

-- --------------------------------------------------------

--
-- Table structure for table `Satpam`
--

CREATE TABLE `Satpam` (
  `ID_U` int(11) NOT NULL,
  `nama` varchar(30) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(50) NOT NULL,
  `role` varchar(8) NOT NULL DEFAULT 'satpam'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Satpam`
--

INSERT INTO `Satpam` (`ID_U`, `nama`, `username`, `password`, `role`) VALUES
(1, 'zidan', 'zidan@satpam', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=', 'satpam'),
(2, 'yayan', 'yayan@satpam', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=', 'kepsek'),
(3, 'sukiman', 'sukiman@satpam', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=', 'kepsek');

-- --------------------------------------------------------

--
-- Table structure for table `Siswa`
--

CREATE TABLE `Siswa` (
  `ID_U` int(11) NOT NULL,
  `NIS` char(10) NOT NULL,
  `nama` varchar(30) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(50) NOT NULL,
  `role` varchar(8) NOT NULL DEFAULT 'siswa',
  `email` varchar(30) NOT NULL,
  `kelas` char(2) NOT NULL,
  `vaksinKe` int(11) DEFAULT NULL,
  `buktiVaksin` varchar(50) DEFAULT NULL,
  `tanggalVaksin` date DEFAULT NULL,
  `statusPTMT` tinyint(1) NOT NULL DEFAULT 0,
  `kode_ruang` varchar(20) DEFAULT NULL,
  `tanggalLahir` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Siswa`
--

INSERT INTO `Siswa` (`ID_U`, `NIS`, `nama`, `username`, `password`, `role`, `email`, `kelas`, `vaksinKe`, `buktiVaksin`, `tanggalVaksin`, `statusPTMT`, `kode_ruang`, `tanggalLahir`) VALUES
(80, '1111111118', 'edo', '1111111118@siswa', '8B5vxtw6vGfGy/5MmhrEgl8EeWfjRP6yAD7iJPKBowI=', 'siswa', 'aku@siswa', '1A', 2, './public/vaksin/80/1656332120683.jpg', '2022-06-27', 1, '1', '2000-12-10'),
(81, '1111111119', 'wilson', '1111111119@siswa', 'd8yD0NuWHS5y0yxJF9XzCThoMTPJiPr+YxTDS3FUGOc=', 'siswa', 'aku@siswa', '1A', 2, './public/vaksin/81/1656332769548.jpg', '2022-06-27', 1, '1', '2000-12-11'),
(82, '1111111120', 'neil', '1111111120@siswa', 'MrvDIx/krEUmWfejRoUq7kGE0XGp1qujJkhpEpoDCz0=', 'siswa', 'aku@siswa', '1A', NULL, NULL, NULL, 0, '1', '2000-12-12'),
(83, '1111111121', 'william', '1111111121@siswa', 'EJvLu+1mC/TcpNRrCCn9IMLrILcU/tM/Jf2b8jsWPuE=', 'siswa', 'aku@siswa', '1A', NULL, NULL, NULL, 0, '1', '2000-12-13'),
(84, '1111111122', 'gunawan', '1111111122@siswa', 'x6h8dXlH3H7OKt/vVGY0nAod4vEUz9iUzp+BaOT+9vU=', 'siswa', 'aku@siswa', '1B', NULL, NULL, NULL, 0, '2', '2000-12-14'),
(85, '1111111123', 'angel', '1111111123@siswa', 'H3LbPKKp0+LFzd6EEwQtf3TE+vTOc1hr/yV5kBFyc9M=', 'siswa', 'aku@siswa', '1B', NULL, NULL, NULL, 0, '2', '2000-12-15'),
(86, '1111111124', 'doni', '1111111124@siswa', '3gXiwApqVzztt1f7XPYRRGZNpCoo0TtzJsL6e+DZoPI=', 'siswa', 'aku@siswa', '1B', NULL, NULL, NULL, 0, '2', '2000-12-16'),
(87, '1111111125', 'charlie', '1111111125@siswa', 'XeGJLNq27y1wd0ZRzmY3EPa7ZAsHp4HnZrXOlgOnOyg=', 'siswa', 'aku@siswa', '1B', NULL, NULL, NULL, 0, '2', '2000-12-17');

-- --------------------------------------------------------

--
-- Table structure for table `Transaksi_Periode`
--

CREATE TABLE `Transaksi_Periode` (
  `ID` int(11) NOT NULL,
  `ID_U` int(11) NOT NULL,
  `ID_P` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Transaksi_Periode`
--

INSERT INTO `Transaksi_Periode` (`ID`, `ID_U`, `ID_P`) VALUES
(19, 80, 19),
(20, 81, 19);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Admin`
--
ALTER TABLE `Admin`
  ADD PRIMARY KEY (`ID_U`);

--
-- Indexes for table `daftar_emailOrtu`
--
ALTER TABLE `daftar_emailOrtu`
  ADD PRIMARY KEY (`ID_E`),
  ADD KEY `fokey` (`ID_U`);

--
-- Indexes for table `daftar_namaOrtu`
--
ALTER TABLE `daftar_namaOrtu`
  ADD PRIMARY KEY (`ID_O`),
  ADD KEY `fk` (`ID_U`);

--
-- Indexes for table `Guru`
--
ALTER TABLE `Guru`
  ADD PRIMARY KEY (`ID_U`),
  ADD KEY `fk3` (`kode_ruang`);

--
-- Indexes for table `Kepala_Sekolah`
--
ALTER TABLE `Kepala_Sekolah`
  ADD PRIMARY KEY (`ID_U`);

--
-- Indexes for table `Periode`
--
ALTER TABLE `Periode`
  ADD PRIMARY KEY (`ID_P`);

--
-- Indexes for table `Ruangan`
--
ALTER TABLE `Ruangan`
  ADD PRIMARY KEY (`kode_ruangan`);

--
-- Indexes for table `Satpam`
--
ALTER TABLE `Satpam`
  ADD PRIMARY KEY (`ID_U`);

--
-- Indexes for table `Siswa`
--
ALTER TABLE `Siswa`
  ADD PRIMARY KEY (`ID_U`),
  ADD KEY `fk1` (`kode_ruang`);

--
-- Indexes for table `Transaksi_Periode`
--
ALTER TABLE `Transaksi_Periode`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk5` (`ID_P`),
  ADD KEY `fk6` (`ID_U`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Admin`
--
ALTER TABLE `Admin`
  MODIFY `ID_U` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `daftar_emailOrtu`
--
ALTER TABLE `daftar_emailOrtu`
  MODIFY `ID_E` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `daftar_namaOrtu`
--
ALTER TABLE `daftar_namaOrtu`
  MODIFY `ID_O` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT for table `Guru`
--
ALTER TABLE `Guru`
  MODIFY `ID_U` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `Kepala_Sekolah`
--
ALTER TABLE `Kepala_Sekolah`
  MODIFY `ID_U` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Periode`
--
ALTER TABLE `Periode`
  MODIFY `ID_P` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `Satpam`
--
ALTER TABLE `Satpam`
  MODIFY `ID_U` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `Siswa`
--
ALTER TABLE `Siswa`
  MODIFY `ID_U` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- AUTO_INCREMENT for table `Transaksi_Periode`
--
ALTER TABLE `Transaksi_Periode`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `daftar_emailOrtu`
--
ALTER TABLE `daftar_emailOrtu`
  ADD CONSTRAINT `fokey` FOREIGN KEY (`ID_U`) REFERENCES `Siswa` (`ID_U`);

--
-- Constraints for table `daftar_namaOrtu`
--
ALTER TABLE `daftar_namaOrtu`
  ADD CONSTRAINT `fk` FOREIGN KEY (`ID_U`) REFERENCES `Siswa` (`ID_U`);

--
-- Constraints for table `Siswa`
--
ALTER TABLE `Siswa`
  ADD CONSTRAINT `fk1` FOREIGN KEY (`kode_ruang`) REFERENCES `Ruangan` (`kode_ruangan`) ON DELETE SET NULL;

--
-- Constraints for table `Transaksi_Periode`
--
ALTER TABLE `Transaksi_Periode`
  ADD CONSTRAINT `fk5` FOREIGN KEY (`ID_P`) REFERENCES `Periode` (`ID_P`),
  ADD CONSTRAINT `fk6` FOREIGN KEY (`ID_U`) REFERENCES `Siswa` (`ID_U`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
