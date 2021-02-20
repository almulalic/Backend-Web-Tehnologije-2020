-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 04, 2021 at 12:17 AM
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
-- Table structure for table `adresar`
--

CREATE TABLE `adresar` (
  `id` int(11) NOT NULL,
  `idKontakt` int(11) NOT NULL,
  `idPoznanik` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_unicode_ci;

--
-- Dumping data for table `adresar`
--

INSERT INTO `adresar` (`id`, `idKontakt`, `idPoznanik`) VALUES
(1, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 2, 1),
(7, 2, 3),
(8, 2, 4),
(9, 3, 1),
(10, 3, 2),
(11, 3, 4),
(12, 4, 1),
(13, 4, 2),
(14, 4, 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adresar`
--
ALTER TABLE `adresar`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idKontakt` (`idKontakt`),
  ADD KEY `idPoznanik` (`idPoznanik`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adresar`
--
ALTER TABLE `adresar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--
ALTER TABLE `adresar`
ADD CONSTRAINT `adresar_imenik_fk1` FOREIGN KEY (`idKontakt`) REFERENCES `imenik`(`id`),
ADD CONSTRAINT `adresar_imenik_fk2` FOREIGN KEY (`idPoznanik`) REFERENCES `imenik`(`id`);
--
-- Constraints for table `adresar`
--
ALTER TABLE `adresar`
  ADD CONSTRAINT `adresar_ibfk_1` FOREIGN KEY (`idKontakt`) REFERENCES `imenik` (`id`),
  ADD CONSTRAINT `adresar_ibfk_2` FOREIGN KEY (`idPoznanik`) REFERENCES `imenik` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
