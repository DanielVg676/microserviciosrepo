-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 11, 2025 at 03:15 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `proyectoapi`
--

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `birthDate` date DEFAULT NULL,
  `address` text DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `creationDate` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `name`, `lastName`, `email`, `phone`, `birthDate`, `address`, `status`, `creationDate`) VALUES
(1, 'Juan', 'Pérez', 'juan.perez@example.com', '6181234567', '1990-05-15', 'Calle 123, Ciudad', 1, '2025-02-24 21:31:32'),
(2, 'María', 'González', 'maria.gonzalez@example.com', '6189876543', '1985-08-25', 'Avenida 456, Ciudad', 1, '2025-02-24 21:31:32'),
(3, 'Carlos', 'López', 'carlos.lopez@example.com', '6186543210', '1992-11-10', 'Carrera 789, Ciudad', 0, '2025-02-24 21:31:32');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `creationDate` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `phone`, `status`, `creationDate`) VALUES
(1, 'Daniel', '1234', '6181563424', 1, '2025-01-28 09:12:56'),
(4, 'dv956543@gmail.com', 'asecino12', '6184567698', 0, '2025-01-30 13:57:02'),
(7, 'jax12.800@gmail.com', 'nuevaspass2024', '6185765656', 1, '2025-02-03 02:38:29'),
(8, 'example@email.com', 'password123', '6184568787', 0, '2025-02-03 02:42:30'),
(9, 'jax123.800@gmail.com', 'nuevaspass2024', '6185765689', 1, '2025-02-18 14:43:56'),
(10, 'jax123.8002@gmail.com', 'nuevaspass2024', '6185768689', 0, '2025-02-18 14:46:07'),
(11, 'jax12453.8002@gmail.com', 'nuevaspass2024', '6185268689', 1, '2025-02-18 15:18:22'),
(18, 'juan@gmail.com', 'asdasdasfasfsefefsfesd', '6184560989', 0, '2025-02-25 15:37:12'),
(19, 'jax123333.800@gmail.com', 'nuevaspass2024', '6185760056', 1, '2025-02-27 14:30:52'),
(20, 'juanaaa@gmail.com', 'asdasdasfasfsessdfsdfsdfefsfesd', '6184500989', 1, '2025-02-27 14:42:16'),
(21, 'daviga6534@gmail.com', 'nuevaspass2024', '6185268610', 1, '2025-03-04 04:21:39');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_unique` (`email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
