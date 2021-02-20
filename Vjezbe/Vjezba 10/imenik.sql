-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 04, 2021 at 12:16 AM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vjezba9`
--

-- --------------------------------------------------------

--
-- Table structure for table `imenik`
--

CREATE TABLE `imenik` (
  `id` int(11) NOT NULL,
  `imeIPrezime` varchar(30) COLLATE utf16_unicode_ci NOT NULL,
  `adresa` varchar(30) COLLATE utf16_unicode_ci NOT NULL,
  `brojTelefona` varchar(30) COLLATE utf16_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_unicode_ci;

--
-- Dumping data for table `imenik`
--

INSERT INTO `imenik` (`id`, `imeIPrezime`, `adresa`, `brojTelefona`) VALUES
(1, 'Osoba A', 'Adresa A ', 'Broj Telefona A'),
(2, 'Osoba B', 'Adresa B', 'BrojTelefona B'),
(3, 'Osoba C', 'Adresa C', 'Broj Telefona C'),
(4, 'Osoba D', 'Adresa D', 'Broj Telefona D');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `imenik`
--
ALTER TABLE `imenik`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `imenik`
--
ALTER TABLE `imenik`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
