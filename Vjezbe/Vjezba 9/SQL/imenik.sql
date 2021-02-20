-- SHEMA --
-----------
CREATE TABLE `imenik` (
  `id` int(11) NOT NULL,
  `imePrezime` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `adresa` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `brojTelefona` varchar(30) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- INDEXES/KEYS --
----------
ALTER TABLE `imenik`
  ADD PRIMARY KEY (`id`);

-- PRIMARY KEY -- 
-----------------
ALTER TABLE `imenik`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

-- DATA --
----------
INSERT INTO `imenik` (`id`, `imePrezime`, `adresa`, `brojTelefona`) VALUES
(1, 'Almir Mulalic', 'ES42', '051231231'),
(2, 'Mujo Mujic', 'Nema', '12431'),
(3, 'Test Test', 'Es1', '2421412'),
(4, 'Ime Prezime', 'FS2', '12321414'),
(5, 'Prezime Ime', 'KL2', '123534'),
(6, 'testPostman', 'testPostman', 'testPostman'),
(7, 'testForma', 'testForma', 'testForma'),
(8, 'testPostman', 'testPostman', 'testPostman');

